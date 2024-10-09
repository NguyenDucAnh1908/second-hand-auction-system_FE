import { Text, Heading, InputDH } from "../../components/index.jsx";
import { ReactTable1 } from "../../components/ReactTable1/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import Header2 from "../../components/Header2/index.jsx";
import React, { useState } from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import { ButtonDH } from "../../components/index.jsx";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useNavigate } from "react-router-dom";

export default function KNCPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image
    const navigate = useNavigate(null);
    const [back, setBack] = useState(null);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleNextStep = () => {
        if (currentStep < 2) {
            // Nếu đang ở bước 1, chuyển sang bước 2
            setCurrentStep(prevStep => prevStep + 1);
        } else {
            // Nếu đã ở bước 2, có thể thực hiện các hành động khác
            // Ví dụ: Gửi dữ liệu hoặc điều hướng tới trang khác
            console.log("Đã hoàn tất quy trình!");
            // Bạn có thể điều hướng tới trang khác hoặc làm gì đó ở đây
        }
    };

    const handleGoBack = () => {
        navigate('/HomePage');

    };
    return (
        <>
            <Header2>
                <title>Account Dashboard - Manage Your EZShop Profile</title>
                <meta
                    name="description"
                    content="Access your EZShop account dashboard to manage your profile, view your balance of 20,000,000 VND, update personal details, and track your favorite products. Get assistance with your account, orders, and more."
                />
            </Header2>
            <div className="flex w-full flex-col items-center bg-white-a700">
                <div className="mx-auto flex w-full max-w-[1284px] items-start gap-8 self-stretch md:flex-col md:px-5">
                    {/* Sidebar */}
                    <SiderUserBK />
                    {/* Main Content */}
                    <main className="flex flex-1 flex-col gap-6 md:self-stretch">
                        <header className="text-center">
                            <Heading size="headinglg" className="text-4xl font-semibold uppercase text-blue_gray-900_01">
                                xác minh danh tính
                            </Heading>

                            <Tabs selectedIndex={currentStep} onSelect={(index) => setCurrentStep(index)}>
                                <TabList className="flex justify-center mt-4 gap-8">
                                    <Tab className="bg-transparent cursor-pointer text-[25px] font-semibold tracking-[-0.3px] text-blue_gray-900_01 hover:text-green-700 transition-colors">
                                        Danh tính
                                    </Tab>
                                    <Tab className="bg-transparent cursor-pointer text-[25px] font-semibold tracking-[-0.3px] text-blue_gray-900_01 hover:text-green-700 transition-colors">
                                        CCCD/Hộ chiếu
                                    </Tab>
                                </TabList>

                                {/* Progress Bar */}
                                <div className="mt-4 flex justify-center">
                                    <div className="relative w-full max-w-[600px] h-2 bg-gray-200 rounded-md">
                                        <div className="absolute top-0 left-0 h-2 bg-green-500 rounded-md" style={{ width: `${(currentStep + 1) * 50}%` }} />
                                    </div>
                                </div>

                                {/* Tab Panels */}
                                <TabPanel>
                                    <div className="grid grid-cols-1 gap-6 w-full">
                                        {/* Full Name Field */}
                                        <div className="flex flex-col gap-1.5">
                                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                                Họ tên đầy đủ
                                            </Heading>
                                            <InputDH
                                                shape="round"
                                                placeholder="Nguyễn Văn A"
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
                                                    <input type="radio" name="gender" value="male" className="mr-2" />
                                                    Nam
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="gender" value="female" className="mr-2" />
                                                    Nữ
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="gender" value="other" className="mr-2" />
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
                                                placeholder="Tuổi"
                                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                                            />
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div className="grid grid-cols-1 gap-6 w-full">
                                        {/* CCCD Field */}
                                        <div className="flex flex-col gap-1.5">
                                            <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900_01 text-left">
                                                Số CCCD/Hộ chiếu
                                            </Heading>
                                            <InputDH
                                                shape="round"
                                                // type="password"
                                                placeholder="012345678"
                                                className="self-stretch rounded-md border border-gray-200 px-4 py-2"
                                            />
                                        </div>

                                        {/* Upload CCCD/Hộ chiếu Image */}
                                        <div className="flex flex-col gap-4 items-center justify-center p-4 bg-gray-50 rounded-lg shadow-lg">
                                            <Heading as="h3" className="text-lg font-semibold text-blue-gray-900 mb-4">
                                                Tải lên ảnh CCCD/Hộ chiếu
                                            </Heading>

                                            <label
                                                htmlFor="cccd-upload"
                                                className="cursor-pointer rounded-lg border border-blue-500 bg-blue-50 px-6 py-3 text-blue-700 font-medium hover:bg-blue-100 transition-all duration-300 shadow-sm"
                                            >
                                                Chọn ảnh
                                            </label>

                                            <input
                                                id="cccd-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />

                                            {uploadedImage && (
                                                <div className="mt-4">
                                                    <img src={uploadedImage} alt="Uploaded" className="w-40 h-40 object-cover rounded-md shadow-lg" />
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </TabPanel>

                                {/* Success Step */}
                                <TabPanel>
                                    <div className="flex flex-col items-center justify-center h-full p-4">
                                        <Heading className="text-3xl font-bold text-green-600 mb-4">Xác minh thành công!</Heading>
                                        <Text className="mt-2 text-lg text-gray-700 text-center">
                                            Cảm ơn bạn đã xác minh thông tin của mình.
                                        </Text>

                                    </div>
                                </TabPanel>


                            </Tabs>

                            <div className="flex justify-center mt-4">
                                {currentStep < 2 && (
                                    <ButtonDH
                                        className={`w-[150px] h-[50px] text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 
                        ${currentStep === 2 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                        onClick={handleNextStep}
                                        disabled={currentStep === 2}
                                    >
                                        {currentStep === 1 ? "Hoàn tất" : "Tiếp tục"}
                                    </ButtonDH>
                                )}
                                {currentStep === 2 && (
                                    <ButtonDH
                                        className="w-[150px] h-[50px] text-lg font-semibold rounded-lg shadow-lg bg-green-500 hover:bg-green-600 text-white"
                                        onClick={handleGoBack} // Hàm này sẽ xử lý sự kiện quay lại
                                    >
                                        Quay lại
                                    </ButtonDH>
                                )}
                            </div>
                            <br />


                        </header>
                    </main>
                </div>

            </div>
            <FooterBK />

        </>
    );
}
