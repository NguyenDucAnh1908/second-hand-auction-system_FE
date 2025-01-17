import { Img, ButtonDH, Text, Heading } from "../../components";
import React from "react";

export default function FeaturedProductsSection() {
    return (
        <div className="relative h-[300px] self-stretch bg-gradient-to-r from-gray-400 via-blue-gray-300 to-gray-700 rounded-lg shadow-xl">
            {/* Bao bọc nội dung bằng một khối flex, căn giữa, có khoảng trống nhỏ */}
            <div className="absolute inset-0 m-auto flex items-center justify-center w-[90%] h-[280px] z-10 gap-4">
                {/* Phần văn bản giới thiệu ngắn gọn */}
                <div className="flex flex-col justify-center w-[45%] text-black">
                    <Heading
                        size="heading4xl"
                        as="h2"
                        className="text-[28px] font-semibold uppercase leading-[36px] text-black md:text-[24px] sm:text-[20px] tracking-wide"
                    >
                        Đấu giá smartphone
                    </Heading>
                    <Text
                        as="p"
                        className="mt-2 text-[14px] font-light leading-[1.6] opacity-90"
                    >
                        Khám phá ngay những phiên đấu giá điện thoại hấp dẫn, từ iPhone,
                        Samsung đến các dòng flagship cao cấp khác. Cơ hội sở hữu smartphone
                        mơ ước đang chờ bạn phía dưới!
                    </Text>
                </div>

                {/* Phần hình ảnh minh hoạ bên phải */}
                <div className="relative w-[45%] flex">
                    <Img
                        src="images/banner_smartphone.png"
                        alt="Smartphone Image"
                        className="ml-auto h-[280px] w-auto object-contain"
                    />
                    {/* Hiệu ứng bóng mờ dưới ảnh (tùy chọn) */}
                    <div className="absolute bottom-0 right-[10%] m-auto h-[150px] w-[12%] rotate-[17deg] rounded-[50%] bg-gray-900_99 blur-[50px] backdrop-opacity-[0.5]" />
                </div>
            </div>
        </div>
    );
}
