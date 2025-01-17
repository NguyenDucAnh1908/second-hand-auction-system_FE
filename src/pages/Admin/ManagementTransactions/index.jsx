import React, { useState, useEffect } from 'react';
import {
    Button, Card, Typography, Select, Option,
    Dialog, DialogHeader, DialogBody, DialogFooter,
} from "@material-tailwind/react";
import { Empty, message, Skeleton, Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetTransactionWalletAdminQuery } from '../../../services/transactionWallet.service';
import useHookUploadImage from '../../../hooks/useHookUploadImage';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import { useUploadImageTransactionMutation } from '../../../services/transactionWallet.service';

const TABLE_HEAD = [
    "Mã giao dịch",
    "Số tiền",
    "Loại giao dịch",
    "Lời nhắn",
    "Thời gian",
    "Trạng thái",
    "Thao tác",
];

const dinhDangNgay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); // 'vi-VN' định dạng ngày thành dd/MM/yyyy
};

export default function QuanLyGiaoDich() {
    const [moDialog, setMoDialog] = useState(false);
    const [giaoDichDuocChon, setGiaoDichDuocChon] = useState(null);
    const [trang, setTrang] = useState(1);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [roleFilter, setRoleFilter] = useState(""); // State for role filter
    const [transactionTypeFilter, setTransactionTypeFilter] = useState(""); // State for transactionType filter
    const [uploadImageTransaction] = useUploadImageTransactionMutation();
    const { data, error, isLoading, isError } = useGetTransactionWalletAdminQuery({
        page: trang - 1, limit: 38, role: roleFilter, transactionType: transactionTypeFilter
    });
    const { UploadImage } = useHookUploadImage();

    const moChiTiet = (transaction) => {
        setGiaoDichDuocChon(transaction);
        setMoDialog(!moDialog);
    };
    const danhSachGiaoDich = data?.data?.items || [];
    const totalPages1 = data?.data?.totalPages || 0;

    const handlePageChange = (newPage) => {
        setTrang(newPage);
    };

    const handleRoleChange = (value) => {
        setRoleFilter(value);
    };

    const handleTransactionTypeChange = (value) => {
        setTransactionTypeFilter(value);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Function to handle image upload
    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleConfirmUpload = async () => {
        if (!file) {
            alert("Vui lòng chọn một hình ảnh để tải lên.");
            return;
        }

        try {
            // Tải ảnh lên Firebase
            const imageUrl = await UploadImage(file);

            // Gửi URL ảnh đến API uploadImageTransaction
            await uploadImageTransaction({
                id: giaoDichDuocChon?.transactionId, // Truyền ID giao dịch vào đây
                credentials: { imageUrl },
            });

            message.success("Tải ảnh lên thành công!");
            setImage(null); // Xóa preview ảnh sau khi upload
            setFile(null); // Xóa file đã chọn
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            message.error("Đã xảy ra lỗi khi tải ảnh lên.");
        }
    };
    // if (isLoading) return <p>Đang tải...</p>;
    // if (error) return <p>Lỗi khi tải danh sách giao dịch.</p>;
    console.log("giaoDichDuocChon", giaoDichDuocChon)
    return (
        <>
            {/* Dialog chi tiết giao dịch */}
            <Dialog open={moDialog} size="md">
                <DialogHeader className="text-xl font-semibold text-gray-800">Chi tiết giao dịch</DialogHeader>
                <DialogBody className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 space-y-4">
                    {giaoDichDuocChon && (
                        <div className="space-y-3">
                            <p><strong className="text-gray-700">Mã giao dịch:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.transactionWalletCode}</span></p>

                            <p>
                                <strong className="text-gray-700">Số tiền:</strong>
                                <span className={
                                    giaoDichDuocChon.description === 'Thanh toán tiền cho seller'
                                        ? "text-red-600"  // Đổi màu đỏ cho "Thanh toán tiền cho seller"
                                        : giaoDichDuocChon.amount < 0
                                            ? "text-red-600"  // Âm là đỏ
                                            : "text-green-600"  // Dương là xanh
                                }>
                                    {giaoDichDuocChon.description === 'Thanh toán tiền cho seller'
                                        ? `-${Math.abs(giaoDichDuocChon.amount).toLocaleString('vi-VN')}`  // Đảo dấu cho "Thanh toán tiền cho seller"
                                        : `${giaoDichDuocChon.amount < 0
                                            ? `-${Math.abs(giaoDichDuocChon.amount).toLocaleString('vi-VN')}`
                                            : `+${giaoDichDuocChon.amount.toLocaleString('vi-VN')}`
                                        }`
                                    }
                                    VND
                                </span>
                            </p>



                            <p><strong className="text-gray-700">Loại giao dịch:</strong> <span className="text-blue-600">
                                {giaoDichDuocChon.transactionType === 'DEPOSIT' ? 'Nạp tiền' :
                                    giaoDichDuocChon.transactionType === 'WITHDRAWAL' ? 'Rút tiền' :
                                        giaoDichDuocChon.transactionType === 'TRANSFER' ? 'Chuyển khoản' :
                                            giaoDichDuocChon.transactionType === 'REFUND' ? 'Hoàn tiền' :
                                                giaoDichDuocChon.transactionType === 'DEPOSIT_AUCTION' ? 'Nạp tiền cọc tham gia đấu giá' : ''}
                            </span></p>

                            <p><strong className="text-gray-700">Người gửi:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.senderName}</span></p>
                            <p><strong className="text-gray-700">Người thụ hưởng:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.recipientName}</span></p>
                            {/* <p><strong className="text-gray-700">Lời nhắn:</strong> <span
                                className="text-gray-600">{giaoDichDuocChon.description || "Không có nội dung"}</span>
                            </p> */}
                            <p><strong className="text-gray-700">Thời gian: </strong>
                                <span className="text-gray-600">
                                    {new Date(giaoDichDuocChon.transactionDate).toLocaleString('vi-VN')}
                                </span>
                            </p>

                            <p><strong className="text-gray-700">Số tiền ban đầu:</strong> <span
                                className="text-gray-600">{(giaoDichDuocChon.netAmount)}</span></p>
                            <p><strong className="text-gray-700">Số tiền thực:</strong> <span
                                className="text-gray-600">{(giaoDichDuocChon.oldAmount)}</span></p>
                            <p><strong className="text-gray-700">Trạng thái:</strong> <span className="text-green-600">
                                {giaoDichDuocChon.transactionStatus === 'PENDING' ? 'Đang chờ xử lý' :
                                    giaoDichDuocChon.transactionStatus === 'COMPLETED' ? 'Đã hoàn thành' :
                                        giaoDichDuocChon.transactionStatus === 'CANCELLED' ? 'Đã hủy' :
                                            giaoDichDuocChon.transactionStatus === 'FAILED' ? 'Thất bại' : ''}
                            </span></p>

                            {/* Hình ảnh giao dịch */}
                            {/* <p><strong className="text-gray-700">Hình ảnh:</strong></p> */}
                            {/* <div className="mt-4"> */}
                            {/* Hiển thị ảnh giao dịch (nếu có) */}
                            {/* {giaoDichDuocChon.imageUrl ? (
                                    <img
                                        src={giaoDichDuocChon.image}
                                        alt="Hình ảnh giao dịch"
                                        className="w-full h-auto mt-2"
                                    />
                                ) : (
                                    <p className="text-gray-500">Không có hình ảnh.</p>
                                )} */}

                            {/* Phần thêm ảnh */}
                            {/* <div className="relative mt-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-sm file:text-white file:bg-blue-500 file:hover:bg-blue-400"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">
                                        Chọn một hình ảnh để tải lên
                                    </p>
                                </div> */}

                            {/* Hiển thị preview ảnh */}
                            {/* {image && (
                                    <div className="mt-4 flex items-center space-x-4">
                                        <div
                                            className="relative w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-300 rounded-md overflow-hidden">
                                            <img
                                                src={image}
                                                alt="Ảnh tải lên"
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div> */}
                            {/* Nút xóa ảnh */}
                            {/* <button
                                            onClick={() => {
                                                setImage(null);
                                                setFile(null);
                                            }}
                                            className="mt-4 text-sm text-red-500 hover:text-red-700"
                                        >
                                            Xóa ảnh
                                        </button>
                                    </div>
                                )} */}

                            {/* Nút xác nhận tải ảnh */}
                            {/* {file && (
                                    <button
                                        onClick={handleConfirmUpload}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-400"
                                    >
                                        Xác nhận tải ảnh lên
                                    </button>
                                )}
                            </div> */}
                        </div>
                    )}
                </DialogBody>

                <DialogFooter className="space-x-4">
                    <Button variant="text" color="red" onClick={() => setMoDialog(false)} className="mr-1">
                        Đóng
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Tiêu đề */}
            <h1 className="text-3xl font-bold text-center mb-8">Quản lý giao dịch</h1>

            {/* Filters */}
            <div className="flex justify-between mb-4">
                <div className="w-1/3">
                    <Select label="Chọn Vai trò" onChange={handleRoleChange} value={roleFilter}>
                        <Option value="">Tất cả</Option>
                        <Option value="ADMIN">Admin</Option>
                        <Option value="BUYER">Người đấu giá</Option>
                        <Option value="SELLER">Người bán hàng</Option>
                    </Select>
                </div>
                <div className="w-1/3">
                    <Select label="Loại giao dịch" onChange={handleTransactionTypeChange} value={transactionTypeFilter}>
                        <Option value="">Tất cả</Option>
                        <Option value="DEPOSIT">Nạp tiền</Option>
                        <Option value="WITHDRAWAL">Rút tiền</Option>
                        <Option value="DEPOSIT_AUCTION">Nạp tiền đấu giá</Option>
                    </Select>
                </div>
            </div>

            {/* Danh sách giao dịch */}
            {isError ? (
                <Empty />
            ) : (
                <Skeleton loading={isLoading} active>
                    <Card className="h-full w-full overflow-scroll">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="p-2 text-left text-sm font-medium">{head}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {danhSachGiaoDich.length > 0 ? (
                                    danhSachGiaoDich.map((giaoDich) => (
                                        (giaoDich.description === 'Transaction đặt cọc ví Auction' ||
                                            giaoDich.description === 'Transaction hoàn cọc ví Auction' ||
                                            giaoDich.description === 'Thanh toán tiền cho seller' ||
                                            giaoDich.description === 'Transaction hoàn cọc người thắng ví Auction' ||
                                            giaoDich.description === 'Người dùng thanh toán đơn hàng' ||
                                            giaoDich.description === 'Hoàn tiền cho đơn hàng thất bại') && (
                                            <tr key={giaoDich.transactionWalletCode}>
                                                <td className="p-2">{giaoDich.transactionWalletCode}</td>

                                                {/* <td className="p-2">
                                                    <div
                                                        style={{ 
                                                            backgroundColor: (giaoDich.description === 'Thanh toán tiền cho seller' || giaoDich.description === 'Hoàn cọc cho người thắng cuộc ' ? giaoDich.amount > 0 : giaoDich.amount < 0) ? '#f8d7da' : '#d4edda', // Đổi màu nền nếu số tiền là âm
                                                            color: (giaoDich.description === 'Thanh toán tiền cho seller' || giaoDich.description === 'Hoàn cọc cho người thắng cuộc ' ? giaoDich.amount > 0 : giaoDich.amount < 0) ? '#721c24' : '#155724', // Đổi màu chữ nếu số tiền là âm
                                                            padding: '4px 8px',
                                                            borderRadius: '4px'
                                                        }}
                                                    >
                                                        {(giaoDich.description === 'Thanh toán tiền cho seller' || giaoDich.description === 'Hoàn cọc cho người thắng cuộc ')
                                                            ? `-${Math.abs(giaoDich.amount).toLocaleString('vi-VN')}` // Đảo dấu luôn cho các giao dịch này
                                                            : (giaoDich.amount < 0
                                                                ? `-${Math.abs(giaoDich.amount).toLocaleString('vi-VN')}`
                                                                : `+${giaoDich.amount.toLocaleString('vi-VN')}`)
                                                        } VND
                                                    </div>
                                                </td>
                                                */}


                                                <td className="p-2">
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                (giaoDich.description === 'Thanh toán tiền cho seller' ||
                                                                    giaoDich.description === 'Hoàn tiền cho đơn hàng thất bại' ||
                                                                    giaoDich.description === 'Hoàn cọc cho người thắng cuộc') &&
                                                                    giaoDich.amount > 0
                                                                    ? '#f8d7da'
                                                                    : giaoDich.amount < 0
                                                                        ? '#f8d7da'
                                                                        : '#d4edda', // Đổi màu nền
                                                            color:
                                                                (giaoDich.description === 'Thanh toán tiền cho seller' ||
                                                                    giaoDich.description === 'Hoàn tiền cho đơn hàng thất bại' ||
                                                                    giaoDich.description === 'Hoàn cọc cho người thắng cuộc') &&
                                                                    giaoDich.amount > 0
                                                                    ? '#721c24'
                                                                    : giaoDich.amount < 0
                                                                        ? '#721c24'
                                                                        : '#155724', // Đổi màu chữ
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                        }}
                                                    >
                                                        {(giaoDich.description === 'Thanh toán tiền cho seller' ||
                                                            giaoDich.description === 'Hoàn tiền cho đơn hàng thất bại' ||
                                                            giaoDich.description === 'Hoàn cọc cho người thắng cuộc')
                                                            ? `-${Math.abs(giaoDich.amount).toLocaleString('vi-VN')}` // Đảo dấu
                                                            : giaoDich.amount < 0
                                                                ? `-${Math.abs(giaoDich.amount).toLocaleString('vi-VN')}`
                                                                : `+${giaoDich.amount.toLocaleString('vi-VN')}`}
                                                        VND
                                                    </div>
                                                </td>


                                                <td className="p-4 w-[50px]">
                                                    {giaoDich.transactionType === "DEPOSIT" && (
                                                        <Tag color="green"
                                                            className="font-semibold w-[120px] h-[20px] text-center">Nạp
                                                            tiền</Tag>
                                                    )}
                                                    {giaoDich.transactionType === "WITHDRAWAL" && (
                                                        <Tag color="red"
                                                            className="font-semibold w-[120px] h-[20px] text-center">Rút
                                                            tiền</Tag>
                                                    )}
                                                    {giaoDich.transactionType === "REFUND" && (
                                                        <Tag color="geekblue-inverse"
                                                            className="font-semibold w-[120px] h-[20px] text-center">Hoàn
                                                            cọc</Tag>
                                                    )}
                                                    {giaoDich.transactionType === "TRANSFER" && (
                                                        <Tag color="green-inverse"
                                                            className="font-semibold w-[120px] h-[20px] text-center">Chuyển
                                                            khoản</Tag>
                                                    )}
                                                    {giaoDich.transactionType === "DEPOSIT_AUCTION" && (
                                                        <Tag color="blue"
                                                            className="font-semibold w-[120px] h-[20px] text-center">Tiền
                                                            cọc</Tag>
                                                    )}
                                                </td>

                                                <td className="p-2">{giaoDich.description || "Không có"}</td>
                                                <td className="p-2">
                                                    {new Date(giaoDich.transactionDate).toLocaleString('vi-VN')}
                                                </td>

                                                <td className="p-4">
                                                    {giaoDich.transactionStatus === "COMPLETED" &&
                                                        <Tag icon={<CheckCircleOutlined />} color="success">Hoàn Thành</Tag>}
                                                    {giaoDich.transactionStatus === "PENDING" &&
                                                        <Tag icon={<SyncOutlined spin />} color="processing">Đang chờ</Tag>}
                                                    {giaoDich.transactionStatus === "CANCELLED" &&
                                                        <Tag icon={<ExclamationCircleOutlined />}
                                                            color="error">Unavailable</Tag>}
                                                    {giaoDich.transactionStatus === "FAILED" &&
                                                        <Tag icon={<ExclamationCircleOutlined />} color="warning">Thất bại</Tag>}
                                                </td>

                                                <td className="p-2">
                                                    <Button onClick={() => moChiTiet(giaoDich)}
                                                        className="bg-blue-500 text-white">Xem chi tiết</Button>
                                                </td>
                                            </tr>
                                        )))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="text-center p-4">Không có dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>


                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={trang}
                            totalPages={totalPages1}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </Skeleton>
            )}

        </>
    );
}
