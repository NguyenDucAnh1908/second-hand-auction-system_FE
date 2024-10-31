import {Img, InputDH} from "../../components/index.jsx";
import {Button, Card, Typography, Select, Option} from "@material-tailwind/react";
import {Tag, Badge, Descriptions, Modal} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import React, {useState} from 'react';
import {useGetAuctionRegisterQuery, useGetAuctionRegisterDetailQuery} from "@/services/auctionRegistrations.service.js";

const TABLE_HEAD = [
    "Số Đăng Ký",
    "Hình ảnh",
    "Sản phẩm",
    "Thời gian đấu giá",
    "Trạng thái",
    "Người bán",
    "Tiền cọc",
    "Tùy chỉnh"
];


export default function ListRegisterAuctionSection() {
    const [searchBarValue, setSearchBarValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedArId, setSelectedArId] = useState(null);
    const {
        data = {},
        isLoading: isLoadingAutionRegister,
        isError: isErrorAutionRegister,
        error: errorAutionRegister
    } = useGetAuctionRegisterQuery({
        page: page - 1,
        limit: 10
    });
    const {
        data: dataAuctionRegisterDetail,
        isLoading: isLoadingAuctionRegisterDetail,
        isError: isErrorAuctionRegisterDetail,
        error: errorAuctionRegisterDetail,
    } = useGetAuctionRegisterDetailQuery(selectedArId ? {id: selectedArId} : null, {
        skip: !selectedArId,
    });

    const showModal = (ar_id) => {
        setSelectedArId(ar_id); // Lưu ar_id đã chọn
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const TABLE_ROWS = data.items?.map((item) => ({
        number: `#AU-${item.ar_id}`,
        product: item.auctionItem.itemName,
        image: item.auctionItem.thumbnail,
        time: item.auctionItem.auction.startDate,
        status: item.auctionItem.auction.status,
        sellerHeader: item.auctionItem.auction.created_by,
        totalHeader: `$${(item.auctionItem.auction.start_price)}`,
        action: <Button color="blue" onClick={() => showModal(item.ar_id)}>Chi tiết</Button>,
        //.toFixed(2)<Button color="blue" onClick={showModal((record.ar_id)}>Chi tiết</Button>
    })) || [];
    console.log("data",data);

    const items = dataAuctionRegisterDetail ? [
        {
            key: '1',
            label: 'Sản Phẩm',
            children: dataAuctionRegisterDetail?.auctionItem?.itemName,
            span: 2,
        },
        {
            key: '2',
            label: 'Hình Ảnh',
            children: (
                <img
                    src={dataAuctionRegisterDetail?.auctionItem?.thumbnail}
                    alt="Product"
                    className="w-[30%] h-48 object-cover rounded"
                />
            ),
            span: 3,
        },
        {
            key: '3',
            label: 'Số Đăng Ký',
            children: `#AU-${dataAuctionRegisterDetail?.ar_id}`,
        },
        {
            key: '4',
            label: 'Thời Gian Đấu Giá',
            children: dataAuctionRegisterDetail?.auctionItem?.auction?.startDate,
            span: 2,
        },
        {
            key: '5',
            label: 'Trạng Thái',
            children: <Badge status="processing" text={dataAuctionRegisterDetail?.status}/>,
            span: 3,
        },
        {
            key: '6',
            label: 'Người Bán',
            children: dataAuctionRegisterDetail?.auctionItem?.auction?.created_by,
        },
        {
            key: '7',
            label: 'Tiền Cọc',
            children: `$${dataAuctionRegisterDetail?.deposite_amount}`,
        },
    ] : [];
    // if (isLoading) return <div>Loading...</div>;
    if (isErrorAutionRegister) return <div>Error: {isErrorAutionRegister?.message || "API request failed."}</div>;
    // if (isLoading) return <div>Loading...</div>;
    if (isErrorAuctionRegisterDetail) return <div>Error: {isErrorAuctionRegisterDetail?.message || "API request failed."}</div>;
    return (
        <div>
            <div className="flex w-full flex-col items-center">
                <div className="mx-auto flex w-full max-w-[1294px] flex-col gap-10 self-stretch">
                    <div className="flex justify-between gap-5 sm:flex-col">
                        <InputDH
                            name="Search InputDH"
                            placeholder={`Tìm kiếm theo ID`}
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            className="flex h-[40px] w-[20%] items-center justify-center gap-1.5 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full"
                        />
                        <div className="flex justify-between gap-5 sm:flex-col mt-2">
                            <Select size="lg" label="Chọn Trạng Thái">
                                <Option>Tất cả</Option>
                                <Option>Thành công</Option>
                                <Option>Đã hủy</Option>
                            </Select>
                        </div>
                    </div>
                    <Card className="h-full w-full overflow-auto">
                        {isLoadingAutionRegister ? (
                            <p>Loading...</p>
                        ) : isErrorAutionRegister ? (
                            <p>Error: {errorAutionRegister?.message || "Failed to load data"}</p>
                        ) : (
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
                                {TABLE_ROWS.map((row) => (
                                    <tr key={row.number}>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                {row.number}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <img src={row.image} alt={row.product}
                                                 className="w-16 h-16 object-cover rounded"/>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {row.product}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {row.time}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            {row.status === "OPEN" ? (
                                                <Tag icon={<CheckCircleOutlined/>} color="success">Đã đăng kí</Tag>
                                            ) : (
                                                <Tag icon={<CloseCircleOutlined/>} color="error">Đã hủy</Tag>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {row.sellerHeader}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {row.totalHeader}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            {/*<Button color="blue" onClick={showModal}>Chi tiết</Button>*/}
                                            {row.action}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination currentPage={page}
                                    totalPages={data.totalPages || 1}
                                    onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>
            <Modal footer={null} width={1000} title="Register Auction Detail" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                {isLoadingAuctionRegisterDetail ? (
                    <p>Loading details...</p>
                ) : (
                    <Descriptions title="Infomation Info" layout="vertical" bordered items={items}/>
                )}
            </Modal>
        </div>
    );
}