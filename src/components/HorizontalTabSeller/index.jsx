import React, { useState, useEffect } from "react";
import { useGetFeedbackBySellerUserIdQuery } from "../../services/feedback.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import { useNavigate } from "react-router-dom";

const TabContent = ({ activeTab }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [userIdSeller, setUserIdSeller] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const sellerIdFromLocalStorage = localStorage.getItem('userIdseller');

        if (sellerIdFromLocalStorage) {
            setUserIdSeller(parseInt(sellerIdFromLocalStorage, 10)); 
        }
    }, []);



    const { data: feedbackData } = useGetFeedbackBySellerUserIdQuery(
        userIdSeller !== null ?
            {
                userId: userIdSeller,
                page: currentPage,
                size: pageSize,
            } : null
    );



    switch (activeTab) {
        case "shop":
            return (
                <div className="w-full h-full">
                    {/* Add Shop Info component here */}
                </div>
            );
        case "auction":
            return (
                <div className="w-full h-full">
                    {/* Add Auction related content here */}
                </div>
            );
        case "info":
            return (
                <div className="w-full h-full">
                    {/* Add Store Info component here */}
                </div>
            );
        case "reviews":
            return (
                <div className="w-full h-full ml-[200px] mr-[200px]">





                    {feedbackData?.content?.map(feedback => (
                        <article key={feedback.feedbackId}>
                            <div className="flex items-center my-6">
                                <img
                                    className="w-10 h-10 me-4 rounded-full"
                                    src="/images/user.png"
                                    alt="User Avatar"
                                />
                                <div className="font-medium dark:text-white">
                                    <p>{feedback.username}</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                {[...Array(feedback.rating)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className="w-4 h-4 text-yellow-300"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                        />
                                    </svg>
                                ))}
                                {[...Array(5 - feedback.rating)].map((_, index) => (
                                    <svg
                                        key={index + feedback.rating}
                                        className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path
                                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                        />
                                    </svg>
                                ))}
                            </div>

                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <h3 className=" text-sm font-semibold text-gray-900 dark:text-white">
                                    {feedback.comment}
                                </h3>
                            </footer>

                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <h3 className=" text-sm font-semibold text-gray-900 dark:text-white">
                                    <img
                                        src={feedback.imageUrl}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </h3>
                            </footer>

                            <div className="flex flex-col gap-4 self-stretch">
                                <div className="mb-2 flex items-center">
                                    {/* Add any other content or actions */}
                                </div>
                            </div>

                            <aside>
                                <div className="flex items-center mt-3">
                                    <a
                                        href="#"
                                        className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Hữu ích
                                    </a>
                                    <a
                                        href="#"
                                        className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                                    >
                                        Báo cáo
                                    </a>
                                </div>
                            </aside>

                            {/* Horizontal line to separate feedback */}
                            <hr className="my-6 border-gray-300 dark:border-gray-600 mx-auto w-[60%] ml-[0]" />
                        </article>

                    ))}

                    <Pagination />
                </div>

            );
        default:
            return null;
    }
};

export default function HorizontalTab({ initialTab = "shop", fashionItemList = [] }) {
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        { label: "Cửa hàng", value: "shop" },
        { label: "Đấu giá", value: "auction" },
        { label: "Thông tin", value: "info" },
        { label: "Đánh giá", value: "reviews" }
    ];

    return (
        <div className="text-left ml-0">
            <div className="flex items-center border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === tab.value ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-4 h-full w-[100%]">
                <TabContent activeTab={activeTab} />
            </div>
        </div>
    );
}

