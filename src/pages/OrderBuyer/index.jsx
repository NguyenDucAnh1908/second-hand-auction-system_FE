import { Helmet } from "react-helmet";
import React, { useState } from "react"; // Import useState
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import { Breadcrumb, Layout, theme, Table, Spin, Alert, Button, Modal, Skeleton, Empty } from "antd"; // Import Modal
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useGetOrderQuery } from "../../services/order.service";
import { FaShoppingCart, FaProductHunt, FaGavel } from 'react-icons/fa'; // Importing icons from react-icons
import FeedbackForm from "../../components/FeedbackForm";

const { Content, Sider } = Layout;

export default function OrderManagementBuyer() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, error, isLoading } = useGetOrderQuery({ page: 0, limit: 10 });
    console.log(data);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


    const statusStyles = {
        PENDING: 'bg-gray-500 text-white',
        CONFIRMED: 'bg-green-500 text-white',
        CANCELED: 'bg-red-500 text-white',
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
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) => (
                <div className="flex justify-center">
                    <span
                        className={`flex items-center justify-center w-32 h-8 px-9 ${statusStyles[status] || 'bg-gray-300 text-black'}`}>
                        {status}
                    </span>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
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
                        onClick={() => handleDetailClick(record)} // Pass the entire record to the function
                    >
                        Detail
                    </Button>
                    <Button
                        type="default"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold"
                        onClick={() => handleReviewClick(record)} // Function to handle review button click
                    >
                        Đánh Giá
                    </Button>
                </>
            ),
        }


        ,
    ];

    const handleDetailClick = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true); // Open the order details modal
    };

    const handleReviewClick = (order) => {
        setSelectedOrder(order);
        setIsFeedbackModalVisible(true); // Open the feedback modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const handleFeedbackModalClose = () => {
        setIsFeedbackModalVisible(false);
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
        termConditions: order.auctionOrder.termConditions
    })) || [];

    return (
        <>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Trạng thái:</strong>
                                    <span>{selectedOrder.status}</span>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Trạng thái :</strong>
                                    <span>{selectedOrder.status}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>Điều khoản :</strong>
                                    <span>{selectedOrder.termConditions}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Modal to handle feedback */}
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
                                    <FaProductHunt style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
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



            </Layout>
        </>
    );
}
