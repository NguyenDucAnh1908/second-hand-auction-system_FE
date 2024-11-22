import {Helmet} from "react-helmet";
import React, {useState} from "react";
import {useSelector} from 'react-redux';
import {useCreateBidMutation} from "@/services/bid.service.js";
import {Text, ButtonDH, InputDH} from "./..";
import {message, Spin, theme} from "antd";
import {Button} from "@material-tailwind/react";

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [createBid, {isLoading, isSuccess, isError}] = useCreateBidMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createAuctionBid = await createBid({
                bidAmount: Number(maxBid),
                auctionId: selectedAuctionId
            }).unwrap();
            message.success(createAuctionBid?.message);
            setMaxBid("");
            isRefetchWinningBid();
            isRefetchHighestBid();
            isRefetchBidIf();
            cancelModel();
        } catch (error) {
            const errorMessage = error.data?.message
            message.warning(errorMessage)
        }
    };

    const handleBidChange = (event) => {
        const value = event.target.value;
        setMaxBid(value);
        setIsBidValid(parseFloat(value) >= 9.99);
    };

    const handleQuickBid = (bidValue) => {
        setMaxBid(bidValue);
        setIsBidValid(true);
        //handleSubmit(bidValue);
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
                <p className="mt-4 text-gray-600">Giá đặt tối thiểu: {bidIf?.data?.priceStep}</p>
                <p className="text-gray-500">(approx. US $10.89 + 692,442.82 VND shipping)</p>
                <p className="text-gray-500">{bidIf?.data?.qualityBid} Đang đấu • 3d 17h left</p>

                {/*<div className="flex gap-2 mt-6 justify-center">*/}
                {/*    <button className="bg-blue-500 text-white rounded-full px-4 py-2">200000 VND</button>*/}
                {/*    <button className="bg-blue-500 text-white rounded-full px-4 py-2">300000 VND</button>*/}
                {/*    <button className="bg-blue-500 text-white rounded-full px-4 py-2">400000 VND</button>*/}
                {/*</div>*/}
                <div className="flex gap-2 mt-6 justify-center">
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice1)}
                        className="bg-green-500  text-white rounded-full px-4 py-2"
                    >
                        {bidIf?.data?.minimumBidPrice1} VND
                    </Button>
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice2)}
                        className="bg-green-500 text-white rounded-full px-4 py-2"
                    >
                        {bidIf?.data?.minimumBidPrice2} VND
                    </Button>
                    <Button
                        onClick={() => handleQuickBid(bidIf?.data?.minimumBidPrice3)}
                        className="bg-green-500  text-white rounded-full px-4 py-2"
                    >
                        {bidIf?.data?.minimumBidPrice3} VND
                    </Button>
                </div>

                <div className="flex items-center mt-6">
                    <hr className="flex-grow border-gray-300"/>
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300"/>
                </div>

                <div className="mt-4">
                    <label className="block font-medium text-gray-700">Giá thầu tối đa của bạn</label>
                    <div className="flex mt-2">
                        <input
                            type="number"
                            placeholder="EUR"
                            value={maxBid}
                            onChange={handleBidChange}
                            className="border border-gray-300 rounded-l px-4 py-2 w-full"
                        />
                        <Button
                            className={`px-4 py-2 rounded-r ${isBidValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            disabled={!isBidValid || isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ? <Spin size="small"/> : "Đấu giá"}
                        </Button>
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
