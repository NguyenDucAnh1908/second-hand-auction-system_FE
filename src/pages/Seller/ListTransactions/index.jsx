import React, { useState } from 'react';
import FooterBK from '../../../components/FooterBK';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import Pagination from "@/components/Pagination/index.jsx";
import Sidebar from '../../../partials/Sidebar';


const { Content, Sider } = Layout;

export default function ListTransaction() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const TABLE_HEAD = ["Tên", "Số tiền", "Ngày", "Trạng thái", "Loại giao dịch"];

    const TABLE_ROWS = [
        {
            img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
            name: "Spotify",
            amount: "$2,500",
            date: "Wed 3:00pm",
            status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
            name: "Amazon",
            amount: "$5,000",
            date: "Wed 1:00pm",
            status: "paid",
            account: "master-card",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
            name: "Pinterest",
            amount: "$3,400",
            date: "Mon 7:40pm",
            status: "pending",
            account: "master-card",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
            name: "Google",
            amount: "$1,000",
            date: "Wed 5:00pm",
            status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
            name: "netflix",
            amount: "$14,000",
            date: "Wed 3:30am",
            status: "cancelled",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
               
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1, // Cho phép Content chiếm không gian còn lại
                        display: 'flex', // Đặt display là flex để chứa nội dung
                        flexDirection: 'column', // Hướng theo chiều dọc
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, // Để Layout chiếm hết không gian còn lại
                        }}
                    >
                        <Sidebar/>
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <Card className="h-full w-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div
                                        className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                        <div>
                                            <Typography variant="h5" color="blue-gray">
                                                Lịch sử giao dịch
                                            </Typography>
                                            <Typography color="gray" className="mt-1 font-normal">
                                                These are details about the last transactions
                                            </Typography>
                                        </div>
                                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                                            <div className="w-full md:w-72">
                                                <Input
                                                    label="Search"
                                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                                />
                                            </div>
                                            <Button className="flex items-center gap-3" size="sm">
                                                <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Search
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="overflow-scroll px-0">
                                    <table className="w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.filter(head => head.trim() !== "").map((head) => (
                                                    <th
                                                        key={head}
                                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                                    >
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal leading-none opacity-70"
                                                        >
                                                            {head}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TABLE_ROWS.map(
                                                (
                                                    {
                                                        img,
                                                        name,
                                                        amount,
                                                        date,
                                                        status,
                                                        account,
                                                        accountNumber,
                                                        expiry,
                                                    },
                                                    index,
                                                ) => {
                                                    const isLast = index === TABLE_ROWS.length - 1;
                                                    const classes = isLast
                                                        ? "p-4"
                                                        : "p-4 border-b border-blue-gray-50";

                                                    return (
                                                        <tr key={name}>
                                                            <td className={classes}>
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar
                                                                        src={img}
                                                                        alt={name}
                                                                        size="md"
                                                                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                                    />
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-bold"
                                                                    >
                                                                        {name}
                                                                    </Typography>
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {amount}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {date}
                                                                </Typography>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="w-max">
                                                                    <Chip
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        value={status}
                                                                        color={
                                                                            status === "paid"
                                                                                ? "green"
                                                                                : status === "pending"
                                                                                    ? "amber"
                                                                                    : "red"
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className={classes}>
                                                                <div className="flex items-center gap-3">
                                                                    <div
                                                                        className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                                        <Avatar
                                                                            src={
                                                                                account === "visa"
                                                                                    ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png"
                                                                                    : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"
                                                                            }
                                                                            size="sm"
                                                                            alt={account}
                                                                            variant="square"
                                                                            className="h-full w-full object-contain p-1"
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal capitalize"
                                                                        >
                                                                            {account.split("-").join(" ")} {accountNumber}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="small"
                                                                            color="blue-gray"
                                                                            className="font-normal opacity-70"
                                                                        >
                                                                            {expiry}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            )}
                                        </tbody>
                                    </table>
                                </CardBody>
                                <div className="my-10 flex justify-center">
                                    <Pagination />
                                </div>
                            </Card>
                        </Content>
                    </Layout>
                </Content>
                {/* <FooterBK  className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" /> */}
                <FooterBK/>
            </Layout>
        </>
    );
}
