import React, { useState, useEffect } from "react";
import { useGetFeedbackBySellerUserIdQuery } from "../../services/feedback.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import { useNavigate } from "react-router-dom";

const TabContent = ({ activeTab }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [userIdSeller, setUserIdSeller] = useState(null);
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

    const handlePageChange = (page) => {
        setCurrentPage(page - 1);
    };

    const totalPages = feedbackData ? Math.ceil(feedbackData.totalElements / pageSize) : 1;


    switch (activeTab) {
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
                            {/* Render the star rating */}
                            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                {[...Array(feedback.rating)].map((_, index) => (
                                    <svg key={index} className="w-4 h-4 text-yellow-300" /* Star icon */ />
                                ))}
                                {[...Array(5 - feedback.rating)].map((_, index) => (
                                    <svg key={index + feedback.rating} className="w-4 h-4 text-gray-300 dark:text-gray-500" /* Empty star icon */ />
                                ))}
                            </div>
                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {feedback.comment}
                                </h3>
                                <img src={feedback.imageUrl} style={{ width: '100px', height: '100px' }} />
                            </footer>
                            {/* Action links */}
                            <aside>
                                <div className="flex items-center mt-3">
                                    <a href="#" className="px-2 py-1.5 text-xs font-medium">Hữu ích</a>
                                    <a href="#" className="ps-4 text-sm font-medium text-blue-600">Báo cáo</a>
                                </div>
                            </aside>
                            <hr className="my-6 border-gray-300 dark:border-gray-600 mx-auto w-[60%] ml-[0]" />
                        </article>
                    ))}
                    <Pagination
                        currentPage={currentPage + 1}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            );
        default:
            return null;
    }
};

export default function HorizontalTab({ initialTab = "shop" }) {
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

