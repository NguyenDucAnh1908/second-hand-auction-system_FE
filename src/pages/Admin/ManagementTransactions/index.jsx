import React, {useState} from 'react';
import FooterBK from '../../../components/FooterBK';
import {DocumentIcon} from "@heroicons/react/24/solid";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import {
    Button, Card, IconButton, Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";

const TABLE_HEAD = [
    "Number",
    "Customer",
    "Amount",
    "Request Date",
    "Approval Date",
    "Status",
    "Actions",
];

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        customer: "CompanyINC",
        amount: "$14,000",
        issued: "31 Jan 2024",
        status: "Available",
        date: "31 Feb 2024",
    },
    {
        number: "#MS-415647",
        customer: "CompanyINC",
        amount: "$4,000",
        issued: "24 Jan 2024",
        status: "pending",
        date: "24 Feb 2024",
    },
    {
        number: "#MS-415648",
        customer: "CompanyINC",
        amount: "$11,000",
        issued: "12 Jan 2024",
        status: "UnAvailable",
        date: "12 Feb 2024",
    },
    {
        number: "#MS-415649",
        customer: "CompanyINC",
        amount: "$2,600",
        issued: "10 Jan 2024",
        status: "Fail",
        date: "10 Feb 2024",
    },
];
export default function ManagementTransactions() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (

        <div className="container mx-auto py-10">
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
            >
                <DialogHeader>Transaction Details</DialogHeader>
                <DialogBody>
                    <div className="mb-6 space-y-4">
                        <p className="text-lg text-gray-700"><strong>ID:</strong> ???</p>
                        <p className="text-lg text-gray-700"><strong>Shop Name:</strong> ???</p>
                        <p className="text-lg text-gray-700"><strong>Amount:</strong> ???</p>
                        <p className="text-lg text-gray-700">
                            <strong>Status:</strong>
                            ???
                        </p>
                        <p className="text-lg text-gray-700"><strong>Request Date:</strong> ???</p>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <h1 className="text-3xl font-bold text-center mb-8">Management Transactions</h1>
            {/*<div className="overflow-x-auto">*/}
            {/*    <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">*/}
            {/*        <thead className="bg-gray-200">*/}
            {/*            <tr>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">ID</th>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">Shop Name</th>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">Amount</th>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">Status</th>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">Request Date</th>*/}
            {/*                <th className="px-6 py-4 border-b text-left text-lg">Actions</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*            {currentTransactions.map(transaction => (*/}
            {/*                <tr key={transaction.id} className="text-center border-b hover:bg-gray-100 transition-colors">*/}
            {/*                    <td className="px-6 py-5 text-lg">{transaction.id}</td>*/}
            {/*                    <td className="px-6 py-5 text-lg">{transaction.shopName}</td>*/}
            {/*                    <td className="px-6 py-5 text-lg">{transaction.amount}</td>*/}
            {/*                    <td className={`px-6 py-5 text-lg font-bold ${transaction.status === 'Pending' ? 'text-yellow-600' : transaction.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>*/}
            {/*                        {transaction.status}*/}
            {/*                    </td>*/}
            {/*                    <td className="px-6 py-5 text-lg">{transaction.requestDate}</td>*/}
            {/*                    <td className="px-6 py-5">*/}
            {/*                        <button*/}
            {/*                            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors"*/}
            {/*                            onClick={() => handleDetailClick(transaction)}*/}
            {/*                        >*/}
            {/*                            Chi tiết*/}
            {/*                        </button>*/}
            {/*                    </td>*/}
            {/*                </tr>*/}
            {/*            ))}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
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
                    {TABLE_ROWS.map(({number, customer, amount, issued, date, status}) => {
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
                                        {customer}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {amount}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {issued}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {date}
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
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <Button color="blue" onClick={handleOpen}>Chi Tiết</Button>
                                        </div>
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
    );
}
