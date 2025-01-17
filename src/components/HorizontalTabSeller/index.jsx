import React, {useState, useEffect} from "react";
import {useGetFeedbackBySellerUserIdQuery} from "../../services/feedback.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import {useNavigate} from "react-router-dom";
import {useGetSellerInformationByUserIdQuery} from "../../services/sellerinformation.service.js";
import {useGetItemsBySellerQuery, useGetItemsFilterQuery} from "../../services/item.service";
import {

    Spin,
    Empty, Layout, theme, Collapse, Checkbox, Space, InputNumber, Slider, Breadcrumb,

} from "antd";
import {Heading, InputDH} from "@/components/index.jsx";
import {useGetCategoriesQuery} from "@/services/category.service.js";
import {setFilters} from "@/redux/item/itemSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {setItemShopFilters} from "@/redux/item/itemStoreSlice.js";
import CartItem from "@/components/CartItem/index.jsx";
import Header2 from "@/components/Header2/index.jsx";
import FooterBK from "@/components/FooterBK/index.jsx";
import FeedBack from "@/components/FeedBack.jsx";

const {Panel} = Collapse;
const {Content, Sider} = Layout;

const TabContent = ({activeTab}) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([1, 1600000000]);
    const [percentageRange, setPercentageRange] = useState([0, 100]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedPriceFilter, setSelectedPriceFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [userIdSeller, setUserIdSeller] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const sellerIdFromLocalStorage = localStorage.getItem('userIdseller');
        if (sellerIdFromLocalStorage) {
            setUserIdSeller(parseInt(sellerIdFromLocalStorage, 10));
        }
    }, []);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    // API feedback
    const {data: feedbackData} = useGetFeedbackBySellerUserIdQuery(
        userIdSeller !== null ? {userId: userIdSeller, page: currentPage, size: pageSize} : null
    );

    // API seller info
    const {data: sellerInforData, isLoading, error} = useGetSellerInformationByUserIdQuery(userIdSeller);

    // API items (with userIdSeller)
    // const {
    //     data, error: errorItem,
    //     isLoading: loadingItem,
    //     isSuccess: isSuccessItem
    // } = useGetItemsBySellerQuery
    // (
    //     {userId: userIdSeller}
    // );


    // const filters = useSelector(
    //     (state) =>
    //         state.itemShop || {keyword: "", min: 0, max: 16000000, scIds: [], userId: userIdSeller}
    // );
    const {
        data: categories = [],
        error: categoriesError,
        isLoading: categoriesLoading,
        isFetching,
        isSuccess,
    } = useGetCategoriesQuery();
    //console.log("categories", categories)

    useEffect(() => {
        if (userIdSeller) {
            dispatch(setItemShopFilters({userId: userIdSeller}));
        }
    }, [userIdSeller, dispatch]);
    const filters = useSelector(
        (state) => state.itemShop || {keyword: "", min: 0, max: 16000000, scIds: [], userId: userIdSeller}
    );

    const {
        data, error: errorItem,
        isLoading: loadingItem,
        isSuccess: isSuccessItem
    } = useGetItemsBySellerQuery(filters);
    console.log("userIdSeller", userIdSeller)


    const items = Array.isArray(data?.data?.data) ? data.data.data : [];
    console.log("data", data)
    // const {
    //     data: fi, error: errorItems,
    //     isLoading: loadingItems,
    //     isSuccess: isSuccessItems
    // } = useGetItemsFilterQuery(filters);

    const handleFilterChange = (newFilters) => {
        const updatedFilters = {...filters, ...newFilters};
        if (newFilters.page !== undefined) {
            updatedFilters.page = newFilters.page - 1;
        }

        dispatch(setItemShopFilters(updatedFilters));
    };

    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const onPercentageSliderChange = (value) => {
        setPercentageRange(value);
    };

    const onLowPercentageChange = (value) => {
        setPercentageRange([value, percentageRange[1]]);
    };

    const onHighPercentageChange = (value) => {
        setPercentageRange([percentageRange[0], value]);
    };

    const handleBrandChange = (subCategoryId, checked) => {
        if (checked) {
            // If checked, add to the list of selected IDs
            setSelectedSubCategoryIds([...selectedSubCategoryIds, subCategoryId]);
            handleFilterChange({scIds: [...selectedSubCategoryIds, subCategoryId]});
        } else {
            // If unchecked, remove from the list of selected IDs
            const updatedIds = selectedSubCategoryIds.filter((id) => id !== subCategoryId);
            setSelectedSubCategoryIds(updatedIds);
            handleFilterChange({scIds: updatedIds});
        }
    };

    const handleTagClose = (brandName) => {
        // Khi đóng tag, loại bỏ brand khỏi danh sách và bỏ chọn checkbox
        setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
    };


    const onPriceRangeChange = (min, max) => {
        setPriceRange([min, max]);
        handleFilterChange({min, max});
    };
    const handlePriceFilterChange = (value) => {
        if (selectedPriceFilter === value) {
            setSelectedPriceFilter(null);
            onPriceRangeChange(1, 1600000000); // giá trị mặc định không giới hạn
        } else {
            setSelectedPriceFilter(value);
            switch (value) {
                case 'under500k':
                    onPriceRangeChange(1, 500000);
                    break;
                case '500kTo1M':
                    onPriceRangeChange(500000, 1000000);
                    break;
                case '1MTo1_5M':
                    onPriceRangeChange(1000000, 1500000);
                    break;
                case '2MTo5M':
                    onPriceRangeChange(2000000, 5000000);
                    break;
                case 'above5M':
                    onPriceRangeChange(5000000, 1600000000);
                    break;
                default:
                    break;
            }
        }
    };

    switch (activeTab) {
        case "reviews":
            return (
                <Layout>
                    <Content
                        style={{
                            padding: '0 48px',
                        }}
                    >
                        <div
                            style={{
                                background: colorBgContainer,
                                minHeight: 280,
                                padding: 24,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                       
                            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                                <div className="max-w-2xl mx-auto px-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Đánh Giá</h2>
                                    </div>
                                    {/*startfeedback*/}
                                    {feedbackData?.content?.map(feedback => (
                                        <>
                                            <FeedBack feedback={feedback}/>
                                        </>
                                    ))}
                                    <div className="flex justify-center items-center mt-4">
                                        <Pagination
                                            // currentPage={page}
                                            // totalPages={data?.data.totalPages || 1}
                                            // onPageChange={setPage}
                                            currentPage={filters.page + 1}
                                            totalPages={data ? data.data.totalPages : 1}
                                            onPageChange={(page) => handleFilterChange({page})}
                                        />
                                    </div>
                                    {/*endfeedback*/}
                                   
                                </div>
                            </section>
                        </div>
                    </Content>
                </Layout>
            );
        case "info":
            return (
                <Layout>
                    <Content
                        style={{
                            padding: '0 48px',
                        }}
                    >
                        <div
                            style={{
                                background: colorBgContainer,
                                minHeight: 280,
                                padding: 24,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <div className="w-full h-full ">
                                <div
                                    dangerouslySetInnerHTML={{__html: sellerInforData?.description}}
                                    style={{
                                        wordWrap: "break-word",
                                        overflowWrap: "break-word",
                                        wordBreak: "break-all"
                                    }}
                                />
                            </div>
                        </div>
                    </Content>
                </Layout>
            );
        case "shop":
            return (
                <>
                    <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                        <Content
                            style={{
                                padding: '0 48px',
                                flex: 1, // Cho phép Content chiếm không gian còn lại
                                display: 'flex', // Đặt display là flex để chứa nội dung
                                flexDirection: 'column', // Hướng theo chiều dọc
                            }}
                        >
                            <Layout
                                style={{
                                    padding: '24px 0',
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                    flex: 1, // Để Layout chiếm hết không gian còn lại
                                }}
                            >
                                <Sider
                                    style={{
                                        background: colorBgContainer,
                                    }}
                                    width={300}
                                >
                                    {/*<SiderUserBK/>*/}
                                    <div className="flex flex-col items-start gap-6 ml-5">
                                        <div
                                            className="flex items-center justify-between gap-5 self-stretch sticky top-0 bg-white z-10 h-[60px]">

                                            <Heading
                                                size="text2xl"
                                                as="h1"
                                                className="text-[18px] font-medium text-blue_gray-900_01"
                                            >
                                                Bộ lọc tìm kiếm
                                            </Heading>
                                        </div>

                                        <div className="w-full overflow-y-auto max-h-[400px]">
                                            {categoriesError ? (
                                                <Empty
                                                    description={`Error: ${categoriesError.message || "Failed to load categories."}`}/>
                                            ) : (
                                                <Spin spinning={categoriesLoading} tip="Loading...">
                                                    <Collapse defaultActiveKey={["1"]} ghost>
                                                        {categories?.map((category) => (
                                                            <Panel
                                                                key={category?.categoryId}
                                                                header={
                                                                    <h2 className="text-lg font-semibold">
                                                                        {category?.categoryName}
                                                                    </h2>
                                                                }
                                                            >
                                                                <div className="flex flex-col">
                                                                    {category?.subCategory.map((sub) => (
                                                                        <div
                                                                            key={sub.sc_id}
                                                                            className="flex items-center gap-2 w-[50%]"
                                                                        >
                                                                            <Checkbox
                                                                                checked={selectedSubCategoryIds.includes(sub.sc_id)}
                                                                                onChange={(e) =>
                                                                                    handleBrandChange(sub.sc_id, e.target.checked)
                                                                                }
                                                                            />
                                                                            <span>{sub.sub_category}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Panel>
                                                        ))}
                                                    </Collapse>
                                                </Spin>
                                            )}
                                        </div>
                                        <div className="h-px w-[72%] bg-gray-200"/>

                                        <InputDH
                                            size="sm"
                                            shape="round"
                                            name="Tim kiếm sản phẩm"
                                            placeholder={`Tim kiếm sản phẩm`}
                                            className="w-[88%] rounded-md border border-solid border-gray-200 px-3.5 !text-blue_gray-900_01"
                                        />
                                        <div className="flex flex-col items-start gap-6">
                                            <div className="flex items-center justify-between gap-5 self-stretch">
                                                <h2 className="text-[18px] font-medium text-blue_gray-900_01">Giá</h2>
                                            </div>
                                            <div className="flex flex-col gap-3 self-stretch">
                                                <Space direction="vertical">
                                                    <Checkbox
                                                        checked={selectedPriceFilter === 'under500k'}
                                                        onChange={(e) => handlePriceFilterChange('under500k', e.target.checked)}
                                                    >
                                                        Dưới 500,000₫
                                                    </Checkbox>
                                                    <Checkbox
                                                        checked={selectedPriceFilter === '500kTo1M'}
                                                        onChange={(e) => handlePriceFilterChange('500kTo1M', e.target.checked)}
                                                    >
                                                        500,000₫ - 1,000,000₫
                                                    </Checkbox>
                                                    <Checkbox
                                                        checked={selectedPriceFilter === '1MTo1_5M'}
                                                        onChange={(e) => handlePriceFilterChange('1MTo1_5M', e.target.checked)}
                                                    >
                                                        1,000,000₫ - 1,500,000₫
                                                    </Checkbox>
                                                    <Checkbox
                                                        checked={selectedPriceFilter === '2MTo5M'}
                                                        onChange={(e) => handlePriceFilterChange('2MTo5M', e.target.checked)}
                                                    >
                                                        2,000,000₫ - 5,000,000₫
                                                    </Checkbox>
                                                    <Checkbox
                                                        checked={selectedPriceFilter === 'above5M'}
                                                        onChange={(e) => handlePriceFilterChange('above5M', e.target.checked)}
                                                    >
                                                        Trên 5,000,000₫
                                                    </Checkbox>
                                                </Space>
                                            </div>
                                            <div className="h-px w-[72%] bg-gray-200"/>
                                        </div>

                                    
                                      
                                    </div>
                                </Sider>
                                <Content
                                    style={{
                                        padding: '0 24px',
                                        minHeight: 280,
                                        flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                                    }}
                                >
                                    <div className="mt-10 flex flex-col items-center self-stretch">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-blue_gray-900_01">Filter:</span>
                                        </div>
                                        {errorItem ? (
                                            <Empty
                                                description={`Error: ${errorItem.message || "Failed to load categories."}`}/>
                                        ) : (
                                            <Spin spinning={loadingItem} tip="Loading...">
                                                <div
                                                    className="mx-7 mt-5 grid grid-cols-3 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">
                                                    {isSuccessItem && items.length > 0 ? (
                                                        items.map((item, index) => (
                                                            <div key={`itemsGrid-${index}`}>
                                                                <CartItem product={item}/>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Empty description="No items found."/>
                                                    )}
                                                </div>
                                            </Spin>
                                        )}
                                 
                                    </div>
                                </Content>
                            </Layout>
                        </Content>
                    </Layout>
                </>
            );


        default:
            return null;
    }
};


export default function HorizontalTab({initialTab = "shop"}) {
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabs = [
        {label: "Cửa hàng", value: "shop"},
        {label: "Thông tin", value: "info"},
        {label: "Đánh giá", value: "reviews"}
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
                <TabContent activeTab={activeTab}/>
            </div>
        </div>
    );
}

