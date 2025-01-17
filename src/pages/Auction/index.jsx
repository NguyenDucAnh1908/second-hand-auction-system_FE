import {Helmet} from "react-helmet";
import {ButtonDH, Heading, Text,} from "../../components";
import Header2 from "../../components/Header2";
import AuctionSection from "./AuctionSection";
import React, {useEffect, useState} from "react";
import {Avatar, Breadcrumb, Flex, Layout, Rate, Skeleton, Tabs, theme} from "antd";
import FooterBK from "../../components/FooterBK/index.jsx";
import {useGetItemDetailQuery, useGetSimilarItemAuctionQuery} from "@/services/item.service.js";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useGetSellerInformationByAuctionIdQuery} from "../../services/sellerinformation.service.js";
import {useGetHighestBidQuery, useGetWinBidQuery} from "@/services/bid.service.js";
import {selectCurrentUserAPI, selectIsLoggedIn} from "@/redux/auth/authSlice.js";
import FeedBack from "@/components/FeedBack.jsx";
import SliderItem from "@/components/SlilerItem/index.jsx";


const {Content} = Layout;
export default function AuctionPage() {
    const [sliderState, setSliderState] = React.useState(0);
    const sliderRef = React.useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState("1");
    const [bidAmount, setBidAmount] = useState([]);
    const [isHighBidder, setIsHighBidder] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const userAPI = useSelector(selectCurrentUserAPI);
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
    //console.log("dataSimilar", data?.scId?.sub_category_id)
    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };
    const onChange = (key) => {
        setActiveTabKey(key);
    };


    const [auctionId, setAuctionId] = useState(null);
    const [sellerAvatar, setsellerAvatar] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('auctionItemId');
        //console.log('auction ID from local storage:', id);
        if (id) {
            setAuctionId(id);
        }
    }, []);


    const {
        data: sellerInfo,
        error: sellerInfoError,
        isLoading: loadingSellerInfo
    } = useGetSellerInformationByAuctionIdQuery(data?.auction?.auction_id);


    useEffect(() => {
        if (sellerInfo) { // Kiểm tra sellerInfo có dữ liệu
            localStorage.setItem('sellerAvatar', sellerInfo.avatar);
            localStorage.setItem('sellerName', sellerInfo.storeName);
        }
    }, [sellerInfo]);


    // console.log("data", data)
    const {
        data: winningBid,
        error: fetchWinningBid,
        isLoading: loadingWinningBid,
        refetch: isRefetchWinningBid
    } = useGetWinBidQuery(data?.auction?.auction_id);

    const {
        data: highestBid,
        error: fetchHighestBid,
        isLoading: loadingHighestBid,
        refetch: isRefetchHighestBid
    } = useGetHighestBidQuery(data?.auction?.auction_id);
    const [userIdSeller, setUserIdSeller] = useState(null);

    useEffect(() => {
        if (sellerInfo) {
            const userId = parseInt(sellerInfo.userId, 10);
            //console.log('Kiểu dữ liệu của userId:', typeof userId);
            if (!isNaN(userId)) {
                setUserIdSeller(userId);
            } else {
                console.error('userId không hợp lệ:', sellerInfo.userId);
            }
        }
    }, [sellerInfo]);

    const navigate = useNavigate();

    const handleNavigateToAuction = (userIdseller) => {
        localStorage.setItem('userIdseller', userIdseller);
        navigate(`/SellerDetailPage?activeTab=reviews`);
    };

    const handleNavigateToUserIdSeller = (userIdseller) => {
        localStorage.setItem('userIdseller', userIdseller);
        navigate(`/SellerDetailPage`);
    };
    useEffect(() => {
        if (highestBid?.data || winningBid?.data?.bidAmount) {
            setBidAmount(highestBid?.data || winningBid?.data?.bidAmount);
            setIsHighBidder(winningBid?.data?.winBid === true);
            setInitialized(true);
        }
    }, [highestBid, winningBid]);
    //console.log("user", userAPI?.id)
    useEffect(() => {

        const eventSource = new EventSource("https://teracandle.id.vn/api/v1/bids/stream-bids");

        eventSource.addEventListener("bidUpdate", (event) => {
            const bid = JSON.parse(event.data);
            setBidAmount(bid?.bidAmount || null);
            if (bid?.winBid && bid?.userId === userAPI?.id) {
                setIsHighBidder(true);
            } else {
                setIsHighBidder(false);
            }
        });

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [userAPI?.id]);
    if (error) return <p>Error loading item details.</p>;


    const accordionData = [
        {
            detailsTitle: "Thông tin sản phẩm",
            content: (
                <div className="accordion-content">
                    {/* Wrapper for two tables */}
                    <div className="flex flex-wrap gap-4">
                        {/* Thông tin sản phẩm */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Thông tin sản phẩm</h2>
                            <div className="overflow-x-auto shadow rounded-lg">
                                <table className="min-w-full bg-white divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thông số
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Chi tiết
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {data?.batteryHealth && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng pin
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.batteryHealth} %</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.os || data?.itemSpecific?.osFamily ? (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Phiên bản hệ
                                                điều hành
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {data?.itemSpecific?.os || data?.itemSpecific?.osFamily}
                                            </td>
                                        </tr>
                                    ) : null}
                                    {data?.bodyCondition && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng vỏ
                                                máy
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.bodyCondition}</td>
                                        </tr>
                                    )}
                                    {data?.screenCondition && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng màn
                                                hình
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.screenCondition}</td>
                                        </tr>
                                    )}
                                    {data?.cameraCondition && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng
                                                camera
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.cameraCondition}</td>
                                        </tr>
                                    )}
                                    {data?.portCondition && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng
                                                cổng
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.portCondition}</td>
                                        </tr>
                                    )}
                                    {data?.buttonCondition && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Tình trạng nút
                                                bấm
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.buttonCondition}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Đặc điểm sản phẩm */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold mb-4">Đặc điểm sản phẩm</h2>
                            <div className="overflow-x-auto shadow rounded-lg">
                                <table className="min-w-full bg-white divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thông số
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Chi tiết
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {data?.itemSpecific?.cpu && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Chíp xử lý</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.cpu}</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.ram && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">RAM</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.ram}</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.screen_size && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Kích thước màn
                                                hình
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.screen_size}"</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.camera_specs && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Camera</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.camera_specs}</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.connectivity && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Kết nối</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.connectivity}</td>
                                        </tr>
                                    )}
                                    {data?.itemSpecific?.sensors && (
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">Cảm biến</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{data?.itemSpecific?.sensors}</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            ),
        },
        {
            detailsTitle: "Hướng dẫn tham gia đấu giá",
            content: (
                <div className="text-base text-gray-800 leading-relaxed">
                    <p className="mb-4 text-lg font-semibold">Để tham gia đấu giá sản phẩm, bạn cần thực hiện các bước
                        sau:</p>
                    <ul className="ml-5 mt-4 space-y-4 text-sm text-gray-700 list-inside">
                        <li className="flex items-start">
                            <span className="text-red-600 font-semibold mr-2">1. Đăng ký tài khoản:</span>
                            Bạn cần có một tài khoản người dùng trên hệ thống đấu giá để có thể tham gia các phiên đấu
                            giá. Nếu chưa có, bạn hãy đăng ký tài khoản mới.
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 font-semibold mr-2">2. Chọn sản phẩm đấu giá:</span>
                            Sau khi đăng nhập vào hệ thống, bạn có thể chọn sản phẩm mà bạn muốn tham gia đấu giá. Đảm
                            bảo rằng bạn đã đọc kỹ thông tin về sản phẩm trước khi tham gia.
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 font-semibold mr-2">3. Đặt giá đấu:</span>
                            Trong phiên đấu giá, bạn có thể đặt giá đấu cao hơn mức giá hiện tại để tăng cơ hội sở hữu
                            sản phẩm. Hãy tham gia đấu giá nhanh chóng trước khi phiên đấu giá kết thúc.
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 font-semibold mr-2">4. Theo dõi kết quả:</span>
                            Theo dõi tiến trình đấu giá và số tiền đấu giá hiện tại. Phiên đấu giá sẽ kết thúc khi hết
                            thời gian, và người có mức giá cao nhất sẽ thắng cuộc.
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 font-semibold mr-2">5. Thanh toán và nhận sản phẩm:</span>
                            Sau khi thắng đấu giá, bạn cần thanh toán số tiền đã đấu giá. Sau khi thanh toán, sản phẩm
                            sẽ được giao đến bạn theo thỏa thuận với người bán.
                        </li>
                    </ul>
                    <p className="mt-4 text-gray-700">
                        Tham gia đấu giá không chỉ mang lại cơ hội sở hữu sản phẩm với mức giá hấp dẫn mà còn giúp bạn
                        trải nghiệm quy trình đấu giá chuyên nghiệp.
                    </p>
                </div>
            ),
        },
        {
            detailsTitle: "Xem thêm",
            content: (
                <div
                    className="text-base text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{__html: data?.itemDescription}}
                />

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
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item>Đấu giá</Breadcrumb.Item>
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

                            {data?.auctionType?.act_id === 3 ? (
                                // Hiển thị thông báo cho Đấu Giá Kín
                                <div
                                    className="w-full p-1 flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700">
                                    <span className="text-sm font-semibold">Đấu Giá Kín</span>
                                </div>
                            ) : (
                                isLoggedIn && initialized && (
                                    <div
                                        className={`w-full p-1 flex items-center rounded-lg ${isHighBidder === true
                                            ? 'bg-gradient-to-r from-white to-green-500'
                                            : 'bg-gradient-to-r from-white to-red-500'
                                        }`}
                                    >
                                                <span className="text-sm font-semibold">
                                                    {isHighBidder === true
                                                        ? "Bạn đã trả mức giá cao nhất"
                                                        : "Mức giá bạn đã ra đã bị vượt"}
                                                </span>
                                    </div>
                                ))}
                            <Skeleton loading={isLoading} active>
                                {isSuccess && data && (
                                    <AuctionSection dataItem={data}
                                                    isSuccessItemDt={isSuccess}
                                                    isRefetch={refetch}
                                                    winningBid={winningBid}
                                                    isRefetchWinningBid={isRefetchWinningBid}
                                                    isRefetchHighestBid={isRefetchHighestBid}
                                                    isLoggedIn={isLoggedIn}
                                                    bidAmount={bidAmount}
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

                                        {/* <button
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
                                        </button> */}
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
                                    Sản phẩm tương tự
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
