import {Helmet} from "react-helmet";
import {
    ButtonDH,
    Img,
    Slider,
    Heading,
    InputDH,
    TextArea,
    RatingBar,
    Text,
} from "../../components";
import Header2 from "../../components/Header2";
import AuctionSection from "./AuctionSection";
import RecommendedProductsSection from "./RecommendedProductsSection";
import React from "react";
import {Avatar, Breadcrumb, Empty, Layout, Skeleton, theme} from "antd";
import {AntDesignOutlined} from "@ant-design/icons";
import {Flex, Rate, Typography, Tabs} from "antd";
import FooterBK from "../../components/FooterBK/index.jsx";
import {useGetItemDetailQuery, useGetSimilarItemAuctionQuery} from "@/services/item.service.js";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useGetSellerInformationByAuctionIdQuery} from "../../services/sellerinformation.service.js";
import {useGetFeedbackBySellerUserIdQuery} from "../../services/feedback.service.js";
import Pagination from "@/components/Pagination/index.jsx";
import {useGetWinBidQuery} from "@/services/bid.service.js";
import {selectIsLoggedIn} from "@/redux/auth/authSlice.js";
import FeedBack from "@/components/FeedBack.jsx";
import RecentProductsSection from "pages/HomePage/RecentProductsSection.jsx";
import SliderItem from "@/components/SlilerItem/index.jsx";


const {Content} = Layout;
export default function AuctionPage() {
    const [sliderState, setSliderState] = React.useState(0);
    const sliderRef = React.useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState("1");
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {id} = useParams();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {data, error, isLoading, isSuccess, refetch} = useGetItemDetailQuery({id});

    const {
        data: dataSimilar,
        isLoading: isLoadingSimilar,
        isError: isErrorSimilar,
        error: errorSimilar
    } = useGetSimilarItemAuctionQuery({
        mainCategoryId: data?.scId?.sub_category_id || 0,
        page: 0,
        limit: 10
    });

    console.log("dataSimilar", dataSimilar)
    //console.log("dataSimilar", data?.scId?.sub_category_id)
    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };
    const onChange = (key) => {
        setActiveTabKey(key);
    };


    const [auctionId, setAuctionId] = useState(null);


    useEffect(() => {
        const id = localStorage.getItem('auctionItemId');
        console.log('auction ID from local storage:', id);
        if (id) {
            setAuctionId(id);
        }
    }, []);

    const {
        data: sellerInfo,
        error: sellerInfoError,
        isLoading: loadingSellerInfo
    } = useGetSellerInformationByAuctionIdQuery(data?.auction?.auction_id);
