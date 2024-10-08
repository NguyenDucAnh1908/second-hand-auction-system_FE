import { Img, SelectBox, Heading, Text, InputDH } from "../../components/index.jsx";
import { CloseSVG } from "../../components/InputDH/close.jsx";
import { ReactTable } from "../../components/ReactTable/index.jsx";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from 'react';





const dropDownOptions = [
    { value: 'waiting', label: 'Đang chờ', color: '#FFC107' },
    { value: 'shipping', label: 'Đang vận chuyển', color: '#2196F3' },
    { value: 'canceled', label: 'Đã Hủy', color: '#F44336' },
    { value: 'success', label: 'Thành Công', color: '#4CAF50' },
];

const tableData = [
    {
        idHeader: "#6548",
        createdHeader: "Đồng Hồ",
        productImage: "images/img_giuong.png",
        customerHeader: "23/11/2023",
        totalHeader: "hehhe",
        profitHeader: "50.000đ",
        statusHeader: { label: 'Đang chờ', color: '#FFC107' }, // Trạng thái
    },
    {
        idHeader: "#6549",
        createdHeader: "Máy Tính",
        productImage: "images/img_giuong.png",
        customerHeader: "24/11/2023",
        totalHeader: "hehhe",
        profitHeader: "100.000đ",
        statusHeader: { label: 'Đang vận chuyển', color: '#2196F3' },
    },
    {
        idHeader: "#6550",
        createdHeader: "Điện Thoại",
        productImage: "images/img_giuong.png",
        customerHeader: "25/11/2023",
        totalHeader: "cc",
        profitHeader: "70.000đ",
        statusHeader: { label: 'Đã Hủy', color: '#F44336' },
    },
    {
        idHeader: "#6551",
        createdHeader: "Máy Ảnh",
        productImage: "images/img_giuong.png",
        customerHeader: "26/11/2023",
        totalHeader: "hehhe",
        profitHeader: "150.000đ",
        statusHeader: { label: 'Thành Công', color: '#4CAF50' },
    },
];


export default function OrderManagementSectionBuyer() {
    const [searchBarValue, setSearchBarValue] = React.useState("");

  


    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("idHeader", {
                cell: (info) => (
                    <div className="flex px-[18px]">
                        <Heading size="headings" as="p" className="text-[15px] font-semibold text-blue_gray-900">
                            {info.getValue()}
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <div className="flex py-4 pl-[18px] pr-4">
                        <Heading size="headingmd" as="h2" className="text-[16px] font-semibold text-blue_gray-900">
                            Mã ID
                        </Heading>
                    </div>
                ),
                meta: { width: "88px" },
            }),
            tableColumnHelper.accessor("createdHeader", {
                cell: (info) => {
                    const row = info.row.original;
                    return (
                        <div className="ml-[126px] flex items-center">
                            <Img
                                src={row.productImage}
                                alt={info.getValue()}
                                className="w-10 h-10 object-cover mr-3"
                            />
                            <Text size="textxs" as="p" className="self-end text-[15px] font-normal text-blue_gray-900">
                                {info.getValue()}
                            </Text>
                        </div>
                    );
                },
                header: (info) => (
                    <div className="ml-[126px] flex py-3.5">
                        <Heading size="headingmd" as="h3" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Sản phẩm
                        </Heading>
                    </div>
                ),
                meta: { width: "250px" },
            }),
            
            tableColumnHelper.accessor("customerHeader", {
                cell: (info) => (
                    <div className="flex ml-[100px]"> {/* Added ml-[100px] to create a gap */}
                        <Text size="textxs" as="p" className="self-end text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex py-4 ml-[100px]"> {/* Added ml-[100px] to create a gap */}
                        <Heading size="headingmd" as="h4" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Ngày
                        </Heading>
                    </div>
                ),
                meta: { width: "156px" },
            }),
            
            tableColumnHelper.accessor("totalHeader", {
                cell: (info) => (
                    <div className="flex px-[18px]">
                        <Text as="p" className="text-[16px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex p-4">
                        <Heading size="headingmd" as="h5" className="text-[16px] font-semibold text-blue_gray-900">
                            Ghi chú
                        </Heading>
                    </div>
                ),
                meta: { width: "166px" },
            }),
            tableColumnHelper.accessor("profitHeader", {
                cell: (info) => (
                    <div className="ml-[72px] flex flex-wrap items-center">
                        <Text as="p" className="text-[16px] font-normal text-blue_gray-900">
                            <span>50.000</span>
                            <span>đ</span>
                        </Text>
                       
                    </div>
                ),
                header: (info) => (
                    <div className="ml-[72px] flex py-3.5">
                        <Heading size="headingmd" as="h6" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Tổng
                        </Heading>
                    </div>
                ),
                meta: { width: "198px" },
            }),
            tableColumnHelper.accessor("statusHeader", {
                cell: (info) => {
                    const status = info.getValue(); 
                    
                    return (
                        <div
                            className="flex w-[60%] items-center justify-between py-1 px-3 text-[13px] font-semibold rounded"
                            style={{
                                borderColor: status.color,
                                backgroundColor: status.color + '28',
                            }}
                        >
                            {status.label}
                        </div>
                    );
                },
                header: (info) => (
                    <div className="flex flex-1 py-3.5 pr-[18px]">
                        <Heading size="headingmd" as="h6" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Trạng thái
                        </Heading>
                    </div>
                ),
                meta: { width: "242px" },
            }),            
        ];
    }, );

    return (
        <div>
            <div className="flex w-full flex-col items-center">
                <div className="mx-auto flex w-full max-w-[1294px] flex-col gap-10 self-stretch">
                    <div className="flex justify-between gap-5 sm:flex-col">
                        <InputDH
                            name="Search InputDH"
                            placeholder={`Tìm kiếm theo ID`}
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            suffix={
                                searchBarValue?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue("")} height={16} width={18} fillColor="#626974ff" />
                                ) : (
                                    <Img src="/images/img_search.svg" alt="Search" className="h-[16px] w-[18px]" />
                                )
                            }
                            className="flex h-[40px] w-[20%] items-center justify-center gap-1.5 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full"
                        />
                        <SelectBox
                            name="Category Filter"
                            placeholder={`Lọc bởi danh mục`}
                            options={dropDownOptions}
                            className="flex w-[25%] gap-1.5 rounded-md bg-bg-white px-4 py-2.5 text-[14px] text-blue_gray-600 shadow-xs sm:w-full"
                        />
                    </div>
                    <ReactTable
                        size="xs"
                        bodyProps={{ className: "before:content-['-'] before:opacity-0 before:leading-[56px]" }}
                        headerCellProps={{ className: "bg-gray-100" }}
                        headerProps={{ className: "border-gray-100 border-b border-solid" }}
                        cellProps={{ className: "border-indigo-50 border-b border-solid" }}
                        className="md:block md:overflow-x-auto md:whitespace-nowrap"
                        columns={tableColumns}
                        data={tableData}
                    />
                </div>
            </div>
        </div>
    );

}








