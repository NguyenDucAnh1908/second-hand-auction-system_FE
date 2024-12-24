import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react"; // Import useState
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import {
    Breadcrumb,
    Layout,
    theme,
    Table,
    Spin,
    Alert,
    Button,
    Modal,
    Skeleton,
    Empty,
    Tag,
    Statistic,
    Drawer, Space
} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {useGetOrderQuery} from "../../services/order.service";
import {FaShoppingCart, FaProductHunt, FaGavel} from 'react-icons/fa';
import FeedbackForm from "../../components/FeedbackForm";
import {useCheckFeedbackQuery} from "../../services/feedback.service";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import OnlineGatewayService from "@/services/apiGhn.service.js";


const {Content, Sider} = Layout;
export default function OrderManagementBuyer() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const {data, error, isLoading} = useGetOrderQuery({page: 0, limit: 10});
    //console.log("data",data);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isFeedbackSellerModalVisible, setIsFeedbackSellerModalVisible] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error1, setError] = useState(null);

    const statusStyles = {
        PENDING: 'bg-gray-500 text-white',
        CONFIRMED: 'bg-green-500 text-white',
        CANCELED: 'bg-red-500 text-white',
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


    // const showLoading = (order) => {
    //     setOpen(true);
    //     setLoading(true);
    //     setSelectedOrder(order);
    //     // setIsModalVisible(true);
    //     // Simple loading mock. You should add cleanup logic in real world.
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 10);
    // };

    const showLoading = async (order) => {
        setOpen(true); // Mở modal hoặc trạng thái cần thiết
        setLoading(true); // Hiển thị trạng thái loading
        setSelectedOrder(order); // Cập nhật selectedOrder

        try {
            const response = await OnlineGatewayService.detail_order_service({
                order_code: order?.orderCode,
                //order_code: "LDM3BV",
            });
            setOrderDetails(response?.data.data);
        } catch (err) {
            setError(err.message); // Xử lý lỗi
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    //console.log("selectedOrder.orderCode", selectedOrder.orderCode)
    // useEffect(() => {
    //     const fetchOrderDetails = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await OnlineGatewayService.detail_order_service({
    //                 order_code: "LDM3BV", // Example data
    //             });
    //             setOrderDetails(response.data);
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchOrderDetails();
    // }, []);

    console.log("data GHN", orderDetails)
    console.log("data server", selectedOrder)

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
                <Statistic value={totalPrice}/>
            ),
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <Tag icon={<SyncOutlined spin/>} color="processing">
                    {status}
                </Tag>
            ),
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
                </>
            ),
        },
    ];

    const historyDelivery = [
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <a>{text}</a>, // Hiển thị trạng thái dưới dạng liên kết
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
        payment_type_id: statusDelivery.payment_type_id,
        trip_code: statusDelivery.trip_code,
        updated_date: statusDelivery.updated_date
    })) || [];


    // if (loading) return <p>Loading...</p>;
    // if (error1) return <p>Error: {error1}</p>;
    return (
        <>
            <Helmet>
                <title>Order Management</title>
            </Helmet>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
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
                            <SiderUserBK/>
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
                                <Empty/>
                            ) : (
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={{pageSize: 10}}
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
                    bodyStyle={{padding: '20px'}} // Add padding to modal body
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
                                <h3 style={{margin: '0 0 10px', display: 'flex', alignItems: 'center'}}>
                                    <FaShoppingCart style={{marginRight: '10px', color: '#007bff'}}/> {/* Order Icon */}
                                    Thông tin đơn hàng
                                </h3>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>ID:</strong>
                                    <span>{selectedOrder.id}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Email:</strong>
                                    <span>{selectedOrder.email}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Số điện thoại:</strong>
                                    <span>{selectedOrder.phoneNumber}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Số tiền:</strong>
                                    <span>{selectedOrder.totalPrice}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Trạng thái:</strong>
                                    <span>{selectedOrder.status}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                                <h3 style={{margin: '0 0 10px', display: 'flex', alignItems: 'center'}}>
                                    <FaProductHunt
                                        style={{marginRight: '10px', color: '#ff7f50'}}/> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Số lượng:</strong>
                                    <span>{selectedOrder.quantity}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Phương thức thanh toán:</strong>
                                    <span>{selectedOrder.paymentMethod}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Phương thức vận chuyển:</strong>
                                    <span>{selectedOrder.shippingType}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Mã sản phẩm:</strong>
                                    <span>{selectedOrder.itemId}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                         style={{borderRadius: '5px', marginLeft: '10px'}}/>
                                </div>
                            </div>

                            {/* Auction Details Section */}
                            <div style={{backgroundColor: '#ffe4e1', padding: '15px', borderRadius: '5px'}}>
                                <h3 style={{margin: '0 0 10px', display: 'flex', alignItems: 'center'}}>
                                    <FaGavel style={{marginRight: '10px', color: '#ff4500'}}/> {/* Auction Icon */}
                                    Thông tin đấu giá
                                </h3>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Mã đấu giá:</strong>
                                    <span>{selectedOrder.auctionId}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Kiểu dấu giá:</strong>
                                    <span>{selectedOrder.auctionTypeName}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Bước giá:</strong>
                                    <span>{selectedOrder.priceStep}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Trạng thái :</strong>
                                    <span>{selectedOrder.status}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                    title={<p>Loading Drawer</p>}
                    placement="right"
                    open={open}
                    loading={loading}
                    onClose={() => setOpen(false)}
                    size='large'
                    width={900}
                >
                    {selectedOrder && orderDetails && (
                        <div className="p-6 bg-gray-100 min-h-screen">
                            {/* Thông tin đơn hàng */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN ĐƠN HÀNG</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Mã đơn hàng:</strong> {orderDetails?.order_code}</p>
                                    <p><strong>Ngày lấy dự kiến:</strong> {orderDetails?.pickup_time}</p>
                                    <p><strong>Ngày giao dự
                                        kiến:</strong> {orderDetails?.leadtime_order.from_estimate_date} - {orderDetails?.leadtime_order.to_estimate_date}
                                    </p>
                                    <p>
                                        <strong>Trạng thái hiện tại:</strong>
                                        <span className="text-blue-500 font-semibold ml-2">{orderDetails?.status}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Thông tin chi tiết */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN CHI TIẾT</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Mã đơn khách hàng:</strong></p>
                                    <p><strong>Sản phẩm:</strong> Áo Polo <span className="text-gray-500">x1</span></p>
                                    <p><strong>Cân nặng:</strong> 30 gram</p>
                                    <p><strong>Lưu ý giao hàng:</strong> Không cho xem hàng</p>
                                </div>
                            </div>

                            {/* Người nhận */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">NGƯỜI NHẬN</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Họ và tên:</strong> {orderDetails?.to_name}</p>
                                    <p><strong>Điện thoại:</strong> {orderDetails?.to_phone}</p>
                                    <p className="col-span-2"><strong>Địa chỉ:</strong> {orderDetails?.to_address} </p>
                                </div>
                            </div>

                            {/* Người Gửi */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">NGƯỜI GỬI</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Họ và tên:</strong> {orderDetails?.from_name}</p>
                                    <p><strong>Điện thoại:</strong> {orderDetails?.from_phone}</p>
                                    <p className="col-span-2"><strong>Địa chỉ:</strong> {orderDetails?.from_address}</p>
                                </div>
                            </div>

                            {/* Thông tin đấu giá */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN ĐẤU GIÁ</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Mã đấu giá:</strong> {selectedOrder.auctionId} </p>
                                    <p><strong>Kiểu dấu giá:</strong> {selectedOrder.auctionTypeName}</p>
                                    <p><strong>Bước giá:</strong> {selectedOrder.priceStep} </p>
                                    <p><strong>Trạng thái:</strong> {selectedOrder.status} </p>
                                    <p><strong>Điều khoản:</strong> {selectedOrder.termConditions} </p>
                                </div>
                            </div>

                            {/* Chi phí */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">CHI PHÍ</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <p>
                                        <strong>Người trả:</strong>{" "}
                                        {orderDetails?.payment_type_id === 1
                                            ? "Người Gửi trả phí"
                                            : orderDetails?.payment_type_id === 2
                                                ? "Người nhận trả phí"
                                                : "Không xác định"}
                                    </p>
                                </div>
                            </div>

                            {/* Lịch sử đơn hàng */}
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Lịch sử đơn hàng</h3>
                                <div className="grid grid-cols-5 gap-4 text-sm text-gray-700">
                                    {/*<p>Thứ 2, 23/12/2024</p>*/}
                                    {/*<p>Chi tiết</p>*/}
                                    {/*<p>Chờ lấy hàng</p>*/}
                                    {/*<p>72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam</p>*/}
                                    {/*<p>14:40</p>*/}

                                </div>
                                <Table pagination={false} columns={historyDelivery} dataSource={dataSourceDelivery} />
                            </div>

                            {/* Nhật ký người dùng */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold border-b pb-2 mb-4">Nhật ký người dùng</h3>
                                {/* Thêm nội dung nếu cần */}
                            </div>
                        </div>
                    )}
                </Drawer>

                {/* Modal to handle create feedback */}
                <Modal
                    title="Đánh giá sản phẩm"
                    visible={isFeedbackModalVisible}
                    onCancel={handleFeedbackModalClose}
                    footer={null}
                    width={600}
                    bodyStyle={{padding: '20px'}}
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
                                <h3 style={{margin: '0 0 10px', display: 'flex', alignItems: 'center'}}>
                                    <FaProductHunt
                                        style={{marginRight: '10px', color: '#ff7f50'}}/> {/* Product Icon */}
                                    Thông tin sản phẩm
                                </h3>


                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Tên sản phẩm:</strong>
                                    <span>{selectedOrder.itemName}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <strong>Tên người bán:</strong>
                                    <span>{selectedOrder.sellerName}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <strong>Hình ảnh:</strong>
                                    <img src={selectedOrder.thumbnail} alt="Product thumbnail" width="100"
                                         style={{borderRadius: '5px', marginLeft: '10px'}}/>
                                </div>
                            </div>

                            {/* Feedback Form */}
                            <FeedbackForm order={selectedOrder}/>
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
                    bodyStyle={{padding: '20px', overflowY: 'auto'}}
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
                                <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
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
                                    <div style={{fontSize: '18px', fontWeight: 'bold', color: '#333'}}>
                                        {selectedOrder.feedback.username}
                                    </div>
                                </div>

                                {/* Rating Section - Stars Below Username */}
                                <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                                    <div style={{fontSize: '24px', color: '#ff8c00'}}>
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
                                <div style={{marginBottom: '15px'}}>
                                    <p style={{fontStyle: 'italic', color: '#555', fontSize: '14px'}}>
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
                        <Empty description="Không có đánh giá nào."/>
                    )}
                </Modal>
            </Layout>
        </>
    );
}
