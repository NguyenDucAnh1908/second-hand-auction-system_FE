import { Heading, InputDH, Img } from "../../../components";
import React from "react";
import { Typography, Avatar } from "@material-tailwind/react";
import { Carousel } from 'antd';
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
                    <div className="flex w-full gap-[34px] md:flex-col">
                        {/* Left Side - Product Info */}
                        <div className="flex-1 bg-blue-200 rounded-[20px] p-6 flex flex-col gap-4">
                            <Heading size="textxs" as="h2" className="text-[15px] font-medium text-black-900">
                                Tiêu đề: Giường ngủ cũ 2025
                            </Heading>
                            <Heading size="textmd" as="h3" className="text-[18px] font-medium text-black-900">
                                Tên sản phẩm: GIƯỜNG NGỦ
                            </Heading>
                            <Heading as="h4" className="text-[20px] font-medium text-black-900">
                                Tên thương hiệu: VUA NỆM
                            </Heading>


                            <Heading size="texts" as="h5" className="text-[16px] font-medium leading-7 text-black-900">
                                Mô tả: Giường ngủ cũ thường mang nét hoài niệm và dấu ấn thời gian, với khung gỗ hoặc
                                kim loại đã có dấu hiệu mài mòn. Những vết trầy xước nhỏ tạo nên vẻ đẹp cổ điển và gợi
                                nhớ về những kỷ niệm xưa cũ.
                            </Heading>

                            {/* Category Input */}
                            <div className="flex flex-col items-start">
                                <Heading size="texts" as="h6" className="font-medium text-blue_gray-900">
                                    Danh mục
                                </Heading>
                                <Typography variant="h5">Material Tailwind</Typography>
                                {/*<InputDH*/}
                                {/*    shape="round"*/}
                                {/*    name="Category Edit"*/}
                                {/*    placeholder="Nội thất"*/}
                                {/*    className="rounded-md border px-0"*/}
                                {/*/>*/}
                                <Heading size="texts" as="p" className="mt-4 text-[16px] font-medium text-black-900">
                                    Tình trạng: Đã qua sử dụng 1 lần
                                </Heading>
                            </div>
                            <div className="flex items-center self-stretch bg-white-a700 px-11 md:flex-col md:px-5">
                                {/* Product Details */}


                            </div>
                        </div>

                        {/* Right Side - Product Images */}
                        {/*<div className="flex flex-1 flex-col gap-[18px]">*/}
                        {/*    /!* Main Image *!/*/}
                        {/*    <div className="h-[390px] bg-cover bg-no-repeat">*/}
                        {/*        <Img*/}
                        {/*            src="/images/img_giuong.png"*/}
                        {/*            alt="Main Product Image"*/}
                        {/*            className="h-[390px] w-full object-cover"*/}
                        {/*        />*/}
                        {/*    </div>*/}

                        {/*    /!* Thumbnails *!/*/}
                        {/*    <div className="flex gap-[18px] justify-between">*/}
                        {/*        {[...Array(3)].map((_, index) => (*/}
                        {/*            <Img*/}
                        {/*                key={"thumbnailList" + index}*/}
                        {/*                src="/images/img_giuong_detail.png"*/}
                        {/*                alt="Thumbnail Image"*/}
                        {/*                className="h-[56px] w-[30%] object-contain"*/}
                        {/*            />*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
