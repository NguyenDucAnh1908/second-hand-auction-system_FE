import {Text, Img, Heading, ButtonDH} from "../../components";
import UserProfileImage from "../../components/UserProfileImage";
import React, {Suspense, useEffect, useState} from "react";
import {Checkbox, message, Modal, Spin, Statistic} from "antd";
import {Rate} from "antd";
import BidForm from "../../components/BidForm";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "@/redux/auth/authSlice.js";
import {useNavigate} from "react-router-dom";
import {
    useAuctionRegisterMutation,
    useGetCheckAuctionRegisterQuery,
    useCheckUserInAuctionQuery
} from "@/services/auctionRegistrations.service.js";
import {Button} from "@material-tailwind/react";
import {useGetWinBidQuery} from "../../services/bid.service";

// eslint-disable-next-line react/prop-types
export default function AuctionSection({dataItem, isSuccessItemDt, isRefetch}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuctionId, setSelectedAuctionId] = useState(dataItem.auction.auction_id);
    const {data: winningBid, error: fetchError2, isLoading: loading2} = useGetWinBidQuery(dataItem.auction.auction_id);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const auctionEndDate = dataItem.auction?.endDate || null;
    const auctionEndTime = dataItem.auction?.end_time || null;
    const auctionStartDate = dataItem.auction?.startDate || null;
    const auctionStartTime = dataItem.auction?.start_time || null;

    const [auctionStatus, setAuctionStatus] = useState("");

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    const {
        data: checkRegister,
        isLoading: isLoadingCheckRegister,
        isError: isErrorCheckRegister,
        error: errorCheckRegister,
        refetch: isRefetchCheckRegister,
    } = useGetCheckAuctionRegisterQuery(selectedAuctionId ? {auctionId: selectedAuctionId} : null, {
        skip: !selectedAuctionId,
    });
    //console.log("CHECK checkRegister: ", checkRegister)
    const isRegistered = checkRegister?.auctionId === selectedAuctionId && checkRegister?.statusRegistration === true
    // *
    const [AuctionRegister, {isLoading: isLoadingAuctionRegister, error}] = useAuctionRegisterMutation();
    const handleSubmitAuctionRegister = async (e) => {
        e.preventDefault();
        try {
            const auctionData = {
                auction_id: dataItem.auction.auction_id,
            };
            const response = await AuctionRegister(auctionData).unwrap();
            isRefetch();
            isRefetchCheckRegister();
            message.success(response.message || "Register auction successfully!");
        } catch (error) {
            message.error("Failed to register auction.");
        }
    };

    const {Countdown} = Statistic;
    const showModal = () => {
        if (!isLoggedIn) {
            message.warning("Bạn cần đăng nhập để tham gia đấu giá!");
            navigate("/login");
        } else {
            setIsModalOpen(true);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isTermsOfDelivery, setIsTermsOfDelivery] = useState(false);

    const showTermsOfDelivery = () => {
        setIsTermsOfDelivery(true);
    };

    const handleOkTermsOfDelivery = () => {
        setIsTermsOfDelivery(false);
    };

    const handleCancelTermsOfDelivery = () => {
        setIsTermsOfDelivery(false);
    };
    const images = dataItem.images?.map((img) => ({
        original: img.image,
        thumbnail: img.image,
        // description: img.description,
    })) || [];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };


    return (
        <>
            {/*<Modal*/}
            {/*    title="Đặt Giá Thầu"*/}
            {/*    open={isModalOpen}*/}
            {/*    onCancel={handleCancel} // Vẫn giữ onCancel để đóng modal khi người dùng nhấn ra ngoài modal*/}
            {/*    centered*/}
            {/*    bodyStyle={{*/}
            {/*        display: "flex",*/}
            {/*        justifyContent: "center",*/}
            {/*        alignItems: "center",*/}
            {/*    }}*/}
            {/*    footer={null} // Xóa các nút OK và Cancel*/}
            {/*>*/}
            {/*    <div style={{width: "100%", textAlign: "center"}}>*/}
            {/*        <BidForm/>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            <Modal
                title={isRegistered ? "Đặt Giá Thầu" : "Tham Gia Đấu Giá"}
                open={isModalOpen}
                onCancel={handleCancel}
                centered
                footer={null}
            >
                {isRegistered ? (
                    <div style={{width: "100%", textAlign: "center"}}>
                        <BidForm dataItem={dataItem}/>
                    </div>
                ) : (
                    <Spin spinning={isLoadingAuctionRegister} tip="Loading...">
                        <form>
                            <div className="mt-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="agreement"
                                        className="h-5 w-5"
                                    />
                                    <span className="text-sm leading-5 text-gray-700">
                                    Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                                </span>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-200 focus:shadow-outline-indigo active:bg-indigo-200 transition duration-150 ease-in-out"
                                    onClick={handleSubmitAuctionRegister} // Define this function to handle registration
                                >
                                    ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                                </button>
                                <Button
                                    onClick={handleCancel}
                                    className="mt-4 w-full text-gray-600 hover:text-gray-800"
                                >
                                    Đóng
                                </Button>
                            </div>
                        </form>
                    </Spin>
                )}
            </Modal>

            <Modal
                title="TermsOfDelivery"
                open={isTermsOfDelivery}
                onOk={handleOkTermsOfDelivery}
                onCancel={handleCancelTermsOfDelivery}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            {isSuccessItemDt && dataItem && (
                <div className="mt-4 flex items-center gap-[50px] self-stretch px-[22px] md:flex-col sm:px-5">
                    <div className="flex flex-1 items-start justify-end w-full md:flex-col md:self-stretch">
                        <ImageGallery
                            items={images}
                            showFullscreenButton={true}
                            showPlayButton={true}
                            showThumbnails={true}
                            thumbnailPosition="left"
                            lazyLoad={true}
                            autoPlay={true}
                            slideInterval={3000}
                            showBullets={true}
                            onSlide={(currentIndex) => console.log(`Slide hiện tại: ${currentIndex}`)}
                            additionalClass="w-full h-auto"
                        />
                    </div>

                    <div
                        className="flex w-[34%] flex-col items-center rounded-md border border-solid border-gray-200 bg-bg-white px-[22px] py-[30px] shadow-sm md:w-full sm:p-5">
                        <div className="ml-1.5 mr-4 flex flex-col gap-[18px] self-stretch md:mx-0">
                            {/* <div className="flex items-center justify-center">
                                <Heading
                                    size="headinglg"
                                    as="h1"
                                    className="text-[15px] font-bold uppercase text-blue_gray-900_01"
                                >
                                    Nike
                                </Heading>
                                <div className="ml-2.5 h-[20px] w-px bg-gray-200" />
                                <div className="flex flex-1 items-start gap-2.5 px-2.5">
                                    <Rate disabled defaultValue={2} />
                                    <Text
                                        as="p"
                                        className="self-center text-[14px] font-normal text-blue_gray-900_01"
                                    >
                                        3,014 Đánh giá shop
                                    </Text>
                                </div>
                            </div> */}
                            <Heading
                                size="text4xl"
                                as="h2"
                                className="text-[22px] font-medium leading-[27px] text-blue_gray-900_01"
                            >
                                {dataItem.itemName}{" "}
                            </Heading>
                            <div className="h-px bg-gray-200"/>
                        </div>
                        <Heading
                            size="text3xl"
                            as="h3"
                            className="ml-1.5 mt-[26px] flex self-start font-bevietnampro text-[20px] font-medium text-blue_gray-900_01 md:ml-0"
                        >
                            <span className="font-bold">Giá khởi điểm:</span>
                            <span>&nbsp;{formatPrice(dataItem.auction.start_price)}</span>

                        </Heading>
                        <Heading
                            size="text3xl"
                            as="h4"
                            className="ml-1.5 mt-8 flex self-start font-bevietnampro text-[20px] font-medium text-blue_gray-900_01 md:ml-0 md:text-[20px] sm:text-[20px]"
                            style={{
                                maxWidth: "100%", // Đảm bảo nó không tràn ra ngoài khung
                                whiteSpace: "nowrap", // Không cho phép nội dung xuống dòng
                                overflow: "hidden", // Ẩn nội dung thừa (nếu có)
                                textOverflow: "ellipsis", // Thêm dấu "..." nếu cần thiết
                                fontSize: "clamp(12px, 3vw, 20px)", // Thu nhỏ font size khi khung bị thu hẹp
                            }}
                        >
                            <span className="font-bold">Giá đấu hiện tại:</span>
                            <span>&nbsp;{winningBid?.data?.bidAmount ? formatPrice(winningBid.data.bidAmount) : "Chưa có giá đấu"}</span>

                        </Heading>

                        {/*<div className="mx-1.5 mt-4 flex flex-col items-start gap-3 self-stretch md:mx-0">*/}
                        {/*    <Text*/}
                        {/*        as="p"*/}
                        {/*        className="font-bevietnampro text-[14px] font-normal text-blue_gray-900_01"*/}
                        {/*    >*/}
                        {/*        <span className="font-medium">Màu sắc:</span>*/}
                        {/*        <span>&nbsp;Xám</span>*/}
                        {/*    </Text>*/}
                        {/*    <Img*/}
                        {/*        src="images/img_inner.svg"*/}
                        {/*        alt="Color Image"*/}
                        {/*        className="h-[26px] w-[52%] object-contain"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <Text
                            as="p"
                            className="ml-1.5 mt-5 self-start font-bevietnampro text-[14px] font-normal text-blue_gray-900_01 md:ml-0"
                        >
                            <span className="font-bold">Danh mục:</span>
                            <span>&nbsp;{dataItem.scId.sub_category}</span>
                        </Text>
                        <Text
                            size="textmd"
                            as="p"
                            className="mt-[22px] text-[11px] font-normal text-gray-900_01 self-stretch"
                        >
                            {/*{renderCountdown()}*/}
                            <Countdown
                                value={new Date(`${dataItem.auction?.endDate}T${dataItem.auction?.end_time}`).getTime()}
                                format="D Ngày H giờ m phút s giây"
                                valueStyle={{fontWeight: "bolder", fontSize: "15px", color: "green"}}
                            />

                        </Text>


                        {/*<Text*/}
                        {/*    size="textmd"*/}
                        {/*    as="p"*/}
                        {/*    className="mt-[22px] text-[11px] font-normal text-gray-900_01 self-stretch"*/}
                        {/*>*/}
                        {/*    <span className="font-bold">Thời gian phiên đấu giá:</span>{" "}*/}
                        {/*    2015-09-01 09:12:11*/}
                        {/*</Text>*/}
                        <div className="ml-1.5 mt-[18px] flex flex-col gap-3 self-stretch md:ml-0">

                            <a href="/ListOfBuyerBids">
                                <ButtonDH
                                    color="green_50"
                                    size="xl"
                                    className="gap-[34px] self-stretch rounded-[24px] border border-solid border-green-a700 px-[33px] sm:px-5 w-full"
                                >
                                    Danh sách những người đang đấu giá
                                </ButtonDH>
                            </a>

                            <ButtonDH
                                onClick={showModal}
                                color=""
                                size="xl"
                                className="self-stretch rounded-[26px] border border-solid border-green-700 px-[33px] !text-gray-100_01 sm:px-5 transition-colors duration-300 hover:bg-green-500 hover:text-white"
                            >
                                {isRegistered ? "Đặt Giá Thầu" : "Tham Gia Đấu Giá"}
                            </ButtonDH>

                        </div>

                        <Heading
                            size="headingmd"
                            as="h5"
                            className="ml-1.5 mt-5 self-start text-[14px] font-bold text-blue_gray-900_01 md:ml-0"
                        >
                            Thanh toán :
                        </Heading>
                        <div className="mb-1.5 ml-1.5 mt-[22px] flex flex-col gap-5 self-stretch md:ml-0">
                            <Text
                                size="textmd"
                                as="p"
                                className="mt-[2px] text-[11px] font-normal text-gray-900_01 self-stretch"
                            >
                                <span className="font-bold">Trả Về:</span> 2015-09-01 09:12:11
                            </Text>
                            <div className="mr-1 flex items-center bg-bg-white md:mr-0">
                                <Img
                                    src="/images/img_image_125.png"
                                    alt="Payment Icon 1"
                                    className="h-[10px] w-[18%] object-contain"
                                />
                                <Img
                                    src="/images/img_paypal.png"
                                    alt="Payment Icon 2"
                                    className="ml-5 h-[10px] w-[18%] object-contain"
                                />
                                <Img
                                    src="/images/img_images.png"
                                    alt="Payment Icon 3"
                                    className="ml-5 h-[28px] w-[16%] object-contain"
                                />
                            </div>
                            <Text
                                size="textmd"
                                as="p"
                                className="mt-[2px] text-[11px] font-normal text-gray-900_01 self-stretch"
                            >
                                <span className="font-bold">Phí Ship: </span> Phí vận chuyển có
                                thể thay đổi
                                <button
                                    type="button"
                                    onClick={showTermsOfDelivery}
                                    className="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:text-green-500 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                >
                                    Info
                                </button>
                            </Text>
                            <div className="mr-[25px] flex items-center bg-bg-white md:mr-0 ">
                                <div
                                    className="inline-flex flex items-center space-x-2 rounded-md shadow-sm"
                                    role="group"
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
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
                                        Profile
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 text-sm 
            font-medium text-gray-900 bg-white border-t border-b border-gray-200
            hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700
            focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white
            dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
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
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                                            />
                                        </svg>
                                        Settings
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
                                        Downloads
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}






























