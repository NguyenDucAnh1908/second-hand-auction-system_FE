import {Text, Img, ButtonDH, Heading} from "./..";
import React, {Suspense, useState} from "react";
import DrawerChat from "@/components/DrawerChat/index.jsx";
import {Button, Typography, Avatar} from "@material-tailwind/react";

export default function SellerDetailHeader({...props}) {
    const data = [
        {label: "Sản Phẩm", value: "220"},
        {label: "Dang theo gioi", value: "220"},
        {label: "Tỉ lệ phản hồi", value: "82% (Trong vài giờ)"},
        {label: "Tỷ lệ shop huỷ đơn", value: "0%"},
        {label: "Người theo dõi", value: "100k"},
        {label: "Đánh giá", value: "4.6 (100k Đánh giá)"},
        {label: "Tham gia", value: "80 Năm trước"}
    ];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const showDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    return (
        <header
            {...props}
            className={`${props.className} flex sm:flex-col self-stretch items-center mx-[58px] md:mx-0`}
        >
            <figure className="relative h-40 w-[600px]">
                <img
                    className="h-full w-full rounded-xl object-cover object-center"
                    src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="nature image"
                />
                <figcaption
                    className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div className="mt-2">
                        {/*<Typography variant="h5" color="blue-gray">*/}
                        {/*  Sara Lamalo*/}
                        {/*</Typography>*/}

                        <div className="flex items-center gap-4">
                            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"/>
                            <div>
                                <Typography variant="h6">PHỤ KIỆN THỜI TRANG-DUDUSTORE</Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    Online 49 phút trước
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Button
                            className="flex items-center gap-2 px-2 py-1 text-sm w-full bg-transparent text-gray-700 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            Theo gioi
                        </Button>

                        <Button
                            className="flex items-center gap-2 px-2 py-1 text-sm w-full bg-transparent text-gray-700 hover:bg-gray-200"
                            onClick={showDrawer}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                            </svg>
                            Chat
                        </Button>
                        <DrawerChat open={isDrawerOpen} onClose={closeDrawer}/>
                    </div>
                </figcaption>
            </figure>

            <div className="ml-[54px] mr-[20px] grid w-[42%] grid-cols-2 gap-6 self-end md:mx-0 sm:self-auto">
                {data.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex w-full items-center gap-6">
                        <a href="#">
                            <img
                                src="images/img_image_162.png"
                                alt="Product Image"
                                className="h-[36px] object-cover"
                            />
                        </a>
                        <p
                            className="text-[12px] w-full font-normal text-black-900 whitespace-nowrap overflow-visible"
                        >
                            <span className="text-black-900">{item.label}:&nbsp;</span>
                            <span className="text-deep_orange-a700 text-red-500">{item.value}</span>
                        </p>
                    </div>
                ))}
            </div>

        </header>
    );
}
