import React, { useState, useEffect } from 'react';
import { Input, Select, Button, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import Header2 from '../../components/Header2';
import FooterBK from '../../components/FooterBK';
import { useCreateOrderMutation } from '../../services/order.service';
import { useGetAuctionByIdQuery } from '../../services/auction.service';
import { useParams } from 'react-router-dom'; // Import useParams để lấy id từ URL
const { TextArea } = Input;

export default function CreateOrder() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        shippingMethod: '',
        note: '',
        auctionId: id, // Trường auctionId sẽ lấy giá trị từ URL
    });
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    // Lấy thông tin đấu giá từ API
    const { data: auctionData, error: auctionError, isLoading: auctionLoading } = useGetAuctionByIdQuery(id);

    useEffect(() => {
        if (auctionLoading) {
            console.log("Loading auction data...");
        }

        if (auctionError) {
            console.error("Error fetching auction data:", auctionError);
        }

        if (auctionData) {
            console.log("Auction data:", auctionData);
        }
    }, [auctionData, auctionError, auctionLoading]);

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [addressOptions, setAddressOptions] = useState([]);

    // Tính hoa hồng 5%
    const commission = auctionData?.data?.amount ? auctionData.data.amount * 0.05 : 0;
    const totalAmount = auctionData?.data?.amount ? auctionData.data.amount + commission : 0;

    const handleSubmit = async () => {
        try {
            const result = await createOrder({
                ...orderDetails,
                paymentMethod,
            }).unwrap();

            message.success('Đơn hàng đã được tạo thành công!');
            console.log("Order created:", result);

            // Có thể thêm logic để reset form hoặc chuyển trang nếu cần
        } catch (error) {
            message.error('Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
            console.error("Create order error:", error);
        }
    };

    return (
        <div>
            <Header2 />
            <div className="max-w-screen-xl mx-auto p-4 flex flex-col lg:flex-row gap-4">
                {/* Bên trái - Thông tin đơn hàng */}
                <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Họ và tên</label>
                            <Input
                                prefix={<UserOutlined />}
                                value={orderDetails.fullName}
                                onChange={(e) => setOrderDetails({ ...orderDetails, fullName: e.target.value })}
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <Input
                                prefix={<MailOutlined />}
                                type="email"
                                value={orderDetails.email}
                                onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
                            <Input
                                prefix={<PhoneOutlined />}
                                type="tel"
                                value={orderDetails.phoneNumber}
                                onChange={(e) => setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Địa chỉ</label>
                            <Select
                                className="w-full"
                                placeholder="Chọn địa chỉ"
                                value={orderDetails.address}
                                onChange={(value) => setOrderDetails({ ...orderDetails, address: value })}
                            >
                                {addressOptions.map((address) => (
                                    <Select.Option key={address.id} value={address.id}>
                                        {address.fullAddress}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Phương thức giao hàng</label>
                            <Select
                                className="w-full"
                                value={orderDetails.shippingMethod}
                                onChange={(value) => setOrderDetails({ ...orderDetails, shippingMethod: value })}
                                placeholder="Chọn phương thức giao hàng"
                            >
                                <Select.Option value="standard">Giao hàng tiêu chuẩn</Select.Option>
                                <Select.Option value="express">Giao hàng nhanh</Select.Option>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Ghi chú</label>
                            <TextArea
                                rows={3}
                                value={orderDetails.note}
                                onChange={(e) => setOrderDetails({ ...orderDetails, note: e.target.value })}
                                placeholder="Thêm ghi chú nếu có"
                            />
                        </div>
                    </form>
                </div>

                {/* Bên phải - Hình ảnh sản phẩm và phương thức thanh toán */}
                <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Phương thức thanh toán</h2>

                    {/* Thông tin sản phẩm */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>
                        <div className="flex flex-wrap sm:flex-nowrap mb-6 border-b pb-6 border-gray-200">
                            <div className="w-full sm:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
                                <img
                                    src={auctionData?.data.thumbnail}
                                    alt={auctionData?.data.itemName}
                                    className="w-full h-auto object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="w-full sm:w-2/3 lg:w-3/4 pl-0 sm:pl-6">
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{auctionData?.data.itemName}</h4>
                                <p className="text-sm text-gray-600 mb-4">{auctionData?.data.description}</p>
                                <p className="text-gray-700 font-medium mb-2">Người bán: {auctionData?.data.seller}</p>
                                <p className="text-lg font-semibold text-gray-900 mt-3">Giá đặt cao nhất: {auctionData?.data.amount} VND</p>
                            </div>
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chọn phương thức thanh toán</h3>
                        <Select
                            className="w-full"
                            value={paymentMethod}
                            onChange={(value) => setPaymentMethod(value)}
                            placeholder="Chọn phương thức thanh toán"
                        >
                            <Select.Option value="WALLET_PAYMENT">
                                <CreditCardOutlined /> Ví hệ thống
                            </Select.Option>
                        </Select>
                    </div>

                    {/* Tóm tắt đơn hàng */}
                    <div className="mb-6 border-t pt-6 border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 font-medium">Hoa hồng (5%)</span>
                            <span className="text-gray-900 font-semibold">{formatCurrency(commission)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 font-medium">Tổng số tiền</span>
                            <span className="text-blue-700 font-semibold">{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>

                    {/* Nút Checkout */}
                    <Button
                        type="primary"
                        className="w-full"
                        loading={isLoading}
                        onClick={handleSubmit}
                        disabled={!paymentMethod}
                    >
                        Thanh toán
                    </Button>
                </div>
            </div>
            <FooterBK />
        </div>
    );
}
