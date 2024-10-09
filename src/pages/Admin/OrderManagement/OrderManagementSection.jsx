import { Img, SelectBox, Heading, Text, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable } from "../../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from 'react';
import {Button, Card, Typography} from "@material-tailwind/react";
import {Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";

const dropDownOptions = [
    { value: 'waiting', label: 'Đang chờ', color: '#FFC107' },
    { value: 'shipping', label: 'Đang vận chuyển', color: '#2196F3' },
    { value: 'canceled', label: 'Đã Hủy', color: '#F44336' },
    { value: 'success', label: 'Thành Công', color: '#4CAF50' },
];


const tableData = [
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
    {
        idHeader: "#6548",
        createdHeader: "2 phút trước",
        customerHeader: "Joseph Wheeler",
        totalHeader: "250.000đ",
        profitHeader: "50.000đ",
    },
];


const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
    "Tổng doanh thu",
    "Lợi nhuận",
    "Tùy chỉnh"
];

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        product: "Smartphone",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "31 Jan 2024",
        status: "Available",
        sellerHeader: "han so hee",
        totalHeader: "$500",
        profitHeader: "$100",
    },
    {
        number: "#MS-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "24 Jan 2024",
        status: "pending",
        sellerHeader: "han so hee",
        totalHeader: "$1000",
        profitHeader: "$150",
    },
    {
        number: "#MS-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "12 Jan 2024",
        status: "UnAvailable",
        sellerHeader: "han so hee",
        totalHeader: "$300",
        profitHeader: "$50",
    },
    {
        number: "#MS-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "10 Jan 2024",
        status: "Fail",
        sellerHeader: "han so hee",
        totalHeader: "$200",
        profitHeader: "$20",
    },
];

export default function OrderManagementSection() {
    const [searchBarValue, setSearchBarValue] = React.useState("");

    const [selectedOptions, setSelectedOptions] = useState(Array(tableData.length).fill(dropDownOptions[0])); 


    const handleChange = (index) => (event) => {
        const selectedValue = event.target.value;
        const selected = dropDownOptions.find(option => option.value === selectedValue);

        setSelectedOptions(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[index] = selected;
            return newOptions;
        });
    };


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
                cell: (info) => (
                    <div className="ml-[126px] flex">
                        <Text size="textxs" as="p" className="self-end text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-[126px] flex py-3.5">
                        <Heading size="headingmd" as="h3" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Đã tạo
                        </Heading>
                    </div>
                ),
                meta: { width: "198px" },
            }),
            tableColumnHelper.accessor("customerHeader", {
                cell: (info) => (
                    <div className="flex">
                        <Text size="textxs" as="p" className="self-end text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex py-4">
                        <Heading size="headingmd" as="h4" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Khách hàng
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
                            Tổng cộng
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
                        <Heading
                            as="p"
                            className="flex items-center justify-center rounded bg-green-100 p-0.5 font-publicsans text-[13px] font-semibold text-green-a700"
                        >
                            16%
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-[72px] flex py-3.5">
                        <Heading size="headingmd" as="h6" className="self-end text-[16px] font-semibold text-blue_gray-900">
                            Lợi nhuận
                        </Heading>
                    </div>
                ),
                meta: { width: "198px" },
            }),
            tableColumnHelper.accessor("statusHeader", {
                cell: (info) => {
                    const index = info.row.index; // Lấy chỉ số hàng
                    const selectedOption = selectedOptions[index];

                    return (
                        <div className="flex flex-1 items-center justify-between gap-5">
                            <select
                                onChange={handleChange(index)} // Sử dụng chỉ số hàng để thay đổi giá trị
                                value={selectedOption.value} // Đặt giá trị cho select
                                className={`flex w-[60%] rounded py-1 pl-3 pr-1 text-[13px] font-semibold`}
                                style={{
                                    borderColor: selectedOption.color,
                                    backgroundColor: selectedOption.color + '28',
                                }}
                            >
                                {dropDownOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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
    }, [selectedOptions]);

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
                    {/*<ReactTable*/}
                    {/*    size="xs"*/}
                    {/*    bodyProps={{ className: "before:content-['-'] before:opacity-0 before:leading-[56px]" }}*/}
                    {/*    headerCellProps={{ className: "bg-gray-100" }}*/}
                    {/*    headerProps={{ className: "border-gray-100 border-b border-solid" }}*/}
                    {/*    cellProps={{ className: "border-indigo-50 border-b border-solid" }}*/}
                    {/*    className="md:block md:overflow-x-auto md:whitespace-nowrap"*/}
                    {/*    columns={tableColumns}*/}
                    {/*    data={tableData}*/}
                    {/*/>*/}
                    <Card className="h-full w-full overflow-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-4 pt-10">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold leading-none"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {TABLE_ROWS.map(({
                                                 number,
                                                 product,
                                                 image,
                                                 time,
                                                 status,
                                                 sellerHeader,
                                                 totalHeader,
                                                 profitHeader
                                             }) => (
                                <tr key={number}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {number}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {product}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <img
                                            src={image}
                                            alt={product}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {time}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        {status === "Available" && (
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                Available
                                            </Tag>
                                        )}
                                        {status === "pending" && (
                                            <Tag icon={<SyncOutlined spin />} color="processing">
                                                Pending
                                            </Tag>
                                        )}
                                        {status === "UnAvailable" && (
                                            <Tag icon={<CloseCircleOutlined />} color="error">
                                                UnAvailable
                                            </Tag>
                                        )}
                                        {status === "Fail" && (
                                            <Tag icon={<ExclamationCircleOutlined />} color="warning">
                                                Fail
                                            </Tag>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {sellerHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {totalHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            className="font-normal text-gray-600"
                                        >
                                            {profitHeader}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Button color="blue">Chi tiết</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination />
                    </div>

                </div>
            </div>
        </div>
    );

}








