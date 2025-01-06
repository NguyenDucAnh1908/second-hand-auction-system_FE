import React from 'react';
import {Image, Table} from "antd";


// const statusMapping = {
//     ready_to_pick: {text: 'Mới tạo đơn hàng', color: 'text-gray-500'},
//     picking: {text: 'Nhân viên đang lấy hàng', color: 'text-blue-500'},
//     cancel: {text: 'Hủy đơn hàng', color: 'text-red-500'},
//     money_collect_picking: {text: 'Đang thu tiền người gửi', color: 'text-yellow-500'},
//     picked: {text: 'Nhân viên đã lấy hàng', color: 'text-green-500'},
//     storing: {text: 'Hàng đang nằm ở kho', color: 'text-purple-500'},
//     transporting: {text: 'Đang luân chuyển hàng', color: 'text-blue-400'},
//     sorting: {text: 'Đang phân loại hàng hóa', color: 'text-teal-500'},
//     delivering: {text: 'Nhân viên đang giao cho người nhận', color: 'text-orange-500'},
//     money_collect_delivering: {text: 'Nhân viên đang thu tiền người nhận', color: 'text-yellow-600'},
//     delivered: {text: 'Nhân viên đã giao hàng thành công', color: 'text-green-600'},
//     delivery_fail: {text: 'Nhân viên giao hàng thất bại', color: 'text-red-600'},
//     waiting_to_return: {text: 'Đang đợi trả hàng về cho người gửi', color: 'text-gray-400'},
//     return: {text: 'Trả hàng', color: 'text-purple-400'},
//     return_transporting: {text: 'Đang luân chuyển hàng trả', color: 'text-blue-300'},
//     return_sorting: {text: 'Đang phân loại hàng trả', color: 'text-teal-400'},
//     returning: {text: 'Nhân viên đang đi trả hàng', color: 'text-orange-400'},
//     return_fail: {text: 'Nhân viên trả hàng thất bại', color: 'text-red-400'},
//     returned: {text: 'Nhân viên trả hàng thành công', color: 'text-green-400'},
//     exception: {text: 'Đơn hàng ngoại lệ không nằm trong quy trình', color: 'text-pink-500'},
//     damage: {text: 'Hàng bị hư hỏng', color: 'text-red-700'},
//     lost: {text: 'Hàng bị mất', color: 'text-black'},
// };

const OrderDetailCompoment = ({
                                  selectedOrder,
                                  orderDetails,
                                  statusMapping,
                                  itemImage,
                                  historyDelivery,
                                  dataSourceDelivery
                              }) => {
    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Thông tin đơn hàng */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN ĐƠN HÀNG</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Mã đơn hàng:</strong> {orderDetails?.order_code}</p>
                        <p>
                            <strong>Ngày lấy dự kiến:</strong>{' '}
                            {orderDetails?.pickup_time
                                ? new Date(orderDetails.pickup_time).toLocaleString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                                : 'Không xác định'}
                        </p>
                        <p>
                            <strong>Ngày giao dự kiến:</strong>{' '}
                            {orderDetails?.leadtime_order?.from_estimate_date
                                ? new Date(orderDetails.leadtime_order.from_estimate_date).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })
                                : 'Không xác định'}{' '}
                            -{' '}
                            {orderDetails?.leadtime_order?.to_estimate_date
                                ? new Date(orderDetails.leadtime_order.to_estimate_date).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })
                                : 'Không xác định'}
                        </p>
                        <p>
                            <strong>Trạng thái hiện tại:</strong>
                            <span
                                className={`font-semibold ml-2 ${statusMapping[orderDetails?.status]?.color || 'text-gray-500'}`}> {statusMapping[orderDetails?.status]?.text || 'Không xác định'}</span>
                        </p>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">THÔNG TIN CHI TIẾT</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Mã đơn khách hàng:</strong> {selectedOrder?.itemId} </p>
                        <p><strong>Sản phẩm:</strong> {selectedOrder?.itemName} </p>
                        <p><strong>Lưu ý giao hàng:</strong> {selectedOrder?.note} </p>
                        <p><strong>Phương thức thanh toán:</strong> {selectedOrder?.paymentMethod} </p>

                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                        <Image.PreviewGroup
                            preview={{
                                onChange: (current, prev) =>
                                    console.log(`current index: ${current}, prev index: ${prev}`),
                            }}
                        >
                            {itemImage.map((image, index) => (
                                <Image
                                    key={index}
                                    width={200}
                                    src={image.image} // Thay `url` bằng tên chính xác của trường trả về từ API
                                    alt={`Image ${index + 1}`}
                                />
                            ))}
                        </Image.PreviewGroup>
                    </div>
                </div>

                {/* Người nhận */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">NGƯỜI NHẬN</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Họ và tên:</strong> {orderDetails?.to_name}</p>
                        <p><strong>Điện thoại:</strong> {orderDetails?.to_phone}</p>
                        {/*<p><strong>Email:</strong> {selectedOrder?.email}</p>*/}
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
                        <p><strong>Mã đấu giá:</strong> {selectedOrder?.auctionId} </p>
                        <p><strong>Kiểu dấu giá:</strong> {selectedOrder?.auctionTypeName}</p>
                        <p><strong>Số tiền đấu giá:</strong> {selectedOrder?.totalPrice} </p>
                        <p><strong>Bước giá:</strong> {selectedOrder?.priceStep} </p>
                        <p><strong>Trạng thái:</strong> {selectedOrder?.status} </p>
                        <p><strong>Điều khoản:</strong> {selectedOrder?.termConditions} </p>
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
                    </div>
                    <Table pagination={false} columns={historyDelivery} dataSource={dataSourceDelivery}/>
                </div>

                {/* Nhật ký người dùng */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Nhật ký người dùng</h3>
                    {/* Thêm nội dung nếu cần */}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailCompoment;