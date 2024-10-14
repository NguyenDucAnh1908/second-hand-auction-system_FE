import React, { useState, Suspense } from "react";
import ProductInfo1 from "../../components/ProductInfo1";
import FeedbackList from "../FeedBackUISeller";
import StoreInfo from "../StoreInfo";

const TabContent = ({ activeTab, fashionItemList = [] }) => {
    switch (activeTab) {
        case "shop":
            return (
                <div className="w-full h-full">
                    <ProductInfo1 />
                </div>
            );
        case "auction":
            return (
                <div className="w-full h-full">
                  <FeedbackList/>
                </div>
            );
        case "info":
            return (
                <div className="w-full h-full">
                 <StoreInfo/>
                </div>
            );
        case "reviews":
            return (
                <div className="w-full h-full">
                    <FeedbackList/>
                </div>
            );
        default:
            return null;
    }
};


export default function HorizontalTab({ fashionItemList = [] }) {
    const [activeTab, setActiveTab] = useState("shop");
    const [showFilter, setShowFilter] = useState(false);

    const tabs = [
        { label: "Cửa hàng", value: "shop" },
        { label: "Đấu giá", value: "auction" },
        { label: "Thông tin", value: "info" },
        { label: "Đánh giá", value: "reviews" }
    ];

 


    return (
        <div className="text-left ml-0">
            {/* Tabs */}
            <div className="flex items-center border-b">
               

                {/* Tab Buttons */}
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === tab.value ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 h-full w-[100%]">
                <TabContent activeTab={activeTab} fashionItemList={fashionItemList} />
            </div>
        </div>
    );
}
