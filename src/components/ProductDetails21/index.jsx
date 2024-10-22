import {Text, Heading, RatingBar, Img} from "./..";
import React from "react";
import {Button} from "@material-tailwind/react";
import {Image, Statistic, Col, Row} from 'antd';

export default function ProductDetails21({product}) {
    const auctionEndDate = product.auction?.endDate || null;
    const auctionEndTime = product.auction?.end_time || null;

    let deadline = null;
    if (auctionEndDate && auctionEndTime) {
        try {
            const dateTimeString = `${auctionEndDate}T${auctionEndTime}`;
            deadline = new Date(dateTimeString).getTime();

            if (isNaN(deadline)) {
                console.error("Invalid Date Format!");
            }
        } catch (error) {
            console.error("Error parsing date:", error);
        }
    }

    const {Countdown} = Statistic;
    return (
        <div

            className={`flex flex-col items-center w-full border-gray-200 border border-solid bg-bg-white rounded-lg overflow-hidden`}
        >
            {/*<div className="relative self-stretch bg-bg-white px-3 py-3 sm:py-5">*/}
            {/*    <Image*/}
            {/*        //src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f"*/}
            {/*        src={product.thumbnail}*/}
            {/*        alt="Fashion Image"*/}
            {/*        className="h-[230px] w-[230px] object-cover rounded-lg"*/}
            {/*    />*/}
            {/*    <div className="absolute top-2 right-2 bg-pink-400 text-white text-sm px-2 py-1 rounded">*/}
            {/*        /!*Auction ends in {auctionEndTime}*!/*/}
            {/*        <Countdown title="Auction ends in" value={deadline} format="D Ngay H gio m phut s giay"/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="relative self-stretch bg-bg-white px-3 py-3 sm:py-5">
                <div className="w-[230px] h-[300px]">
                    <Image
                        src={product.thumbnail} // Link ảnh từ product data
                        alt="Fashion Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                {/*<div className="absolute top-2 right-2 bg-pink-400 text-white text-sm px-2 py-1 rounded">*/}
                {/*    <Countdown title="Auction ends in" value={deadline} format="D Ngày H giờ m phút s giây"/>*/}
                {/*</div>*/}
                <div className="absolute top-2 right-2 bg-pink-300 bg-opacity-70 text-white px-1.5 py-0.5 rounded-md ">
                    <Countdown
                        title="Auction ends in"
                        value={deadline}
                        format="D Ngày H giờ m phút s giây"
                        valueStyle={{fontWeight: 'normal', fontSize: '15px'}}
                    />
                </div>

            </div>


            <div className="mx-3.5 mb-6 flex flex-col items-start gap-2.5 self-stretch">
                <button
                    className="text-[12px] font-normal text-blue_gray-600_01 hover:text-blue-500 transition duration-300"
                >
                    {product.scId.sub_category}
                </button>
                <button
                    className="w-full text-[16px] font-semibold leading-[150%] text-blue_gray-900_01 hover:text-blue-500 transition duration-300"
                >
                    {product.itemName}
                </button>

                <div className="flex items-start gap-2.5 self-stretch">
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path
                                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                            4.95
                        </p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a
                            href="#"
                            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                        >
                            73 reviews
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 self-stretch">
                    <Heading
                        size="heading2xl"
                        as="h6"
                        className="flex text-[18px] font-semibold text-blue_gray-900_01"
                    >
                        <span>{product.auction?.start_price}</span>
                        <a href="#" className="inline underline">
                            đ
                        </a>
                    </Heading>
                </div>
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    // onClick={onBidClick}
                >
                    Tham gia đấu giá
                </Button>
            </div>
        </div>
    );
}

function calculateAuctionEndTime(startDate, endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const remainingTime = end - now;

    if (remainingTime < 0) return "Đã kết thúc"; // If auction ended

    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours}h:${minutes}m:${seconds}s`; // Return remaining time
}
