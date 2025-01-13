import {Text, Heading} from "../../components";
import ProductProfile from "../../components/ProductProfile";
import React, {Suspense} from "react";
import Slider from 'react-slick';
import {useGetCategoriesQuery} from "@/services/category.service.js";
import {Empty, Skeleton} from "antd";
import './index.css'
export default function TrendingProductsSection() {
    const sliderRef = React.useRef(null);

    const {
        data: categories = [],
        error: categoriesError,
        isLoading: categoriesLoading,
        isFetching,
        isSuccess,
    } = useGetCategoriesQuery();

    const uniqueCategories = categories?.filter(
        (value, index, self) =>
            index === self.findIndex((c) => c.categoryId === value.categoryId)
    ) || [];

    // const sliderSettings = {
    //     className: "center",
    //     centerMode: true,
    //     infinite: categories?.length > 1,
    //     centerPadding: "10px",
    //     slidesToShow: 4,
    //     speed: 500,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {slidesToShow: 3, centerPadding: "50px"},
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {slidesToShow: 2, centerPadding: "30px"},
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {slidesToShow: 1, centerPadding: "10px"},
    //         },
    //     ],
    // };


    const phoneBrands = [
        { id: 1, logo: "/images/samsung.jpg" },
        { id: 2, logo: "/images/apple.png" },
        { id: 3, logo: "/images/realme.png" },
        { id: 4,logo: "/images/xiaomi.jpg" },
        // Thêm các hãng điện thoại khác vào đây
    ];
    
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: phoneBrands.length > 1,
        centerPadding: "10px",
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


    console.log("Categories data:", categories);



    return (
        <>



            {categoriesError ? (
                <Empty />
            ) : (
                <div className="w-full">
                    <Skeleton loading={categoriesLoading} active>
                        <Slider {...sliderSettings}>
                            {phoneBrands.map((brand) => (
                                <div key={brand.id}>
                                    {/* Hiển thị logo các hãng điện thoại */}
                                    <img src={brand.logo} alt={brand.name} className="w-full" />
                                    <p>{brand.name}</p>
                                </div>
                            ))}
                        </Slider>
                    </Skeleton>
                </div>
            )}
  



        </>
    );
}
