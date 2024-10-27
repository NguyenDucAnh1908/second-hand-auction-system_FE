import {ButtonDH, Img, Heading} from "../../components";
import ProductDetails4 from "../../components/ProductDetails4";
import React, {useState, Component} from "react";
import ProductDetails31 from "../../components/ProductDetails31/index.jsx";
import {IconButton} from "@material-tailwind/react";
import ProductDetails21 from "@/components/ProductDetails21/index.jsx";
import {useGetFeatureItemsQuery} from "../../services/item.service";
//import {useGetCheckAuctionRegisterQuery} from "../../services/auctionRegistrations.service";
import Slider from 'react-slick';
import {Spin} from "antd";

export default function FeaturedProducts() {
    const sliderRef = React.useRef(null);
    const { data = [], isLoading, isError, error } = useGetFeatureItemsQuery();

    if (isError) return <p>Có lỗi xảy ra khi tải dữ liệu: {error.message}</p>;

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
                breakpoint: 1024,
                settings: { slidesToShow: 3, centerPadding: "50px" },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, centerPadding: "30px" },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, centerPadding: "10px" },
            },
        ],
    };

    return (
        <div className="w-full overflow-hidden">
            {/* Tiêu đề slider */}
            <Heading
                size="text7xl"
                as="h2"
                className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
            >
                Sản phẩm nối bật
            </Heading>

            <Spin spinning={isLoading} tip="Đang tải...">
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
            </Spin>
        </div>
    );
}

