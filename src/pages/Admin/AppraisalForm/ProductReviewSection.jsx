import { Heading, Img } from "../../../components";
import React, { useState } from "react";
import { Carousel, Descriptions, Avatar, Typography, Button, Upload } from 'antd';
import { useGetSellerQuery } from "../../../services/item.service";
import { UploadOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
import moment from 'moment';


export default function ProductReviewSection({ itemDetail }) {
    const { data: seller } = useGetSellerQuery({ id: itemDetail.itemId });
    const staff = JSON.parse(localStorage.getItem('user'));

    const [previewImages, setPreviewImages] = useState([]);
    const [fileList, setFileList] = useState([]);

    if (!itemDetail) {
        return <div className="text-center text-xl text-gray-600">Loading...</div>;
    }

    const items = [
        { key: '1', label: <span className="font-bold text-lg text-gray-800">Tên sản phẩm</span>, children: <span className="text-base text-gray-600">{itemDetail.itemName || 'N/A'}</span>, span: 4 },
        { key: '2', label: <span className="font-bold text-lg text-gray-800">Danh mục phụ</span>, children: <span className="text-base text-gray-600">{itemDetail.scId.sub_category || 'N/A'}</span>, span: 2 },
        { key: '3', label: <span className="font-bold text-lg text-gray-800">Trạng thái sản phẩm</span>, children: <span className="text-base text-gray-600">{itemDetail.itemStatus || 'N/A'}</span>, span: 2 },
        { key: '4', label: <span className="font-bold text-lg text-gray-800">Mô tả sản phẩm</span>, children: <span className="text-base text-gray-600">{itemDetail.itemDescription || 'N/A'}</span>, span: 4 }
    ];

    const itemDescription = [
        { key: '4', label: 'Phần trăm', children: itemDetail.itemSpecific.percent || 'N/A', span: 2 },
        { key: '5', label: 'Loại', children: itemDetail.itemSpecific.type || 'N/A', span: 2 },
        { key: '6', label: 'Màu sắc', children: itemDetail.itemSpecific.color || 'N/A', span: 2 },
        { key: '7', label: 'Trọng lượng', children: itemDetail.itemSpecific.weight || 'N/A', span: 2 },
        { key: '8', label: 'Kích thước', children: itemDetail.itemSpecific.dimension || 'N/A', span: 2 },
        { key: '9', label: 'Xuất xứ', children: itemDetail.itemSpecific.original || 'N/A', span: 2 },
        { key: '10', label: 'Ngày sản xuất', children: itemDetail.itemSpecific.manufactureDate || 'N/A', span: 2 },
        { key: '11', label: 'Chất liệu', children: itemDetail.itemSpecific.material || 'N/A', span: 2 }
    ];



    return (
        <div className="flex flex-col items-center py-10 bg-gray-50 ">
            <div className="container-xs flex flex-col items-center gap-5 md:px-5">
                <Heading
                    size="text4xl"
                    as="h1"
                    className="text-4xl font-medium text-black-900"
                >
                    Thẩm định
                </Heading>

                <div className="flex items-center w-full gap-[34px] md:flex-col">
                    <div className="flex-1 bg-blue-200 rounded-2xl p-6 flex flex-col gap-4">
                        <Descriptions title={<div className="w-full text-center text-xl font-semibold">Thông tin sản phẩm</div>} layout="vertical" items={items} />
                        <Descriptions title={<div className="w-full text-center text-xl font-semibold">Mô tả sản phẩm</div>} items={itemDescription} className="mt-4" />
                    </div>

                    <div className="w-1/2 mx-auto bg-blue-200 rounded-2xl p-6 ">
                        <Carousel arrows infinite={false}>
                            {itemDetail.images.map((images, index) => (
                                <div key={index} className="flex justify-center items-center">
                                    <Img
                                        src={images.image}
                                        alt={`Image ${index + 1}`}
                                        className="rounded-lg shadow-md w-[500px] h-[500px] object-contain justify-center items-center"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>


                </div>




                {/* Thông tin người bán và người thẩm định */}
                <div className="flex flex-row w-full justify-between gap-8">
                    {/* Người bán */}
                    <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                        <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người bán</Heading>
                        <div className="w-full flex justify-center">
                            <div className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                                <div className="flex items-center gap-4">
                                    <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar" variant="rounded" className="w-16 h-16" />
                                    <div>
                                        <Typography variant="h6" className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>
                                        <Typography variant="small" color="gray" className="font-normal">{seller?.role || 'N/A'}</Typography>
                                    </div>
                                </div>
                                <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện thoại: {seller?.phoneNumber || 'N/A'}</Heading>
                                <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>
                            </div>
                        </div>

                    </div>

                    {/* Người thẩm định */}
                    <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                        <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm định</Heading>
                        <div className="w-full flex justify-center">
                            <div className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl sẽ giới hạn chiều rộng tối đa */}
                                <div className="flex items-center gap-4">
                                    <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"} alt="avatar" variant="rounded" className="w-16 h-16" />
                                    <div>
                                        <Typography variant="h6" className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>
                                        <Typography variant="small" color="gray" className="font-normal">{staff?.role || 'N/A'}</Typography>
                                    </div>
                                </div>
                                <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện thoại: {staff?.phoneNumber || 'N/A'}</Heading>
                                <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>
                            </div>
                        </div>



                    </div>

                </div>
                <div className="flex items-center justify-between w-full p-3 bg-white shadow-md rounded-2xl border border-gray-200">
                    <Heading size="textxs" as="p" className="text-xl font-semibold text-black-900 mb-2">
                        Ngày thẩm định
                    </Heading>

                    <DatePicker
                        value={moment()} // Ngày hôm nay
                        disabled // Vô hiệu hóa chỉnh sửa
                        className="ml-auto border border-gray-300 rounded-lg shadow-sm px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


            </div>
        </div >
    );
}