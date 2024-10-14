import { Img, InputDH } from "../../components/index.jsx";
import { Button, Card, Typography, Select, Option } from "@material-tailwind/react";
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import React, { useState } from 'react';
import Modal from "./Modal.jsx";

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
const TABLE_ROWS = [
    {
        number: "#AU-415646",
        product: "Smartphone",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "01 Feb 2024",
        status: "Success",
        sellerHeader: "Han So Hee",
        totalHeader: "$500",
    },
    {
        number: "#AU-415647",
        product: "Laptop",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "01 Feb 2024",
        status: "Success",
        sellerHeader: "Han So Hee",
        totalHeader: "$1000",
    },
    {
        number: "#AU-415648",
        product: "Tablet",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "01 Feb 2024",
        status: "Fail",
        sellerHeader: "Han So Hee",
        totalHeader: "$300",
    },
    {
        number: "#AU-415649",
        product: "Smartwatch",
        image: "https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f",
        time: "01 Feb 2024",
        status: "Fail",
        sellerHeader: "Han So Hee",
        totalHeader: "$200",
    },
];
export default function ListRegisterAuctionSection() {
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
                                                {row.time}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            {row.status === "Success" ? (
                                                <Tag icon={<CheckCircleOutlined />} color="success">Thành công</Tag>
                                            ) : (
                                                <Tag icon={<CloseCircleOutlined />} color="error">Đã hủy</Tag>
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

            {/* Sử dụng modal tùy chỉnh ở đây */}
            <Modal isOpen={modalOpen} onClose={closeModal}>
                {selectedProduct && (
                    <div>
                        <Typography variant="h5" className="font-bold">{selectedProduct.product}</Typography>
                        <img src={selectedProduct.image} alt={selectedProduct.product} className="w-[30%] h-48 object-cover rounded mt-4" />
                        <Typography className="mt-2">Số Đăng Ký: {selectedProduct.number}</Typography>
                        <Typography className="mt-2">Thời gian đấu giá: {selectedProduct.time}</Typography>
                        <Typography className="mt-2">Trạng thái: {selectedProduct.status}</Typography>
                        <Typography className="mt-2">Người bán: {selectedProduct.sellerHeader}</Typography>
                        <Typography className="mt-2">Tiền cọc: {selectedProduct.totalHeader}</Typography>
                    </div>
                )}
            </Modal>

        </div>
    );
}