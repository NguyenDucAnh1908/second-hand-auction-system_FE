import React, { useState } from 'react';
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
    Drawer,
    Avatar,
    Input,
    Form,
    Row,
    Col,
} from "@material-tailwind/react";
import Pagination from "@/components/Pagination/index.jsx";
import { FloatButton } from 'antd';

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

const ManagementWithdrawOfSeller = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleApprove = () => {
        console.log('Approve Withdrawal');
        // Handle approve logic
        onClose();
    };

    const handleDecline = () => {
        console.log('Decline Withdrawal');
        // Handle decline logic
        onClose();
    };

    return (
        <div className="container mx-auto py-10">
          <div className="container mx-auto py-10">
    <Drawer placement="right" closable={false} onClose={onClose} maxWidth={1000} open={open}> {/* Increased maxWidth */}
    <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    User Profile
                </p>

        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-6">
            <div className="mb-6"> {/* Increased margin-bottom for better spacing */}
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Name:</p>
                    <p className="text-gray-600 w-2/3">John Doe</p>
                </div>
         
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Amount:</p>
                    <p className="text-gray-600 w-2/3">$2,500</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Account Number:</p>
                    <p className="text-gray-600 w-2/3">1234 5678 9012 3456</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Reason:</p>
                    <p className="text-gray-600 w-2/3">Product Return</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Date:</p>
                    <p className="text-gray-600 w-2/3">Wed 3:00 PM</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Transaction ID:</p>
                    <p className="text-gray-600 w-2/3">TRX-123456789</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Payment Method:</p>
                    <p className="text-gray-600 w-2/3">Credit Card</p>
                </div>
                <div className="flex justify-between items-center mb-4 flex-nowrap"> {/* Added flex-nowrap */}
                    <p className="font-medium w-1/3">Processed By:</p>
                    <p className="text-gray-600 w-2/3">Admin User</p>
                </div>
            </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center mb-6">
            <img
                src="https://static.vecteezy.com/system/resources/previews/001/923/526/non_2x/stack-bills-with-pile-coins-isolated-icon-free-vector.jpg" // Replace with actual money image URL
                alt="Money"
                className="w-48 h-48" // Increased image size
            />
        </div>

        <div className="flex justify-between mt-4">
            <Button color="red" className="w-full ml-2">
                Decline
            </Button>
        </div>

        <div className="mt-4">
            <Button color="blue" className="w-full">
                Transfer Money
            </Button>
        </div>
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
                            <Button className="flex items-center gap-3" size="sm">
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
                                                <Button onClick={showDrawer} variant="outlined" color="blue-gray" size="sm">
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
            <Pagination />
        </div>
    );
};

export default ManagementWithdrawOfSeller;
