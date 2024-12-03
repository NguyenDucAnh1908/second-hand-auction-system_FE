import {Heading, InputDH} from "../../components/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import Header2 from "../../components/Header2/index.jsx";
import React, {useState} from "react";
import {TabPanel, TabList, Tab, Tabs} from "react-tabs";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {PlusOutlined} from '@ant-design/icons';
import {useCreateKycMutation} from "../../services/kyc.service.js";
import {Breadcrumb, Button, Layout, Steps, theme, Image, Upload, message, Select} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [kycData, setKycData] = useState({
        frontDocumentUrl: '',  // Thêm trường frontDocumentUrl vào đây
    });
    const [current, setCurrent] = useState(0); // state để theo dõi bước hiện tại
    const [formData, setFormData] = useState({
        fullName: '',
        cccdNumber: '',
        dob: '',
        gender: '',
        nationality: '',
        address: '',
        home: '',
    });

    const [createKyc] = useCreateKycMutation();
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/');
        return `${year}-${month}-${day}`;
    };


    const handleChangeImage = async ({fileList: newFileList}) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const fileToUpload = newFileList[0].originFileObj || newFileList[0];

            if (fileToUpload) {
                try {
                    const formData = new FormData();
                    formData.append('image', fileToUpload);

                    const response = await axios.post('https://api.fpt.ai/vision/idr/vnm', formData, {
                        headers: {
                            'api-key': 'x9iMfNa0psqEceogJCZRyzoeqXuA4XQT',
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (response.data.errorCode === 0) {
                        message.success('Ảnh đã được tải lên thành công!');
                        const dataFromApi = response.data.data[0];

                        // Chuyển đổi ngày sinh từ "dd/MM/yyyy" thành "yyyy-MM-dd"
                        const dob = formatDate(dataFromApi.dob);

                        // Cập nhật formData với dữ liệu từ API
                        setFormData({
                            ...formData,
                            fullName: dataFromApi.name,
                            cccdNumber: dataFromApi.id,
                            dob: dob, // Đảm bảo ngày sinh đúng định dạng
                            gender: dataFromApi.sex === 'NAM' ? 'Nam' : (dataFromApi.sex === 'NỮ' ? 'Nữ' : 'Khác'),
                            nationality: dataFromApi.nationality,
                            address: dataFromApi.address,
                            home: dataFromApi.home,
                        });

                        console.log(dataFromApi); // In dữ liệu từ API ra console để kiểm tra
                    } else {
                        message.error(`Lỗi từ API: ${response.data.errorMessage}`);
                    }
                } catch (error) {
                    message.error('Đã có lỗi xảy ra khi upload ảnh.');
                }
            }
        }
    };


    const handleSubmit = async () => {
        try {
            const kycRequest = {
                fullName: formData.fullName,
                cccdNumber: formData.cccdNumber,
                dob: formData.dob,
                gender: formData.gender,
                home: formData.home,
                nationality: formData.nationality,
                permanentAddress: formData.address,

            };

            console.log("KYC Request Data: ", kycRequest); // Add this line to inspect data

            // Call the API to create KYC
            const backendResponse = await createKyc(kycRequest);

            if (backendResponse?.data) {
                // Success message
                message.success('KYC đã được tạo thành công!');
                navigate('/');  // Replace '/' with the correct path to your home page
            } else {
                // Error message if API response does not have expected data
                message.error(backendResponse?.data?.message || 'Không thể tạo KYC');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Đã có lỗi xảy ra khi gửi yêu cầu tạo KYC.');
        }
    };


    // const next = async () => {
    //     // Gọi hàm handleSubmit và nhận kết quả thành công hoặc thất bại
    //     const success = await handleSubmit();
    //
    //     // Kiểm tra kết quả từ handleSubmit và di chuyển đến bước tiếp theo nếu thành công
    //     if (success) {
    //         // Di chuyển đến bước tiếp theo
    //         setCurrent(prev => prev + 1);
    //     } else {
    //         // Nếu thất bại, bạn có thể không cần làm gì hoặc chỉ cần hiển thị thông báo lỗi
    //         console.log("Không thể tiếp tục do lỗi trong quá trình submit.");
    //     }
    // };

    const handleChange = (value, field) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };


    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const steps = [
        {
            title: '',
            content: () => (
                <TabPanel>
                    <div className="w-full flex flex-col gap-12">
                        {/* Phần Upload Hình Ảnh */}
                        <div className="w-full">
                            <div
                                className="flex flex-col gap-4 items-center justify-center p-6 bg-white rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hình ảnh CCCD</h3>
                                <Upload
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    onChange={handleChangeImage}

                                    fileList={fileList}
                                    beforeUpload={() => false}
                                >
                                    {fileList.length < 1 ? (
                                        <div className="flex flex-col items-center justify-center">
                                            <PlusOutlined className="text-gray-500 text-3xl"/>
                                            <div className="mt-2 text-gray-500">Chọn ảnh</div>
                                        </div>
                                    ) : null}
                                </Upload>
                                {previewImage && (
                                    <Image
                                        preview={{
                                            visible: previewOpen,
                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                        }}
                                        src={previewImage}
                                    />
                                )}
                                {fileList.length === 0 && (
                                    <p className="text-sm text-red-500">Vui lòng tải lên ảnh CCCD.</p>
                                )}
                            </div>
                        </div>

                        {/* Phần Form Thông Tin */}
                        <div className="w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                {[
                                    {label: 'Họ và Tên', placeholder: 'Nhập họ và tên', field: 'fullName'},
                                    {label: 'Số CCCD', placeholder: 'Nhập số CCCD', field: 'cccd'},
                                    {label: 'Ngày sinh', placeholder: 'Chọn ngày sinh', type: 'date', field: 'dob'},
                                    {
                                        label: 'Giới tính',
                                        type: 'select',
                                        options: [
                                            {value: 'Nam', label: 'Nam'},
                                            {value: 'Nữ', label: 'Nữ'},
                                            {value: 'other', label: 'Khác'},
                                        ],
                                        field: 'gender',
                                    },
                                    {label: 'Quốc tịch', placeholder: 'Nhập quốc tịch', field: 'nationality'},
                                    {label: 'Địa chỉ thường trú', placeholder: 'Nhập địa chỉ', field: 'address'},
                                    {label: 'Quê quán', placeholder: 'Quê quán', field: 'home'},
                                ].map(({label, placeholder, type, options, field}, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200"
                                    >
                                        <label className="text-lg font-semibold text-gray-800">{label}</label>
                                        {type === 'select' ? (
                                            <Select
                                                placeholder={placeholder}
                                                value={formData[field]}
                                                onChange={(value) => handleChange(value, field)}
                                                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                            >
                                                {options.map((opt, idx) => (
                                                    <Select.Option key={idx} value={opt.value}>
                                                        {opt.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        ) : (
                                            <input
                                                type={type || 'text'}
                                                placeholder={placeholder}
                                                value={formData[field]}
                                                onChange={(e) => handleChange(e.target.value, field)}
                                                className="rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-4 p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Tạo KYC
                            </button>

                        </div>



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
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Xác thực</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider style={{background: colorBgContainer}} width={300}>
                            <SiderUserBK/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            <main className="flex flex-1 flex-col gap-6 md:self-stretch">
                                <header className="text-center">
                                    <Heading size="headinglg"
                                             className="text-4xl font-semibold uppercase text-blue_gray-900_01">
                                        xác minh danh tính
                                    </Heading>

                                    <Tabs selectedIndex={0} onSelect={(index) => setCurrent(index)}>

                                        <div style={{width: '90%', margin: '0 auto'}}>
                                            <Steps current={0}>
                                                {steps.map((item) => (
                                                    <Steps.Step key={item.title} title={item.title}/>
                                                ))}
                                            </Steps>
                                            <div className="step-content">
                                                {steps[0].content()}
                                            </div>
                                            <div style={{marginTop: 24}}>
                                                {0 < steps.length - 1 && (
                                                    <Button type="primary" onClick={next}>
                                                        Next
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
