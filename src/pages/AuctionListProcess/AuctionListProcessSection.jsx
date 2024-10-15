import { Img, InputDH } from "../../components/index.jsx";
import { Button, Card, Typography, Select, Option } from "@material-tailwind/react";
import { Tag } from "antd";
import Pagination from "@/components/Pagination/index.jsx";
import React, { useState, useEffect } from 'react';
import Modal from "./Modal.jsx";
import { SyncOutlined } from "@ant-design/icons";

// Các trường tiêu đề cho bảng
const TABLE_HEAD = [
    "Số Đăng Ký",
    "Hình ảnh",
    "Sản phẩm",
    "Thời gian còn lại",
    "Trạng thái",
    "Giá Hiện Tại",
    "Giá của bạn", // Thêm cột "Giá của bạn"
    "Tùy chỉnh"
];

// Dữ liệu mẫu cho các sản phẩm đang đấu giá
const TABLE_ROWS = [
    {
        number: "#AU-415646",
        product: "Smartphone",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        endTime: new Date("2024-11-01T10:00:00"), // Thời gian kết thúc đấu giá
        status: "Đang đấu giá",
        currentPrice: 500,
        yourPrice: 500,
    },
    {
        number: "#AU-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        endTime: new Date("2024-11-01T11:00:00"),
        status: "Đang đấu giá",
        currentPrice: 1000,
        yourPrice: 1000,
    },
    {
        number: "#AU-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        endTime: new Date("2024-11-01T12:00:00"),
        status: "Đang đấu giá",
        currentPrice: 300,
        yourPrice: 250,
    },
    {
        number: "#AU-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        endTime: new Date("2024-11-01T13:00:00"),
        status: "Đang đấu giá",
        currentPrice: 200,
        yourPrice: 100,
    },
];

export default function AuctionListProcessSection() {
    const [searchBarValue, setSearchBarValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDetailClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const [remainingTime, setRemainingTime] = useState({});

    const calculateRemainingTime = (endTime) => {
        const now = new Date();
        const timeDiff = new Date(endTime) - now;

        if (timeDiff <= 0) {
            return "Đã kết thúc"; // Nếu thời gian còn lại <= 0
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    };

    useEffect(() => {
        const updateRemainingTime = () => {
            const newRemainingTime = TABLE_ROWS.reduce((acc, row) => {
                acc[row.number] = calculateRemainingTime(row.endTime);
                return acc;
            }, {});
            setRemainingTime(newRemainingTime);
        };

        updateRemainingTime();
        const intervalId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

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
                            </Select>
                        </div>
                    </div>
                    <Card className="h-full w-full overflow-auto">
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
                                            <img src={row.image} alt={row.product} className="w-16 h-16 object-cover rounded" />
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {row.product}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {remainingTime[row.number] || "Đang cập nhật..."} {/* Hiển thị thời gian còn lại */}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Tag icon={<SyncOutlined spin />} color="processing">
                                                {row.status}
                                            </Tag>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                ${row.currentPrice}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography
                                                variant="small"
                                                className={`font-normal ${row.yourPrice >= row.currentPrice ? 'text-green-500' : 'text-red-500'}`}
                                            >
                                                ${row.yourPrice}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Button color="blue" onClick={() => handleDetailClick(row)}>Chi tiết</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                    <div className="flex justify-center items-center mt-4">
                        <Pagination />
                    </div>
                </div>
            </div>

            {/* Modal để hiển thị thông tin chi tiết sản phẩm */}
            <Modal isOpen={modalOpen} onClose={closeModal}>
                {selectedProduct && (
                    <div>
                        <Typography variant="h5" className="font-bold">{selectedProduct.product}</Typography>
                        <img src={selectedProduct.image} alt={selectedProduct.product} className="w-[30%] h-48 object-cover rounded mt-4" />
                        <Typography className="mt-2">Số Đăng Ký: {selectedProduct.number}</Typography>
                        <Typography className="mt-2">Thời gian đấu giá còn lại: {calculateRemainingTime(selectedProduct.endTime)}</Typography> {/* Sửa lại cách gọi hàm */}
                        <Typography className="mt-2">Giá Hiện Tại: ${selectedProduct.currentPrice}</Typography>
                        <Typography className="mt-2">Giá của bạn: ${selectedProduct.yourPrice}</Typography>
                    </div>
                )}
            </Modal>
        </div>
    );
}
