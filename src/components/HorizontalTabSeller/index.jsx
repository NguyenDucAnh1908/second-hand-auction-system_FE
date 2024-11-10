import React, { useState, useEffect } from "react";
import { useGetFeedbackBySellerUserIdQuery } from "../../services/feedback.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import { useNavigate } from "react-router-dom";
import { useGetSellerInformationByUserIdQuery } from "../../services/sellerinformation.service.js";
import { useGetItemsBySellerQuery } from "../../services/item.service";
import ProductDetails21 from "../ProductDetails21/index.jsx";
import {

    Spin,
    Empty,

} from "antd";


const TabContent = ({ activeTab }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [userIdSeller, setUserIdSeller] = useState(null);

    useEffect(() => {
        const sellerIdFromLocalStorage = localStorage.getItem('userIdseller');
        if (sellerIdFromLocalStorage) {
            setUserIdSeller(parseInt(sellerIdFromLocalStorage, 10));
        }
    }, []);




    // API feedback
    const { data: feedbackData } = useGetFeedbackBySellerUserIdQuery(
        userIdSeller !== null ? { userId: userIdSeller, page: currentPage, size: pageSize } : null
    );

    // API seller info
    const { data: sellerInforData, isLoading, error } = useGetSellerInformationByUserIdQuery(userIdSeller);

    // API items (with userIdSeller)
    const { data, error: errorItem,
        isLoading: loadingItem,
        isSuccess: isSuccessItem
    } = useGetItemsBySellerQuery
            (
                { userId: userIdSeller }
            );

     const items = Array.isArray(data?.data?.data) ? data.data.data : [];


    switch (activeTab) {
        case "reviews":
            return (
                <div className="w-full h-full ml-[200px] mr-[200px]">
                    {feedbackData?.content?.map(feedback => (
                        <article key={feedback.feedbackId}>
                            <div className="flex items-center my-6">
                                <img className="w-10 h-10 me-4 rounded-full" src="/images/user.png" alt="User Avatar" />
                                <div className="font-medium dark:text-white">
                                    {feedback.username} <br />
                                    <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                                        {feedback.createAt.substring(0, 10)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                {[...Array(feedback.rating)].map((_, index) => (
                                    <svg key={index} className="w-4 h-4 text-yellow-300" />
                                ))}
                                {[...Array(5 - feedback.rating)].map((_, index) => (
                                    <svg key={index + feedback.rating} className="w-4 h-4 text-gray-300 dark:text-gray-500" />
                                ))}
                            </div>
                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {feedback.comment}
                                </h3>
                            </footer>
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
                        totalPages={feedbackData ? Math.ceil(feedbackData.totalElements / pageSize) : 1}
                        onPageChange={(page) => setCurrentPage(page - 1)}
                    />
                </div>
            );
        case "info":
            return (
                <div className="w-full h-full ml-[100px]">
                    <div
                        dangerouslySetInnerHTML={{ __html: sellerInforData?.description }}
                        style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            wordBreak: "break-all"
                        }}
                    />
                </div>
            );
            case "shop":
                return (
                    <div className="mt-10 flex flex-col items-center self-stretch">
                        <div className="flex items-center justify-between w-full">
                            <span className="text-blue_gray-900_01">Filter:</span>
                        </div>
                        {errorItem ? (
                            <Empty description={`Error: ${errorItem.message || "Failed to load categories."}`} />
                        ) : (
                            <Spin spinning={loadingItem} tip="Loading...">
                                <div className="mx-7 mt-5 grid grid-cols-4 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">
                                    {isSuccessItem && items.length > 0 ? (
                                        items.map((item, index) => (
                                            <div key={`itemsGrid-${index}`}>
                                                <ProductDetails21 product={item} />
                                            </div>
                                        ))
                                    ) : (
                                        <Empty description="No items found." />
                                    )}
                                </div>
                            </Spin>
                        )}
                        <div className="my-10">
                            <Pagination
                                currentPage={currentPage + 1}
                                totalPages={isSuccessItem ? Math.ceil(items.length / pageSize) : 1}
                                onPageChange={(page) => setCurrentPage(page - 1)}
                            />
                        </div>
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

