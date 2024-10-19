import React, { useState } from 'react';
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Avatar,
    Input,
    Form,
    Button
} from "@material-tailwind/react";
import { Drawer, Row, Col, Descriptions, Badge, Space } from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import { Link } from 'react-router-dom';

const TABLE_HEAD = ["Name", "Amount", "Date", "Status", "Account", "Reason", "Detail", ""];

const TABLE_ROWS = [
    // Sample data for the table
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        date: "Wed 3:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
        name: "Amazon",
        amount: "$5,000",
        date: "Wed 1:00pm",
        status: "paid",
        account: "master-card",
        accountNumber: "1234",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
        name: "Pinterest",
        amount: "$3,400",
        date: "Mon 7:40pm",
        status: "pending",
        account: "master-card",
        accountNumber: "1234",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
        name: "Google",
        amount: "$1,000",
        date: "Wed 5:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        reason: 'Product Return'
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
        name: "Netflix",
        amount: "$14,000",
        date: "Wed 3:30am",
        status: "cancelled",
        account: "visa",
        accountNumber: "1234",
        reason: 'Product Return'
    },
];


const items = [
    {
        key: '1',
        label: 'Họ và Tên',
        children: 'Nguyễn Văn A',
        span: 3,
        labelStyle: { fontWeight: 'bold' }, // In đậm label
    },
    {
        key: '2',
        label: 'Số Tài Khoản Ngân Hàng',
        children: '123456789 - Vietcombank',
        span: 3,
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '3',
        label: 'Số Tiền Rút',
        children: '10,000,000 VND',
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '4',
        label: 'Phí Giao Dịch',
        children: '50,000 VND',
        span: 2,
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '5',
        label: 'Ngày Yêu Cầu',
        children: '14/10/2024',
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '6',
        label: 'Tình Trạng',
        children: <Badge status="processing" text="Đang xử lý" />,
        span: 3,
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '7',
        label: 'Email',
        children: 'nguyenvana@example.com',
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '8',
        label: 'Số Điện Thoại',
        children: '+84 123 456 789',
        span: 2,
        labelStyle: { fontWeight: 'bold' },
    },
    {
        key: '9',
        label: 'Ghi Chú',
        children: '3D fonts are now seen more and more in our daily life. They are frequently seen especially in titles, slogans, posters, etc. For example, the title text for the famous movies Indiana Jones and Superman were both designed in a 3d style. 3D fonts can be used for making posters, CD covers, flyers, brochures that are calling for additional attention.',
        span: 5,
        labelStyle: { fontWeight: 'bold' },
    },
];
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

const ManagementWithdrawOfSeller = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <div className="container mx-auto py-10">
            <div className="container mx-auto py-10">
                <Drawer width={1100} placement="right" closable={false} onClose={onClose} open={open}>
                    <Descriptions
                        title="Yêu Cầu Rút Tiền"
                        bordered items={items}
                        extra={ <Space>
                            <Button color="red" danger>
                                Hủy Yêu Cầu
                            </Button>
                            <Button color="green">
                                Xác Nhận
                            </Button>
                        </Space>}
                    />
                </Drawer>
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">Withdrawal Requests Management</h1>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Recent Transactions
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
                            <Button variant="gradient" className="flex items-center gap-3" size="sm">
                                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
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
                                        reason,
                                    },
                                    index,
                                ) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={img} alt={name} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                                                    <Typography variant="small" color="blue-gray" className="font-bold">{name}</Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">{amount}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal">{date}</Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={status}
                                                        color={status === "paid" ? "green" : status === "pending" ? "amber" : "red"}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                        <Avatar
                                                            src={account === "visa" ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png" : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"}
                                                            size="sm"
                                                            alt={account}
                                                            variant="square"
                                                            className="h-full w-full object-contain p-1"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <Typography variant="small" color="blue-gray" className="font-normal capitalize">{account.split("-").join(" ")}</Typography>
                                                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{accountNumber}</Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" color="blue-gray" className="font-normal truncate" style={{ maxWidth: '110px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {reason}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Button  onClick={showDrawer} variant="gradient" color="blue-gray" size="sm">
                                                    Details
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <div className="flex justify-center items-center mt-4">
                <Pagination />
            </div>
        </div>
    );
};

export default ManagementWithdrawOfSeller;
