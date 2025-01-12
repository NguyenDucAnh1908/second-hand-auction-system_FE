import { Helmet } from "react-helmet";
import { Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
    Empty, Skeleton, Tag, Drawer, Space,
    Modal, Descriptions, Divider,
    DatePicker, Input, Form, TimePicker, message, Tabs, Spin, Badge, Table
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetItemDetailQuery, useGetItemsQuery } from "../../../services/item.service";
import { useUpdateAuctionMutation } from "../../../services/auction.service";
import DrawerDetailItem from "@/components/DrawerDetailItem/index.jsx";
import dayjs from "dayjs";
import AuctionFormModal from "../../../components/AuctionFormModal/AuctionFormModal.jsx";
import { useForm } from 'antd/es/form/Form';
import { useGetListRegisterUserQuery } from "../../../services/auctionRegistrations.service.js";
import { useGetAllBidsQuery } from "@/services/bid.service.js";
import { useGetTransactionWalletAuctionQuery } from "../../../services/transactionWallet.service.js";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
    "Tùy chỉnh"
];

const TABLE_HEAD2 = [
    "ID",
    "Hình ảnh",
    "Sản phẩm",
    "Trạng thái",
    "Thời gian",
    "Người bán",
    "Tiền cọc",
    "Thông tin",
    "Xem trực tiếp"
];

dayjs.extend(utc);
dayjs.extend(timezone);

