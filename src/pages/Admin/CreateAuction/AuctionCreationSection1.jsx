import { ButtonDH, Radio, RadioGroup, Heading, InputDH } from "../../../components";
import TimeDisplayRow from "../../../components/TimeDisplayRow";
import React, { useState } from 'react';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {DatePicker, Space, Input, InputNumber,  Flex} from 'antd';
import { Button } from "@material-tailwind/react";
const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const { RangePicker } = DatePicker;
const baseStyle = {
    width: '25%',
    height: 54,
};
export default function AuctionCreationSection1() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            {/* auction creation section */}
            <div className=" w-[100%] ">
                <div className="flex flex-col items-center gap-4">
                    <Heading
                        size="textxl"
                        as="h2"
                        className="rounded-[12px] px-[34px] mt-12 pb-1.5 pt-0.5 text-[25px] font-medium text-black md:text-[23px] sm:px-5 sm:text-[21px]"
                    >
                        Thông tin đấu giá
                    </Heading>
                    <div className="ml-[26px] self-stretch rounded-[20px] bg-gray-300 md:ml-0">
                        <div className="mb-[76px] flex flex-col items-end md:ml-0">
                            <div className="flex flex-col gap-10 self-stretch md:ml-0">
                                {/* Time and Price Input Fields */}
                                <div className="flex items-center justify-between self-stretch md:flex-col">
                                    <div className="flex flex-1 flex-col mt-12 gap-10 md:w-full">

                                        <div className="gap-x-10 gap-y-6 px-[200px]">
                                            <Flex gap="middle" horizontal>
                                                <Flex gap="middle" vertical>
                                                    <label className="text-[15px] font-medium text-black-900">Ngày Giờ bắt đầu và ngày kết thúc:</label>

                                                    <Space direction="vertical" size={12}>
                                                        <RangePicker showTime/>
                                                    </Space>
                                                </Flex>
                                                <Space>
                                                    <Flex gap="middle" vertical>
                                                        <label className="text-[15px] font-medium text-black-900">Giá
                                                            mong muốn:</label>
                                                        <InputNumber
                                                            defaultValue={1000}
                                                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                            onChange={onChange}
                                                            style={{
                                                                width: 300,
                                                            }}
                                                        />
                                                    </Flex>
                                                </Space>
                                            </Flex>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col items-center w-full">
                                        <label className="text-[15px] font-medium text-black-900 mb-1">Mô tả:</label>
                                        <TextArea
                                            showCount
                                            maxLength={100}
                                            onChange={onChange}
                                            placeholder="disable resize"
                                            style={{ height: 200, resize: 'none' }}
                                            className="rounded-md !border !border-black-900 px-3 w-[65%] min-h-[100px] py-2"
                                        />
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
                                    <Button
                                        className="rounded-md bg-blue-600 px-4 py-2 text-white font-bold hover:bg-blue-500">Tạo
                                        đấu giá
                                    </Button>
                                    <Button
                                        className="rounded-md bg-red-600 px-4 py-2 text-white font-bold hover:bg-red-500">Hủy
                                        tạo
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}





