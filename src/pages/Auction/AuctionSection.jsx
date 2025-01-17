import { ButtonDH, Heading, Img, Text } from "../../components";
import React, { useEffect, useState } from "react";
import { Checkbox, message, Modal, Spin, Statistic } from "antd";
import BidForm from "../../components/BidForm";
import SealedBidForm from "../../components/SealedBidForm";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import { useNavigate } from "react-router-dom";
import { useAuctionRegisterMutation, useGetCheckAuctionRegisterQuery } from "@/services/auctionRegistrations.service.js";
import { Button } from "@material-tailwind/react";
import { useCreateBidMutation, useGetBidInfoQuery } from "@/services/bid.service.js";
import { useUpdateStatusAuctionMutation ,useUpdateStatusAuction2Mutation } from "@/services/auction.service.js";
import { useGetListRegisterUserQuery } from "../../services/auctionRegistrations.service";
import Pagination from "../../components/PaginationChanh";
import { useFetchUserAddresses } from "../Address/hook/useFetchUserAddresses";
import axios from "axios";
import { FaShippingFast } from 'react-icons/fa';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AuctionSection(
    {
        dataItem,
        isSuccessItemDt,
        isRefetch,
        winningBid,
        isRefetchWinningBid,
        isLoggedIn,
        bidAmount,
        highestBid,
        isRefetchHighestBid
    }
) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Biến trạng thái để vô hiệu hóa nút
    const [isLoading, setIsLoading] = useState(false); // Biến trạng thái để quản lý loading spinner
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [selectedAuctionId, setSelectedAuctionId] = useState(dataItem.auction.auction_id);
    const [showMessage, setShowMessage] = useState(false);


    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const auctionEndDate = dataItem.auction?.endDate || null;
    const auctionEndTime = dataItem.auction?.end_time || null;
    const auctionStartDate = dataItem.auction?.startDate || null;
    const auctionStartTime = dataItem.auction?.start_time || null;
    const startDateTime = new Date(`${auctionStartDate}T${auctionStartTime}`).getTime();
    const endDateTime = new Date(`${auctionEndDate}T${auctionEndTime}`).getTime();


    



    const auctionTypeName = dataItem.auctionType?.auction_typeName;
    const nowVN = new Date().getTime();
    const now = new Date(); // Cộng 7 giờ
    

    const [isAuctionStarted, setIsAuctionStarted] = useState(false);
    useEffect(() => {
        setIsAuctionStarted(now >= startDateTime);
    }, [now, startDateTime]);
    const idAuction = dataItem?.auction.auction_id;

    const isAuctionEnded = endDateTime < now; // Kiểm tra nếu thời gian kết thúc đã qua


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

    //createBid theo gia mua ngay
    const [createBid] = useCreateBidMutation();
    const [updateTime] = useUpdateStatusAuctionMutation();
    const [updateTime2] = useUpdateStatusAuction2Mutation();

    const {
        data: checkRegister,
        isLoading: isLoadingCheckRegister,
        isError: isErrorCheckRegister,
        error: errorCheckRegister,
        refetch: isRefetchCheckRegister,
    } = useGetCheckAuctionRegisterQuery(selectedAuctionId ? { auctionId: selectedAuctionId } : null, {
        skip: !selectedAuctionId,
    });
    const isRegistered = checkRegister?.auctionId === selectedAuctionId && checkRegister?.statusRegistration === true
    // *
    const [AuctionRegister, { isLoading: isLoadingAuctionRegister, error }] = useAuctionRegisterMutation();
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
            handleCancel();
        } catch (error) {

            // Kiểm tra và xử lý lỗi chi tiết
            if (error?.data?.message) {
                message.error(error.data.message); // Hiển thị lỗi từ backend
            } else if (error?.error) {
                message.error(error.error); // Hiển thị lỗi chung từ RTK Query
            } else {
                message.error("An unknown error occurred. Please try again!");
            }
        }
    };

    const {
        data: bidInfo,
        error: fetchBidInfo,
        isLoading: loadingBidInfo,
        refetch: isRefetchBidInfo
    } = useGetBidInfoQuery(dataItem?.auction?.auction_id);


    const { Countdown } = Statistic;
    const showModal = () => {
        if (!isLoggedIn) {
            message.warning("Bạn cần đăng nhập để tham gia đấu giá!");
            navigate("/login");
        } else {
            setIsModalOpen(true);
            isRefetchBidInfo()
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsSealedBidModalOpen(false);

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

    const handleCreateOrder = async (auction_id) => {
        if (!dataItem?.auction?.buy_now_price) {
            message.error("Giá mua ngay không hợp lệ!", 3);
            return;
        }
        if (!auction_id) {
            message.error("ID phiên đấu giá không hợp lệ!", 3);
            return;
        }
        try {
            const response = await createBid({
                auctionId: auction_id,
                bidAmount: dataItem?.auction?.buy_now_price
            }).unwrap();
            if (response.status === 'OK') {
                message.success("Đặt giá mua ngay thành công!", 3);
            } else {
                const errorMessage = response.message || response.error || "Đã xảy ra lỗi, vui lòng thử lại.";
                message.error(errorMessage, "Lỗi");
            }
            isRefetch();
        } catch (error) {
            const errorMessage = error?.data?.message || "Đã xảy ra lỗi không xác định, vui lòng thử lại.";
            message.destroy()
            message.error(errorMessage, 3);
        }
    };

    const [isSealedBidModalOpen, setIsSealedBidModalOpen] = useState(false);

    const showSealedBidModal = () => setIsSealedBidModalOpen(true);
    const handleSealedBidModalCancel = () => setIsSealedBidModalOpen(false);

    const showModal2 = () => {
        setIsSealedBidModalOpen(true);
    };

    const handleAuctionEnd = async () => {
        try {
            const response = await updateTime({
                auctionId: dataItem.auction?.auction_id,
            }).unwrap();
        } catch (error) {
            message.error(error.data.message(), "Lỗi");
        }
    };

    const handleAuctionClose = async () => {
        try {
            const response = await updateTime2({
                auctionId: dataItem.auction?.auction_id,
            }).unwrap();
        } catch (error) {
            message.error(error.data.message(), "Lỗi");
        }
    };

    const handleSealedBidRegister = async (e) => {
        e.preventDefault();
        try {
            const sealedBidData = {
                auction_id: dataItem?.auction?.auction_id,
            };

            // Thêm logic gọi backend thông qua API
            const response = await SealedBidRegister(sealedBidData).unwrap();

            // Thêm reload/refresh sau khi đặt giá thầu thành công
            isRefetch();
            isRefetchCheckRegister();

            message.success(response?.message || "Sealed bid successfully!");
            handleSealedBidModalCancel();

            // Cập nhật trạng thái là đã thành công
            setIsSealedBidSuccess(true);
        } catch (error) {

            // Xử lý lỗi backend
            if (error?.data?.message) {
                message.error(error.data.message);
            } else if (error?.error) {
                message.error(error.error);
            } else {
                message.error("An unknown error occurred. Please try again!");
            }
        }
    };


    const [paging, setPaging] = useState({ page: 0, limit: 10 });


    const {
        data: registeredUsers,
        isLoading: isLoadingRegisteredUsers,
        isError: isErrorRegisteredUsers,
        error: errorRegisteredUsers,
    } = useGetListRegisterUserQuery({ auctionId: dataItem.auction.auction_id, paging });

    const validRegisteredUsers = Array.isArray(registeredUsers?.list) ? registeredUsers.list : [];

    const totalPages = registeredUsers?.totalPages || 0;

    const [isRegisteredUsersModalOpen, setIsRegisteredUsersModalOpen] = useState(false); // Sử dụng biến riêng cho modal này
    const showRegisteredUsersModal = () => {

        setIsRegisteredUsersModalOpen(true); // Mở modal

    };

    // Hàm đóng modal
    const handleCloseRegisteredUsersModal = () => {
        setIsRegisteredUsersModalOpen(false); // Đóng modal
    };


    // Hàm xử lý chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) { // Đảm bảo trang hợp lệ
            setPaging((prev) => ({ ...prev, page: newPage }));
        }
    };


    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };


    // phần tính phí ship

    const { addresses, isRefetchAddress } = useFetchUserAddresses();
    const [shippingFee, setShippingFee] = useState(null);

    useEffect(() => {
        if (!addresses || addresses.length === 0) return;

        // Tìm địa chỉ có `status = true`
        const defaultAddress = addresses.find((address) => address.status === true);

        if (defaultAddress) {
            const districtCode = defaultAddress.district_code;
            const wardCode = defaultAddress.ward_code

            // Call API tính phí
            calculateShippingFee(districtCode, wardCode);

        }
    }, [addresses]);

    const calculateShippingFee = async (districtCode, wardCode) => {
        try {
            const response = await axios.post(
                'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
                {
                    from_district_id: 1449, // Quận Thủ Đức
                    service_id: 53320,
                    to_district_id: parseInt(districtCode, 10),
                    to_ward_code: wardCode.toString(),
                    weight: 2000, // 2kg
                    length: 30,
                    width: 20,
                    height: 10,
                    insurance_value: 500000, // 500k giá trị hàng hóa
                }, // <-- Đảm bảo đóng ngoặc ở đây
                {
                    headers: {
                        Token: 'd4067185-ae9f-11ee-8868-1648922bf010', // Key là 'Token'
                        'Content-Type': 'application/json',
                    }, // <-- Đóng ngoặc đúng ở đây
                } // <-- Đóng ngoặc tổng thể cho hàm axios.post
            );

            setShippingFee(response?.data?.data?.total);
        } catch (error) {
            console.error('Error calculating shipping fee:', error);
            setShippingFee('Failed to fetch shipping fee');
        }
    };




    return (
        <>

            {/* Modal hiển thị danh sách người dùng đã đăng ký */}
            <Modal
                title="Danh sách người dùng đã đăng ký và tiền cọc"
                visible={isRegisteredUsersModalOpen}
                onCancel={handleCloseRegisteredUsersModal}
                footer={null}
                width={700}  // Điều chỉnh độ rộng của modal nhỏ hơn
                style={{ maxHeight: "70vh", overflowY: "auto" }} // Giới hạn chiều cao tối đa và cho phép cuộn
            >
                <Spin spinning={isLoadingRegisteredUsers}>
                    {/* Kiểm tra nếu có người dùng */}
                    {validRegisteredUsers?.length > 0 ? (
                        <div className="space-y-4">
                            {validRegisteredUsers.map((user, index) => (
                                <div key={user.ar_id} className="p-3 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
                                    <span className="font-semibold text-sm text-gray-800">{index + 1}. {user.user_name}</span>
                                    <div className="text-xs text-gray-600">
                                        <p>{formatDate(user.created_date)}</p>
                                        <p className="font-semibold text-blue-600">{formatCurrency(user.deposite_amount)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Không có người dùng nào được đăng ký.</p>
                    )}
                </Spin>

                {/* Nếu có lỗi xảy ra */}
                {isErrorRegisteredUsers && (
                    <p className="text-red-500 text-center mt-4">Có lỗi xảy ra khi tải danh sách người dùng!</p>
                )}

                <Pagination
                    currentPage={paging.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Modal>


            <Modal
                title={isRegistered ? "Đặt Giá Thầu" : "Tham Gia Đấu Giá"}
                open={isModalOpen}
                onCancel={handleCancel}
                centered
                footer={null}
            >
                {isRegistered ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <BidForm dataItem={dataItem} cancelModel={handleCancel}
                            isRefetchWinningBid={isRefetchWinningBid}
                            isRefetchHighestBid={isRefetchHighestBid}
                            bidIf={bidInfo}
                            isRefetchBidIf={isRefetchBidInfo}
                        />
                    </div>

                ) : (
                    <Spin spinning={isLoadingAuctionRegister} tip="Loading...">
                        <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <span className="text-base font-semibold text-gray-800">
                                            Chi phí cọc cho phiên đấu:
                                        </span>
                                        <div className="text-lg font-bold text-red-600 mt-2">
                                            {formatPrice((dataItem?.auction?.buy_now_price * dataItem?.auction?.percent_deposit) / 100)}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="agreement" className="h-5 w-5 text-green-600" />
                                        <span className="text-sm leading-6 text-gray-700">
                                            Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Nút đăng ký tham gia */}
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 text-base font-semibold text-white bg-gradient-to-r from-[#45ADA8] to-[#9DE0AD] rounded-lg  shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                                    onClick={handleSubmitAuctionRegister}
                                >
                                    ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                                </button>

                                {/* Nút đóng */}
                                <Button
                                    onClick={handleCancel}
                                    className="w-full py-3 px-6 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                >
                                    Đóng
                                </Button>
                            </div>
                        </form>
                    </Spin>
                )}
            </Modal>


            <Modal
                title={isRegistered ? "Đặt Giá Thầu Đấu Giá Kín" : "Tham Gia Đấu Giá Kín"}
                open={isSealedBidModalOpen}
                onCancel={handleSealedBidModalCancel}
                centered
                footer={null}
            >
                {isRegistered ? (
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <SealedBidForm
                            dataItem={dataItem}
                            cancelModel={handleCancel}
                            isRefetchWinningBid={isRefetchWinningBid}
                            isRefetchHighestBid={isRefetchHighestBid}
                            bidIf={bidInfo}
                            isRefetchBidIf={isRefetchBidInfo}
                            onSuccess={handleSealedBidModalCancel}
                        />
                    </div>
                ) : (
                    <Spin spinning={isLoadingAuctionRegister} tip="Loading...">
                        <form className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <span className="text-base font-semibold text-gray-800">Chi phí cọc cho phiên đấu:</span>
                                        <div className="text-lg font-bold text-red-600 mt-2">
                                            {/*{formatPrice(dataItem?.auction.start_price * 0.1)}*/}
                                            {formatPrice((dataItem?.auction?.buy_now_price * dataItem?.auction?.percent_deposit) / 100)}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Checkbox id="agreement" className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm leading-6 text-gray-700">
                                            Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                                    onClick={handleSubmitAuctionRegister}
                                >
                                    ĐĂNG KÝ THAM GIA ĐẤU GIÁ KÍN
                                </button>

                                <Button
                                    onClick={handleSealedBidModalCancel}
                                    className="w-full py-3 px-6 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
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
            </Modal>


            {isSuccessItemDt && dataItem && (
                <div className="mt-4 flex items-center gap-[50px] px-[22px] md:flex-col sm:px-5">
                    <div className="flex flex-1 pt-0 items-start justify-end w-full md:flex-col md:self-stretch">
                        <div className="w-full " style={{ height: '960px', position: 'relative', }}>
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
                                additionalClass="w-full h-full"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '2px',  // Chiều cao linh hoạt, có thể điều chỉnh theo nhu cầu
                                    marginTop: 0,
                                }}
                            />
                        </div>

                    </div>

                    <div
                        className="flex w-[34%] flex-col items-center rounded-md border border-solid border-gray-200 bg-bg-white px-[22px] py-[30px] shadow-sm md:w-full sm:p-5">
                        <div className="ml-1.5 mr-4 flex flex-col gap-[18px] self-stretch md:mx-0">
                            <Heading
                                size="text4xl"
                                as="h2"
                                className="text-[22px] font-medium leading-[27px] text-blue_gray-900_01"
                            >
                                {dataItem.itemName}{" "}
                            </Heading>
                            <div className="h-px bg-gray-200" />
                        </div>
                        <Heading
                            size="text3xl"
                            as="h3"
                            className="ml-1.5 mt-[26px] flex self-start font-bevietnampro text-[20px] font-medium text-blue_gray-900_01 md:ml-0"
                        >
                            <span className="font-bold">Giá khởi điểm:</span>
                            <span>&nbsp;{formatPrice(dataItem.auction.start_price)}</span>
                        </Heading>
                        {now >= startDateTime && bidAmount > 0 && dataItem?.auctionType?.act_id !== 3 && (
                            <Heading
                                size="text3xl"
                                as="h4"
                                className="ml-1.5 mt-8 flex self-start font-bevietnampro text-[20px] font-medium text-blue_gray-900_01 md:ml-0 md:text-[20px] sm:text-[20px]"
                                style={{
                                    maxWidth: "100%",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontSize: "clamp(12px, 3vw, 20px)",
                                }}
                            >
                                <span className="font-bold">Giá đấu hiện tại:</span>
                                <span>&nbsp;{bidAmount ? formatPrice(bidAmount) : "Chưa có giá đấu"}</span>
                            </Heading>
                        )}


                        <Text
                            as="p"
                            className="ml-2 mt-8 self-start font-bevietnampro text-base font-normal text-blue-gray-900 md:ml-0"
                        >
                            <span className="font-bold text-lg">Danh mục:</span>
                            <span className="text-lg">&nbsp;{dataItem.scId.sub_category}</span>
                        </Text>


                        <Text
                            size="textmd"
                            as="p"
                            className="mt-6 ml-2 text-sm font-normal text-gray-900_01 self-stretch leading-relaxed tracking-wide"
                        >
                            {now > endDateTime ? (
                                <div>
                                    <span className="font-semibold text-red-600">Phiên đấu giá đã kết thúc!</span>
                                    <p className="mt-2 text-gray-700">
                                        Kết thúc vào lúc: <strong>{formatDate(endDateTime)}</strong>
                                    </p>
                                    <a href={`/ListOfBuyerBids/${idAuction}`}>
                                        <ButtonDH
                                            color="green_50"
                                            size="xl"
                                            className="gap-[34px] self-stretch rounded-[24px] border border-solid border-green-a700 px-[33px] sm:px-5 w-full"
                                        >
                                            Kết quả đấu giá
                                        </ButtonDH>
                                    </a>
                                </div>


                            ) : isAuctionStarted ? (
                                <div>
                                    <span className="font-semibold">Thời gian kết thúc đấu giá sau: </span>
                                    <Countdown
                                        value={endDateTime}
                                        format="D Ngày H giờ m phút s giây"
                                        valueStyle={{
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            color: "green",
                                            textTransform: "uppercase",
                                        }}
                                        onFinish={handleAuctionClose}
                                    />

                                </div>
                            ) : (
                                <div>
                                    <span className="font-semibold">Thời gian bắt đầu đấu giá sau: </span>
                                    <Countdown
                                        value={startDateTime}
                                        format="D Ngày H giờ m phút s giây"
                                        valueStyle={{
                                            fontWeight: "bolder",
                                            fontSize: "18px",
                                            color: "#CD853F",
                                            textTransform: "uppercase",
                                        }}
                                        onFinish={handleAuctionEnd} // Gọi API khi Countdown kết thúc

                                    />
                                </div>
                            )}
                        </Text>


                        <div className="ml-1.5 mt-[18px] flex flex-col gap-3 self-stretch md:ml-0">
                            {!isAuctionEnded && (
                                <>
                                    {/* Nút cho đấu giá truyền thống */}
                                    {dataItem.auctionType.act_id === 1 && (
                                        <>
                                            {/* Hiển thị nút nếu chưa đến thời gian bắt đầu */}
                                            {now < startDateTime && (
                                                <ButtonDH
                                                    onClick={showModal} // Hiển thị modal khi nhấn
                                                    color=""
                                                    size="xl"
                                                    className={`self-stretch rounded-[26px] border border-solid border-green-700 px-[33px] !text-gray-100_01 sm:px-5 transition-colors duration-300 ${isRegistered ? "bg-gray-500 cursor-not-allowed" : "hover:bg-green-500 hover:text-white"}`}
                                                    disabled={isRegistered}
                                                >
                                                    {isRegistered ? "Bạn Đã Đăng Ký Tham Gia" : "Tham Gia Đấu Giá"}
                                                </ButtonDH>
                                            )}

                                            {/* Hiển thị nút khi đang trong khoảng thời gian đấu giá */}
                                            {now >= startDateTime && now <= endDateTime && (
                                                <>
                                                    <a href={`/ListOfBuyerBids/${idAuction}`}>
                                                        <ButtonDH
                                                            color="green_50"
                                                            size="xl"
                                                            className="gap-[34px] self-stretch rounded-[24px] border border-solid border-green-a700 px-[33px] sm:px-5 w-full"
                                                        >
                                                            Lịch sử đặt giá thầu
                                                        </ButtonDH>
                                                    </a>

                                                    {isRegistered && (
                                                        <ButtonDH
                                                            onClick={showModal} // Hiển thị modal khi nhấn
                                                            color=""
                                                            size="xl"
                                                            className="self-stretch rounded-[26px] border border-solid border-green-700 px-[33px] !text-gray-100_01 sm:px-5 transition-colors duration-300 hover:bg-green-500 hover:text-white"
                                                        >
                                                            Đặt Giá Thầu
                                                        </ButtonDH>
                                                    )}
                                                </>
                                            )}

                                        </>
                                    )}

                                    {/* Nút cho đấu giá kín */}
                                    {dataItem.auctionType.act_id === 3 && (
                                        <>
                                            {/* Hiển thị nút nếu chưa đến thời gian bắt đầu */}
                                            {now < startDateTime && (
                                                <ButtonDH
                                                    onClick={showSealedBidModal} // Hiển thị modal riêng khi nhấn
                                                    color=""
                                                    size="xl"
                                                    className={`self-stretch rounded-[26px] border border-solid border-blue-700 px-[33px] !text-gray-100_01 sm:px-5 transition-colors duration-300 ${isRegistered ? "bg-gray-500 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}`}
                                                    disabled={isRegistered}
                                                >
                                                    {isRegistered ? "Bạn Đã Đăng Ký Tham Gia" : "Tham Gia Đấu Giá Kín"}
                                                </ButtonDH>
                                            )}

                                            {now >= startDateTime && now <= endDateTime && (
                                                <>
                                                    {dataItem.checkBid != null && dataItem.checkBid !== null ? (
                                                        <div className="text-blue-600 font-semibold">
                                                            Bạn đã đặt giá thầu kín với
                                                            giá {formatPrice(dataItem.checkBid)}
                                                        </div>
                                                    ) : (
                                                        isRegistered && (
                                                            <ButtonDH
                                                                onClick={showModal2}
                                                                color=""
                                                                size="xl"
                                                                className="self-stretch rounded-[26px] border border-solid border-green-700 px-[33px] !text-gray-100_01 sm:px-5 bg-green-400 transition-all duration-300 ease-in-out hover:bg-green-600 hover:text-white"
                                                            >
                                                                Đặt Giá Thầu Đấu Giá Kín
                                                            </ButtonDH>
                                                        )
                                                    )}
                                                </>
                                            )}


                                        </>
                                    )}
                                </>
                            )}


                        </div>


                        {!isAuctionEnded && (
                            <>

                                {/* Hiển thị nếu chưa đến thời gian bắt đầu */}
                                {now < startDateTime && (
                                    <div className="p-4 border rounded-lg bg-white shadow-md flex items-center gap-2 mt-4 font-bevietnampro text-xs text-gray-700 w-full md:ml-0">
                                        <i className="fas fa-user-check text-blue-600 text-lg"></i>
                                        <p className="font-semibold text-sm text-gray-900">
                                            Hiện có {dataItem.numberParticipant} người đã đăng ký tham gia
                                            <span
                                                className="text-blue-600 cursor-pointer underline ml-2"
                                                onClick={showRegisteredUsersModal} // Khi nhấn vào sẽ mở modal
                                            >
                                                Xem thông tin
                                            </span>
                                        </p>
                                    </div>

                                )}
                                {/* Hiển thị khi đang trong khoảng thời gian đấu giá */}
                                {now >= startDateTime && now <= endDateTime && (
                                    <>
                                        <div className="p-4 border rounded-lg bg-white shadow-md flex items-center gap-2 mt-4 font-bevietnampro text-xs text-gray-700 w-full md:ml-0">
                                            <i className="fas fa-user-check text-blue-600 text-lg"></i>
                                            <p className="font-semibold text-sm text-gray-900">
                                                Hiện có {dataItem.numberParticipant} người đã đăng ký tham gia
                                                <span
                                                    className="text-blue-600 cursor-pointer underline ml-2"
                                                    onClick={showRegisteredUsersModal} // Khi nhấn vào sẽ mở modal
                                                >
                                                    Xem thông tin
                                                </span>
                                            </p>
                                        </div>
                                    </>
                                )}


                            </>
                        )}


                        <Heading
                            size="headingmd"
                            as="h5"
                            className="ml-2 mt-6 self-start text-base font-semibold text-blue-gray-900 md:ml-0"
                        >
                            Thanh toán :
                        </Heading>
                        <div className="mb-4 ml-2 mt-4 flex flex-col gap-4 self-stretch md:ml-0">
                            {/* <Text
                                size="textmd"
                                as="p"
                                className="text-sm font-normal text-gray-700"
                            >
                                Hệ thống có hỗ trợ thanh toán:
                            </Text> */}
                            <div className="flex items-center justify-center gap-8 bg-white p-4 rounded-lg shadow-md">
                                <Img
                                    src="https://khoahocsinhvien.com/wp-content/uploads/2021/11/Logo-VNPAY-QR.png"
                                    alt="VNPAY"
                                    className="h-[60px] w-[20%] object-contain"
                                />
                                {/* <Img
                                    src="https://smadeandsmight.com/wp-content/uploads/2022/04/full-lc-logo-color.png"
                                    alt="Logo LC"
                                    className="h-[60px] w-[20%] object-contain"
                                /> */}
                                <Img
                                    src="https://newsroom.paypal-corp.com/image/pp_h_rgb_logo_tn.jpg"
                                    alt="PayPal"
                                    className="h-[60px] w-[20%] object-contain"
                                />
                            </div>
                            {/* ẩn nút khi đấu giá kết thúc */}
                            {!isAuctionEnded && (
                                <>
                                    <Heading
                                        size="headingmd"
                                        as="h5"
                                        className="ml-2 mt-6 self-start text-base font-semibold text-blue-gray-900 md:ml-0"
                                    >
                                        Giá mua ngay
                                    </Heading>
                                    <ButtonDH
                                        onClick={() => handleCreateOrder(dataItem?.auction?.auction_id)}
                                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                        disabled={isButtonDisabled}
                                        loading={isLoading}
                                    >
                                        Giá mua ngay: {formatPrice(dataItem?.auction?.buy_now_price)}
                                    </ButtonDH>

                                </>
                            )}

                            <Heading
                                size="headingmd"
                                as="h5"
                                className="ml-2 mt-6 self-start text-base font-semibold text-blue-gray-900 md:ml-0"
                            >
                                Thông tin giao hàng
                            </Heading>

                            <Text
                                className="ml-2 mt-4 text-base font-normal text-blue-gray-900 leading-relaxed tracking-wide"
                            >
                                Thông tin giao hàng: Người bán và người đấu giá có thể thỏa thuận và trao đổi với nhau
                                về thông tin giao hàng.
                            </Text>

                            {/* Hiển thị phí ship */}
                            <div className="ml-2 mt-6 flex items-center space-x-2">
                                <FaShippingFast size={20} color="blue" /> {/* Biểu tượng vận chuyển */}
                                <Text className="text-base font-semibold text-blue-gray-900">
                                    Phí ship dự tính: {shippingFee ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee) : 'Đang tính...'}
                                </Text>
                            </div>

                            <Text
                                size="textmd"
                                as="p"
                                className="mt-[2px] text-[11px] font-normal text-gray-900_01 self-stretch"
                            >
                                <button
                                    type="button"
                                    onClick={showTermsOfDelivery}
                                    className="inline-block rounded-full bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:text-green-500 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                >
                                    Info
                                </button>
                            </Text>
                            <div
                                className="mr-[25px] flex items-center bg-bg-white md:mr-0 space-x-4 whitespace-nowrap">
                                <div
                                    className="inline-flex items-center space-x-4 rounded-md shadow-sm w-full justify-center md:justify-start">
                                    {/* Thông tin người bán */}
                                    <a
                                        href="/SellerDetailPage"
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
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                                            />
                                        </svg>
                                        Thông tin người bán
                                    </a>

                                    {/* Cách thức đấu giá / Tham gia */}
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
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                                            />
                                        </svg>
                                        Cách thức tham gia
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

        </>
    );
}













