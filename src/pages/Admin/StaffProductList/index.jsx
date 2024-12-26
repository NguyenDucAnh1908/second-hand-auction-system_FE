import { Helmet } from "react-helmet";
import { Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
    Empty, Skeleton, Tag, Drawer, Space,
    Modal, Descriptions, Divider,
    DatePicker, Input, Form, TimePicker, message, Tabs, Spin, Badge
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

    ] : [];

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
                bodyStyle={{ height: '100vh', padding: 0 }}
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
