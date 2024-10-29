import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useCreateBidMutation } from "@/services/bid.service.js";
import { Text, ButtonDH, InputDH } from "./..";

export default function BidForm({ dataItem }) {
  // Kiểm tra dữ liệu phiên đấu giá
  if (!dataItem || !dataItem.auction) {
    return <div>Không có dữ liệu phiên đấu giá.</div>;
  }

  const selectedAuctionId = dataItem.auction.auction_id;
  console.log("Selected Auction ID:", selectedAuctionId);

  // State để lưu trữ giá thầu nhập vào
  const [bidAmount, setBidAmount] = useState("");
  const [createBid, { isLoading, isSuccess, isError }] = useCreateBidMutation(); // Gọi hook tạo bid

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (!bidAmount || isNaN(bidAmount)) {
      alert("Vui lòng nhập một giá hợp lệ."); // Kiểm tra giá nhập vào
      return;
    }


    try {
      await createBid({ bidAmount: Number(bidAmount), auctionId: selectedAuctionId }).unwrap();
      alert("Đặt giá thầu thành công!");
      setBidAmount("");
    } catch (error) {
      console.error("Error occurred while placing bid:", error); // Log lỗi chi tiết
      alert("Có lỗi xảy ra khi đặt giá thầu: " + error.message); // Hiển thị thông báo lỗi cụ thể
    }

    console.log("Bid Amount:", bidAmount);
    console.log("Selected Auction ID:", selectedAuctionId);

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
      <div className="flex w-full justify-center bg-teal-50 px-5 py-20 md:p-5">
        <div className="flex w-full max-w-[400px] justify-center bg-white py-3.5 md:w-full md:px-3">
          <div className="flex flex-col items-start">
            <Text as="p" className="text-left text-[20px] font-bold text-deep_orange-a700">
              Nhập giá thầu của bạn
            </Text>
            <Text as="p" className="mt-5 text-left text-[14px] text-black-900">
              <span className="font-bold text-[18px]">Giá thầu hiện tại:</span>
              <br />
              Hãy cân nhắc trả giá cao nhất mà bạn sẵn sàng trả. Chúng tôi sẽ trả giá vừa đủ để giữ bạn ở vị trí dẫn đầu.
            </Text>
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex justify-between">
                {/* Các nút giá thầu nhanh */}
                <ButtonDH shape="round" className="w-full rounded-lg border px-[10px] bg-green-500">
                  300.000 VND
                </ButtonDH>
                <ButtonDH shape="round" className="ml-2 w-full rounded-lg border px-[10px] bg-green-500">
                  400.000 VND
                </ButtonDH>
                <ButtonDH shape="round" className="ml-2 w-full rounded-lg border px-[10px] bg-green-500">
                  500.000 VND
                </ButtonDH>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                  <InputDH
                    shape="round"
                    name="bidAmount"
                    placeholder={`Nhập giá thầu`}
                    className="rounded-lg border-[0.5px] px-3 flex-grow"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  <ButtonDH
                    type="submit"
                    className="text-green-800 hover:text-white border border-green-500 hover:bg-green-500"
                    disabled={isLoading} // Vô hiệu hóa nút khi đang xử lý
                  >
                    {isLoading ? "Đang gửi..." : "Gửi giá thầu"}
                  </ButtonDH>
                </div>
              </form>
            </div>
            <Text as="p" className="mt-5 text-left text-[12px] text-black-900">
              Khi trả giá bạn phải cam kết các chính sách của hệ thống.{" "}
              <span className="font-bold">Chính sách.</span>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
