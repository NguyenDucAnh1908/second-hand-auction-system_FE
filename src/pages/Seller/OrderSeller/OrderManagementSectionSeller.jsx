import { Img, SelectBox, Heading, Text, InputDH } from "../../../components";
import React, { useState, useEffect } from 'react';
import { Button, Card, Option, Select, Typography, Modal, ModalHeader, ModalBody, ModalFooter } from "@material-tailwind/react";
import {Drawer, Tag} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetOrderSellerQuery } from "../../../services/order.service";
import {useGetImageItemsQuery} from "@/services/item.service.js";
import OnlineGatewayService from "@/services/apiGhn.service.js";
import OrderDetailCompoment from "@/components/OrderDetailCompoment/index.jsx";
import OrderDetailAdmin from "@/components/OrderDetailCompoment/OrderDetailAdmin.jsx";

const TABLE_HEAD = [
    "Hình ảnh",
    "Sản phẩm",
    "Người mua",
    "Trạng thái",
    "Số tiền",
    "Số điện thoại",
    "Tùy chỉnh"
];
const statusMapping = {
    ready_to_pick: {text: 'Mới tạo đơn hàng', color: 'text-gray-500'},
    picking: {text: 'Nhân viên đang lấy hàng', color: 'text-blue-500'},
    cancel: {text: 'Hủy đơn hàng', color: 'text-red-500'},
    money_collect_picking: {text: 'Đang thu tiền người gửi', color: 'text-yellow-500'},
    picked: {text: 'Nhân viên đã lấy hàng', color: 'text-green-500'},
    storing: {text: 'Hàng đang nằm ở kho', color: 'text-purple-500'},
    transporting: {text: 'Đang luân chuyển hàng', color: 'text-blue-400'},
    sorting: {text: 'Đang phân loại hàng hóa', color: 'text-teal-500'},
    delivering: {text: 'Nhân viên đang giao cho người nhận', color: 'text-orange-500'},
    money_collect_delivering: {text: 'Nhân viên đang thu tiền người nhận', color: 'text-yellow-600'},
    delivered: {text: 'Nhân viên đã giao hàng thành công', color: 'text-green-600'},
    delivery_fail: {text: 'Nhân viên giao hàng thất bại', color: 'text-red-600'},
    waiting_to_return: {text: 'Đang đợi trả hàng về cho người gửi', color: 'text-gray-400'},
    return: {text: 'Trả hàng', color: 'text-purple-400'},
    return_transporting: {text: 'Đang luân chuyển hàng trả', color: 'text-blue-300'},
    return_sorting: {text: 'Đang phân loại hàng trả', color: 'text-teal-400'},
    returning: {text: 'Nhân viên đang đi trả hàng', color: 'text-orange-400'},
    return_fail: {text: 'Nhân viên trả hàng thất bại', color: 'text-red-400'},
    returned: {text: 'Nhân viên trả hàng thành công', color: 'text-green-400'},
    exception: {text: 'Đơn hàng ngoại lệ không nằm trong quy trình', color: 'text-pink-500'},
    damage: {text: 'Hàng bị hư hỏng', color: 'text-red-700'},
    lost: {text: 'Hàng bị mất', color: 'text-black'},
};
export default function OrderManagementSectionSeller({ orders }) {
    const [page, setPage] = useState(1); // Default page to 1 for proper pagination (as APIs often start from page 1)
    const [openModal, setOpenModal] = useState(false); // Điều khiển modal
    const [selectedOrder, setSelectedOrder] = useState(null); // Lưu trữ thông tin đơn hàng được chọn
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error1, setError] = useState(null);

    const { data: dataOrder, error, isLoading } = useGetOrderSellerQuery({ page: page - 1, limit: 10 });
    //console.log("data", dataOrder);
    const totalPages1 = orders?.totalPages || 1;
    const id = selectedOrder?.item.itemId;
    const {
        data: itemImage,
        isError: itemImageError,
        isLoading: itemImageLoading,
        isSuccess: isSuccessImage,
        refetch: refetchImage
    } = useGetImageItemsQuery({id});
    //console.log("selectedOrder", selectedOrder);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const showLoading = async (order) => {
        if (isLoading) return;
        setOpen(true);
        setLoading(true);
        setSelectedOrder(order);
        try {
            const response = await OnlineGatewayService.detail_order_service({
                order_code: order?.orderCode,
                //order_code: "LDM3BV",
            });
            setOrderDetails(response?.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const ordersToDisplay = dataOrder?.auctionOrder || orders;
    const historyDelivery = [
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'statusText',
            key: 'statusText',
            render: (text, record) => (
                <span className={`font-semibold ${record.statusColor}`}>{text}</span>
            ),
        },
        {
            title: 'Mã chuyến',
            dataIndex: 'trip_code',
            key: 'trip_code',
        },
        {
            title: 'Người trả phí',
            dataIndex: 'payment_type_id',
            key: 'payment_type_id',
            render: (paymentType) =>
                paymentType === 1
                    ? 'Người Gửi trả phí'
                    : paymentType === 2
                        ? 'Người Nhận trả phí'
                        : 'Không xác định', // Hiển thị thông tin dựa trên giá trị payment_type_id
        },
        {
            title: 'Thời gian cập nhật',
            dataIndex: 'updated_date',
            key: 'updated_date',
            render: (date) => new Date(date).toLocaleString(), // Hiển thị thời gian theo định dạng dễ đọc
        },
    ];
    const dataSourceDelivery = orderDetails?.log.map(statusDelivery => ({
        key: statusDelivery.trip_code,
        status: statusDelivery.status,
        statusText: statusMapping[statusDelivery.status]?.text || 'Không xác định',
        statusColor: statusMapping[statusDelivery.status]?.color || 'text-gray-500',
        payment_type_id: statusDelivery.payment_type_id,
        trip_code: statusDelivery.trip_code,
        updated_date: statusDelivery.updated_date
    })) || [];
    return (
        <div className="flex w-full flex-col items-center">
            <div className="mx-auto flex w-full max-w-[1294px] flex-col gap-10 self-stretch">
                <Card className="h-full w-full overflow-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="p-4 pt-10">
                                        <Typography variant="small" color="blue-gray" className="font-bold leading-none">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(ordersToDisplay) && ordersToDisplay.length > 0 ? (
                                ordersToDisplay.map(({ orderId, createBy, item, orderStatus, totalPrice, phoneNumber, paymentMethod, shippingType, auctionOrder, orderCode, note}) => (
                                    <tr key={orderId}>
                                        <td className="p-4">
                                            {item ? (
                                                <img src={item.thumbnail || ''} alt={item.itemName || 'No image'} className="w-16 h-16 object-cover rounded" />
                                            ) : (
                                                <div>No image</div>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {item?.itemName || 'No name'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {createBy || 'Người mua'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-center text-gray-600">
                                                {orderStatus === "ready_to_pick" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="blue"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang chờ
                                                    </Tag>
                                                )}
                                                {orderStatus === "picking" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="orange"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang lấy hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "money_collect_picking" && (
                                                    <Tag
                                                        icon={<DollarCircleOutlined />}
                                                        color="cyan"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Lấy hàng và thu tiền
                                                    </Tag>
                                                )}
                                                {orderStatus === "picked" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="green"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã lấy hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivering" && (
                                                    <Tag
                                                        icon={<SyncOutlined spin />}
                                                        color="yellow"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang giao hàng
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivered" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="purple"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã giao
                                                    </Tag>
                                                )}
                                                {orderStatus === "delivery_fail" && (
                                                    <Tag
                                                        icon={<CloseCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Giao thất bại
                                                    </Tag>
                                                )}
                                                {orderStatus === "returning" && (
                                                    <Tag
                                                        icon={<RollbackOutlined />}
                                                        color="orange"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đang hoàn trả
                                                    </Tag>
                                                )}
                                                {orderStatus === "returned" && (
                                                    <Tag
                                                        icon={<CheckCircleOutlined />}
                                                        color="gray"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã trả lại
                                                    </Tag>
                                                )}
                                                {orderStatus === "cancel" && (
                                                    <Tag
                                                        icon={<CloseCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Đã hủy
                                                    </Tag>
                                                )}
                                                {orderStatus === "exception" && (
                                                    <Tag
                                                        icon={<ExclamationCircleOutlined />}
                                                        color="red"
                                                        className="text-sm font-semibold px-3 py-1 rounded-md inline-block w-full max-w-[150px] text-center"
                                                    >
                                                        Có sự cố
                                                    </Tag>
                                                )}
                                            </Typography>

                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {totalPrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice) : 'No amount'}
                                            </Typography>
                                        </td>

                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {phoneNumber || 'No phone'}
                                            </Typography>
                                        </td>

                                      

                                        <td className="p-4">
                                            <Button color="blue" onClick={() => showLoading({
                                                orderId,
                                                createBy,
                                                item,
                                                orderStatus,
                                                totalPrice,
                                                phoneNumber,
                                                paymentMethod,
                                                shippingType,
                                                auctionOrder,
                                                orderCode,
                                                note,

                                            })}>
                                                Chi tiết đơn hàng
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                                        Không có đơn hàng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>

                <div className="flex justify-center items-center mt-4">
                    <Pagination currentPage={page} totalPages={totalPages1} onPageChange={handlePageChange} />
                </div>
            </div>
            <Drawer
                closable
                destroyOnClose
                title={<p>THÔNG TIN ĐƠN HÀNG</p>}
                placement="right"
                open={open}
                loading={loading}
                onClose={() => setOpen(false)}
                size='large'
                width={900}
            >
                {selectedOrder && orderDetails && (
                    <OrderDetailAdmin
                        selectedOrder={selectedOrder}
                        orderDetails={orderDetails}
                        statusMapping={statusMapping}
                        itemImage={itemImage}
                        historyDelivery={historyDelivery}
                        dataSourceDelivery={dataSourceDelivery}
                    />
                )}
            </Drawer>
        </div>
    );
}
