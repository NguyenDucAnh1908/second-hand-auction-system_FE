import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useGetOrderAdminQuery } from "../../../services/order.service.js";
import Pagination from "@/components/Pagination/index.jsx";


// Define your tabs
const TABS = [
    { label: "PENDING", value: "PENDING" },
    { label: "PROCESSING", value: "PROCESSING" },
    { label: "REJECTED", value: "REJECTED" },
    { label: "CONFIRMED", value: "CONFIRMED" },

    { label: "DELIVERED", value: "DELIVERED" },
];

const TABLE_HEAD = ["Order ID", "Item", "Status", "Payment Method", "Total Price", "Shipping Type", "Bider", "Note"];

export default function StoreOrders() {
    const navigate = useNavigate();
    const handleDetailClick = () => {
        navigate("/dashboard/StoreOrders/OrderManagementAdmin");
    };

    // State for pagination and status filtering
    const [trang, setTrang] = useState(1);
    const [status, setStatus] = useState("PENDING"); // Default status

    // Pass the `status` to your API query
    const { data: orderResponse, error } = useGetOrderAdminQuery({ page: trang - 1, limit: 10, status });
    const totalPages1 = orderResponse?.data?.totalPages || 0;
    const orders = orderResponse?.data?.orders || [];

    // Handle tab change to set status
    const handleTabChange = (newStatus) => {
        setStatus(newStatus);
        setTrang(1); // Reset to page 1 when changing tabs
    };

    const handlePageChange = (newPage) => {
        setTrang(newPage);
    };

    return (
        <div className="w-full">
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        {/* Tabs for filtering orders by status */}
                        <Tabs value={status} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => handleTabChange(value)}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
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
                            {orders.length > 0 ? (
                                orders.map(
                                    ({
                                        orderId,
                                        orderStatus,
                                        paymentMethod,
                                        email,
                                        phoneNumber,
                                        quantity,
                                        note,
                                        item,
                                        auctionOrder,
                                        totalPrice,
                                        shippingType,
                                        createBy,
                                    }, index) => {
                                        const isLast = index === orders.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={orderId}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {orderId}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={item.thumbnail} alt={item.itemName} size="sm" />
                                                        <div className="flex flex-col">
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {item.itemName}
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                                                                {item.sellerName}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={orderStatus}
                                                        color={orderStatus === "PENDING" ? "yellow" : "green"}
                                                    />
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {paymentMethod}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {shippingType}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {createBy}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {note}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Detail">
                                                        <IconButton variant="text" onClick={handleDetailClick}>
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            ) : (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="text-center py-4">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <div className="flex justify-center items-center mt-4">
                    <Pagination currentPage={trang} totalPages={totalPages1} onPageChange={handlePageChange} />
                </div>
            </Card>
        </div>
    );
}