export default function StaffProductListPage() {

    const [searchBarValue, setSearchBarValue] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { RangePicker } = DatePicker;
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [updateAuction, { isUpdateLoading }] = useUpdateAuctionMutation();
    const [form] = useForm();
    const [itemInfor, setItemInfor] = useState(null);

    const { data = {}, isLoading, isError, error } = useGetItemsQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });
    console.log(data)

    // const bidData = historyBid?.data || [];

    const TABLE_ROWS = data?.items?.map((item) => ({
        number: item?.itemId,
        product: item?.itemName,
        image: item?.thumbnail || "https://via.placeholder.com/150",
        time: item?.auction?.approved_at,
        status: item?.itemStatus,
        sellerHeader: item?.auction?.created_by || "Unknown Seller",
        auction: item?.auction,
        auctionId: item?.auction?.auction_id,
        itemInfor: item
    })) || [];




    const showDefaultDrawer = (itemId) => {
        setSize('default');
        setOpen(true);
        setSelectedItemId(itemId);
    };

    const handleShowAuctionDetail = (auctionId) => {
        navigate(`/AuctionDetailAdmin/${auctionId}`);
    };

    const showLargeDrawer = (itemId) => {
        setSize('large');
        setOpen(true);
        setSelectedItemId(itemId);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showModal = (auctionData, itemInfor) => {
        setSelectedAuction(auctionData);
        form.resetFields();
        setIsModalOpen(true);
        setItemInfor(itemInfor);
    };

    const auctionId = selectedAuction?.auction_id;
    const { data: transactionAuction, } = useGetTransactionWalletAuctionQuery(auctionId);
    console.log("id", transactionAuction);


    const navigate = useNavigate();

    const handleButtonClick = (itemId) => {
        navigate(`/ListOfBuyerBidsAdmin/15`); // Dẫn đến URL mới
    };


    // Thêm hàm gộp thông tin ngày và thời gian
    const formatDateTime = (date, time) => {
        return dayjs(`${date} ${time}`).format('DD/MM/YYYY HH:mm');
    };

    const handleFormSubmit = (formValues) => {
        console.log("Dữ liệu từ form: ", formValues);
        // Thêm logic xử lý ở đây (gửi request server, cập nhật database, v.v.)
    };


    const handleCloseModal = async () => {
        try {
            await refetch();
            const updatedAuction = await refetch();
            if (updatedAuction?.data?.items) {
                const newSelectedAuction = updatedAuction?.data?.items.find(
                    (item) => item.auction_id === selectedAuction?.auction_id
                );
                setSelectedAuction(newSelectedAuction);
            }
            form.resetFields();
        } catch (error) {
            console.error("Lỗi khi làm mới dữ liệu: ", error);
        } finally {
            setIsModalOpen(false); // Đảm bảo luôn đóng modal
        }
    };


    const [paging, setPaging] = useState({ page: 0, limit: 10 });


    const {
        data: registeredUsers,
        isLoading: isLoadingRegisteredUsers,
        isError: isErrorRegisteredUsers,
        error: errorRegisteredUsers,
    } = useGetListRegisterUserQuery({ auctionId: selectedAuction?.auction_id, paging });

    const validRegisteredUsers = Array.isArray(registeredUsers?.list) ? registeredUsers.list : [];

    const totalPages = registeredUsers?.totalPages || 0;
    const getTransactionStatusInVietnamese = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'Hoàn thành';
            case 'PENDING':
                return 'Đang chờ xử lý';
            case 'FAILED':
                return 'Thất bại';
            case 'CANCELLED':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const getTransactionTypeInVietnamese = (transactionType) => {
        switch (transactionType) {
            case 'DEPOSIT':
                return 'Nạp tiền';
            case 'WITHDRAWAL':
                return 'Rút tiền';
            case 'TRANSFER':
                return 'Chuyển tiền';
            case 'REFUND':
                return 'Hoàn tiền';
            case 'DEPOSIT_AUCTION':
                return 'Nạp tiền cọc đấu giá';
            default:
                return 'Loại giao dịch không xác định';
        }
    };

    const [isRegisteredUsersModalOpen, setIsRegisteredUsersModalOpen] = useState(false); // Sử dụng biến riêng cho modal này
    const showRegisteredUsersModal = () => {

        setIsRegisteredUsersModalOpen(true); // Mở modal

    };

    // Hàm đóng modal
    const handleCloseRegisteredUsersModal = () => {
        setIsRegisteredUsersModalOpen(false); // Đóng modal
    };


    // Hàm xử lý chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) { // Đảm bảo trang hợp lệ
            setPaging((prev) => ({ ...prev, page: newPage }));
        }
    };


    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    //api gọi lịch sử bid

    const [bidData, setBidData] = useState([]); // State riêng biệt lưu bid data


    const { data: historyBid } = useGetAllBidsQuery({
        auctionId: parseInt(itemInfor?.auction?.auction_id, 10) || 0,
        page: 0,
    });

    useEffect(() => {
        if (historyBid?.data) {
            setBidData(historyBid.data);
        } else {
            setBidData([]);
        }
    }, [historyBid?.data]);

    useEffect(() => {
        if (isModalOpen && historyBid?.data) {
            setBidData(historyBid.data);
        } else if (isModalOpen) {
            setBidData([]);
        }
    }, [historyBid?.data, isModalOpen]);
    //end

    const items = itemInfor ? [
        {
            key: '1',
            label: 'Tên sản phẩm',
            children: itemInfor?.itemName,
            span: 2,
        },
        {
            key: '2',
            label: 'Hình Ảnh',
            children: (
                <img
                    src={itemInfor?.thumbnail}
                    alt="Product"
                    className="w-[30%] h-48 object-cover rounded"
                />
            ),
            span: 3,
        },
        {
            key: '3',
            label: 'ID Phiên đấu giá',
            children: `${itemInfor?.auction?.auction_id}`,
        },
        {
            key: '4',
            label: 'Thời Gian Đấu Giá',
            children: `${itemInfor?.auction?.start_time || ''} - ${itemInfor?.auction?.startDate || ''} đến ${itemInfor?.auction?.end_time || ''} - ${itemInfor?.auction?.endDate || ''}`,
            span: 2,
        },
        {
            key: '5',
            label: 'Trạng Thái',
            children: (
                <Badge
                    status={
                        itemInfor?.auction?.status === 'CANCELLED' ? 'error' :
                            itemInfor?.auction?.status === 'CLOSED' ? 'default' :
                                itemInfor?.auction?.status === 'COMPLETED' ? 'success' :
                                    itemInfor?.auction?.status === 'OPEN' ? 'processing' :
                                        itemInfor?.auction?.status === 'PENDING' ? 'warning' :
                                            'default'
                    }
                    text={
                        itemInfor?.auction?.status === 'CANCELLED' ? 'Đã hủy' :
                            itemInfor?.auction?.status === 'CLOSED' ? 'Đã đóng' :
                                itemInfor?.auction?.status === 'COMPLETED' ? 'Hoàn thành' :
                                    itemInfor?.auction?.status === 'OPEN' ? 'Đang mở' :
                                        itemInfor?.auction?.status === 'PENDING' ? 'Đang chờ' :
                                            'Không xác định'
                    }
                />
            ),
            span: 3,
        },
        {
            key: '6',
            label: 'Người Bán',
            children: itemInfor?.auction?.created_by,
        },
        {
            key: '7',
            label: 'Tiền Cọc',
            children: `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format((itemInfor?.auction?.buy_now_price) * (itemInfor?.auction?.percent_deposit) / 100)}`,
        },
        {
            key: '8',
            label: 'Tình trạng Pin',
            children: `${itemInfor?.batteryHealth} %`,
        },
        {
            key: '22',
            label: 'Hệ điều hành',
            children: itemInfor?.itemSpecification?.osFamily,
        },
        {
            key: '9',
            label: 'Phiên bản hệ điều hành',
            children: itemInfor?.itemSpecification?.os,
        },
        {
            key: '10',
            label: 'Trạng thái iCloud',
            children: itemInfor?.icloudStatus,
        },
        {
            key: '11',
            label: 'Tình trạng vỏ máy',
            children: itemInfor?.bodyCondition,
        },
        {
            key: '12',
            label: 'Tình trạng màn hình',
            children: itemInfor?.screenCondition,
        },
        {
            key: '13',
            label: 'Tình trạng camera',
            children: itemInfor?.cameraCondition,
        },
        {
            key: '14',
            label: 'Tình trạng cổng',
            children: itemInfor?.portCondition,
        },
        {
            key: '15',
            label: 'Tình trạng nút bấm',
            children: itemInfor?.buttonCondition,
        },
        // Item specification
        {
            key: '16',
            label: 'Chíp xử lý',
            children: itemInfor?.itemSpecification?.cpu,
        },
        {
            key: '17',
            label: 'RAM',
            children: itemInfor?.itemSpecification?.ram,
        },
        {
            key: '18',
            label: 'Kích thước màn hình',
            children: itemInfor?.itemSpecification?.screenSize,
        },
        {
            key: '19',
            label: 'Camera',
            children: itemInfor?.itemSpecification?.cameraSpecs,
        },
        {
            key: '20',
            label: 'Kết nối',
            children: itemInfor?.itemSpecification?.connectivity,
        },
        {
            key: '21',
            label: 'Cảm biến',
            children: itemInfor?.itemSpecification?.sensors,
        },
        // New fields added

        {
            key: '21',
            label: 'Cảm biến',
            children: itemInfor?.itemSpecification?.sensors,
        },
        {
            key: '22',
            label: 'SIM',
            children: itemInfor?.itemSpecification?.sim,
        },
        {
            key: '23',
            label: 'Số khe SIM',
            children: itemInfor?.itemSpecification?.simSlots,
        },
        {
            key: '24',
            label: 'Hệ điều hành',
            children: itemInfor?.itemSpecification?.os,
        },
        {
            key: '25',
            label: 'Loại Bluetooth',
            children: itemInfor?.itemSpecification?.bluetooth,
        },
        {
            key: '26',
            label: 'Cổng USB',
            children: itemInfor?.itemSpecification?.usb,
        },
        {
            key: '27',
            label: 'Wi-Fi',
            children: itemInfor?.itemSpecification?.wlan,
        },
        {
            key: '28',
            label: 'Tốc độ mạng',
            children: itemInfor?.itemSpecification?.speed,
        },
        {
            key: '29',
            label: 'Công nghệ mạng',
            children: itemInfor?.itemSpecification?.networkTechnology,
        }



    ].filter(item => item.children !== null && item.children !== undefined) : [];



    return (
        <>

            <Modal
                title="Thông tin phiên đấu giá"
                open={isModalOpen}
                onCancel={() => {
                    handleCloseModal();
                    window.location.reload();
                }}
                maskClosable={true}
                footer={null}
                width="100vw"
                style={{
                    top: 0,
                    left: 0,
                    margin: 0,
                }}

            >
                <Tabs defaultActiveKey="1">
                    {/* Thông tin chi tiết của phiên đấu giá */}



                    <Tabs.TabPane tab="Thông tin chi tiết" key="1">
                        {items.length > 0 ? (
                            <Descriptions bordered column={1}>
                                {items.map((item) => (
                                    <Descriptions.Item key={item.key} label={item.label} span={item.span || 1}>
                                        {item.children}
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                        ) : (
                            <Empty description="Không có dữ liệu" />
                        )}

                        <Divider />

                        {/* Bảng lịch sử bid */}
                        <Table
                            columns={[
                                {
                                    title: 'Họ và Tên',
                                    dataIndex: 'username',
                                    key: 'username',
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'email',
                                    key: 'email',
                                },
                                {
                                    title: 'Thời gian',
                                    dataIndex: 'bidTime',
                                    key: 'bidTime',
                                    render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
                                },
                                {
                                    title: 'Số Tiền',
                                    dataIndex: 'bidAmount',
                                    key: 'bidAmount',
                                    render: (amount) =>
                                        new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(amount),
                                },
                                {
                                    title: 'Trạng Thái',
                                    dataIndex: 'winBid',
                                    key: 'status',
                                    render: (status) => (
                                        <span
                                            style={{
                                                height: 24,
                                                width: 100,
                                                backgroundColor: status ? '#38A169' : '#E53E3E',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                display: 'inline-block',
                                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                                                transform: 'scale(1)',
                                            }}
                                        >
                                            {status ? 'Thắng' : 'Thua'}
                                        </span>
                                    ),
                                },
                            ]}
                            dataSource={bidData}
                            pagination={false}
                            rowKey="userId"
                        />

                        <Divider />

                        {/* Thêm phần hiển thị lịch sử bid của user */}
                        <Descriptions title="" bordered column={1}>
                            {bidData.length > 0 ? (
                                <Table
                                    columns={[
                                        {
                                            title: 'Họ và Tên',
                                            dataIndex: 'username',
                                            key: 'username',
                                        },
                                        {
                                            title: 'Email',
                                            dataIndex: 'email',
                                            key: 'email',
                                        },
                                        {
                                            title: 'Thời gian',
                                            dataIndex: 'bidTime',
                                            key: 'bidTime',
                                            render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
                                        },
                                        {
                                            title: 'Số Tiền',
                                            dataIndex: 'bidAmount',
                                            key: 'bidAmount',
                                            render: (amount) =>
                                                new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(amount),
                                        },
                                    ]}
                                    dataSource={bidData}
                                    pagination={false}
                                    rowKey="userId"
                                />
                            ) : (
                                <Empty description="Không có lịch sử đấu giá" />
                            )}
                        </Descriptions>
                    </Tabs.TabPane>


                    {/* Tab Thông tin phiên đấu giá */}
                    <Tabs.TabPane tab="Cập nhập phiên đấu giá" key="2">
                        {selectedAuction ? (
                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    startDate: dayjs(selectedAuction?.startDate),
                                    endDate: dayjs(selectedAuction?.endDate),
                                    start_time: dayjs(selectedAuction?.start_time, "HH:mm"),
                                    end_time: dayjs(selectedAuction?.end_time, "HH:mm"),
                                    buy_now_price: selectedAuction?.buy_now_price,
                                    percent_deposit: selectedAuction?.percent_deposit,
                                }}
                                onFinish={async (values) => {
                                    const startDate = dayjs(values.startDate);
                                    const endDate = dayjs(values.endDate);

                                    // const startDate = dayjs(values.startDate).tz("Asia/Ho_Chi_Minh");
                                    // const endDate = dayjs(values.endDate).tz("Asia/Ho_Chi_Minh");

                                    if (startDate.isAfter(endDate)) {
                                        message.error("Ngày bắt đầu không được sau ngày kết thúc!");
                                        return;
                                    }
                                    try {
                                        const updatedData = {
                                            ...selectedAuction,
                                            start_date: dayjs(values.startDate).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
                                            end_date: dayjs(values.endDate).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
                                            start_time: dayjs(values.start_time).format("HH:mm") + ":00",
                                            end_time: dayjs(values.end_time).format("HH:mm") + ":00",
                                            buy_now_price: parseFloat(values.buy_now_price) || 0,
                                            percent_deposit: parseFloat(values.percent_deposit) || 0,
                                        };

                                        const response = await updateAuction({
                                            auctionId: selectedAuction.auction_id,
                                            auctionData: updatedData,
                                        }).unwrap();

                                        message.success("Cập nhật thông tin thành công!");
                                        setIsModalOpen(false);
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 2000);
                                    } catch (error) {
                                        console.error("Lỗi trong quá trình gửi request: ", error);
                                        message.error("Cập nhật thất bại!");
                                    }
                                }}
                            >
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label="Thời gian bắt đầu">
                                        <Form.Item name="startDate" noStyle>
                                            <DatePicker placeholder="Chọn ngày bắt đầu" format="DD/MM/YYYY" />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Thời gian kết thúc">
                                        <Form.Item name="endDate" noStyle>
                                            <DatePicker placeholder="Chọn ngày kết thúc" format="DD/MM/YYYY" />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Giờ bắt đầu">
                                        <Form.Item name="start_time" noStyle>
                                            <TimePicker format="HH:mm" placeholder="Chọn giờ bắt đầu" />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Giờ kết thúc">
                                        <Form.Item name="end_time" noStyle>
                                            <TimePicker format="HH:mm" placeholder="Chọn giờ kết thúc" />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Giá mua ngay (VNĐ)">
                                        <Form.Item name="buy_now_price" noStyle>
                                            <Input />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tiền cọc (%)">
                                        <Form.Item name="percent_deposit" noStyle>
                                            <Input />
                                        </Form.Item>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Trạng thái">
                                        {selectedAuction?.status === "OPEN"
                                            ? "Đang mở"
                                            : selectedAuction?.status === "CLOSED"
                                                ? "Đã đóng"
                                                : selectedAuction?.status === "PENDING"
                                                    ? "Chưa mở"
                                                    : "Không xác định"}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isUpdateLoading}>
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Form>
                        ) : (
                            <Empty description="Không có thông tin đấu giá" />
                        )}
                    </Tabs.TabPane>

                    {/* Tab Danh sách người dùng đã đăng ký */}
                    <Tabs.TabPane tab="Danh sách người dùng đã đăng ký" key="3">
                        <Spin spinning={isLoadingRegisteredUsers}>
                            {validRegisteredUsers?.length > 0 ? (
                                <div className="space-y-4">
                                    {validRegisteredUsers.map((user, index) => (
                                        <div key={user.ar_id} className="p-3 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
                                            <span className="font-semibold text-sm text-gray-800">
                                                {index + 1}. {user.user_name}
                                            </span>
                                            <div className="text-xs text-gray-600">
                                                <p>{formatDate(user.created_date)}</p>
                                                <p className="font-semibold text-blue-600">{formatCurrency(user.deposite_amount)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">Không có người dùng nào được đăng ký.</p>
                            )}
                        </Spin>
                        {isErrorRegisteredUsers && (
                            <p className="text-red-500 text-center mt-4">Có lỗi xảy ra khi tải danh sách người dùng!</p>
                        )}
                        <Pagination
                            currentPage={paging.page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Tabs.TabPane>

                    {/*Ví của phiên đấu giá*/}
                    <Tabs.TabPane tab="Ví đấu giá" key="4">
                        <Spin spinning={isLoading}>
                            {/* Kiểm tra data và data.data */}
                            {transactionAuction?.data?.length > 0 ? (
                                <div className="space-y-6">
                                    {/* Hiển thị số dư ví */}
                                    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-700 tracking-wide">Số dư ví</span>
                                            <span className="text-3xl font-semibold text-green-600">
                                                {transactionAuction.balance > 0
                                                    ? formatCurrency(transactionAuction.balance)
                                                    : "0đ"}
                                            </span>
                                        </div>
                                        {/* Thêm một đường viền nhẹ dưới phần số dư */}
                                        <div className="mt-6 h-1 bg-gradient-to-r from-green-400 to-blue-300 rounded-full"></div>
                                    </div>




                                    {/* Hiển thị danh sách giao dịch */}
                                    {transactionAuction.data.map((transaction, index) => (
                                        <div
                                            key={transaction.transactionId}
                                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-shadow duration-200"
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-blue-600 font-semibold text-lg">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="text-gray-800 font-medium text-sm">
                                                        {transaction.senderName}
                                                    </span>
                                                </div>
                                                <span className="text-gray-500 text-xs italic">
                                                    Mã GD: {transaction.transactionWalletCode}
                                                </span>
                                            </div>

                                            {/* Transaction Details */}
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                                <p>
                                                    <span className="font-medium">Loại giao dịch:</span>{' '}
                                                    {getTransactionTypeInVietnamese(transaction.transactionType)}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Số tiền:</span>{' '}
                                                    <span
                                                        className={`font-semibold ${transaction.amount >= 0
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                            }`}
                                                    >
                                                        {transaction.amount >= 0
                                                            ? `+ ${formatCurrency(transaction.amount)}`
                                                            : `- ${formatCurrency(transaction.amount)}`}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="font-medium">Trạng thái:</span>{' '}
                                                    <span
                                                        className={`${transaction.transactionStatus === 'COMPLETED'
                                                            ? 'text-green-500'
                                                            : transaction.transactionStatus === 'FAILED'
                                                                ? 'text-red-500'
                                                                : 'text-yellow-500'
                                                            } font-bold`}
                                                    >
                                                        {getTransactionStatusInVietnamese(transaction.transactionStatus)}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className="font-medium">Ngày Giao dịch:</span>{' '}
                                                    {new Date(transaction.transactionDate).toLocaleString('vi-VN')}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Số dư trước:</span>{' '}
                                                    {formatCurrency(transaction.oldAmount)}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Số dư sau:</span>{' '}
                                                    {formatCurrency(transaction.netAmount)}
                                                </p>
                                            </div>

                                            {/* Optional Image */}
                                            {transaction.image && (
                                                <div className="mt-4">
                                                    <p className="font-medium text-sm text-gray-800">Hình ảnh:</p>
                                                    <img
                                                        src={transaction.image}
                                                        alt="Transaction"
                                                        className="w-full max-w-sm rounded-lg mt-2 border"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">Không có giao dịch nào trong ví đấu giá.</p>
                            )}
                        </Spin>
                        {isError && (
                            <p className="text-red-500 text-center mt-4">Có lỗi xảy ra khi tải dữ liệu ví đấu giá!</p>
                        )}
                    </Tabs.TabPane>

                </Tabs>
            </Modal>





            <div className="flex w-full flex-col items-start justify-center gap-10 bg-
            bg-white md:p-5">
                <InputDH
                    name="Search Box"
                    placeholder={`Tìm kiếm theo ID`}
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    suffix={
                        searchBarValue?.length > 0 ? (
                            <CloseSVG onClick={() => setSearchBarValue("")} height={18} width={18}
                                fillColor="#626974ff" />
                        ) : (
                            <Img src="/images/img_search.svg" alt="Search" className="h-[18px] w-[18px]" />
                        )
                    }
                    className=" flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs md:ml-0"
                />
                <div className="w-full md:w-full">
                    {isError ? (
                        <Empty />
                    ) : (
                        <Skeleton loading={isLoading} active>
                            <Card className="h-full w-full overflow-scroll">
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th key={head} className="p-4 pt-10">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold leading-none"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TABLE_ROWS.map(({
                                            number,
                                            product,
                                            image,
                                            time,
                                            status,
                                            sellerHeader, auction, auctionId, itemInfor
                                        }) => {
                                            return (
                                                <tr key={number}>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {number}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal text-gray-600"
                                                        >
                                                            {product}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        <img
                                                            src={image}
                                                            alt={product}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal text-gray-600"
                                                        >
                                                            {time}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4">
                                                        {status === "ACCEPTED" && (
                                                            <Tag icon={<CheckCircleOutlined />}
                                                                color="success">
                                                                {status}
                                                            </Tag>
                                                        )}
                                                        {status === "pending" && (
                                                            <Tag icon={<SyncOutlined spin />}
                                                                color="processing">
                                                                Pending
                                                            </Tag>
                                                        )}
                                                        {status === "UnAvailable" && (
                                                            <Tag icon={<CloseCircleOutlined />}
                                                                color="error">
                                                                UnAvailable
                                                            </Tag>
                                                        )}
                                                        {status === "Fail" && (
                                                            <Tag icon={<ExclamationCircleOutlined />}
                                                                color="warning">
                                                                Fail
                                                            </Tag>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal text-gray-600"
                                                        >
                                                            {sellerHeader}
                                                        </Typography>
                                                        {/*{sellerHeader === "Available" && (*/}
                                                        {/*    <Tag icon={<CheckCircleOutlined/>}*/}
                                                        {/*         color="success">*/}
                                                        {/*        Available*/}
                                                        {/*    </Tag>*/}
                                                        {/*)}*/}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                onClick={() => showModal(auction, itemInfor)}
                                                                color="blue"
                                                                disabled={!auction}
                                                            >
                                                                Tùy chỉnh
                                                            </Button>



                                                        </div>
                                                    </td>

                                                    <td className="p-4">

                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={() => showDefaultDrawer(number)} color="blue">Chi
                                                                tiết</Button>
                                                        </div>
                                                    </td>

                                                    {/* <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={() => handleShowAuctionDetail(auctionId)} color="blue">
                                                                Chi tiết Auction
                                                            </Button>
                                                        </div>
                                                    </td> */}
                                                    {/* <td className="p-4">

                                                        <div className="flex items-center gap-2">
                                                            <Button onClick={handleButtonClick} color="green">
                                                                Danh sách đấu giá
                                                            </Button>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                        </Skeleton>
                    )}

                    <div className="flex justify-center items-center mt-4">
                        <Pagination
                            currentPage={page}
                            totalPages={data.totalPages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>

            <Drawer
                title={"Chi tiết sản phẩm"}
                placement="right"
                size={size}
                width={1700}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Đóng</Button>
                        {/* <Button type="primary" onClick={onClose}>
                            OK
                        </Button> */}
                    </Space>
                }
            >
                <DrawerDetailItem itemIds={selectedItemId} />
            </Drawer>




        </>
    );
}
