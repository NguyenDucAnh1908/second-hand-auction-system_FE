//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';
import { ButtonDH, Img, Heading } from "../../components";
import ProductDetails4 from "../../components/ProductDetails4";
import React, {useState, Component }from "react";
import ProductDetails31 from "../../components/ProductDetails31/index.jsx";
import {IconButton} from "@material-tailwind/react";
import ProductDetails21 from "@/components/ProductDetails21/index.jsx";
import {useGetFeatureItemsQuery} from "../../services/item.service";
import Slider from 'react-slick';

export default function RecentProductsSection() {
    const sliderRef = React.useRef(null);
    const {data = {}, isLoading, isError, error} = useGetFeatureItemsQuery();
    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (isError) return <p>Có lỗi xảy ra khi tải dữ liệu: {error.message}</p>;
    // Cấu hình cho slider (react-slick)
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 4,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // Trên màn hình lớn
                settings: { slidesToShow: 3, centerPadding: "50px" },
            },
            {
                breakpoint: 768, // Trên màn hình trung bình
                settings: { slidesToShow: 2, centerPadding: "30px" },
            },
            {
                breakpoint: 480, // Trên màn hình nhỏ
                settings: { slidesToShow: 1, centerPadding: "10px" },
            },
        ],
    };

    return (
        <div className="w-full overflow-hidden">
            {/* Slider ngang */}
            <Heading
                size="text7xl"
                as="h2"
                className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
            >
                Sản phẩm gần đây
            </Heading>
            <Slider {...sliderSettings} ref={sliderRef}>
                {data.map((item) => (
                    <div key={item.id} className="px-2">
                        <ProductDetails21
                            product={item}
                            className="border border-gray-200 bg-white p-3 rounded-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
