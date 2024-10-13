import { Heading, Img } from "../../../components";
import React from "react";
import {Avatar, Typography} from "@material-tailwind/react";

export default function ProductDetailsSection() {
  return (
    <>
      {/* product details section */}
      <div className="mt-[18px] flex flex-col items-center">
        <div className="container-xs flex flex-col items-center gap-6 md:px-5">
          <Heading
              size="textxl"
              as="h2"
              className="bg-green-a700_01 rounded-[12px] rounded-[12px] px-[34px] text-[25px] font-medium md:text-[23px] sm:px-5 sm:text-[21px] mt-[100px]"
          >
            Thông tin chi tiết
          </Heading>
          <div className="flex w-full">
            {/* Khối bên trái - 40% */}
            <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
              {/* "Người bán" hiển thị bên ngoài và ở giữa */}
              <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                Người bán
              </Heading>

              <div className="w-full flex justify-center">
                <div
                    className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Màu sắc: Xám
                  </Heading>
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Nguồn gốc: Trung quốc
                  </Heading>
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Kích thước: 1m5 x 1m9
                  </Heading>
                </div>
              </div>
            </div>

            <div className="mx-5"></div>

            <div className="flex flex-col items-center bg-blue-100 p-5 rounded-[20px] w-[50%]">
              <Heading size="textxs" as="p" className="text-[20px] font-medium text-black-900 mb-5">
                Người thẩm định
              </Heading>

              <div className="w-full flex justify-center">
                <div
                    className="mb-[30px] flex flex-col items-start gap-[18px] bg-white p-5 rounded-[20px] shadow-md">
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Định giá: 2 000 000 VND
                  </Heading>
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Ngày sản xuất: 19/01/2002
                  </Heading>
                  <Heading size="textxs" as="p" className="text-[15px] font-medium text-black-900">
                    Phần trăm: 80%
                  </Heading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



