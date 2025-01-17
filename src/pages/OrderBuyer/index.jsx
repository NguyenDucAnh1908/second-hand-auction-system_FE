import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react"; // Import useState
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import {
    Breadcrumb, Layout, theme, Table, Spin, Alert, Button, Modal, Skeleton, Empty,
    Tag, Statistic, Drawer, Space, Image, message, Select, Upload, Input
} from "antd";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useGetOrderQuery } from "../../services/order.service";
import { FaShoppingCart, FaProductHunt, FaGavel } from 'react-icons/fa';
import FeedbackForm from "../../components/FeedbackForm";
import { useCheckFeedbackQuery } from "../../services/feedback.service";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined, UploadOutlined,
} from '@ant-design/icons';
import OnlineGatewayService from "@/services/apiGhn.service.js";
import { useGetImageItemsQuery } from "@/services/item.service.js";
import OrderDetailCompoment from "@/components/OrderDetailCompoment/index.jsx";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import {useCreateReportMutation} from "@/services/report.service.js";

const statusMapping = {
    ready_to_pick: { text: 'Mới tạo đơn hàng', color: 'text-gray-500' },
    picking: { text: 'Nhân viên đang lấy hàng', color: 'text-blue-500' },
    cancel: { text: 'Hủy đơn hàng', color: 'text-red-500' },
    money_collect_picking: { text: 'Đang thu tiền người gửi', color: 'text-yellow-500' },
    picked: { text: 'Nhân viên đã lấy hàng', color: 'text-green-500' },
    storing: { text: 'Hàng đang nằm ở kho', color: 'text-purple-500' },
    transporting: { text: 'Đang luân chuyển hàng', color: 'text-blue-400' },
    sorting: { text: 'Đang phân loại hàng hóa', color: 'text-teal-500' },
    delivering: { text: 'Nhân viên đang giao cho người nhận', color: 'text-orange-500' },
    money_collect_delivering: { text: 'Nhân viên đang thu tiền người nhận', color: 'text-yellow-600' },
    delivered: { text: 'Nhân viên đã giao hàng thành công', color: 'text-green-600' },
    delivery_fail: { text: 'Nhân viên giao hàng thất bại', color: 'text-red-600' },
    waiting_to_return: { text: 'Đang đợi trả hàng về cho người gửi', color: 'text-gray-400' },
    return: { text: 'Trả hàng', color: 'text-purple-400' },
    return_transporting: { text: 'Đang luân chuyển hàng trả', color: 'text-blue-300' },
    return_sorting: { text: 'Đang phân loại hàng trả', color: 'text-teal-400' },
    returning: { text: 'Nhân viên đang đi trả hàng', color: 'text-orange-400' },
    return_fail: { text: 'Nhân viên trả hàng thất bại', color: 'text-red-400' },
    returned: { text: 'Nhân viên trả hàng thành công', color: 'text-green-400' },
    exception: { text: 'Đơn hàng ngoại lệ không nằm trong quy trình', color: 'text-pink-500' },
    damage: { text: 'Hàng bị hư hỏng', color: 'text-red-700' },
    lost: { text: 'Hàng bị mất', color: 'text-black' },
};
const {TextArea} = Input;
const { Content, Sider } = Layout;
export default function OrderManagementBuyer() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isFeedbackSellerModalVisible, setIsFeedbackSellerModalVisible] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error1, setError] = useState(null);
    const [reportType, setReportType] = useState("DAMAGED_PRODUCT");
    const [reason, setReason] = useState("");
    const [uploadFileList, setUploadFileList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { UploadImage } = useHookUploadImage();
    const [openReport, setOpenReport] = useState(false);

    const { data, error, isLoading } = useGetOrderQuery({ page: 0, limit: 10 });

    // id of item
    const id = selectedOrder?.itemId;
    const {
        data: itemImage,
        isError: itemImageError,
        isLoading: itemImageLoading,
        isSuccess: isSuccessImage,
        refetch: refetchImage
    } = useGetImageItemsQuery({ id });

    const [createReport, {
        isLoading: loadingCreateReport,
        isSuccess: isSuccessCreateReport,
        isError: isErrorCreateReport,
        error: errorCreateReport,
    }] = useCreateReportMutation();


    const handleSubmit = async () => {
        if (!reason.trim()) {
            message.error("Vui lòng nhập lý do!");
            return;
        }

        setIsSubmitting(true); // Bắt đầu loading

        try {
            let evidenceUrl = null;

            if (uploadFileList?.[0]?.originFileObj) {
                const file = uploadFileList[0].originFileObj;
                evidenceUrl = await UploadImage(file); // Upload hình lên Firebase
            }

            await createReport({
                type: reportType,
                reason: reason.trim(),
                evidence: evidenceUrl, // URL ảnh đã upload
                orderId: 1,
            }).unwrap();

            message.success("Gửi báo cáo thành công!");
            setOpen(false); // Đóng Modal
            setReason(""); // Reset trạng thái
            setReportType("DAMAGED_PRODUCT");
            //refetchReport();
        } catch (error) {
            console.error("Error:", error);
            message.error("Gửi báo cáo thất bại! Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false); // Tắt loading
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setReportType(value);
    };

    const uploadProps = {
        multiple: false, // Chỉ cho phép tải lên một file
        beforeUpload: () => false, // Chặn tự động upload (sẽ upload thủ công bằng Firebase)
        onChange(info) {
            setUploadFileList(info.fileList); // Lưu danh sách file vào state
            if (info.file.status === 'removed') {
                setUploadFileList([]); // Xóa file nếu người dùng xóa
            }
        },
    };


    const handleDetailClick = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true); // Open the order details modal
    };

    const handleReviewClick = (order) => {
        setSelectedOrder(order);
        setIsFeedbackModalVisible(true);
    };

    const handleViewFeedbackClick = (order) => {
        setSelectedOrder(order);
        setIsFeedbackSellerModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleFeedbackModalClose = () => {
        setIsFeedbackModalVisible(false);
        setSelectedOrder(null);
    };

    const handleFeedbackSellerModalClose = () => {
        setIsFeedbackSellerModalVisible(false);
        setSelectedOrder(null);
    };

    const dataSource = data?.data.map(order => ({
        key: order.id,
        id: order.orderId,
        email: order.email,
        phoneNumber: order.phoneNumber,
        totalPrice: order.totalPrice,
        status: order.orderStatus,
        note: order.note,
        quantity: order.quantity,
        paymentMethod: order.paymentMethod,
        shippingType: order.shippingType,
        itemId: order.item.itemId,
        itemName: order.item.itemName,
        sellerName: order.item.sellerName,
        thumbnail: order.item.thumbnail,
        auctionId: order.auctionOrder.auctionId,
        auctionTypeName: order.auctionOrder.auctionTypeName,
        priceStep: order.auctionOrder.priceStep,
        auctionstatus: order.auctionOrder.status,
        termConditions: order.auctionOrder.termConditions,
        feedback: order.feedback,
        orderCode: order.orderCode
    })) || [];

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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => (
                <Statistic value={totalPrice} />
            ),
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => {
                const { text, color } = statusMapping[status] || { text: 'Trạng thái không xác định', color: 'default' };
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold mr-2"
                        onClick={() => handleDetailClick(record)}
                    >
                        Chi tiết
                    </Button>
                     <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold mr-2"
                        // onClick={() => handleDetailClick(record)}
                        onClick={() => showLoading(record)}
                    >
                        Chi tiết BK
                    </Button>
                    {record.feedback ? (
                        <Button
                            type="default"
                            className="bg-yellow-700 hover:bg-gray-600 text-white font-bold"
                            onClick={() => handleViewFeedbackClick(record)}
                        >
                            Xem Đánh Giá
                        </Button>
                    ) : (
                        record.status === "delivered" && (
                            <Button
                                type="default"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold"
                                onClick={() => handleReviewClick(record)}
                            >
                                Đánh Giá
                            </Button>
                        )
                    )}
                    {/*<Button*/}
                    {/*    type="primary"*/}
                    {/*    className="bg-blue-500 hover:bg-blue-600 text-white font-bold mr-2"*/}
                    {/*    //onClick={() => handleDetailClick(record)}*/}
                    {/*    onClick={() => setOpenReport(true)}*/}
                    {/*>*/}
                    {/*    Báo cáo*/}
                    {/*</Button>*/}
                </>
            ),
        },
    ];

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


    const dataSourceDelivery = orderDetails?.log?.map(statusDelivery => ({
        key: statusDelivery.trip_code,
        status: statusDelivery.status,
        statusText: statusMapping[statusDelivery.status]?.text || 'Không xác định',
        statusColor: statusMapping[statusDelivery.status]?.color || 'text-gray-500',
        payment_type_id: statusDelivery.payment_type_id,
        trip_code: statusDelivery.trip_code,
        updated_date: statusDelivery.updated_date
    })) || [];

    //console.log("orderDetails", orderDetails)
    // if (loading) return <p>Loading...</p>;
    // if (error1) return <p>Error: {error1}</p>;
    return (
        <>

            <Modal
                title="Gửi báo cáo"
                centered
                open={openReport}
                onOk={handleSubmit}
                confirmLoading={isSubmitting} // Loading trong toàn bộ quá trình
                onCancel={() => setOpenReport(false)}
                width={1000}
                okText="Gửi"
                cancelText="Hủy"
            >
                <Select
                    defaultValue="DAMAGED_PRODUCT"
                    style={{ width: 240 }}
                    onChange={handleChange}
                    options={[
                        { value: 'DAMAGED_PRODUCT', label: 'Hàng lỗi' },
                        { value: 'MISSING_BALANCE', label: 'Không nhận được tiền' },
                        { value: 'SERVICE_NOT_WORKING', label: 'Dịch vụ không hoạt động' },
                        { value: 'TRANSACTION_ERROR', label: 'Lỗi giao dịch' },
                        { value: 'ACCOUNT_LOCKED', label: 'Tài khoản bị khóa' },
                        { value: 'DISPLAY_ERROR', label: 'Lỗi hiển thị' },
                        { value: 'OTHER', label: 'Lỗi khác' },
                    ]}
                />
                <TextArea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{ marginTop: '16px' }}
                    rows={4}
                />
                <Upload {...uploadProps} fileList={uploadFileList}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Modal>

            <Helmet>
                <title>Order Management</title>
            </Helmet>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header2 />
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>Orders</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <SiderUserBK />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            {isLoading ? (
                                // <Spin size="large"/>
                                <Skeleton active avatar={true} title={true} round={true} paragraph={true}
                                />
                            ) : error ? (
                                <Empty />
                            ) : (
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={{ pageSize: 10 }}
                                    rowClassName="align-middle"
                                />
                            )}
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"
                />

                {/* Modal to display order details */}


                <Modal
                    title="Chi tiết đơn hàng"
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                    width={600} // Set a width for the modal
                    bodyStyle={{ padding: '20px' }} // Add padding to modal body
                >
                    {selectedOrder && (
                        <div>
                            {/* Order Details Section */}
                            <div style={{
                                backgroundColor: '#f0f8ff',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaShoppingCart style={{ marginRight: '10px', color: '#007bff' }} /> {/* Order Icon */}
                                    Thông tin đơn hàng
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>ID:</strong>
                                    <span>{selectedOrder.id}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Email:</strong>
                                    <span>{selectedOrder.email}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số điện thoại:</strong>
                                    <span>{selectedOrder.phoneNumber}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số tiền:</strong>
                                    <span>{selectedOrder.totalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Trạng thái:</strong>
                                    <span
                                        style={{
                                            color: statusMapping[selectedOrder.status]?.color || '#000',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {statusMapping[selectedOrder.status]?.text || 'Trạng thái không xác định'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Ghi chú:</strong>
                                    <span>{selectedOrder.note}</span>
                                </div>
                            </div>

                            {/* Item Details Section */}
                            <div style={{
                                backgroundColor: '#fff8dc',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '15px'
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaProductHunt
                                        style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Số lượng:</strong>
                                    <span>{selectedOrder.quantity}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Phương thức thanh toán:</strong>
                                    <span>{selectedOrder.paymentMethod}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Phương thức vận chuyển:</strong>
                                    <span>{selectedOrder.shippingType}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Mã sản phẩm:</strong>
                                    <span>{selectedOrder.itemId}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                        style={{ borderRadius: '5px', marginLeft: '10px' }} />
                                </div>
                            </div>

                            {/* Auction Details Section */}
                            <div style={{ backgroundColor: '#ffe4e1', padding: '15px', borderRadius: '5px' }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaGavel style={{ marginRight: '10px', color: '#ff4500' }} /> {/* Auction Icon */}
                                    Thông tin đấu giá
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Mã đấu giá:</strong>
                                    <span>{selectedOrder.auctionId}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Kiểu dấu giá:</strong>
                                    <span>{selectedOrder.auctionTypeName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Bước giá:</strong>
                                    <span>{selectedOrder.priceStep}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Trạng thái:</strong>
                                    <span
                                        style={{
                                            color: statusMapping[selectedOrder.status]?.color || '#000',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {statusMapping[selectedOrder.status]?.text || 'Trạng thái không xác định'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Điều khoản :</strong>
                                    <span>{selectedOrder.termConditions}</span>
                                </div>
                            </div>

                            {/*test data GHN*/}
                            {/*<div>*/}
                            {/*    {orderDetails ? (*/}
                            {/*        <pre>{JSON.stringify(orderDetails, null, 2)}</pre>*/}
                            {/*    ) : (*/}
                            {/*        <p>No order details available.</p>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </div>
                    )}
                </Modal>

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
                    {/*{selectedOrder && orderDetails && (*/}
                    {/*    <div className="p-6 bg-gray-100 min-h-screen">*/}
                    {/*        /!* Thông tin đơn hàng *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN ĐƠN HÀNG</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p><strong>Mã đơn hàng:</strong> {orderDetails?.order_code}</p>*/}
                    {/*                <p>*/}
                    {/*                    <strong>Ngày lấy dự kiến:</strong>{' '}*/}
                    {/*                    {orderDetails?.pickup_time*/}
                    {/*                        ? new Date(orderDetails.pickup_time).toLocaleString('vi-VN', {*/}
                    {/*                            day: '2-digit',*/}
                    {/*                            month: '2-digit',*/}
                    {/*                            year: 'numeric',*/}
                    {/*                            hour: '2-digit',*/}
                    {/*                            minute: '2-digit',*/}
                    {/*                        })*/}
                    {/*                        : 'Không xác định'}*/}
                    {/*                </p>*/}
                    {/*                <p>*/}
                    {/*                    <strong>Ngày giao dự kiến:</strong>{' '}*/}
                    {/*                    {orderDetails?.leadtime_order?.from_estimate_date*/}
                    {/*                        ? new Date(orderDetails.leadtime_order.from_estimate_date).toLocaleDateString('vi-VN', {*/}
                    {/*                            day: '2-digit',*/}
                    {/*                            month: '2-digit',*/}
                    {/*                            year: 'numeric',*/}
                    {/*                        })*/}
                    {/*                        : 'Không xác định'}{' '}*/}
                    {/*                    -{' '}*/}
                    {/*                    {orderDetails?.leadtime_order?.to_estimate_date*/}
                    {/*                        ? new Date(orderDetails.leadtime_order.to_estimate_date).toLocaleDateString('vi-VN', {*/}
                    {/*                            day: '2-digit',*/}
                    {/*                            month: '2-digit',*/}
                    {/*                            year: 'numeric',*/}
                    {/*                        })*/}
                    {/*                        : 'Không xác định'}*/}
                    {/*                </p>*/}
                    {/*                <p>*/}
                    {/*                    <strong>Trạng thái hiện tại:</strong>*/}
                    {/*                    <span*/}
                    {/*                        className={`font-semibold ml-2 ${statusMapping[orderDetails?.status]?.color || 'text-gray-500'}`}> {statusMapping[orderDetails?.status]?.text || 'Không xác định'}</span>*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Thông tin chi tiết *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN CHI TIẾT</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p><strong>Mã đơn khách hàng:</strong> {selectedOrder?.itemId} </p>*/}
                    {/*                <p><strong>Sản phẩm:</strong> {selectedOrder?.itemName} </p>*/}
                    {/*                <p><strong>Lưu ý giao hàng:</strong> {selectedOrder?.note} </p>*/}
                    {/*                <p><strong>Phương thức thanh toán:</strong> {selectedOrder?.paymentMethod} </p>*/}

                    {/*            </div>*/}
                    {/*            <div className="mt-2 grid grid-cols-3 gap-1">*/}
                    {/*                <Image.PreviewGroup*/}
                    {/*                    preview={{*/}
                    {/*                        onChange: (current, prev) =>*/}
                    {/*                            console.log(`current index: ${current}, prev index: ${prev}`),*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    {itemImage.map((image, index) => (*/}
                    {/*                        <Image*/}
                    {/*                            key={index}*/}
                    {/*                            width={200}*/}
                    {/*                            src={image.image} // Thay `url` bằng tên chính xác của trường trả về từ API*/}
                    {/*                            alt={`Image ${index + 1}`}*/}
                    {/*                        />*/}
                    {/*                    ))}*/}
                    {/*                </Image.PreviewGroup>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Người nhận *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">NGƯỜI NHẬN</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p><strong>Họ và tên:</strong> {orderDetails?.to_name}</p>*/}
                    {/*                <p><strong>Điện thoại:</strong> {orderDetails?.to_phone}</p>*/}
                    {/*                /!*<p><strong>Email:</strong> {selectedOrder?.email}</p>*!/*/}
                    {/*                <p className="col-span-2"><strong>Địa chỉ:</strong> {orderDetails?.to_address} </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Người Gửi *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">NGƯỜI GỬI</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p><strong>Họ và tên:</strong> {orderDetails?.from_name}</p>*/}
                    {/*                <p><strong>Điện thoại:</strong> {orderDetails?.from_phone}</p>*/}
                    {/*                <p className="col-span-2"><strong>Địa chỉ:</strong> {orderDetails?.from_address}</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Thông tin đấu giá *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN ĐẤU GIÁ</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p><strong>Mã đấu giá:</strong> {selectedOrder?.auctionId} </p>*/}
                    {/*                <p><strong>Kiểu dấu giá:</strong> {selectedOrder?.auctionTypeName}</p>*/}
                    {/*                <p><strong>Số tiền đấu giá:</strong> {selectedOrder?.totalPrice} </p>*/}
                    {/*                <p><strong>Bước giá:</strong> {selectedOrder?.priceStep} </p>*/}
                    {/*                <p><strong>Trạng thái:</strong> {selectedOrder?.status} </p>*/}
                    {/*                <p><strong>Điều khoản:</strong> {selectedOrder?.termConditions} </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Chi phí *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">CHI PHÍ</h3>*/}
                    {/*            <div className="grid grid-cols-2 gap-4">*/}
                    {/*                <p>*/}
                    {/*                    <strong>Người trả:</strong>{" "}*/}
                    {/*                    {orderDetails?.payment_type_id === 1*/}
                    {/*                        ? "Người Gửi trả phí"*/}
                    {/*                        : orderDetails?.payment_type_id === 2*/}
                    {/*                            ? "Người nhận trả phí"*/}
                    {/*                            : "Không xác định"}*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        /!* Lịch sử đơn hàng *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md mb-6">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Lịch sử đơn hàng</h3>*/}
                    {/*            <div className="grid grid-cols-5 gap-4 text-sm text-gray-700">*/}
                    {/*            </div>*/}
                    {/*            <Table pagination={false} columns={historyDelivery} dataSource={dataSourceDelivery}/>*/}
                    {/*        </div>*/}

                    {/*        /!* Nhật ký người dùng *!/*/}
                    {/*        <div className="bg-white p-6 rounded-lg shadow-md">*/}
                    {/*            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Nhật ký người dùng</h3>*/}
                    {/*            /!* Thêm nội dung nếu cần *!/*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                    {selectedOrder && orderDetails && (
                        <OrderDetailCompoment
                            selectedOrder={selectedOrder}
                            orderDetails={orderDetails}
                            statusMapping={statusMapping}
                            itemImage={itemImage}
                            historyDelivery={historyDelivery}
                            dataSourceDelivery={dataSourceDelivery}
                        />
                    )}
                </Drawer>

                {/* Modal to handle create feedback */}
                <Modal
                    title="Đánh giá sản phẩm"
                    visible={isFeedbackModalVisible}
                    onCancel={handleFeedbackModalClose}
                    footer={null}
                    width={600}
                    bodyStyle={{ padding: '20px' }}
                >
                    {selectedOrder && (
                        <div>

                            {/* Item Details Section (again) */}
                            <div style={{
                                backgroundColor: '#fff8dc',
                                padding: '15px',
                                borderRadius: '5px',
                                marginTop: '20px' // Adding a margin to separate it from the feedback form
                            }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaProductHunt
                                        style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>


                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                        style={{ borderRadius: '5px', marginLeft: '10px' }} />
                                </div>
                            </div>

                            {/* Feedback Form */}
                            <FeedbackForm order={selectedOrder} />
                        </div>
                    )}
                </Modal>


                {/* Modal to handle show feedback */}
                <Modal
                    title="Xem đánh giá"
                    visible={isFeedbackSellerModalVisible}
                    onCancel={handleFeedbackSellerModalClose}
                    footer={null}
                    width={600}
                    bodyStyle={{ padding: '20px', overflowY: 'auto' }}
                >
                    {selectedOrder && selectedOrder.feedback ? (
                        <div>
                            {/* Feedback Section */}
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {/* User Info Section */}
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <img
                                        src="/images/user.png"
                                        alt="User Avatar"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                        {selectedOrder.feedback.username}
                                    </div>
                                </div>

                                {/* Rating Section - Stars Below Username */}
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{ fontSize: '24px', color: '#ff8c00' }}>
                                        {/* Display stars based on rating */}
                                        {Array(selectedOrder.feedback.rating)
                                            .fill('★')
                                            .join('')}
                                        {Array(5 - selectedOrder.feedback.rating)
                                            .fill('☆')
                                            .join('')}
                                    </div>
                                </div>

                                {/* Comment Section */}
                                <div style={{ marginBottom: '15px' }}>
                                    <p style={{ fontStyle: 'italic', color: '#555', fontSize: '14px' }}>
                                        {selectedOrder.feedback.comment}
                                    </p>
                                </div>

                                {/* Timestamp Section */}
                                <div
                                    style={{
                                        marginBottom: '15px',
                                        fontSize: '12px',
                                        color: '#888',
                                        textAlign: 'left',
                                    }}
                                >
                                    {new Date(selectedOrder.feedback.createAt).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>

                                {/* Reply from Seller Section */}
                                {selectedOrder.feedback.replyComment && (
                                    <div
                                        style={{
                                            backgroundColor: '#f1f8ff',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            marginTop: '20px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <strong>Phản hồi từ người bán:</strong>
                                        <p
                                            style={{
                                                fontStyle: 'italic',
                                                color: '#007bff',
                                                fontSize: '14px',
                                                marginTop: '5px',
                                            }}
                                        >
                                            {selectedOrder.feedback.replyComment}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Empty description="Không có đánh giá nào." />
                    )}
                </Modal>
            </Layout>
        </>
    );
}
