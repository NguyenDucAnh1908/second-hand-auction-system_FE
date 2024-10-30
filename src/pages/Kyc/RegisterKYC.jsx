import { Heading, InputDH} from "../../components/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import Header2 from "../../components/Header2/index.jsx";
import React, {useState} from "react";
import {TabPanel, TabList, Tab, Tabs} from "react-tabs";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {PlusOutlined} from '@ant-design/icons';
import { useCreateKycMutation } from "../../services/kyc.service.js";
import {Breadcrumb, Button, Layout, Steps, theme , Image, Upload} from 'antd';

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
    const [currentStep, setCurrentStep] = useState(0);
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        date: '',
        phoneNumber: '',
        age: '',
    });
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChangeImage = ({fileList: newFileList}) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );



    const steps = [
        {
            title: 'First',
            content:() => (
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
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Email
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                        </div>

                        {/* Date of Birth Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Ngày sinh
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="01/01/2002"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                        </div>

                        {/* Phone Number Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Số điện thoại
                            </Heading>
                            <InputDH
                                shape="round"
                                placeholder="09xx xxx xxx"
                                value={formData.phoneNumber}
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
                        </div>

                        {/* Gender Field */}
                        <div className="flex flex-col gap-1.5">
                            <Heading as="h4" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                Giới tính
                            </Heading>
                            <div className="flex items-center gap-8">
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="male" className="mr-2"/>
                                    Nam
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="female" className="mr-2"/>
                                    Nữ
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="gender" value="other" className="mr-2"/>
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
                                value={formData.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                            />
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
                                onChange={(e) => handleChange('idNumber', e.target.value)}
                            />
                        </div>

                        {/* Upload CCCD/Hộ chiếu Image */}
                        <div
                            className="flex flex-col gap-4 items-center justify-center p-4 bg-gray-50 rounded-lg shadow-lg">
                            <Heading as="h3" className="text-lg font-semibold text-blue-gray-900 mb-4">
                                Tải lên ảnh CCCD/Hộ chiếu
                            </Heading>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChangeImage}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{
                                        display: 'none',
                                    }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
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
                        <p className="mt-2 text-lg text-gray-700 text-center">Cảm ơn bạn đã xác minh thông tin của mình.</p>
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
                                                {steps[current].content(formData, handleChange, fileList, setFileList, previewImage, setPreviewImage, handlePreview)}
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
