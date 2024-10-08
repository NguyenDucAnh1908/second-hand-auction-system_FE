import { ButtonDH, Radio, RadioGroup, Heading, TextArea, InputDH } from "../../../components";
import TimeDisplayRow from "../../../components/TimeDisplayRow";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AuctionCreationSection1() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            {/* auction creation section */}
            <div className=" w-[100%] ">
                <div className="flex flex-col items-center gap-10">
                    <Heading
                        size="textxl"
                        as="h2"
                        className="bg-green-700 rounded-[12px] bg-green-500 px-[34px] pb-1.5 pt-0.5 text-[25px] font-medium text-white md:text-[23px] sm:px-5 sm:text-[21px]"
                    >
                        Thông tin đấu giá
                    </Heading>
                    <div className="ml-[26px] self-stretch rounded-[20px] bg-gray-300 md:ml-0">
                        <div className="mb-[76px] flex flex-col items-end md:ml-0">
                            <div className="flex flex-col gap-10 self-stretch md:ml-0">
                                {/* Time and Price Input Fields */}
                                <div className="flex items-center justify-between self-stretch md:flex-col">
                                    <div className="flex flex-1 flex-col gap-10 md:w-full">
                                        <div className="flex justify-between px-[200px]">
                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black-900">Thời gian bắt đầu:</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="border rounded-md px-3 py-2"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black-900">Thời gian kết thúc:</label>
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="border rounded-md px-3 py-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between mx-[200px]">
                                                <div className="flex flex-col">
                                                    <label className="text-[15px] font-medium text-black-900">Giá khởi điểm:</label>
                                                    <InputDH
                                                        shape="round"
                                                        name="Starting Price"
                                                        placeholder={`VND`}
                                                        className="rounded-md border px-3"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[15px] font-medium text-black-900">Giá mong muốn:</label>
                                                    <InputDH
                                                        shape="round"
                                                        name="Desired Price"
                                                        placeholder={`VND`}
                                                        className="rounded-md border px-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div className="flex flex-col items-center w-full">
                                                    <label className="text-[15px] font-medium text-black-900 mb-1">Mô tả:</label>
                                                    <TextArea
                                                        shape="round"
                                                        name="Description TextArea"
                                                        className="rounded-md !border !border-black-900 px-3 w-[80%] min-h-[100px] py-2" // Điều chỉnh chiều rộng và chiều cao tối thiểu
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method Section */}
                                <div className="flex flex-col items-start md:self-stretch md:ml-0 ml-[200px]">
                                    <Heading
                                        size="headingxs"
                                        as="h4"
                                        className="ml-[26px] text-[25px] font-bold text-black-900 md:ml-0 md:text-[23px] sm:text-[21px]"
                                    >
                                        Phương thức thanh toán
                                    </Heading>
                                    <RadioGroup name="paymentgroup" className="mt-4 flex flex-col">
                                        <Radio
                                            value="thanhtontinmt"
                                            label="Thanh toán tiền mặt"
                                            className="gap-2 text-[15px] font-medium text-black-900"
                                        />
                                        <Radio
                                            value="thanhtononlinequahthng"
                                            label="Thanh toán online qua hệ thống"
                                            className="mt-2 gap-2 text-[15px] font-medium text-black-900"
                                        />
                                        <Radio
                                            value="bnngimuachuphship"
                                            label="Bên người mua chịu phí ship"
                                            className="mt-2 gap-2 text-[15px] font-medium text-black-900"
                                        />
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Buttons for auction actions */}
                            <div className="mt-8 flex justify-center mr-[450px]">
                                <div className="flex gap-4">
                                    <button className="rounded-md bg-blue-600 px-4 py-2 text-white font-bold hover:bg-blue-500">Tạo đấu giá</button>
                                    <button className="rounded-md bg-red-600 px-4 py-2 text-white font-bold hover:bg-red-500">Hủy tạo</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );


}





