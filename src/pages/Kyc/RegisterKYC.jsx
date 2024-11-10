import {Heading, InputDH} from "../../components/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import Header2 from "../../components/Header2/index.jsx";
import React, {useState} from "react";
import {TabPanel, TabList, Tab, Tabs} from "react-tabs";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {PlusOutlined} from '@ant-design/icons';
import {useCreateKycMutation} from "../../services/kyc.service.js";
import {Breadcrumb, Button, Layout, Steps, theme, Image, Upload, DatePicker, message} from 'antd';
import useHookUploadImage from "../../hooks/useHookUploadImage.js";
import {useNavigate} from "react-router-dom";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const {Content, Sider} = Layout;


export default function KNCPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const {token} = theme.useToken();
    const [fileList, setFileList] = useState([]);
    const {UploadImage} = useHookUploadImage();
    const [current, setCurrent] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [ FormData,setFormData] = useState("");
    const [kycData, setKycData] = useState({
        dob: "",
        gender: "",
        fullName: "",
        age: 0,
        phoneNumber: "",
        email: "",
        cccdNumber: "",
        frontDocumentUrl: "",
        backDocumentUrl: ""

    });
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        dob: '',
        phoneNumber: '',
        age: '',
        cccdNumber: '',
        frontDocumentUrl: '',
        backDocumentUrl: ''
    });
    const validateFields = () => {
        let newErrors = {};
        if (!kycData.fullName) {
            newErrors.fullName = 'Họ tên không được để trống';
        }
        if (!kycData.email) {
            newErrors.email = 'Email không được để trống';
        }
        if (!kycData.dob) {
            newErrors.dob = 'Ngày sinh không được để trống';
        }
        if (!kycData.phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại không được để trống';
        } else if (!/^\d{10}$/.test(kycData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
        }
        if (!kycData.age) {
            newErrors.age = 'Tuổi không được để trống';
        } else if (isNaN(kycData.age)) {
            newErrors.age = 'Tuổi phải là một số';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
    };
    const handleGenderChange = (e) => {
        setKycData({...kycData, gender: e.target.value});
    };
    const [createKyc, {isLoading, isSuccess, isError, error}] = useCreateKycMutation();
    const handleChangeImage = async ({fileList: newFileList}) => {
        if (newFileList.length > 2) {
            message.warning("Bạn chỉ có thể tải lên tối đa 2 ảnh!");
            return;
        }

        setFileList(newFileList);
        const uploadedUrls = [];

        for (const file of newFileList) {
            const fileToUpload = file.originFileObj || file;
            if (fileToUpload) {
                try {
                    const imageUrl = await UploadImage(fileToUpload);
                    uploadedUrls.push(imageUrl);
                } catch (error) {
                    message.error(`Tải lên ảnh ${file.name} thất bại: ${error.message}`);
                }
            } else {
                //console.error("File object không hợp lệ:", file);
                message.warning("File object không hợp lệ")
            }
        }

        // Cập nhật kycData khi có đủ hai ảnh
        if (uploadedUrls.length === 2) {
            const [frontDocumentUrl, backDocumentUrl] = uploadedUrls;

            setKycData((prevKycData) => ({
                ...prevKycData,
                frontDocumentUrl,
                backDocumentUrl,
            }));
            // console.log("Front Document URL:", frontDocumentUrl);
            // console.log("Back Document URL:", backDocumentUrl);
        } else {
            //console.warn("Không đủ ảnh được tải lên. Các URL đã tải lên:", uploadedUrls);
            message.warning("Không đủ ảnh được tải lên. Các URL đã tải lên")
        }
    };
    const handleSubmit = async () => {

        try {
            const response = await createKyc(kycData).unwrap();
            // console.log('KYC creation response:', response);
            // console.log("Front Document URL:", kycData.frontDocumentUrl);
            // console.log("Back Document URL:", kycData.backDocumentUrl);
            const responseMessage = response?.message
            navigate('/ProfileDetail');
            message.success(responseMessage)

        } catch (err) {
            console.error('Failed to create KYC:', err);
            message.error(err?.data?.message);
        }
    };


    const next = () => {
        if (current === 0) {
            // Validate the fields before moving to the next step
            if (!validateFields()) {
                return; // Prevent moving to the next step
            }
            setCurrent(current + 1); // Move to the next step
        } else if (current === 1) {
            // Handle the submission of the form
            if (validateFields()) {
                handleSubmit();
                setCurrent(current + 1); // Move to the next step after submission
            }
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };


    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    const handleDateChange = (date) => {
        setKycData({
            ...kycData,
            dob: date ? date.format("YYYY-MM-DD") : null // Chuyển đổi ngày sang định dạng YYYY-MM-DD
        });
    };

    const steps = [
        {
            title: 'First',
            content: () => (
                <TabPanel>
                    <div className="grid grid-cols-1 gap-6 w-full">
                        {/* Full Name Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Họ tên đầy đủ
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="Please input name"
                                value={kycData.fullName}
                                onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                            {errors.fullName && <p className="text-red-600">{errors.fullName}</p>} {/* Thông báo lỗi */}

                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Email
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="example@gmail.com"
                                value={kycData.email}
                                onChange={(e) => setKycData({...kycData, email: e.target.value})}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                            {errors.email && <p className="text-red-600 ml-0">{errors.email}</p>} {/* Thông báo lỗi */}

                        </div>

                        {/* Date of Birth Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Ngày tháng năm sinh
                            </Heading>
                            <DatePicker
                                style={{width: '100%'}}
                                placeholder="Chọn ngày sinh"
                                format="YYYY-MM-DD" // Định dạng ngày
                                onChange={handleDateChange} // Gọi hàm cập nhật khi chọn ngày
                            />
                            {errors.email && <p className="text-red-600 ml-0">{errors.dob}</p>} {/* Thông báo lỗi */}

                        </div>
                        {/* Phone Number Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Số điện thoại
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="09xx xxx xxx"
                                value={kycData.phoneNumber}
                                onChange={(e) => setKycData({...kycData, phoneNumber: e.target.value})}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                            {errors.phoneNumber &&
                                <p className="text-red-600">{errors.phoneNumber}</p>} {/* Thông báo lỗi */}

                        </div>

                        {/* Gender Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h4" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Giới tính
                            </Heading>
                            <div className="flex items-center gap-8">
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="male" className="mr-2"
                                           checked={kycData.gender === 'male'}
                                           onChange={handleGenderChange}/>
                                    Nam
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="female" className="mr-2"
                                           checked={kycData.gender === 'female'}
                                           onChange={handleGenderChange}
                                    />
                                    Nữ
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="other" className="mr-2"
                                           checked={kycData.gender === 'other'}
                                           onChange={handleGenderChange}
                                    />
                                    Khác
                                </label>
                            </div>
                        </div>

                        {/* Age Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h4" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Tuổi
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="age"
                                value={kycData.age}
                                onChange={(e) => setKycData({...kycData, age: e.target.value})}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                            {errors.age && <p className="text-red-600">{errors.age}</p>} {/* Thông báo lỗi */}

                        </div>
                    </div>
                </TabPanel>
            ),
        },
        {
            title: 'Second',
            content: () => (
                <TabPanel>
                    <div className="grid grid-cols-1 gap-6 w-full">
                        {/* CCCD Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Số CCCD/Hộ chiếu
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="012345678"
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                                value={kycData.cccdNumber}
                                onChange={(e) => setKycData({...kycData, cccdNumber: e.target.value})}
                            />
                            {errors.cccdNumber &&
                                <p className="text-red-500 text-sm">{errors.cccdNumber}</p>} {/* Hiển thị lỗi */}

                        </div>

                        {/* Upload CCCD/Hộ chiếu Image */}
                        <div
                            className="flex flex-col gap-4 items-center justify-center p-4 bg-gray-50 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold text-blue-gray-900 mb-4">
                                Tải lên ảnh CCCD/Hộ chiếu
                            </h3>
                            <Upload
                                listType="picture-card"
                                onPreview={handlePreview}
                                onChange={handleChangeImage}
                                fileList={fileList}
                                beforeUpload={() => false} // Ngăn tải lên tự động
                            >
                                {fileList.length < 2 ? (
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Chọn ảnh</div>
                                    </div>
                                ) : null}
                            </Upload>

                            {/* Hiển thị ảnh xem trước */}
                            {previewImage && (
                                <Image
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                    }}
                                    src={previewImage}
                                />
                            )}

                            {/* Thông báo khi chưa tải lên ảnh */}
                            {fileList.length === 0 && (
                                <p className="text-red-500">Vui lòng tải lên ảnh CCCD/Hộ chiếu.</p>
                            )}
                        </div>

                    </div>
                </TabPanel>
            ),
        },
        {
            title: 'Last',
            content: () => (
                <TabPanel>
                    <div className="flex flex-col items-center justify-center h-full p-4">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">Xác minh thành công!</h3>
                        <p className="mt-2 text-lg text-gray-700 text-center">Cảm ơn bạn đã xác minh thông tin của
                            mình.</p>
                    </div>
                </TabPanel>
            ),
        },
    ];

    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, // Để Layout chiếm hết không gian còn lại
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <SiderUserBK/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <main className="flex flex-1 flex-col gap-6 md:self-stretch">
                                <header className="text-center">
                                    <Heading size="headinglg"
                                             className="text-4xl font-semibold uppercase text-blue_gray-900_01">
                                        xác minh danh tính
                                    </Heading>

                                    <Tabs selectedIndex={currentStep} onSelect={(index) => setCurrentStep(index)}>
                                        <TabList className="flex justify-center mt-4 gap-8">
                                            <Tab className="cursor-pointer">Danh tính</Tab>
                                            <Tab className="cursor-pointer">CCCD/Hộ chiếu</Tab>
                                        </TabList>
                                        <div style={{width: '90%', margin: '0 auto'}}>
                                            <Steps current={current}>
                                                {steps.map((item) => (
                                                    <Steps.Step key={item.title} title={item.title}/>
                                                ))}
                                            </Steps>
                                            <div className="step-content">
                                                {steps[current].content(handleChange, fileList, setFileList, previewImage, setPreviewImage, handlePreview)}
                                            </div>
                                            <div style={{marginTop: 24}}>
                                                {current < steps.length - 1 && (
                                                    <Button type="primary" onClick={next}>
                                                        Next
                                                    </Button>
                                                )}
                                                {current > 0 && (
                                                    <Button style={{margin: '0 8px'}} onClick={prev}>
                                                        Previous
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Tabs>
                                    <br/>

                                </header>
                            </main>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}
