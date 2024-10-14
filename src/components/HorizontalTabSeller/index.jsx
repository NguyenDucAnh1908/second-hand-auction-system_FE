import React, { useState, Suspense } from "react";
import ProductInfo1 from "../../components/ProductInfo1";

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
                  
                </div>
            );
        case "info":
            return (
                <div className="w-full h-full">
                 
                </div>
            );
        case "reviews":
            return (
                <div className="w-full h-full">
                    
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

    const filterOptions = [
        "Danh mục sản phẩm",
        "Giá thấp đến cao",
        "Giá cao đến thấp",
        "Sản phẩm mới nhất",
        "Sản phẩm phổ biến"
    ];

    const handleSearchClick = () => {
        setActiveTab("shop"); // Chuyển sang tab "Cửa hàng"
        setShowFilter(!showFilter); // Hiển thị hoặc ẩn danh sách filter
    };

    return (
        <div className="text-left ml-0">
            {/* Tabs */}
            <div className="flex items-center border-b">
                {/* Search Button */}
                <div className="relative">
                    <button
                        onClick={handleSearchClick}
                        className="px-2 py-2 text-sm font-medium text-gray-500 border rounded-full hover:bg-gray-200"
                    >
                        ☰ {/* Icon for search button */} Tìm kiếm
                    </button>
                    {/* Filter List */}
                    {showFilter && activeTab === "shop" && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
                            {filterOptions.map((option, index) => (
                                <div key={index} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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
