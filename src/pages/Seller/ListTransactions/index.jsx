import React, { useState } from 'react';
import FooterBK from '../../../components/FooterBK';
import { Breadcrumb, Layout, Menu, theme, Modal, Tag } from 'antd';
import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    Avatar,
    Input,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-tailwind/react";

import Pagination from "@/components/Pagination/index.jsx";
import Sidebar from '../../../partials/Sidebar';
import Header from "@/partials/Header.jsx";
import { useGetTransactionWalletQuery } from '../../../services/transactionWallet.service';

const { Content, Sider } = Layout;

export default function ListTransaction() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction for dialog
    const [page, setPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Fetching transaction data from the query
    const { data, error, isLoading } = useGetTransactionWalletQuery({
        page: page - 1,
        limit: 10
    });

    const transactions = data?.items || [];
    const TABLE_HEAD = ["Mã giao dịch", "Số tiền", "Ngày", "Trạng thái", "Người nhận", "Người chuyển", "Loại giao dịch", "Khác"];

    const handleClickOpen = (transaction) => {
        setSelectedTransaction(transaction); // Set the selected transaction data
        setOpen(true); // Open dialog
    };

    const handleClose = () => {
        setOpen(false); // Close dialog
    };


    //modal chanh

    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal

    const handleOpenModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (





        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>


            <Modal
                title="Chi tiết giao dịch"
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedTransaction && (
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td><strong>Mã giao dịch:</strong></td>
                                <td>{selectedTransaction.transactionWalletCode}</td>
                            </tr>
                            <tr>
                                <td><strong>Loại giao dịch:</strong></td>
                                <td>
                                    {selectedTransaction.transactionType === "TRANSFER"
                                        ? "Chuyển tiền"
                                        : selectedTransaction.transactionType === "REFUND"
                                            ? "Hoàn tiền"
                                            : "Không xác định"}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Kết quả đấu giá:</strong></td>
                                <td>
                                    <span className="total-amount">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(selectedTransaction.amount + selectedTransaction.commissionAmount)}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Chi phí sàn:</strong></td>
                                <td>
                                    <span className="commission-amount">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(selectedTransaction.commissionAmount)}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Tỷ lệ chi phí sàn:</strong></td>
                                <td>
                                    <Tag color="orange">{`${(selectedTransaction.commissionRate * 100).toFixed(2)}%`}</Tag>
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Số tiền nhận thực tế:</strong></td>
                                <td>
                                    <Tag color="success" style={{ marginLeft: 8 }}>
                                        +{" "}
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(selectedTransaction.amount)}
                                    </Tag>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Số dư ví trước khi nhận:</strong></td>
                                <td>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(selectedTransaction.oldAmount)}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Số dư ví hiện tại:</strong></td>
                                <td>
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(selectedTransaction.netAmount)}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Trạng thái:</strong></td>
                                <td>
                                    <Tag color={selectedTransaction.transactionStatus === "COMPLETED" ? "green" : "red"}>
                                        {selectedTransaction.transactionStatus === "COMPLETED"
                                            ? "Hoàn thành"
                                            : selectedTransaction.transactionStatus === "PENDING"
                                                ? "Đang chờ xử lý"
                                                : "Thất bại"}
                                    </Tag>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Người nhận:</strong></td>
                                <td>{selectedTransaction.recipientName}</td>
                            </tr>
                            <tr>
                                <td><strong>Người chuyển:</strong></td>
                                <td>{selectedTransaction.senderName}</td>
                            </tr>
                            <tr>
                                <td><strong>Ngày giao dịch:</strong></td>
                                <td>{new Date(selectedTransaction.transactionDate).toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td><strong>Mô tả:</strong></td>
                                <td>{selectedTransaction.description || "Không có mô tả"}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </Modal>





            {/* Header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Main content */}
            <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Breadcrumb */}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item>Giao dịch</Breadcrumb.Item>
                    <Breadcrumb.Item>Lịch sử giao dịch</Breadcrumb.Item>
                </Breadcrumb>

                <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, flex: 1 }}>
                    {/* Sidebar */}
                    <Sider width={300} style={{ background: colorBgContainer }}>
                        <Sidebar />
                    </Sider>

                    {/* Main Content */}
                    <Content style={{ padding: '0 24px', minHeight: 280, flex: 1 }}>
                        <Card className="h-full w-full">
                            <CardHeader floated={false} shadow={false} className="rounded-none">
                                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                    <div>
                                        <Typography variant="h5" color="blue-gray">Lịch sử giao dịch</Typography>
                                        <Typography color="gray" className="mt-1 font-normal">These are details about the last transactions</Typography>
                                    </div>
                                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                                        <div className="w-full md:w-72">
                                            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
                                        </div>
                                        <Button className="flex items-center gap-3" size="sm">
                                            <MagnifyingGlassIcon strokeWidth={2} className="h-4 w-4" /> Search
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Table Body */}
                            <CardBody className="overflow-auto px-0">
                                {isLoading ? (
                                    <p>Loading ...</p>
                                ) : error ? (
                                    <p>Error fetching data: {error.message}</p>
                                ) : (
                                    <table className="w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head) => (
                                                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                            {head}
                                                        </Typography>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((transaction) => {
                                                const classes = "p-4 border-b border-blue-gray-50";
                                                return (
                                                    <tr key={transaction.transactionId} className="transition-all duration-300 ease-in-out hover:bg-blue-50">
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                                {transaction.transactionWalletCode}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                                style={{
                                                                    backgroundColor: transaction.amount < 0 ? '#ffd6d6' : '#d1f7d6', // Màu đỏ nhạt cho số âm, xanh nhạt cho số dương
                                                                    color: transaction.amount < 0 ? '#ff0000' : '#008000',           // Đỏ cho số âm, xanh cho số dương
                                                                    padding: '4px 8px',                                              // Tạo khoảng cách cho văn bản
                                                                    borderRadius: '4px',                                             // Bo góc
                                                                    display: 'inline-block',                                         // Đảm bảo chỉ bọc quanh nội dung
                                                                }}
                                                            >
                                                                {transaction.amount < 0 ? '' : '+'}{new Intl.NumberFormat('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                }).format(transaction.amount)}
                                                            </Typography>

                                                        </td>

                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {new Date(transaction.transactionDate).toLocaleString()}
                                                            </Typography>
                                                        </td>

                                                        <td className={classes} style={{ textAlign: 'center' }}>
                                                            <Chip
                                                                size="sm"
                                                                variant="ghost"
                                                                value={
                                                                    transaction.transactionStatus === "COMPLETED"
                                                                        ? "Hoàn thành"
                                                                        : transaction.transactionStatus === "PENDING"
                                                                            ? "Đang chờ xử lý"
                                                                            : "Thất bại"
                                                                }
                                                                color={
                                                                    transaction.transactionStatus === "COMPLETED"
                                                                        ? "green"
                                                                        : transaction.transactionStatus === "PENDING"
                                                                            ? "amber"
                                                                            : "red"
                                                                }
                                                                className="transition-all duration-200 ease-in-out mx-auto"
                                                            />
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar
                                                                    src={transaction.senderName === "visa" ? "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/visa.png" : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/logos/mastercard.png"}
                                                                    size="sm"
                                                                    alt={transaction.senderName}
                                                                    variant="square"
                                                                    className="h-10 w-12 object-contain p-1"
                                                                />
                                                                <div className="flex flex-col">
                                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                                        {transaction.recipientName}
                                                                    </Typography>
                                                                    <Typography variant="small" color="blue-gray" className="opacity-70">
                                                                        {transaction.description}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {transaction.senderName}
                                                            </Typography>
                                                        </td>
                                                        <td className={classes}>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-medium text-lg text-gray-800 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-lg">
                                                                {
                                                                    transaction.transactionType === "DEPOSIT" ? "Nạp tiền" :
                                                                        transaction.transactionType === "WITHDRAWAL" ? "Rút tiền" :
                                                                            transaction.transactionType === "TRANSFER" ? "Thanh toán" :
                                                                                transaction.transactionType === "REFUND" ? "Hoàn tiền" :
                                                                                    transaction.transactionType === "DEPOSIT_AUCTION" ? "Nạp tiền đấu giá" :
                                                                                        "Không xác định"
                                                                }
                                                            </Typography>
                                                        </td>

                                                        <td className={classes}>
                                                            <Button size="sm" color="green" onClick={() => handleOpenModal(transaction)}>

                                                                Xem chi tiết
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}



                            </CardBody>
                        </Card>



                        {/* Pagination */}
                        <Pagination
                            currentPage={page}
                            totalCount={data?.totalItems}
                            pageSize={10}
                            onPageChange={setPage}
                        />
                    </Content>
                </Layout>
            </Content>



            {/* Footer */}
            <FooterBK />
        </Layout>
    );
}
