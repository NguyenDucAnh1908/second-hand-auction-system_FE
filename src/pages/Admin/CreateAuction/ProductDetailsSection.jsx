import { Heading, Img } from "../../../components";
import React from "react";

export default function ProductDetailsSection() {
  return (
    <>
      {/* product details section */}
      <div className="mt-[18px] flex flex-col items-center">
        <div className="container-xs flex flex-col items-center gap-6 md:px-5">
          <Heading
            size="textxl"
            as="h2"
            className="bg-green-a700_01 rounded-[12px] rounded-[12px] px-[34px] text-[25px] font-medium text-white-a700 bg-green-300 md:text-[23px] sm:px-5 sm:text-[21px] mt-[100px]"
          >
            Thông tin chi tiết
          </Heading>
          <div className="flex justify-center self-stretch bg-white-a700">
            <div className="mt-8 flex w-[94%] items-start justify-between gap-x-4 md:w-full md:flex-col md:px-5">
              {/* Ô thứ nhất */}
              <div className="flex flex-1 flex-col items-start bg-blue-300 p-6 rounded-lg md:self-stretch md:mb-4 md:w-full min-h-[300px]">
                <Heading as="h3" className="text-[20px] font-medium text-white">
                  Màu sắc: Xám
                </Heading>
                <Heading as="h4" className="mt-[30px] text-[20px] font-medium text-white">
                  Nguồn gốc: Trung quốc
                </Heading>
                <Heading as="h5" className="mt-[18px] text-[20px] font-medium text-white">
                  Kích thước: 1m5 x 1m9
                </Heading>
              </div>

              {/* Ô thứ hai */}
              <div className="flex flex-1 flex-col items-start bg-blue-300 p-6 rounded-lg self-center md:w-full min-h-[300px]">
                <Heading as="h6" className="text-[20px] font-medium text-white">
                  Định giá: 2 000 000 VND
                </Heading>
                <Heading as="p" className="ml-1 mt-[26px] text-[20px] font-medium text-white md:ml-0">
                  Ngày sản xuất: 19/01/2002
                </Heading>
                <Heading as="p" className="ml-1 mt-5 text-[20px] font-medium text-white md:ml-0">
                  Phần trăm: 80%
                </Heading>

                {/* Phần export file */}
                <div className="mt-4 flex w-[66%] items-center gap-[34px] rounded-[12px] bg-blue-600 px-6 py-4 md:w-full sm:px-5">
                  <Img src="/images/img_upload.png" alt="Product Image" className="h-[22px] object-cover" />
                  <Heading size="textxs" as="p" className="self-end text-[15px] font-medium text-white">
                    Export file
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



