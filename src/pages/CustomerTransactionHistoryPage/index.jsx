import {Heading,} from "../../components";
import  {useState} from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK/index.jsx";
import {Breadcrumb, Button, Empty, Layout, Modal, Skeleton, Table, theme} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {useGetTransactionWalletQuery} from "@/services/transactionWallet.service.js";
import Pagination from "@/components/Pagination/index.jsx";




const {Content, Sider} = Layout;
export default function CustomerTransactionHistoryPagePage() {
    const [page, setPage] = useState(1);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {
        data: dataTransactionWallet,
        isLoading: isLoadingTransactionWallet,
        isError: isErrorTransactionWallet,

    } = useGetTransactionWalletQuery({
        page: page - 1,
        limit: 8
    });
    console.log("dataTransactionWallet test: ", dataTransactionWallet);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const showModal = (record) => {
        setSelectedTransaction(record);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTransaction(null);
    };
    const columns = [
        {
            title: "Mã giao dịch",
            dataIndex: "id",
            key: "id",
            width: 150,
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: 200,
        },
        {
            title: "Loại giao dịch",
            dataIndex: "transactionType",
            key: "transactionType",
            width: 200,
        },
        // {
        //     title: "Hình ảnh",
        //     dataIndex: "method",
        //     key: "method",
        //     width: 200,
        // },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 150,
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (text, record) => {
                // Phân loại giao dịch tiêu cực (âm) và tích cực (dương)
                const negativeTransactionTypes = ["WITHDRAWAL", "TRANSFER", "REFUND", "DEPOSIT_AUCTION"];
                const positiveTransactionTypes = ["DEPOSIT"];

                // Xác định giao dịch là âm hay dương
                const isNegativeTransaction = negativeTransactionTypes.includes(record.transactionType);

                // Định dạng số tiền
                const formattedAmount = isNegativeTransaction
                    ? `-${Math.abs(text).toLocaleString("vi-VN")} đ`
                    : `+${Math.abs(text).toLocaleString("vi-VN")} đ`;

                // Định nghĩa CSS
                const amountStyle = {
                    color: isNegativeTransaction ? "red" : "green", // Đỏ nếu âm, xanh nếu dương
                    fontWeight: "bold",
                    fontSize: "14px",
                };

                const containerStyle = {
                    backgroundColor: isNegativeTransaction ? "#ffe6e6" : "#e6ffe6", // Nền đỏ nhạt hoặc xanh nhạt
                    padding: "5px 10px",
                    borderRadius: "5px",
                    display: "inline-block",
                };

                return (
                    <span style={containerStyle}>
                <span style={amountStyle}>{formattedAmount}</span>
            </span>
                );
            },
            width: 150,
        },
        {
            title: "Người gửi", // Thêm cột Người gửi
            dataIndex: "sender",
            key: "sender",
            width: 200,
        },
        {
            title: "Người nhận", // Thêm cột Người nhận
            dataIndex: "recipient",
            key: "recipient",
            width: 200,
        },
        {
            title: "Thêm",
            dataIndex: "more",
            key: "action",
            render: (_, record) => (
                <Button type="primary" shape="round" onClick={() => showModal(record)}>
                    {record.status === "Hoàn thành" ? "Xem chi tiết" : "Hoàn thành"}
                </Button>
            ),
            width: 150,
        },

    ];
    const data = dataTransactionWallet?.items?.map((item, index) => ({
        key: index + 1,
        id: `${item.transactionWalletCode}`,
        time: new Date(item.transactionDate).toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
        transactionType:
            item.transactionType === "DEPOSIT_AUCTION" ? "Nạp tiền đấu giá" :
                item.transactionType === "DEPOSIT" ? "Nạp tiền" :
                    item.transactionType === "WITHDRAWAL" ? "Rút tiền" :
                        item.transactionType === "REFUND" ? "Hoàn cọc" : "Chuyển khoản",

        method: item.image || "Không xác định",
        status: item.transactionStatus === "COMPLETED" ? "Hoàn thành" : "Đang xử lý",
        amount: item.amount,
        netAmount: item.netAmount,
        oldAmount: item.oldAmount,
        sender: item.senderName,
        recipient: item.recipientName,
    }));


    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1, // Cho phép Content chiếm không gian còn lại
                        display: 'flex', // Đặt display là flex để chứa nội dung
                        flexDirection: 'column', // Hướng theo chiều dọc
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Lịch sử giao dịch</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, // Để Layout chiếm hết không gian còn lại
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
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <Heading
                                size="text3xl"
                                as="h1"
                                className="mb-[20px] text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                            >
                                Lịch sử nạp tiền
                            </Heading>
                            {isErrorTransactionWallet ? (
                                    <Empty/>
                                ) :
                                <Skeleton loading={isLoadingTransactionWallet} active>
                                    <Table columns={columns} dataSource={data} bordered pagination={false}/>
                                </Skeleton>
                            }

                            {/*<Pagination className="ml-[290px]" />*/}
                            <div className="flex justify-center items-center mt-4">
                                <Pagination
                                    currentPage={page}
                                    totalPages={dataTransactionWallet?.totalPages || 1}
                                    onPageChange={setPage}
                                />
                            </div>
                            <Modal
                                title="Thông tin chi tiết giao dịch"
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={[<Button key="close" onClick={handleCancel}>Đóng</Button>]}
                            >
                                {selectedTransaction ? (
                                    <div
                                        className="border border-gray-300 rounded-lg p-6 bg-white shadow-lg max-w-lg mx-auto">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                                            Chi tiết Giao Dịch
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Mã giao dịch</span>
                                                <span
                                                    className="font-medium text-gray-900">{selectedTransaction.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Thời gian</span>
                                                <span
                                                    className="font-medium text-gray-900">{selectedTransaction.time}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Loại giao dịch</span>
                                                <span
                                                    className="font-medium text-gray-900">{selectedTransaction.transactionType}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Trạng thái</span>
                                                <span
                                                    className={`px-3 py-1 text-sm font-semibold rounded ${
                                                        selectedTransaction.status === "Thành công"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
          {selectedTransaction.status}
        </span>
                                            </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Giá trị giao dịch</span>
                                                        <span className="text-xl font-bold text-gray-600">
        {selectedTransaction.amount.toLocaleString("vi-VN")} đ
    </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Số tiền thực nhận</span>
                                                        <span className="text-xl font-bold text-gray-600">
        {selectedTransaction.netAmount.toLocaleString("vi-VN")} đ
    </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Số tiền ban đầu</span>
                                                        <span className="text-xl font-bold text-gray-800">
        {selectedTransaction.oldAmount.toLocaleString("vi-VN")} đ
    </span>
                                                    </div>


                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Người gửi</span>
                                                        <span
                                                            className="font-medium text-gray-900">{selectedTransaction.sender}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Người nhận</span>
                                                        <span
                                                            className="font-medium text-gray-900">{selectedTransaction.recipient}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            ) : (
                                            <p className="text-center text-gray-500">Không có thông tin giao dịch.</p>
                                            )}

                                        </Modal>

                                    </Content>
                                    </Layout>
                                    </Content>
                                    <FooterBK
                                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
                                    </Layout>
                                    </>
                                    );
                                }
