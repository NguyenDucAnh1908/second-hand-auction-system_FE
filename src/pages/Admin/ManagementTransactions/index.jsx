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

// Sample transaction data
const transaction = {
    id: "#TX-001",
    orderCode: "ORD-12345",
    amount: "20,000,000",
    amountPaid: "15,000,000",
    amountRemaining: "5,000,000",
    status: "Available",
    createdAt: "2024-10-14T10:00:00Z",
    transactions: [
        {
            reference: "REF-001",
            amount: "10,000,000",
            accountNumber: "ACC-123456789",
            description: "Initial deposit",
            transactionDateTime: "2024-10-10T10:00:00Z",
            virtualAccountName: "Virtual Account A",
        }

    ],
};

const TABLE_ROWS = [
    {
        number: "#MS-415646",
        customer: "CompanyINC",
        amount: "$14,000",
        issued: "31 Jan 2024",
        date: "31 Feb 2024",
        status: "Available",
    },
    {
        number: "#MS-415647",
        customer: "CompanyINC",
        amount: "$4,000",
        issued: "24 Jan 2024",
        date: "24 Feb 2024",
        status: "pending",
    },
    {
        number: "#MS-415648",
        customer: "CompanyINC",
        amount: "$11,000",
        issued: "12 Jan 2024",
        date: "12 Feb 2024",
        status: "UnAvailable",
    },
    {
        number: "#MS-415649",
        customer: "CompanyINC",
        amount: "$2,600",
        issued: "10 Jan 2024",
        date: "10 Feb 2024",
        status: "Fail",
    },
];

export default function ManagementTransactions() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Dialog
                open={open}
                size="md" // Thay đổi kích thước thành md
            >
                <DialogHeader>Chi tiết giao dịch</DialogHeader>
                <DialogBody className="p-4 bg-white shadow-lg rounded-lg border border-gray-300"> {/* Giảm padding */}
                    <div className="mb-4">
                        <div className="flex flex-wrap mb-2">
                            {/* Left Column for Labels */}
                            <div className="w-1/2 pr-4">
                                <p className="text-base font-semibold text-gray-800"><strong>ID:</strong></p>
                                <p className="text-base font-semibold text-gray-800"><strong>Order Code:</strong></p>
                                <p className="text-base font-semibold text-gray-800"><strong>Amount:</strong></p>
                                <p className="text-base font-semibold text-gray-800"><strong>Amount Paid:</strong></p>
                                <p className="text-base font-semibold text-gray-800"><strong>Amount Remaining:</strong>
                                </p>
                                <p className="text-base font-semibold text-gray-800"><strong>Status:</strong></p>
                                <p className="text-base font-semibold text-gray-800"><strong>Request Date:</strong></p>
                                <h3 className="font-bold text-lg mt-4 text-gray-900">Transactions:</h3>
                            </div>
                            {/* Right Column for Values */}
                            <div className="w-1/2">
                                <p className="text-base text-gray-700">{transaction.id}</p>
                                <p className="text-base text-gray-700">{transaction.orderCode}</p>
                                <p className="text-base text-gray-700">{transaction.amount.toLocaleString()} VND</p>
                                <p className="text-base text-gray-700">{transaction.amountPaid.toLocaleString()} VND</p>
                                <p className="text-base text-gray-700">{transaction.amountRemaining.toLocaleString()} VND</p>
                                <p className="text-base text-gray-700">{transaction.status}</p>
                                <p className="text-base text-gray-700">{new Date(transaction.createdAt).toLocaleString()}</p>
                                {/* Transaction Details for each transaction */}
                                <div className="mt-2">
                                    {transaction.transactions.map((trans, index) => (
                                        <div key={index} className="border p-2 rounded-lg mb-2 bg-gray-50 shadow"> {/* Giảm padding cho từng transaction */}
                                            <p className="text-sm font-semibold text-gray-800"><strong>Reference:</strong> {trans.reference}</p>
                                            <p className="text-sm text-gray-600"><strong>Amount:</strong> {trans.amount.toLocaleString()} VND</p>
                                            <p className="text-sm text-gray-600"><strong>Account Number:</strong> {trans.accountNumber}</p>
                                            <p className="text-sm text-gray-600"><strong>Description:</strong> {trans.description}</p>
                                            <p className="text-sm text-gray-600"><strong>Transaction Date:</strong> {new Date(trans.transactionDateTime).toLocaleString()}</p>
                                            <p className="text-sm text-gray-600"><strong>Virtual Account Name:</strong> {trans.virtualAccountName || 'N/A'}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                        {/* Money Image placed at the bottom */}
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/001/923/526/non_2x/stack-bills-with-pile-coins-isolated-icon-free-vector.jpg" // Replace with actual money image URL
                                alt="Money"
                                className="w-24 h-24" // Kích thước hình ảnh
                            />
                        </div>

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
                    <Button variant="gradient" color="green" onClick={handleOpen}> {/* Sửa thành handleConfirm */}
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>


            <h1 className="text-3xl font-bold text-center mb-8">Management Transactions</h1>

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
                                            <Tag icon={<CheckCircleOutlined/>} color="success">
                                                Available
                                            </Tag>
                                        )}
                                        {status === "pending" && (
                                            <Tag icon={<SyncOutlined spin/>} color="processing">
                                                Pending
                                            </Tag>
                                        )}
                                        {status === "UnAvailable" && (
                                            <Tag icon={<CloseCircleOutlined/>} color="error">
                                                UnAvailable
                                            </Tag>
                                        )}
                                        {status === "Fail" && (
                                            <Tag icon={<ExclamationCircleOutlined/>} color="warning">
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
        </>
    );
}
