import { ButtonDH, Radio, RadioGroup, Heading, InputDH } from "../../../components";
import TimeDisplayRow from "../../../components/TimeDisplayRow";
import React, { useState } from 'react';
//import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Option } from "@material-tailwind/react";
import { useGetAuctionTypeQuery } from "@/services/auctionType.service.js";
import { useAuctionCreateMutation } from "@/services/auction.service.js";
import { DatePicker, Space, Input, InputNumber, Flex, TimePicker, Select, Spin, message } from 'antd';
import { useNavigate } from "react-router-dom";
import { useGetItemPendingAuctionQuery } from "@/services/item.service.js";

const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
};
const { RangePicker } = DatePicker;
export default function AuctionCreationSection1({ itemId }) {
    const navigate = useNavigate();
    const {
        data: auctionTypes,
        error: errorAuctionType,
        isLoading: isloadingAuctionType,
    } = useGetAuctionTypeQuery();
    //const { refetch: isItemPendingAuctionRefetch } = useGetItemPendingAuctionQuery();
    const [createAuction, { isLoading: createAuctionLoading, isSuccess, isError, error }] = useAuctionCreateMutation();
    const [formData, setFormData] = useState({
        start_time: "",
        end_time: "",
        start_price: null,
        description: "",
        terms_conditions: "Điều khoản hợp lệ",
        buy_now_price: null,
        price_step: null,
        number_participant: 2,
        percent_deposit: 10,
        ship_type: "",
        comment: "Đã chấp thuận đấu giá",
        item: +itemId,
        end_date: "",
        start_date: "",
        auction_type_id: null,
    });

    const handleChange = (value) => {
        //console.log(`Selected auction type: ${value}`);
        setFormData((prev) => ({ ...prev, auction_type_id: value }));
    };
    const handleShipTypeChange = (value) => {
        //console.log("Selected Ship Type:", value);
        setFormData((prev) => ({
            ...prev,
            ship_type: value, // Update ship_type in formData
        }));
    };
    const onChange = (e, fieldName) => {
        const value = e.target ? e.target.value : e;
        //console.log(`Cập nhật ${fieldName}: ${value}`);
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };
    const handleRangePickerChange = (dates) => {
        if (dates) {
            setFormData((prev) => ({
                ...prev,
                start_date: dates[0].format("YYYY-MM-DD"),
                start_time: dates[0].format("HH:mm:ss"),
                end_date: dates[1].format("YYYY-MM-DD"),
                end_time: dates[1].format("HH:mm:ss"),
            }));
        }
    };
    const handleSubmit = async () => {
        try {
            const auction = await createAuction(formData).unwrap();
            console.log("Auction created successfully");
            const viewMessage = auction.message;
            navigate('/dashboard/auction-create-list');
            //isItemPendingAuctionRefetch();
            message.success(viewMessage)
        } catch (e) {
            if (e?.data?.message) {
                message.error(`Error: ${e.data.message}`);
            } else {
                message.error('An unexpected error occurred');
            }

        }
    };
    const handleCancel = () => {
        navigate("/dashboard/auction-create-list");
    };
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
                    <div className="ml-[26px] self-stretch rounded-[20px] bg-gray-100 md:ml-0 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="mb-[76px] flex flex-col items-end md:ml-0">
                            <div className="flex flex-col gap-10 self-stretch md:ml-0">
                                {/* Time and Price Input Fields */}
                                <div className="flex items-center justify-between self-stretch md:flex-col gap-6 md:gap-8">
                                    <div className="flex flex-1 flex-col mt-12 gap-10 md:w-full">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 px-[20px] md:px-0">
                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Ngày bắt đầu:</label>
                                                <RangePicker
                                                    showTime
                                                    className="border rounded-md px-3 py-2 mt-2 w-full"
                                                    size="large"
                                                    onChange={handleRangePickerChange}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Giá khởi điểm:</label>
                                                <InputNumber
                                                    defaultValue={1000}
                                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={(value) => onChange(value, 'start_price')}
                                                    className="border rounded-md mt-2 w-full"
                                                    size="large"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Giá mong muốn:</label>
                                                <InputNumber
                                                    defaultValue={1000}
                                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={(value) => onChange(value, 'buy_now_price')}
                                                    className="border rounded-md mt-2 w-full"
                                                    size="large"
                                                />
                                            </div>

                                            {/* Thời gian kết thúc */}
                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Giá bước nhảy:</label>
                                                <InputNumber
                                                    defaultValue={1000}
                                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={(value) => onChange(value, 'price_step')}
                                                    className="border rounded-md mt-2 w-full"
                                                    size="large"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Loại đấu giá:</label>
                                                <Select
                                                    defaultValue="Chọn loại đấu giá"
                                                    style={{ width: '100%' }}
                                                    onChange={handleChange}
                                                    options={
                                                        isloadingAuctionType
                                                            ? [{ value: '', label: <Spin /> }]
                                                            : errorAuctionType
                                                                ? [{
                                                                    value: '',
                                                                    label: 'Error loading types',
                                                                    disabled: true
                                                                }]
                                                                : auctionTypes?.map((type) => ({
                                                                    value: type?.act_id,
                                                                    label: type?.auction_typeName,
                                                                }))
                                                    }
                                                    size="large"
                                                    className="border rounded-md mt-2"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Số lượng người tham gia :</label>
                                                <Select
                                                    defaultValue={2}
                                                    style={{ width: '100%' }}
                                                    onChange={handleChange}
                                                    options={Array.from({ length: 99 }, (_, index) => ({
                                                        value: index + 2,  // Tạo các giá trị từ 2 đến 100
                                                        label: (index + 2).toString(),
                                                    }))}
                                                    size="large"
                                                    className="border rounded-md mt-2"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-[15px] font-medium text-black">Phần trăm giá cọc:</label>
                                                <Select
                                                    defaultValue={10} // Đặt giá trị mặc định là 10%
                                                    style={{ width: '100%' }}
                                                    onChange={handleChange}
                                                    options={Array.from({ length: 99 }, (_, index) => ({
                                                        value: index + 2,  // Tạo các giá trị từ 2 đến 100
                                                        label: `${index + 2}%`, // Hiển thị giá trị phần trăm
                                                    }))}
                                                    size="large"
                                                    className="border rounded-md mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="flex flex-col items-center w-full">
                                        <label className="text-[15px] font-medium text-black mb-1">Mô tả phiên đấu giá:</label>
                                        <TextArea
                                            showCount
                                            value={formData.description}  // Bind the TextArea to formData.description
                                            onChange={(e) => onChange(e, 'description')}  // Correctly pass the event to onChange
                                            placeholder="Nhập thông tin mô tả"
                                            style={{ height: 200, resize: 'none' }}
                                            className="rounded-md !border !border-black-900 px-3 w-full min-h-[100px] py-2"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <div className="flex gap-4">
                                        {createAuctionLoading ? (
                                            <div className="w-full flex justify-center items-center">
                                                <Spin size="large" />
                                            </div>
                                        ) : (
                                            <>
                                                <Button
                                                    onClick={handleSubmit}
                                                    className="rounded-md bg-blue-600 px-4 py-2 text-white font-bold hover:bg-blue-500">
                                                    Tạo đấu giá
                                                </Button>
                                                <Button
                                                    onClick={handleCancel}
                                                    className="rounded-md bg-red-600 px-4 py-2 text-white font-bold hover:bg-red-500">
                                                    Hủy tạo
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}





