//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';
import {ButtonDH, Img, Heading} from "../../components";
import React, {useState, Component} from "react";
import {IconButton} from "@material-tailwind/react";
import {useGetFeatureItemsQuery} from "../../services/item.service";
import Slider from 'react-slick';
import CartItem from "@/components/CartItem/index.jsx";
import {Empty, Skeleton} from "antd";

export default function RecentProductsSection({itemData, itemLoading, itemError}) {
    const sliderRef = React.useRef(null);
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
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

    return (
        <div className="w-full">
            <Skeleton loading={itemLoading} active>
                <Slider {...sliderSettings} ref={sliderRef}>
                    {/* eslint-disable-next-line react/prop-types */}
                    {itemData?.map((item) => (
                        <div key={item.id}>
                            <CartItem
                                product={item}
                            />
                        </div>
                    ))}
                </Slider>
            </Skeleton>
            {/*)}*/}

        </div>
    );
}
