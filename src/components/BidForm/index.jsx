import {Helmet} from "react-helmet";
import React, {useState} from "react";
import {useSelector} from 'react-redux';
import {useCreateBidMutation} from "@/services/bid.service.js";
import {Text, ButtonDH, InputDH} from "./..";
import {message, Spin} from "antd";

export default function BidForm({dataItem}) {
    // Kiểm tra dữ liệu phiên đấu giá
    if (!dataItem || !dataItem.auction) {
        return <div>Không có dữ liệu phiên đấu giá.</div>;
    }

    const selectedAuctionId = dataItem.auction.auction_id;
    //console.log("Selected Auction ID:", selectedAuctionId);
    const [maxBid, setMaxBid] = useState('');
    const [isBidValid, setIsBidValid] = useState(false);
    // State để lưu trữ giá thầu nhập vào
    const [bidAmount, setBidAmount] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [createBid, {isLoading, isSuccess, isError}] = useCreateBidMutation();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        // if (!bidAmount || isNaN(bidAmount)) {
        //   alert("Vui lòng nhập một giá hợp lệ."); // Kiểm tra giá nhập vào
        //   return;
        // }

        try {
            await createBid({bidAmount: Number(maxBid), auctionId: selectedAuctionId}).unwrap();
            alert("Đặt giá thầu thành công!");
            setMaxBid("");
            //message.success()
        } catch (error) {
            const errorMessage = error.data?.message
            message.warning(errorMessage)
            //console.error("Error occurred while placing bid:", error); // Log lỗi chi tiết
            // alert("Có lỗi xảy ra khi đặt giá thầu: " + error.message); // Hiển thị thông báo lỗi cụ thể
        }

        //console.log("Bid Amount:", bidAmount);
        //console.log("Selected Auction ID:", selectedAuctionId);

    };


    const handleBidChange = (event) => {
        const value = event.target.value;
        setMaxBid(value);
        setIsBidValid(parseFloat(value) >= 9.99);
    };
    return (
        <>
            <Helmet>
                <title>Bid Submission - Enter Your Best Offer</title>
                <meta
                    name="description"
                    content="Join the bidding war and secure your lead with a competitive bid."
                />
            </Helmet>

            {/*<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">*/}
            <div className="bg-white rounded-lg shadow-lg p-1 w-full max-w-md">
                {/*<div className="flex justify-between items-center">*/}
                {/*  <h2 className="text-2xl font-semibold">Place your bid</h2>*/}
                {/*  <button className="text-gray-400 hover:text-gray-600">×</button>*/}
                {/*        Hãy cân nhắc trả giá cao nhất mà bạn sẵn sàng trả. Chúng tôi sẽ trả giá vừa đủ để giữ bạn ở vị trí dẫn đầu.*/}
                {/*</div>*/}
                <p className="mt-4 text-gray-600">EUR 9.99 + EUR 25 shipping</p>
                <p className="text-gray-500">(approx. US $10.89 + 692,442.82 VND shipping)</p>
                <p className="text-gray-500">0 bids • 3d 17h left</p>

                <div className="flex gap-2 mt-6 justify-center">
                    <button className="bg-blue-500 text-white rounded-full px-4 py-2">Bid EUR 10</button>
                    <button className="bg-blue-500 text-white rounded-full px-4 py-2">Bid EUR 12</button>
                    <button className="bg-blue-500 text-white rounded-full px-4 py-2">Bid EUR 13</button>
                </div>

                <div className="flex items-center mt-6">
                    <hr className="flex-grow border-gray-300"/>
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300"/>
                </div>

                <div className="mt-4">
                    <label className="block font-medium text-gray-700">Your max bid</label>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            placeholder="EUR"
                            value={maxBid}
                            onChange={handleBidChange}
                            className="border border-gray-300 rounded-l px-4 py-2 w-full"
                        />
                        {/*<button*/}
                        {/*    className={`px-4 py-2 rounded-r ${isBidValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}*/}
                        {/*    disabled={!isBidValid}*/}
                        {/*    onClick={handleSubmit}*/}
                        {/*>*/}
                        {/*    Bid*/}
                        {/*</button>*/}
                        <button
                            className={`px-4 py-2 rounded-r ${isBidValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            disabled={!isBidValid || isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? <Spin size="small"/> : "Đấu giá"}
                        </button>
                    </div>
                    <p className="mt-2 text-gray-500">Enter EUR 9.99 or more.</p>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Hãy cân nhắc trả giá cao nhất mà bạn sẵn sàng trả. Chúng tôi sẽ trả giá vừa đủ để giữ bạn ở vị trí
                    dẫn đầu.
                </p>
            </div>
            {/*</div>*/}
        </>
    );
}
