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
