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

    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: categories?.length > 1,
        centerPadding: "10px",
        slidesToShow: 4,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {slidesToShow: 3, centerPadding: "50px"},
            },
            {
                breakpoint: 768,
                settings: {slidesToShow: 2, centerPadding: "30px"},
            },
            {
                breakpoint: 480,
                settings: {slidesToShow: 1, centerPadding: "10px"},
            },
        ],
    };


    console.log("Categories data:", categories);



    return (
        <>

            {categoriesError ? (
                <Empty/>
            ) : (
                <div className="w-full">
                    <Skeleton loading={categoriesLoading} active>
                        <Slider {...sliderSettings} ref={sliderRef}>
                            {uniqueCategories?.map((category) => (
                                <div key={category.categoryId}>
                                    <ProductProfile category={category}/>
                                </div>
                            ))}
                        </Slider>
                    </Skeleton>
                </div>
            )}

        </>
    );
}
