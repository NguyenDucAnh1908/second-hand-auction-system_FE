import {Heading, Img} from "../../../components";
import React, {Suspense, useState} from "react";
import {Avatar, Carousel} from "antd";
import {Typography} from "@material-tailwind/react";
import {Descriptions} from 'antd';
import {useGetSellerQuery} from "@/services/item.service.js";
import {useGetUserByIdQuery} from "@/services/user.service.js";

export default function AuctionCreationSection({itemDetail}) {


    const [previewImages, setPreviewImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const { data: seller } = useGetSellerQuery({id: itemDetail?.itemId});
    const { data: staff } = useGetUserByIdQuery();
    //const staff = JSON.parse(localStorage.getItem('user'));
    const items = [
        {
            key: '1',
            label: <span className="font-bold text-lg text-gray-800">Tên sản phẩm</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemName || 'N/A'}</span>,
            span: 4
        },
        {
            key: '2',
            label: <span className="font-bold text-lg text-gray-800">Danh mục phụ</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.scId.sub_category || 'N/A'}</span>,
            span: 2
        },
        {
            key: '3',
            label: <span className="font-bold text-lg text-gray-800">Trạng thái sản phẩm</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemStatus || 'N/A'}</span>,
            span: 2
        },
        {
            key: '4',
            label: <span className="font-bold text-lg text-gray-800">Mô tả sản phẩm</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemDescription || 'N/A'}</span>,
            span: 4
        }
    ];

    const itemDescription = [
        {key: '4', label: 'Phần trăm', children: itemDetail?.itemSpecific.percent || 'N/A', span: 2},
        {key: '5', label: 'Loại', children: itemDetail?.itemSpecific.type || 'N/A', span: 2},
        {key: '6', label: 'Màu sắc', children: itemDetail?.itemSpecific.color || 'N/A', span: 2},
        {key: '7', label: 'Trọng lượng', children: itemDetail?.itemSpecific.weight || 'N/A', span: 2},
        {key: '8', label: 'Kích thước', children: itemDetail?.itemSpecific.dimension || 'N/A', span: 2},
        {key: '9', label: 'Xuất xứ', children: itemDetail?.itemSpecific.original || 'N/A', span: 2},
        {key: '10', label: 'Ngày sản xuất', children: itemDetail?.itemSpecific.manufactureDate || 'N/A', span: 2},
        {key: '11', label: 'Chất liệu', children: itemDetail?.itemSpecific.material || 'N/A', span: 2}
    ];


    return (
        <>
            {/* auction creation section */}
            <div className="mt-[26px] flex flex-col items-center">
                <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] md:px-5 sm:gap-[39px]">
                    <Heading
                        size="text2xl"
                        as="h1"
                        className="w-[28%] text-[30px] rounded-[12px] font-medium leading-[55px] text-black-900 md:w-full md:text-[28px] sm:text-[26px]"
                    >
                        TẠO PHIÊN ĐẤU GIÁ
                    </Heading>
                    <div className="self-stretch">
                        <div className="flex items-center gap-[34px] md:flex-col">
                            <div style={{width: '51%', margin: '0 auto'}}> {/* Điều chỉnh chiều rộng Carousel */}
                                <Carousel arrows infinite={false}>
                                    {itemDetail?.images.map((images, index) => (
                                        <div key={index}>
                                            <Img
                                                src={images.image}
                                                alt="Main Product Image"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            <div
                                className="flex-row w-[50%] justify-center rounded-[20px] bg-green-400 p-3.5 md:w-full">
                                <Descriptions title={<div className="w-full text-center">Item infomation</div>}
                                              layout="vertical" items={items}/>
                                <Descriptions title={<div className="w-full text-center">Item Description</div>}
                                              items={itemDescription} className="mt-4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-between gap-8">
                {/* Người bán */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người
                        bán</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                            <div className="flex items-center gap-4">
                                <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{seller?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {seller?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>
                        </div>
                    </div>

                </div>

                {/* Người thẩm định */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm
                        định</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl sẽ giới hạn chiều rộng tối đa */}
                            <div className="flex items-center gap-4">
                                <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                        alt="avatar" variant="rounded" className="w-16 h-16"/>
                                <div>
                                    <Typography variant="h6"
                                                className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                                className="font-normal">{staff?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {staff?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                     className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );
}



