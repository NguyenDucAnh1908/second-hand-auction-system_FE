import { Heading, InputDH, Img } from "../../../components";
import React from "react";
import { Typography, Avatar } from "@material-tailwind/react";
import {Carousel, Descriptions} from 'antd';
// const contentStyle = {
//     margin: 0,
//     height: '160px',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//     background: '#364d79',
// };
const contentStyle = {
    margin: 0,
    height: '390px', // Giảm chiều cao
    color: '#fff',
    lineHeight: '100px', // Điều chỉnh chiều cao dòng
    textAlign: 'center',
    background: '#364d79',
};

export default function ProductReviewSection() {
    const items = [
        {
            key: '1',
            label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Tên sản phẩm</span>,
            children: <span style={{ fontSize: '16px' }}>Sản phẩm A</span>,
            span: 4,
        },
        {
            key: '2',
            label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Sub category</span>,
            children: <span style={{ fontSize: '16px' }}>Danh mục A</span>,
            span: 2,
        },
        {
            key: '3',
            label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>ItemStatus</span>,
            children: <span style={{ fontSize: '16px' }}>Còn hàng</span>,
            span: 2,
        },
        {
            key: '4',
            label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Item Description</span>,
            children: <span style={{ fontSize: '16px' }}>Chi tiết mô tả</span>,
            span: 4,
        }
    ];

    const itemDescription = [
        {
            key: '4',
            label: 'Phần trăm',
            children: 'N/A',
            span: 2,
        },
        {
            key: '5',
            label: 'Loại',
            children: 'N/A',
            span: 2,
        },
        {
            key: '6',
            label: 'Màu sắc',
            children:  'N/A',
            span: 2,
        },
        {
            key: '7',
            label: 'Trọng lượng',
            children:  'N/A',
            span: 2,
        },
        {
            key: '8',
            label: 'Kích thước',
            children:'N/A',
            span: 2,
        },
        {
            key: '9',
            label: 'Xuất xứ',
            children:  'N/A',
            span: 2,
        },
        {
            key: '10',
            label: 'Ngày sản xuất',
            children: 'N/A',
            span: 2,
        },
        {
            key: '11',
            label: 'Chất liệu',
            children: 'N/A',
            span: 2,
        }
    ];
    return (
        <>
            {/* Product Review Section */}
            <div className="flex flex-col items-center self-stretch">
                <div className="container-xs flex flex-col items-center gap-5 md:px-5">
                    {/* Heading */}
                    <Heading
                        size="text2xl"
                        as="h1"
                        className="text-[30px] font-medium text-black-900 md:text-[28px] sm:text-[26px]"
                    >
                        Thẩm định
                    </Heading>

                    {/* Main Content Section */}
                    <div className="flex items-center w-full gap-[34px] md:flex-col">
                        {/* Left Side - Product Info */}
                        <div className="flex-1 bg-blue-200 rounded-[20px] p-6 flex flex-col gap-4">
                            <Descriptions title={<div className="w-full text-center">Item infomation</div>} layout="vertical" items={items}/>
                            <Descriptions title={<div className="w-full text-center">Item Description</div>} items={itemDescription} className="mt-4"/>

                        </div>

                        <div style={{width: '50%', margin: '0 auto'}}> {/* Điều chỉnh chiều rộng Carousel */}
                            <Carousel arrows infinite={false}>
                                <div>
                                    {/*<h3 style={contentStyle}>1</h3>*/}
                                    <Img
                                        src="/images/img_giuong.png"
                                        alt="Main Product Image"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <Img
                                        src="/images/img_giuong.png"
                                        alt="Main Product Image"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <Img
                                        src="/images/img_giuong.png"
                                        alt="Main Product Image"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <Img
                                        src="/images/img_giuong.png"
                                        alt="Main Product Image"
                                        className="rounded-lg"
                                    />
                                </div>
                            </Carousel>
                        </div>
                    </div>

                    {/* Detailed Information Section */}
                    <div className="mt-10">


                    </div>

                    <div className="flex w-full">
                        {/* Khối bên trái - 40% */}
                        <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
                            {/* "Người bán" hiển thị bên ngoài và ở giữa */}
                            <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                                Người bán
                            </Heading>

                            <div className="w-full flex justify-center">
                                <div
                                    className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                                    <div className="flex items-center gap-4">
                                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"
                                                variant="rounded"/>
                                        <div>
                                            <Typography variant="h6">Tania Andrew</Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                Web Developer
                                            </Typography>
                                        </div>
                                    </div>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Số điện thoại: 0937534654
                                    </Heading>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Email: changtong@gmail.com
                                    </Heading>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Địa chỉ: Quận 9, Hồ Chí Minh, Việt Nam
                                    </Heading>
                                </div>
                            </div>
                        </div>

                        <div className="mx-5"></div>

                        <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
                            <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                            Người thẩm định
                            </Heading>

                            <div className="w-full flex justify-center">
                                <div
                                    className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                                    <div className="flex items-center gap-4">
                                        <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"
                                                variant="rounded"/>
                                        <div>
                                            <Typography variant="h6">Tania Andrew</Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                Web Developer
                                            </Typography>
                                        </div>
                                    </div>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Số điện thoại: 0937534654
                                    </Heading>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Email: changtong@gmail.com
                                    </Heading>
                                    <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                                        Ngày thẩm định: 10-01-2024
                                    </Heading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
