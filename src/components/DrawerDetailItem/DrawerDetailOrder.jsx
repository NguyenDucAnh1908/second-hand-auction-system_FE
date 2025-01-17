import React, {useEffect, useState} from 'react';
import {useGetSellerQuery} from "@/services/item.service.js";
import {useGetUserByIdQuery} from "@/services/user.service.js";
import {Button, Typography} from "@material-tailwind/react";
import {Avatar, Descriptions, Image, Modal, Tag} from "antd";
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Heading} from "@/components/index.jsx";
import {useGetOrderDetailQuery} from "@/services/order.service.js";
import {SyncOutlined} from "@ant-design/icons";
import OnlineGatewayService from "@/services/apiGhn.service.js";


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

function DrawerDetailOrder({orderId, orderCode}) {
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);

    const {data: orderDetail, error: errorOrderDetail, isLoading: loadingOrderDetail, isError: isErrorOrderDetail}
        = useGetOrderDetailQuery(orderId);
    const orderData = orderDetail?.data;
    const {data: seller} = useGetSellerQuery({id: orderData?.item.itemId});
    const {data: staff} = useGetUserByIdQuery();
    const handleOpenDescriptionModal = async (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };

    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderCode) return; // Không gọi API nếu itemId không có

            setLoading(true);
            setError(null);

            try {
                const response = await OnlineGatewayService.detail_order_service({
                    order_code: orderCode,
                });
                setOrderDetails(response?.data); // Lưu dữ liệu trả về
            } catch (err) {
                setError(err.message); // Lưu thông báo lỗi
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchOrderDetails();
    }, [orderDetail?.itemId]);

    console.log("data detail", orderDetail)
    console.log("data GHN", orderDetails?.data)
    console.log("orderId", orderId)
    console.log("orderCod", orderCode)
    //const  orderDetailsGHN = orderDetails?.data

    const order = [
        {
            key: '1',
            label: 'Tên',
            children: orderData?.fullName,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: orderData?.phoneNumber,
        },
        {
            key: '3',
            label: 'Email',
            children: orderData?.email,
        },
        {
            key: '4',
            label: 'Phương thức thanh toán',
            children: "Ví nền tảng",
            span: 1,
        },
        {
            key: '5',
            label: 'Tổng số tiền',
            children: new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(orderData?.totalAmount),
            span: 1,
        },        
        {
            key: '6',
            label: 'Trạng thái',
            children:
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <p>
                        <span
                            className={`font-semibold ml-2 ${statusMapping[orderDetails?.data?.status]?.color || 'text-gray-500'}`}> {statusMapping[orderDetails?.data?.status]?.text || 'Không xác định'}</span>
                    </p>
                    <Button
                        type="primary"
                        // onClick={() => handleUpdateStatus(orderData?.id)}
                        className="px-2 py-1 text-sm h-auto"
                    >
                        Cập nhật
                    </Button>
                </div>
            ,
            span: 1,
        },
        {
            key: '7',
            label: 'Phương thức vận chuyển',
            children: "Giao hàng nhanh",
            span: 1,
        },
        {
            key: '8',
            label: 'Địa chỉ',
            children: orderData?.address,
            span: 3,
        },
        {
            key: '9',
            label: 'Ghi chú',
            children: orderData?.note,
            span: 1,
        },
        {
            key: '11',
            label: 'Mã đơn hàng',
            children: orderDetails?.data?.order_code,
            span: 1,
        },
        {
            key: '12',
            label: 'Ngày lấy dự kiến',
            children: orderDetails?.data?.pickup_time,
            span: 1,
        },
        {
            key: '10',
            label: 'Ghi chú',
            children: <p>
                {orderDetails?.data?.leadtime_order?.from_estimate_date
                    ? new Date(orderDetails?.data.leadtime_order.from_estimate_date).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })
                    : 'Không xác định'}{' '}
                -{' '}
                {orderDetails?.data?.leadtime_order?.to_estimate_date
                    ? new Date(orderDetails?.data.leadtime_order.to_estimate_date).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    })
                    : 'Không xác định'}
            </p>,
            // orderDetails?.leadtime_order
            span: 1,
        },
        {
            key: '13',
            label: 'Họ và tên Người nhận',
            children: orderDetails?.data.to_name,
            span: 1,
        },
        {
            key: '13',
            label: 'Điện thoại Người nhận',
            children: orderDetails?.data.to_phone,
            span: 1,
        },
        {
            key: '13',
            label: 'Địa chỉ Người nhận',
            children: orderDetails?.data.to_address,
            span: 1,
        },
        {
            key: '13',
            label: 'Họ và tên Người Gửi',
            children: orderDetails?.data.from_name,
            span: 1,
        },
        {
            key: '13',
            label: 'Điện thoại Người Gửi',
            children: orderDetails?.data.from_phone,
            span: 1,
        },
        {
            key: '13',
            label: 'Địa chỉ Người Gửi',
            children: orderDetails?.data.from_address,
            span: 1,
        },
        {
            key: '13',
            label: 'Mã đấu giá',
            children: orderDetail?.data.item.auction.auction_id,
            span: 1,
        },
    
  
    ];

    const items = [
        {
            key: '1',
            label: <span className="font-bold text-lg text-gray-800">Tên sản phẩm</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.itemName || 'N/A'}</span>,
            span: 4
        },
        {
            key: '2',
            label: <span className="font-bold text-lg text-gray-800">Danh mục phụ</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.scId.sub_category || 'N/A'}</span>,
            span: 2
        },
        {
            key: '3',
            label: <span className="font-bold text-lg text-gray-800">Trạng thái sản phẩm</span>,
            children: <span className="text-base text-gray-600">{orderData?.item.itemStatus || 'N/A'}</span>,
            span: 2
        },
        {
            key: '4',
            label: <span className="font-bold text-lg text-gray-800">Mô tả sản phẩm</span>,
            children: <Button
                onClick={() => handleOpenDescriptionModal(orderData?.item.itemDescription)}
                className="ql-bg-blue-500 text-white hover:bg-yellow-600"
            >
                Xem mô tả
            </Button>,
            span: 4
        }
    ];



    const itemDescription = [
        {key: '4', label: 'Hệ điều hành', children: orderData?.itemDetail?.itemSpecific?.os || 'N/A', span: 2},
        {key: '5', label: 'Màu sắc', children: orderData?.itemDetail?.color || 'N/A', span: 2},
        {key: '6', label: 'Bộ nhớ', children: orderData?.itemDetail?.itemSpecific?.ram || 'N/A', span: 2},
        {key: '7', label: 'Kích cỡ màn hình', children: orderData?.itemDetail?.itemSpecific?.screen_size || 'N/A', span: 2},
        {key: '8', label: 'Độ phân giải camera', children: orderData?.itemDetail?.itemSpecific?.camera_specs || 'N/A', span: 2},
        {key: '9', label: 'Khả năng kết nối', children: orderData?.itemDetail?.itemSpecific?.connectivity || 'N/A', span: 2},
        {key: '10', label: 'Độ phân dải màn hình', children: orderData?.itemDetail?.itemSpecific?.sensors || 'N/A', span: 2},
        {key: '11', label: 'Cổng kết nôi', children: orderData?.itemDetail?.itemSpecific?.usb || 'N/A', span: 2}
    ];
    return (
        <>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    // eslint-disable-next-line react/jsx-key
                    <Button color="blue" onClick={handleCloseDescriptionModal}
                            className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription}/>
            </Modal>
            {/* auction creation section */}
            <div className="mt-[26px] flex flex-col items-center">
                <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] md:px-5 sm:gap-[39px]">
                    <Descriptions title="THÔNG TIN ĐƠN HÀNG" items={order}/>
                    <div className="self-stretch">

                        <div className="flex items-center w-full gap-[34px] md:flex-col">
                            <div className="flex-1 bg-green-50 rounded-2xl p-6 flex flex-col gap-4">
                                <Descriptions
                                    title={<div className="w-full text-center text-xl font-semibold">Thông tin sản
                                        phẩm</div>} layout="vertical" items={items}/>
                                {/* <Descriptions
                                    title={<div className="w-full text-center text-xl font-semibold">Mô tả sản
                                        phẩm</div>}
                                    items={itemDescription} className="mt-4"/> */}
                            </div>

                            <div className=" mx-auto bg-green-50 rounded-2xl p-6 ">
                                <div className="w-80">
                                    <Image.PreviewGroup
                                        preview={{
                                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            {orderData?.item.images?.map((images, index) => (
                                                <div key={index} className="flex justify-center items-center">
                                                    <Image width={400}
                                                           src={images.image}/>
                                                </div>
                                            ))}
                                        </div>
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-between gap-8 mt-5">
                {/* Người bán */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người
                        bán</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                            <div className="flex items-center gap-4">
                                <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{seller?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {seller?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>
                        </div>
                    </div>

                </div>

                {/* Người thẩm định */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm
                        định</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl sẽ giới hạn chiều rộng tối đa */}
                            <div className="flex items-center gap-4">
                                <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{staff?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {staff?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DrawerDetailOrder;