// console.log("data", data)
    const {
        data: winningBid,
        error: fetchWinningBid,
        isLoading: loadingWinningBid,
        refetch: isRefetchWinningBid
    } = useGetWinBidQuery(data?.auction?.auction_id);
    const isHighBidder = winningBid?.data?.winBid === true;
    const [userIdSeller, setUserIdSeller] = useState(null);

    useEffect(() => {
        if (sellerInfo) {
            const userId = parseInt(sellerInfo.userId, 10);
            console.log('Kiểu dữ liệu của userId:', typeof userId);
            if (!isNaN(userId)) {
                setUserIdSeller(userId);
            } else {
                console.error('userId không hợp lệ:', sellerInfo.userId);
            }
        }
    }, [sellerInfo]);

    // const { data: feedback, error: feedbackError, isLoading: feedbackLoading } = useGetFeedbackBySellerUserIdQuery(
    //     userIdSeller !== null ? { userId: userIdSeller, page: 0, size: 10 } : null
    // );

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    // const { data: feedbackData } = useGetFeedbackBySellerUserIdQuery(
    //     userIdSeller !== null ?
    //         {
    //             userId: userIdSeller,
    //             page: currentPage,
    //             size: pageSize,
    //         } : null
    // );


    const navigate = useNavigate();

    const handleNavigateToAuction = (userIdseller) => {
        localStorage.setItem('userIdseller', userIdseller);
        navigate(`/SellerDetailPage?activeTab=reviews`);
    };

    const handleNavigateToUserIdSeller = (userIdseller) => {
        localStorage.setItem('userIdseller', userIdseller);
        navigate(`/SellerDetailPage`);
    };

    //if (loadingSellerInfo) return <p>Loading seller information...</p>;
    //if (sellerInfoError) return <p>Error loading seller information: {sellerInfoError.message}</p>;

    if (error) return <p>Error loading item details.</p>;
    const accordionData = [
        {
            detailsTitle: "Mô tả",
            content: (
                <>
                    {/*<Heading*/}
                    {/*    as="h6"*/}
                    {/*    className="text-[16px] font-medium text-blue_gray-900_01"*/}
                    {/*>*/}
                    {/*    Đặc điểm*/}
                    {/*</Heading>*/}
                    <div className="flex items-start self-stretch md:flex-col">
                        <div className="mt-[18px] h-[4px] w-[4px] rounded-sm bg-blue_gray-900_01"/>
                        <Heading
                            as="p"
                            className="ml-2.5 w-[62%] self-center text-[16px] font-normal leading-10 text-blue_gray-600_01 md:ml-0 md:w-full"
                        >
                            <>
                                {/*{data?.itemDescription}*/}
                                <p dangerouslySetInnerHTML={{__html: data?.itemDescription}}/>
                                <br/>
                            </>
                        </Heading>
                    </div>
                </>
            ),
        },
        {
            detailsTitle: "Thông tin sản phẩm",
            content: (
                <div className="flex items-start self-stretch md:flex-col">
                    <div className="mt-[18px] h-[4px] w-[4px] rounded-sm bg-blue_gray-900_01"/>
                    <Heading
                        as="p"
                        className="ml-2.5 w-[62%] self-center text-[16px] font-normal leading-10 text-blue_gray-600_01 md:ml-0 md:w-full"
                    >
                        <div className="flex flex-wrap gap-4">
                            <div className="w-1/4 p-2">
                                <strong>Percent:</strong> {data?.itemSpecific?.percent}
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Type:</strong> {data?.itemSpecific?.type}
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Color:</strong> {data?.itemSpecific?.color}
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Weight:</strong> {data?.itemSpecific?.weight} kg
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Dimension:</strong> {data?.itemSpecific?.dimension} cm
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Original:</strong> {data?.itemSpecific?.original}
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Manufacture Date:</strong> {data?.itemSpecific?.manufactureDate || 'N/A'}
                            </div>
                            <div className="w-1/4 p-2">
                                <strong>Material:</strong> {data?.itemSpecific?.material}
                            </div>
                        </div>

                    </Heading>
                </div>
            ),
        },
        {
            detailsTitle: "Hướng dẫn bảo quản",
            content: (
                <p>
                    {data?.itemDescription}
                </p>
            ),
        },
    ];


    return (
        <>
            <Helmet>
                <title>Auction Deals - Bid on Exclusive Nike Apparel and More</title>
                <meta
                    name="description"
                    content="Join our Auction Deals for a chance to win Nike apparel and other fashion items. Start bidding from as low as 250.000đ and enjoy the thrill of the auction."
                />
            </Helmet>
            <Layout>
                <Header2/>
                <Content
                    style={{
                        padding: '0 20px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 10,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div className="flex w-full flex-col items-center bg-bg-white">
                            {isLoggedIn && winningBid && (
                                <>
                                    <div
                                        className={`w-full p-1 flex items-center rounded-lg ${winningBid?.data?.winBid ? 'bg-gradient-to-r from-white to-green-500' : 'bg-gradient-to-r from-white to-red-500'}`}
                                    >
                                        <span
                                            className="text-sm font-semibold">{winningBid?.data?.winBid ? "You're the high bidder" : "You're outbid"} ||</span>
                                    </div>
                                </>
                            )}
                            <Skeleton loading={isLoading} active>
                                {isSuccess && data && (
                                    <AuctionSection dataItem={data}
                                                    isSuccessItemDt={isSuccess}
                                                    isRefetch={refetch}
                                                    winningBid={winningBid}
                                                    isRefetchWinningBid={isRefetchWinningBid}
                                                    isLoggedIn={isLoggedIn}
                                    />
                                )}
                            </Skeleton>
                            <div
                                className="container-xs mt-[70px] flex flex-col gap-[10px] md:gap-[85px] md:px-5 sm:gap-[57px]">
                                <div className="ml-1 mr-2.5 flex flex-col items-start md:mx-0">
                                    <Skeleton loading={isLoading} active>
                                        {isSuccess && data && (
                                            <div className="flex flex-col gap-4 self-stretch px-2.5">
                                                <div className="flex flex-col items-start gap-3.5">
                                                    <Heading
                                                        size="text3xl"
                                                        as="h2"
                                                        className="text-[20px] font-medium text-blue_gray-900_01"
                                                    >
                                                        Tổng Quan
                                                    </Heading>
                                                    <div className="flex flex-col gap-4 self-stretch">

                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start gap-6">
                                                    <div className="h-px w-[72%] bg-gray-200"/>
                                                    <Tabs onChange={onChange} type="card" activeKey={activeTabKey}>
                                                        {accordionData.map((d, i) => (
                                                            <Tabs.TabPane
                                                                tab={
                                                                    <span
                                                                        className={`text-[20px] font-medium ${activeTabKey === String(i + 1)
                                                                            ? "text-green-500"
                                                                            : "text-blue_gray-900_01"
                                                                        }`}
                                                                    >
                                                                        {d.detailsTitle}
                                                                    </span>
                                                                }
                                                                key={String(i + 1)}
                                                            >
                                                                <div className="mb-4 flex flex-col items-start gap-3">
                                                                    {d.content}
                                                                </div>
                                                            </Tabs.TabPane>
                                                        ))}
                                                    </Tabs>
                                                </div>
                                            </div>
                                        )}
                                    </Skeleton>
                                    <Skeleton loading={loadingSellerInfo} active>

                                        <Text
                                            size="text5xl"
                                            as="p"
                                            className="mt-[30px] text-[25px] font-normal text-black-900 md:text-[23px] sm:text-[21px]"
                                        >
                                            Tổng quan đánh giá
                                        </Text>
                                        <div className="flex items-center my-8 gap-6">
                                            <Avatar
                                                size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                                                src={sellerInfo?.avatar}
                                                onClick={() => handleNavigateToUserIdSeller(sellerInfo?.userId)}

                                            />
                                            <div className="font-semibold text-2xl dark:text-white">
                                                <div>{sellerInfo?.storeName}</div>
                                                <div className="text-base text-gray-500 dark:text-gray-400">
                                                    {sellerInfo?.address}
                                                </div>
                                            </div>
                                        </div>

                                        {/*)}*/}
                                    </Skeleton>
                                    <div
                                        className="inline-flex flex items-center space-x-10 rounded-md shadow-sm"
                                        role="group"
                                    >
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                            onClick={() => handleNavigateToUserIdSeller(sellerInfo.userId)}

                                        >
                                            <svg
                                                className="w-3 h-3 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                            </svg>
                                            Visit store
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                        >
                                            <svg
                                                className="w-3 h-3 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                                                />
                                            </svg>
                                            Contract
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                        >
                                            <svg
                                                className="w-3 h-3 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                                <path
                                                    d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                            </svg>
                                            Save seller
                                        </button>
                                    </div>
                                    <Skeleton loading={loadingSellerInfo} active>
                                        <div className="mb-5  flex items-start gap-[30px] self-stretch md:flex-col">
                                            <div
                                                className="flex w-[40%] flex-col items-start gap-[110px] md:w-full md:gap-[82px] sm:gap-[55px]">
                                                <div className="flex flex-col gap-2 self-stretch">
                                                    <div className="flex items-center justify-between gap-5">
                                                        <Heading
                                                            size="text8xl"
                                                            as="p"
                                                            className="font-jost text-[60px] font-medium text-blue_gray-900_01 md:text-[52px] sm:text-[46px]"
                                                        >
                                                            {sellerInfo?.totalStars.toFixed(1)}
                                                        </Heading>
                                                        <div className="flex w-[64%] flex-col items-start gap-3.5">
                                                            <Flex gap="middle">
                                                                <Rate disabled value={sellerInfo?.totalStars}
                                                                      allowHalf/>
                                                            </Flex>

                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-[46px]">
                                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                            {sellerInfo?.totalFeedbackCount} Lượt đánh giá
                                                        </p>
                                                        <div className="flex items-center mt-0">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                                                            >
                                                                5 star
                                                            </a>
                                                            <div
                                                                className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                                                                {" "}
                                                                <div
                                                                    className="h-5 bg-yellow-300 rounded"
                                                                    style={{width: `${sellerInfo?.rating5Percentage}%`}}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                            {sellerInfo?.rating5Percentage.toFixed(0)}%
                                                        </span>

                                                        </div>
                                                        <div className="flex items-center mt-4">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                                                            >
                                                                4 star
                                                            </a>
                                                            <div
                                                                className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                                                                {" "}
                                                                {/* Giảm khoảng cách ngang */}
                                                                <div
                                                                    className="h-5 bg-yellow-300 rounded"
                                                                    style={{width: `${sellerInfo?.rating4Percentage}%`}}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                            {sellerInfo?.rating4Percentage.toFixed(0)}%
                                                        </span>
                                                        </div>

                                                        <div className="flex items-center mt-4">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                                                            >
                                                                3 star
                                                            </a>
                                                            <div
                                                                className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                                                                <div
                                                                    className="h-5 bg-yellow-300 rounded"
                                                                    style={{width: `${sellerInfo?.rating3Percentage}%`}}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                            {sellerInfo?.rating3Percentage.toFixed(0)}%
                                                        </span>
                                                        </div>

                                                        <div className="flex items-center mt-4">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                                                            >
                                                                2 star
                                                            </a>
                                                            <div
                                                                className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                                                                <div
                                                                    className="h-5 bg-yellow-300 rounded"
                                                                    style={{width: `${sellerInfo?.rating2Percentage}%`}}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                            {sellerInfo?.rating2Percentage.toFixed(0)}%
                                                        </span>
                                                        </div>

                                                        <div className="flex items-center mt-4">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                                                            >
                                                                1 star
                                                            </a>
                                                            <div
                                                                className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                                                                <div
                                                                    className="h-5 bg-yellow-300 rounded"
                                                                    style={{width: `${sellerInfo?.rating1Percentage}%`}}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                            {sellerInfo?.rating1Percentage.toFixed(0)}%
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-[18px] flex flex-1 flex-col gap-9 self-center md:self-stretch">
                                                <div className="ml-1 flex flex-col items-start gap-[50px] md:ml-0">
                                                    <div className="flex flex-col gap-1.5 self-stretch">
                                                        {/*<Heading*/}
                                                        {/*    size="text2xl"*/}
                                                        {/*    as="p"*/}
                                                        {/*    className="w-[32%] text-[18px] font-medium leading-[22px] text-blue_gray-900_01 md:w-full"*/}
                                                        {/*>*/}
                                                        {/*    39 Đánh giá sản phẩm người bán*/}
                                                        {/*</Heading>*/}
                                                        <Heading
                                                            size="text2xl"
                                                            as="p"
                                                            className="text-[18px] font-medium leading-[22px] text-blue_gray-900_01"
                                                            style={{margin: 0, padding: 0}}
                                                        >
                                                            {sellerInfo?.totalFeedbackCount} Đánh giá sản phẩm người bán
                                                        </Heading>
                                                        {sellerInfo?.feedbackList.map(feedback => (
                                                            // <article key={feedback.feedbackId}>
                                                            //     <div className="flex items-center my-6">
                                                            //         <img
                                                            //             className="w-10 h-10 me-4 rounded-full"
                                                            //             src="/images/user.png"
                                                            //             alt="User Avatar"
                                                            //         />
                                                            //         <div className="font-medium dark:text-white">
                                                            //             <p>
                                                            //                 {feedback.username} <br/>
                                                            //                 <span style={{color: 'rgba(0, 0, 0, 0.5)'}}>
                                                            //                 {feedback.createAt.substring(0, 10)}
                                                            //             </span>
                                                            //
                                                            //                 <time
                                                            //                     dateTime="2014-08-16 19:00"
                                                            //                     className="block text-sm text-gray-500 dark:text-gray-400"
                                                            //                 >
                                                            //
                                                            //                 </time>
                                                            //             </p>
                                                            //         </div>
                                                            //     </div>
                                                            //
                                                            //     <div
                                                            //         className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                                            //         {[...Array(feedback.rating)].map((_, index) => (
                                                            //             <svg
                                                            //                 key={index}
                                                            //                 className="w-4 h-4 text-yellow-300"
                                                            //                 aria-hidden="true"
                                                            //                 xmlns="http://www.w3.org/2000/svg"
                                                            //                 fill="currentColor"
                                                            //                 viewBox="0 0 22 20"
                                                            //             >
                                                            //                 <path
                                                            //                     d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                            //                 />
                                                            //             </svg>
                                                            //         ))}
                                                            //         {[...Array(5 - feedback.rating)].map((_, index) => (
                                                            //             <svg
                                                            //                 key={index + feedback.rating}
                                                            //                 className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                                            //                 aria-hidden="true"
                                                            //                 xmlns="http://www.w3.org/2000/svg"
                                                            //                 fill="currentColor"
                                                            //                 viewBox="0 0 22 20"
                                                            //             >
                                                            //                 <path
                                                            //                     d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                            //                 />
                                                            //             </svg>
                                                            //         ))}
                                                            //
                                                            //     </div>
                                                            //
                                                            //     <footer
                                                            //         className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                                            //         <h3 className=" text-sm font-semibold text-gray-900 dark:text-white">
                                                            //             {feedback.comment}
                                                            //         </h3>
                                                            //     </footer>
                                                            //
                                                            //
                                                            //     <div className="flex flex-col gap-4 self-stretch">
                                                            //         <div className="mb-2 flex items-center">
                                                            //
                                                            //
                                                            //         </div>
                                                            //     </div>
                                                            //
                                                            //     <aside>
                                                            //
                                                            //         <div className="flex items-center mt-3">
                                                            //             <a
                                                            //                 href="#"
                                                            //                 className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                            //             >
                                                            //                 Hữu ích
                                                            //             </a>
                                                            //             <a
                                                            //                 href="#"
                                                            //                 className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                                                            //             >
                                                            //                 Báo cáo
                                                            //             </a>
                                                            //         </div>
                                                            //     </aside>
                                                            // </article>
                                                            <>
                                                                <FeedBack feedback={feedback}/>
                                                            </>
                                                        ))}
                                                    </div>
                                                    <ButtonDH
                                                        color="green_A700"
                                                        size="xl"
                                                        variant="outline"
                                                        shape="round"
                                                        className="ml-[218px] min-w-[298px] rounded-md !border-2 px-8 font-medium md:ml-0 sm:px-5"
                                                        onClick={() => handleNavigateToAuction(sellerInfo?.userId)}
                                                    >
                                                        Xem Tất Cả
                                                    </ButtonDH>
                                                </div>
                                            </div>
                                        </div>
                                    </Skeleton>
                                    {/*end infoseller*/}
                                </div>
                            </div>
                            {/*here*/}
                            {/*<RecommendedProductsSection/>*/}
                            <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                                <Heading
                                    size="text7xl"
                                    as="h2"
                                    className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                                >
                                    Sản phẩm tham gia nhiều nhất
                                </Heading>
                                <div className="mr-3.5 md:mr-0">
                                    <SliderItem itemDatas={dataSimilar} itemLoading={isLoadingSimilar}
                                                itemError={isErrorSimilar}/>
                                </div>
                            </div>
                            {/*itemData={itemData} itemLoading={itemLoading} itemError={itemError}*/}
                            {/* recommended products section */}
                            <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                                <Heading
                                    size="text7xl"
                                    as="h2"
                                    className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                                >
                                    Sản phẩm tham gia nhiều nhất
                                </Heading>
                                <div className="mr-3.5 md:mr-0">
                                    <SliderItem itemDatas={dataSimilar} itemLoading={isLoadingSimilar}
                                                itemError={isErrorSimilar}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}
