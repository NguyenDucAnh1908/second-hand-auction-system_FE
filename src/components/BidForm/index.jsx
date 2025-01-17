import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { useCreateBidMutation } from "@/services/bid.service.js";
import { message, Spin, theme } from "antd";
import { Button } from "@material-tailwind/react";


export default function BidForm(
    {
        dataItem,
        cancelModel,
        isRefetchWinningBid,
        bidIf,
        isRefetchBidIf,
        isRefetchHighestBid
    }
) {

    const selectedAuctionId = dataItem.auction.auction_id;
    const [maxBid, setMaxBid] = useState('');
    const [isBidValid, setIsBidValid] = useState(false);
    const [createBid, { isLoading }] = useCreateBidMutation();
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const createAuctionBid = await createBid({
    //             bidAmount: Number(maxBid),
    //             auctionId: selectedAuctionId
    //         }).unwrap();

    //         message.success(createAuctionBid?.message);
    //         setMaxBid("");
    //         isRefetchWinningBid();
    //         isRefetchHighestBid();
    //         isRefetchBidIf();
    //         cancelModel();
    //     } catch (error) {
    //         // Log chi tiết lỗi
    //         console.error("Error response:", error);

    //         // Xử lý lỗi chi tiết
    //         if (error.data?.status === 'BAD_REQUEST') {
    //             if (error.data?.message.includes('insufficient')) {
    //                 message.warning('Số dư ví của bạn không đủ để đặt giá. Vui lòng nạp thêm tiền.');
    //             } else {
    //                 message.warning(error.data?.message || 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.');
    //             }
    //         } else if (error.data?.message) {
    //             message.warning(error.data.message); // Hiển thị lỗi từ backend
    //         } else {
    //             message.warning('Đã xảy ra lỗi không xác định. Vui lòng thử lại!');
    //         }
    //     }

    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createAuctionBidResponse = await createBid({
                bidAmount: Number(maxBid),
                auctionId: selectedAuctionId
            }).unwrap();

            console.log('Response từ backend:', createAuctionBidResponse); // Debug dữ liệu từ backend

            if (createAuctionBidResponse?.message) {
                message.success(createAuctionBidResponse.message);
            } else {
                console.error('Backend không trả về message hoặc message không hợp lệ.');
                message.error('Không thể xử lý thông tin trả về.');
            }

            setMaxBid("");
            isRefetchWinningBid();
            isRefetchHighestBid();
            isRefetchBidIf();
            cancelModel();
        } catch (error) {
            console.error("Error response:", error);

            // Log lỗi đầy đủ nếu backend trả về lỗi
            if (error?.data) {
                console.error('Error data từ backend:', error.data);
                if (error.data?.status === 'BAD_REQUEST') {
                    if (error.data?.message.includes('insufficient')) {
                        message.warning('Số dư ví của bạn không đủ để đặt giá. Vui lòng nạp thêm tiền.');
                    } else {
                        message.warning(error.data?.message || 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại.');
                    }
                } else {
                    message.error(error.data?.message || 'Đã xảy ra lỗi không xác định.');
                }
            } else {
                message.error('Đã xảy ra lỗi không xác định.');
            }
        }
    };



    const handleBidChange = (event) => {
        const value = event.target.value.replace(/[^\d]/g, ''); // Loại bỏ ký tự không phải số
        setMaxBid(value);
        setIsBidValid(parseFloat(value) >= bidIf?.data?.priceStep);
    };

    const handleQuickBid = (bidValue) => {
        setMaxBid(bidValue);
        setIsBidValid(true);
    };

    return (
        <>
            <Helmet>
                <title>Đấu giá - Đặt giá tốt nhất</title>
                <meta
                    name="description"
                    content="Tham gia đấu giá để dành vị trí dẫn đầu với giá đấu cạnh tranh nhất."
                />
            </Helmet>

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <p className="mt-4 text-gray-600">Bước giá: {formatCurrency(bidIf?.data?.priceStep)} </p>
                <p className="text-gray-500">Số lượng giá thầu hiện tại: {bidIf?.data?.qualityBid} </p>

                <div className="flex gap-2 mt-6 justify-center">
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice1)}
                        className="bg-green-500 text-white rounded-full px-4 py-2"
                    >
                        {formatCurrency(bidIf?.data?.minimumBidPrice1)}
                    </Button>
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice2)}
                        className="bg-green-500 text-white rounded-full px-4 py-2"
                    >
                        {formatCurrency(bidIf?.data?.minimumBidPrice2)}
                    </Button>
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice3)}
                        className="bg-green-500 text-white rounded-full px-4 py-2"
                    >
                        {formatCurrency(bidIf?.data?.minimumBidPrice3)}
                    </Button>
                </div>

                <div className="flex items-center mt-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500">hoặc</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="mt-4">
                    <label className="block font-medium text-gray-700 text-center"> {/* Căn giữa label */}
                        Giá thầu tối đa của bạn
                    </label>
                    <div className="flex mt-2 space-x-2 items-center justify-center">
                        <input
                            type="text"
                            placeholder="Nhập giá thầu"
                            value={maxBid ? formatCurrency(maxBid) : ''}
                            onChange={handleBidChange}
                            className="border border-gray-300 rounded-l px-4 py-2 w-full sm:w-2/3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        />
                        <Button
                            className={`px-6 py-2 rounded-r transition-all duration-300 ease-in-out transform ${isBidValid
                                ? 'bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD] active:bg-green-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            disabled={!isBidValid || isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? <Spin size="large" /> : 'Đặt giá'}
                        </Button>
                    </div>

                    <p className="mt-2 text-gray-500 text-sm">
                        Bước giá phải lớn hơn hoặc bằng {formatCurrency(bidIf?.data?.priceStep)}.
                    </p>
                </div>




                <p className="mt-6 text-sm text-gray-500">
                    Hãy cân nhắc đặt giá cao nhất mà bạn sẵn sàng trả. Chúng tôi sẽ đảm bảo giữ bạn ở vị trí dẫn đầu với
                    mức giá tối ưu.
                </p>
            </div>
        </>
    );
}