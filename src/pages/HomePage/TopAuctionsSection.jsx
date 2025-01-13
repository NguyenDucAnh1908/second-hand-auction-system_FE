import { Img, ButtonDH, Text, Heading } from "../../components";
import React from "react";

export default function TopAuctionsSection() {
    return (
        <div className="relative h-[300px] self-stretch bg-gradient-to-r from-gray-400 via-blue-gray-300 to-gray-700 rounded-lg shadow-xl">
            {/* Lớp bao phủ toàn bộ, giữ styling hero/overlay */}
            <div className="absolute inset-0 m-auto flex items-center justify-center w-[90%] h-[280px] z-10 gap-4">

                {/* Phần văn bản giới thiệu */}
                <div className="flex flex-col justify-center w-[45%] text-black">
                    <Heading
                        size="heading4xl"
                        as="h2"
                        className="text-[28px] font-semibold uppercase leading-[36px] text-black md:text-[24px] sm:text-[20px] tracking-wide"
                    >
                        Top 10 phiên đấu giá hot
                    </Heading>
                    <Text
                        as="p"
                        className="mt-2 text-[14px] font-light leading-[1.6] opacity-90"
                    >
                        Danh sách 10 phiên đấu giá với lượng đăng ký kỷ lục, nơi bạn có thể cạnh tranh
                        để sở hữu những sản phẩm độc đáo và giá trị. Xem ngay để không bỏ lỡ cơ hội!
                    </Text>
                </div>

                {/* Phần hình ảnh minh hoạ bên phải */}
                <div className="relative w-[45%] flex">
                    <Img
                        src="images/banner_top.png"
                        alt="Top Auctions Banner"
                        className="ml-auto h-[360px] w-auto object-contain"
                    />

                </div>
            </div>
        </div>
    );
}
