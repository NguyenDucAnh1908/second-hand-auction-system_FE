import {Img, Heading, InputDH} from "../../../components";
import {CloseSVG} from "../../../components/InputDH/close.jsx";
import React, {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Banner from '../../../partials/Banner';
import {Link} from 'react-router-dom';
import {DocumentIcon} from "@heroicons/react/24/solid";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import {Card, IconButton, Typography} from "@material-tailwind/react";
import Pagination from "@/components/Pagination/index.jsx";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import {Tag} from 'antd';

const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Đấu giá",
    "Tùy chỉnh"
];

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        product: "Smartphone",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "31 Jan 2024",
        status: "Available",
        auction: "Available",
    },
    {
        number: "#MS-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "24 Jan 2024",
        status: "pending",
        auction: "pending",
    },
    {
        number: "#MS-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "12 Jan 2024",
        status: "UnAvailable",
        auction: "UnAvailable",
    },
    {
        number: "#MS-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "10 Jan 2024",
        status: "Fail",
        auction: "Fail",
    },
];

export default function ListOfSellerProductPage() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);


    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const [searchBarValue1, setSearchBarValue1] = React.useState("");

    return (
        <>
            <div className="flex h-screen overflow-hidden">

                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

                    <main className="grow">
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


                            {/* noi dung */}
                            <div className="w-full bg-gray-50_01">
                                <div className="mt-4 flex flex-col items-end">
                                    <div className="w-[100%] md:w-full md:px-5">

                                        <div className="flex items-start">

                                            <div
                                                className="h-[1196px] flex-1 self-center rounded-[16px] bg-[url(/images/img_group_46876.png)] bg-cover bg-no-repeat py-[84px] md:h-auto md:py-5">
                                                <div className="mb-[86px] flex flex-col gap-7">
                                                    <div className="ml-1 flex md:ml-0">
                                                        <Heading
                                                            size="headingxl"
                                                            as="h1"
                                                            className="text-[30px] font-semibold uppercase text-gray-900_01 md:text-[44px] sm:text-[38px] -mt-[80px] ml-[20px]"
                                                        >
                                                            Danh sách sản phẩm
                                                        </Heading>
                                                    </div>
                                                    <div
                                                        className=" mr-[38px] flex justify-between gap-5 md:mx-0 sm:flex-col -mt-[50px] ml-[15px]">
                                                        <InputDH
                                                            name="Search Field"
                                                            placeholder={`Tìm kiếm theo ID`}
                                                            value={searchBarValue1}
                                                            onChange={(e) => setSearchBarValue1(e.target.value)}
                                                            suffix={
                                                                searchBarValue1?.length > 0 ? (
                                                                    <CloseSVG
                                                                        onClick={() => setSearchBarValue1("")}
                                                                        height={18}
                                                                        width={18}
                                                                        fillColor="#626974ff"
                                                                    />
                                                                ) : (
                                                                    <Img
                                                                        src="images/img_search.svg"
                                                                        alt="Search"
                                                                        className="h-[18px] w-[18px]"
                                                                    />
                                                                )
                                                            }
                                                            className="flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full "
                                                        />
                                                        <Link
                                                            to="/registerproduct"
                                                            className="flex h-[40px] min-w-[152px] flex-row items-center justify-center gap-0.5 rounded-md"
                                                            style={{backgroundColor: '#28a745'}} // Mã màu xanh lá cây
                                                        >
                                                            Tạo sản phẩm
                                                        </Link>

                                                    </div>
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
                                                                                 auction
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
                                                                            {auction === "Available" && (
                                                                                <Tag icon={<CheckCircleOutlined/>}
                                                                                     color="success">
                                                                                    Available
                                                                                </Tag>
                                                                            )}
                                                                            {auction === "pending" && (
                                                                                <Tag icon={<SyncOutlined spin/>}
                                                                                     color="processing">
                                                                                    Pending
                                                                                </Tag>
                                                                            )}
                                                                            {auction === "UnAvailable" && (
                                                                                <Tag icon={<CloseCircleOutlined/>}
                                                                                     color="error">
                                                                                    UnAvailable
                                                                                </Tag>
                                                                            )}
                                                                            {auction === "Fail" && (
                                                                                <Tag icon={<ExclamationCircleOutlined/>}
                                                                                     color="warning">
                                                                                    Fail
                                                                                </Tag>
                                                                            )}
                                                                        </td>
                                                                        <td className="p-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <IconButton variant="text" size="sm">
                                                                                    <DocumentIcon
                                                                                        className="h-4 w-4 text-gray-900"/>
                                                                                </IconButton>
                                                                                <IconButton variant="text" size="sm">
                                                                                    <ArrowDownTrayIcon
                                                                                        strokeWidth={3}
                                                                                        className="h-4 w-4 text-gray-900"
                                                                                    />
                                                                                </IconButton>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Banner/>
                </div>
            </div>
        </>
    );
}
