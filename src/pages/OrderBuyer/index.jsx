import { Helmet } from "react-helmet";
import React, { useState } from "react"; // Import useState
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import { Breadcrumb, Layout, theme, Table, Spin, Alert, Button, Modal } from "antd"; // Import Modal
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useGetOrderQuery } from "../../services/order.service";
import { FaShoppingCart, FaProductHunt, FaGavel } from 'react-icons/fa'; // Importing icons from react-icons

const { Content, Sider } = Layout;

export default function OrderManagementBuyer() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, error, isLoading } = useGetOrderQuery({ page: 0, limit: 10 });
    console.log(data);

    const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal
    const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order info

    const statusStyles = {
        PENDING: 'bg-gray-500 text-white',
        CONFIRMED: 'bg-green-500 text-white',
        REJECTED: 'bg-red-500 text-red',
    };

    const columns = [
        {
            title: 'ID', // New column for order ID
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
                    <span className={`flex items-center justify-center w-32 h-8 px-9 ${statusStyles[status] || 'bg-gray-300 text-white'}`}>
                        {status}
                    </span>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <Button
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                    onClick={() => handleDetailClick(record)} // Pass the entire record to the function
                >
                    Detail
                </Button>
            ),
        },
    ];

    const handleDetailClick = (order) => {
        setSelectedOrder(order); // Store order info in state
        setIsModalVisible(true); // Open modal
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Close modal
        setSelectedOrder(null); // Reset order info
    };

    const dataSource = data?.data.map(order => ({
        key: order.id, // Ensure the key is unique
        id: order.orderId, // Add ID to data source
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
        auctionStatus: order.auctionOrder.status,
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
                                <Spin size="large" />
                            ) : error ? (
                                <Alert message="Error loading orders" type="error" />
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
                            <div style={{ backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaShoppingCart style={{ marginRight: '10px', color: '#007bff' }} /> {/* Order Icon */}
                                    Thông tin đơn hàng
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong>ID:</strong>
                                    <span>{selectedOrder.id}</span> {/* Updated to show the ID */}
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
                            <div style={{ backgroundColor: '#fff8dc', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
                                <h3 style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center' }}>
                                    <FaProductHunt style={{ marginRight: '10px', color: '#ff7f50' }} /> {/* Product Icon */}
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
                            </div>
                        </div>
                    )}
                </Modal>
            </Layout>
        </>
    );
}
