import { Helmet } from "react-helmet";
import { Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import {
    Empty, Skeleton, Tag, Drawer, Space,
    Modal, Descriptions, Divider,
    DatePicker, Input, Form, TimePicker, message
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetItemDetailQuery, useGetItemsQuery } from "../../../services/item.service";
import { useUpdateAuctionMutation } from "../../../services/auction.service";
import DrawerDetailItem from "@/components/DrawerDetailItem/index.jsx";
import dayjs from "dayjs";
import AuctionFormModal from "../../../components/AuctionFormModal/AuctionFormModal.jsx";
import { useForm } from 'antd/es/form/Form';



const TABLE_HEAD = [
    "Number",
    "Sản phẩm",
    "Hình ảnh",
    "Thời gian",
    "Trạng thái",
    "Người bán",
    "Tùy chỉnh"
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
        auction: item?.auction
    })) || [];




    const showDefaultDrawer = (itemId) => {
        setSize('default');
        setOpen(true);
        setSelectedItemId(itemId);
    };
    const showLargeDrawer = (itemId) => {
        setSize('large');
        setOpen(true);
        setSelectedItemId(itemId);
    };
    const onClose = () => {
        setOpen(false);
    };

    const showModal = (auctionData) => {
        setSelectedAuction(auctionData);
        setIsModalOpen(true);
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
    



    return (
        <>

            <Modal
                title="Thông tin phiên đấu giá"
                open={isModalOpen}
                onCancel={handleCloseModal}
                maskClosable={true}
                footer={null} // Ẩn footer mặc định
            >
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


                                // Gọi API cập nhật thông tin
                                const response = await updateAuction({
                                    auctionId: selectedAuction.auction_id,
                                    auctionData: updatedData,
                                }).unwrap();


                                // Thêm thông báo thành công và đóng modal
                                message.success("Cập nhật thông tin thành công!");
                                setIsModalOpen(false); // Đảm bảo tắt modal
                            } catch (error) {
                                console.error("Lỗi trong quá trình gửi request: ", error);
                                message.error("Cập nhật thất bại!");
                            }
                        }}




                    >
                        <Descriptions bordered column={1}>
                            {/* Thời gian bắt đầu */}
                            <Descriptions.Item label="Thời gian bắt đầu">
                                <Form.Item name="startDate" noStyle>
                                    <DatePicker
                                        placeholder="Chọn ngày bắt đầu"
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Thời gian kết thúc */}
                            <Descriptions.Item label="Thời gian kết thúc">
                                <Form.Item name="endDate" noStyle>
                                    <DatePicker
                                        placeholder="Chọn ngày kết thúc"
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Giờ bắt đầu */}
                            <Descriptions.Item label="Giờ bắt đầu">
                                <Form.Item name="start_time" noStyle>
                                    <TimePicker
                                        format="HH:mm"
                                        placeholder="Chọn giờ bắt đầu"
                                    />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Giờ kết thúc */}
                            <Descriptions.Item label="Giờ kết thúc">
                                <Form.Item name="end_time" noStyle>
                                    <TimePicker
                                        format="HH:mm"
                                        placeholder="Chọn giờ kết thúc"
                                    />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Giá mua ngay */}
                            <Descriptions.Item label="Giá mua ngay (VNĐ)">
                                <Form.Item name="buy_now_price" noStyle>
                                    <Input />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Tiền cọc */}
                            <Descriptions.Item label="Tiền cọc (%)">
                                <Form.Item name="percent_deposit" noStyle>
                                    <Input />
                                </Form.Item>
                            </Descriptions.Item>

                            {/* Trạng thái */}
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
                                            sellerHeader, auction
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
                                                                onClick={() => showModal(auction)}
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
                width={1200}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <DrawerDetailItem itemIds={selectedItemId} />
            </Drawer>


        </>
    );
}
