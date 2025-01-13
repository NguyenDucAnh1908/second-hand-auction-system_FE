import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useGetOrderAdminQuery } from "../../../services/order.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import { Drawer, Empty, message, Skeleton, Space } from "antd";
import DrawerDetailOrder from "@/components/DrawerDetailItem/DrawerDetailOrder.jsx";
import apiGhn from "@/services/apiGhn.service.js";


// // Define your tabs
// const TABS = [
//     {label: "READY TO PICK", value: "ready_to_pick"},
//     {label: "PICKING", value: "picking"},
//     {label: "MONEY COLLECT PICKING", value: "money_collect_picking"},
//     {label: "PICKED", value: "picked"},
//     {label: "STORING", value: "storing"},
//     {label: "TRANSPORTING", value: "transporting"},
//     {label: "SORTING", value: "sorting"},
//     {label: "DELIVERING", value: "delivering"},
//     {label: "DELIVERED", value: "delivered"},
//     {label: "MONEY COLLECT DELIVERING", value: "money_collect_delivering"},
//     {label: "DELIVERY FAIL", value: "delivery_fail"},
//     {label: "WAITING TO RETURN", value: "waiting_to_return"},
//     {label: "RETURN TRANSPORTING", value: "return_transporting"},
//     {label: "RETURN SORTING", value: "return_sorting"},
//     {label: "RETURNING", value: "returning"},
//     {label: "RETURN FAIL", value: "return_fail"},
//     {label: "RETURNED", value: "returned"},
//     {label: "CANCEL", value: "cancel"},
//     {label: "EXCEPTION", value: "exception"},
//     {label: "LOST", value: "lost"},
//     {label: "DAMAGE", value: "damage"},
// ];


const TABLE_HEAD = ["Mã đơn hàng", "Sản phẩm", "Trạng thái", "Thanh toán", "Tổng tiền", "Giao hàng", "Người đấu", "Ghi chú"];

