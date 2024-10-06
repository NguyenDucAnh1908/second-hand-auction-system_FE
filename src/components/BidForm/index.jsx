import { Helmet } from "react-helmet";
import { Text, ButtonDH, InputDH, Img } from "./..";
import React from "react";

export default function BidForm() {
  return (
    <>
      <Helmet>
        <title>Bid Submission - Enter Your Best Offer</title>
        <meta
          name="description"
          content="Join the bidding war and secure your lead with a competitive bid. Commit to our fair auction policies and enter your highest bid now to win the auction."
        />
      </Helmet>
      <div className="flex w-full justify-center bg-teal-50 px-5 py-20 md:p-5">
        <div className="flex w-full max-w-[400px] justify-center bg-white py-3.5 md:w-full md:px-3">
          <div className="flex flex-col items-start">
            {" "}
            {/* Căn lề trái cho các phần tử */}
            <Text
              as="p"
              className="text-left text-[20px] font-bold text-deep_orange-a700"
            >
              {" "}
              {/* Căn lề trái cho văn bản */}
              200.000 VND <br />
              <span className="text-[12px] text-black-900">1m48s | 3 bids</span>
            </Text>
            <div className="mt-3 flex items-center gap-3">
              <Img
                src="images/img_error_bid.png"
                alt="Product Image"
                className="h-[32px] w-[32px] object-cover"
              />
              <Text
                as="p"
                className="text-left text-[12px] font-normal leading-[22px] text-red-900"
              >
                Bạn đã bị trả giá cao hơn. Bạn vẫn có thể thắng, hãy thử trả giá
                lại.
              </Text>
            </div>
            <Text as="p" className="mt-5 text-left text-[14px] text-black-900">
              <span className="font-bold text-[18px]">
                Đặt giá thầu của bạn
              </span>
              <br />
              Hãy cân nhắc trả giá cao nhất mà bạn sẵn sàng trả. Chúng tôi sẽ
              trả giá vừa đủ để giữ bạn ở vị trí dẫn đầu.
            </Text>
            <div className="mt-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <ButtonDH
                  shape="round"
                  className="w-full rounded-lg border px-[10px] !text-gray-900_01 bg-green-500"
                >
                  300.00 VND
                </ButtonDH>
                <ButtonDH
                  shape="round"
                  className="ml-2 w-full rounded-lg border px-[10px] bg-green-500"
                >
                  400.00 VND
                </ButtonDH>
                <ButtonDH
                  shape="round"
                  className="ml-2 w-full rounded-lg border px-[10px] bg-green-500"
                >
                  500.00 VND
                </ButtonDH>
              </div>
              <div className="flex items-center gap-2">
                <InputDH
                  shape="round"
                  name="Bid InputDH"
                  placeholder={`Nhập giá thầu`}
                  className="rounded-lg border-[0.5px] px-3 flex-grow"
                />
                {/*<ButtonDH shape="round" className="min-w-[80px] rounded-lg border px-[10px] !text-gray-900 bg-green-500">*/}
                {/*  Giá thầu*/}
                {/*</ButtonDH>*/}
                <ButtonDH
                  type="ButtonDH"
                  className="text-green-800 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-300 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Green
                </ButtonDH>
              </div>
            </div>
            <Text as="p" className="mt-5 text-left text-[12px] text-black-900">
              {" "}
              {/* Căn lề trái cho văn bản */}
              Khi trả giá bạn phải cam kết các chính sách của hệ thống.{" "}
              <span className="font-bold">Chính sách.</span>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
