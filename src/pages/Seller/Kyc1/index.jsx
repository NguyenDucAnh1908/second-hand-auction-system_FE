import { Helmet } from "react-helmet";
import { ButtonDH, InputDH, Heading, Radio, RadioGroup, Img } from "../../../components";
import React, { useState } from 'react';
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function KYCOnePage() {
    
    const [date, setDate] = useState(new Date());
 
    return (
        <>
            <Helmet>
                <title>Verify Your Identity - Complete KYC Process</title>
                <meta
                    name="description"
                    content="Complete your account verification with our KYC process. Provide your full name, email, date of birth, gender, and phone number to ensure secure and verified transactions."
                />
            </Helmet>
            <Tabs
                className="flex w-full flex-col items-center justify-center bg-bg-white px-14 py-[354px] md:p-5"
                selectedTabClassName="!text-green-700"
                selectedTabPanelClassName="mt-[70px] ml-2.5 md:ml-0 !relative tab-panel--selected"
            >
                <Heading
                    size="headings"
                    as="h1"
                    className="text-[48px] font-semibold uppercase text-blue_gray-900 md:text-[44px] sm:text-[38px]"
                >
                    Xác minh tài khoản bán
                </Heading>
                <TabList className="mt-8 flex flex-wrap items-start gap-[50px]">
                    <Tab className="mb-[26px] bg-gradient bg-clip-text font-montserrat text-[25px] font-semibold tracking-[-0.30px] text-transparent md:text-[23px] sm:text-[21px]">
                        Danh tính
                    </Tab>
                    <Tab className="bg-gradient bg-clip-text font-montserrat text-[25px] font-semibold tracking-[-0.30px] text-transparent md:text-[23px] sm:text-[21px]">
                        CCCD/Hộ chiếu
                    </Tab>
                </TabList>
                {[...Array(2)].map((_, index) => (
                    <TabPanel
                        key={`tab-panel${index}`}
                        className="absolute ml-2.5 mt-[70px] flex w-[72%] justify-center md:ml-0 md:w-full"
                    >
                        <div className="flex w-full justify-center">
                            <div className="mb-[162px] flex w-full gap-[18px] md:flex-col">
                                <div className="flex w-[42%] flex-col gap-14 md:w-full sm:gap-7">
                                    <div className="flex flex-col items-start justify-center gap-1.5">
                                        <Heading as="h2" className="text-[16px] font-medium text-blue_gray-900">
                                            Họ tên đầy đủ
                                        </Heading>
                                        <InputDH
                                            shape="round"
                                            name="Name InputDH"
                                            placeholder={`Nguyễn Văn A`}
                                            className="self-stretch rounded-md border px-4"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <Heading as="h3" className="text-[16px] font-medium text-blue_gray-900">
                                            Email
                                        </Heading>
                                        <InputDH
                                            shape="round"
                                            type="email"
                                            name="Email InputDH"
                                            placeholder={`Nhập email`}
                                            className="self-stretch rounded-md border px-4"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-1.5">
                                        <Heading as="h4" className="mt-1 text-[16px] font-medium text-blue_gray-900">
                                            Ngày sinh
                                        </Heading>
                                        <DatePicker
                                            selected={date}
                                            onChange={(date) => setDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="border rounded-md px-3 py-2"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-14 px-[18px] md:self-stretch sm:gap-7">
                                    <div className="flex flex-col items-start gap-6">
                                        <Heading as="h5" className="text-[16px] font-medium text-blue_gray-900">
                                            Giới tính
                                        </Heading>
                                        <RadioGroup name="gendergroup" className="mx-3 mb-2 flex self-stretch md:mx-0">
                                            <Radio value="nam" label="Nam" className="gap-3 pb-1 text-[15px] text-blue_gray-600" />
                                            <Radio value="n" label="Nữ" className="ml-[42px] gap-3 text-[15px] text-blue_gray-600" />
                                            <Radio value="khc" label="Khác" className="ml-10 gap-3 text-[15px] text-blue_gray-600" />
                                        </RadioGroup>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <Heading as="h6" className="text-[16px] font-medium text-blue_gray-900">
                                            Độ tuổi
                                        </Heading>
                                        <InputDH
                                            shape="round"
                                            name="Age InputDH"
                                            placeholder={`26  tuổi`}
                                            className="w-[80%] rounded-md border px-4"
                                        />
                                    </div>
                                    <div className="mx-1 flex flex-col items-start justify-center gap-1.5 md:mx-0">
                                        <Heading as="p" className="text-[16px] font-medium text-blue_gray-900">
                                            Số điện thoại
                                        </Heading>
                                        <InputDH
                                            shape="round"
                                            name="Phone InputDH"
                                            placeholder={`Nhập số điện thoại`}
                                            className="w-[82%] rounded-md border px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                ))}
                <ButtonDH shape="round" className="mb-1 mt-[66px] min-w-[190px] rounded-md border px-[33px]">
                    Tiếp tục
                </ButtonDH>
            </Tabs>
        </>
    );
}