export default function StoreOrders() {
    const [size, setSize] = useState();
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderCode, setSelectedOrderCode] = useState("");
    const navigate = useNavigate();
    // const handleDetailClick = () => {
    //     navigate("/dashboard/StoreOrders/OrderManagementAdmin");
    // };

    // State for pagination and status filtering
    const [trang, setTrang] = useState(1);
    const [status, setStatus] = useState(""); // Default status

    // Pass the `status` to your API query
    const { data: orderResponse, error, isLoading: orderLoading, isError: orderError } = useGetOrderAdminQuery({
        page: trang - 1,
        limit: 10,
        status
    });
    const totalPages1 = orderResponse?.data?.totalPages || 0;
    const orders = orderResponse?.data?.orders || [];

    const showDefaultDrawer = (orderId, orderCode) => {
        setSize('default');
        setOpen(true);
        setSelectedOrderId(orderId);
        setSelectedOrderCode(orderCode);
    };
    // Handle tab change to set status
    const handleTabChange = (newStatus) => {
        setStatus(newStatus);
        setTrang(1); // Reset to page 1 when changing tabs
    };

    const handlePageChange = (newPage) => {
        setTrang(newPage);
    };
    const onClose = () => {
        setOpen(false);
    };

    console.log("selectedOrderId dataa", selectedOrderId?.data);

    const statusMapping = {
        ready_to_pick: { text: 'Mới tạo đơn hàng', color: 'blue' },
        picking: { text: 'Nhân viên đang lấy hàng', color: 'cyan' },
        cancel: { text: 'Hủy đơn hàng', color: 'red' },
        money_collect_picking: { text: 'Đang thu tiền người gửi', color: 'yellow' },
        picked: { text: 'Nhân viên đã lấy hàng', color: 'green' },
        storing: { text: 'Hàng đang nằm ở kho', color: 'purple' },
        transporting: { text: 'Đang luân chuyển hàng', color: 'geekblue' },
        sorting: { text: 'Đang phân loại hàng hóa', color: 'lime' },
        delivering: { text: 'Nhân viên đang giao cho người nhận', color: 'orange' },
        money_collect_delivering: { text: 'Nhân viên đang thu tiền người nhận', color: 'gold' },
        delivered: { text: 'Nhân viên đã giao hàng thành công', color: 'green' },
        delivery_fail: { text: 'Nhân viên giao hàng thất bại', color: 'volcano' },
        waiting_to_return: { text: 'Đang đợi trả hàng về cho người gửi', color: 'grey' },
        return: { text: 'Trả hàng', color: 'purple' },
        return_transporting: { text: 'Đang luân chuyển hàng trả', color: 'blue' },
        return_sorting: { text: 'Đang phân loại hàng trả', color: 'cyan' },
        returning: { text: 'Nhân viên đang đi trả hàng', color: 'orange' },
        return_fail: { text: 'Nhân viên trả hàng thất bại', color: 'volcano' },
        returned: { text: 'Nhân viên trả hàng thành công', color: 'green' },
        exception: { text: 'Đơn hàng ngoại lệ không nằm trong quy trình', color: 'magenta' },
        damage: { text: 'Hàng bị hư hỏng', color: 'red' },
        lost: { text: 'Hàng bị mất', color: 'black' },
    };

    return (
        <>
            <Drawer
                title={"Chi tiết sản phẩm"}
                placement="right"
                size={size}
                width={1200}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <DrawerDetailOrder orderId={selectedOrderId} orderCode={selectedOrderCode} />
                {/*itemIds={selectedItemId}*/}
            </Drawer>
            <div className="w-full">
                {orderError ? (
                    <Empty />
                ) : (
                    <>
                        <Skeleton loading={orderLoading} active>
                            <Card className="h-full w-full">
                                <CardHeader floated={false} shadow={false} className="rounded-none">
                                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                        {/* Tabs for filtering orders by status */}
                                        <Tabs value={status} className="w-full md:w-max">
                                            <TabsHeader>
                                                {/* {TABS.map(({label, value}) => (
                                                    <Tab
                                                        key={value}
                                                        value={value}
                                                        onClick={() => handleTabChange(value)}
                                                    >
                                                        {label}
                                                    </Tab>
                                                ))} */}
                                            </TabsHeader>
                                        </Tabs>
                                    </div>
                                </CardHeader>
                                <CardBody className="overflow-scroll px-0">
                                    <table className="mt-4 w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head) => (
                                                    <th key={head}
                                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                        <Typography variant="small" color="blue-gray"
                                                            className="font-normal leading-none opacity-70">
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
                                                        orderCode,
                                                    }, index) => {
                                                        const isLast = index === orders.length - 1;
                                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                                        return (
                                                            <tr key={orderId}>
                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                        className="font-normal">
                                                                        {orderId}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar src={item.thumbnail} alt={item.itemName}
                                                                            size="sm" />
                                                                        <div className="flex flex-col">
                                                                            <Typography variant="small" color="blue-gray"
                                                                                className="font-normal">
                                                                                {item.itemName}
                                                                            </Typography>
                                                                            <Typography variant="small" color="blue-gray"
                                                                                className="font-normal opacity-70">
                                                                                {item.sellerName}
                                                                            </Typography>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Chip
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        value={statusMapping[orderStatus]?.text || 'Trạng thái không xác định'}
                                                                        color={orderStatus in statusMapping ? statusMapping[orderStatus].color : 'gray'}
                                                                    />
                                                                </td>

                                                                <td className={classes}>
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {{
                                                                            VN_PAYMENT: 'Thanh toán qua VN',
                                                                            WALLET_PAYMENT: 'Bằng ví tiền',
                                                                            BANK_TRANSFER: 'Chuyển khoản ngân hàng',
                                                                        }[paymentMethod] || 'Phương thức không xác định'}
                                                                    </Typography>
                                                                </td>

                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                        className="font-normal">
                                                                        {totalPrice.toLocaleString('vi-VN', {
                                                                            style: 'currency',
                                                                            currency: 'VND'
                                                                        })}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                        className="font-normal">
                                                                        {shippingType}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                        className="font-normal">
                                                                        {createBy}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Typography variant="small" color="blue-gray"
                                                                        className="font-normal">
                                                                        {note}
                                                                    </Typography>
                                                                </td>
                                                                <td className={classes}>
                                                                    <Tooltip content="Detail">
                                                                        <IconButton variant="text"
                                                                            // onClick={handleDetailClick}
                                                                            onClick={() => showDefaultDrawer(orderId, orderCode)}
                                                                        >
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
                                                    <td colSpan={TABLE_HEAD.length} className="text-center py-4"><Empty />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </CardBody>
                                <div className="flex justify-center items-center mt-4">
                                    <Pagination
                                        currentPage={trang}
                                        totalPages={totalPages1}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </Card>
                        </Skeleton>
                    </>
                )}

            </div>
        </>
    );
}
