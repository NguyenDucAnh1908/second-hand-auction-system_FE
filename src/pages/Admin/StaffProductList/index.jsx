import { Helmet } from "react-helmet";
import { Heading, ButtonDH, Text, Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable1 } from "../../../components/ReactTable1";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useNavigate } from "react-router-dom";
import {Button, Card, IconButton, Typography} from "@material-tailwind/react";
import {Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {DocumentIcon} from "@heroicons/react/24/solid/index.js";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline/index.js";
import Pagination from "@/components/Pagination/index.jsx";

const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
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
    },
    {
        number: "#MS-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "24 Jan 2024",
        status: "pending",
        sellerHeader: "han so hee",
    },
    {
        number: "#MS-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "12 Jan 2024",
        status: "UnAvailable",
        sellerHeader: "han so hee",
    },
    {
        number: "#MS-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "10 Jan 2024",
        status: "Fail",
        sellerHeader: "han so hee",
    },
];

export default function StaffProductListPage() {

    const [searchBarValue, setSearchBarValue] = React.useState("");
    const navigate = useNavigate();

    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("idHeader", {
                cell: (info) => (
                    <div className="flex items-center justify-end">
                        <Text as="p" className="text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex py-4 justify-center">
                        <Heading size="textmd" as="h1" className="text-[16px] font-medium text-blue_gray-900">
                            ID
                        </Heading>
                    </div>
                ),
                meta: { width: "70px" },
            }),
            tableColumnHelper.accessor("productHeader", {
                cell: (info) => (
                    <div className="ml-4 flex px-4">
                        <Text as="p" className="text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-4 flex p-4 justify-start">
                        <Heading size="textmd" as="h2" className="text-[16px] font-medium text-blue_gray-900">
                            Sản phẩm
                        </Heading>
                    </div>
                ),
                meta: { width: "174px" },
            }),
            tableColumnHelper.accessor("imageHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <Img src={info.getValue()} alt="Product Image" className="h-[80px] w-[80px] object-cover" />
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-3.5">
                        <Heading size="textmd" as="h3" className="text-[16px] font-medium text-blue_gray-900">
                            Hình ảnh
                        </Heading>
                    </div>
                ),
                meta: { width: "144px" },
            }),
            tableColumnHelper.accessor("timeHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <Text as="p" className="text-[15px] font-normal leading-[22px] text-blue_gray-900 text-center">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-3">
                        <Heading size="textmd" as="h4" className="text-[16px] font-medium text-blue_gray-900">
                            Thời gian
                        </Heading>
                    </div>
                ),
                meta: { width: "152px" },
            }),
            tableColumnHelper.accessor("statusHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <ButtonDH
                            className={`h-[34px] min-w-[110px] rounded-md px-6 text-[13px] font-medium text-bg-white ${
                                info.getValue() === "Đã duyệt"
                                    ? "bg-green-500"
                                    : info.getValue() === "Đã từ chối"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                            }`}
                        >
                            {info.getValue()}
                        </ButtonDH>
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-4">
                        <Heading size="textmd" as="h5" className="text-[16px] font-medium text-blue_gray-900">
                            Trạng thái
                        </Heading>
                    </div>
                ),
                meta: { width: "116px" },
            }),
            tableColumnHelper.accessor("sellerHeader", {
                cell: (info) => (
                    <div className="flex justify-between items-center">
                        <Text as="p" className="text-[13px] font-medium text-black-900">
                            {info.getValue()}
                        </Text>
                        {info.row.original.assessmentButtonDH === "Thẩm định" && (
                            <ButtonDH
                                className="h-[34px] min-w-[110px] rounded-md bg-blue-500 px-5 text-[13px] font-medium text-white"
                                onClick={() => navigate('/dashboard/AppraisalForm')} // Chuyển hướng đến AppraisalForm
                            >
                                {info.row.original.assessmentButtonDH}
                            </ButtonDH>
                        )}
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-start py-4">
                        <Heading size="textmd" as="h6" className="text-[16px] font-medium text-blue_gray-900">
                            Người bán
                        </Heading>
                    </div>
                ),
                meta: { width: "272px" },
            }),
            
            
        ];
    }, [navigate]);

    return (
        <>
           
            <div className="flex w-full flex-col items-start justify-center gap-10 bg-bg-white   pr-14 md:p-5">
                <InputDH
                    name="Search Box"
                    placeholder={`Tìm kiếm theo ID`}
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    suffix={
                        searchBarValue?.length > 0 ? (
                            <CloseSVG onClick={() => setSearchBarValue("")} height={18} width={18} fillColor="#626974ff" />
                        ) : (
                            <Img src="/images/img_search.svg" alt="Search" className="h-[18px] w-[18px]" />
                        )
                    }
                    className=" flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs md:ml-0"
                />
                <div className="w-[92%] md:w-full">
                    {/*<ReactTable1*/}
                    {/*    size="xs"*/}
                    {/*    className="table-auto"*/}
                    {/*    columns={tableColumns}*/}
                    {/*    data={tableData}*/}
                    {/*    defaultPageSize={6}*/}
                    {/*/>*/}
                    <Card className="h-full w-full overflow-scroll">
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
                                                 sellerHeader
                                             }) => {
                                return (
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
                                                <Tag icon={<CheckCircleOutlined/>}
                                                     color="success">
                                                    Available
                                                </Tag>
                                            )}
                                            {status === "pending" && (
                                                <Tag icon={<SyncOutlined spin/>}
                                                     color="processing">
                                                    Pending
                                                </Tag>
                                            )}
                                            {status === "UnAvailable" && (
                                                <Tag icon={<CloseCircleOutlined/>}
                                                     color="error">
                                                    UnAvailable
                                                </Tag>
                                            )}
                                            {status === "Fail" && (
                                                <Tag icon={<ExclamationCircleOutlined/>}
                                                     color="warning">
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
                                            {/*{sellerHeader === "Available" && (*/}
                                            {/*    <Tag icon={<CheckCircleOutlined/>}*/}
                                            {/*         color="success">*/}
                                            {/*        Available*/}
                                            {/*    </Tag>*/}
                                            {/*)}*/}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {/*<IconButton variant="text" size="sm">*/}
                                                {/*    <DocumentIcon*/}
                                                {/*        className="h-4 w-4 text-gray-900"/>*/}
                                                {/*</IconButton>*/}
                                                {/*<IconButton variant="text" size="sm">*/}
                                                {/*    <ArrowDownTrayIcon*/}
                                                {/*        strokeWidth={3}*/}
                                                {/*        className="h-4 w-4 text-gray-900"*/}
                                                {/*    />*/}
                                                {/*</IconButton>*/}
                                                <Button color="blue">Thẩm định</Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </>
    );
}
