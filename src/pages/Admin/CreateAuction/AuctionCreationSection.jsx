import { Heading, Img } from "../../../components";
import React, { Suspense } from "react";
import {Carousel} from "antd";
import {Typography} from "@material-tailwind/react";

export default function AuctionCreationSection() {
  return (
    <>
      {/* auction creation section */}
      <div className="mt-[26px] flex flex-col items-center">
        <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] md:px-5 sm:gap-[39px]">
          <Heading
            size="text2xl"
            as="h1"
            className="w-[28%] text-[30px] rounded-[12px] font-medium leading-[55px] text-black-900 md:w-full md:text-[28px] sm:text-[26px]"
          >
            TẠO PHIÊN ĐẤU GIÁ
          </Heading>
          <div className="self-stretch">
            <div className="flex items-center gap-[34px] md:flex-col">
              {/*<div className="flex flex-1 flex-col gap-[18px] md:self-stretch">*/}
              {/*  <div className="h-[390px] bg-[url(/public/images/img_group_48794.png)] bg-cover bg-no-repeat md:h-auto">*/}
              {/*    <Img*/}
              {/*      src="/images/img_giuong.png"*/}
              {/*      alt="Featured Image"*/}
              {/*      className="h-[390px] w-full object-cover md:h-auto"*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*  <div className="ml-2.5 flex gap-[54px] md:ml-0 md:flex-col">*/}
              {/*    <Suspense fallback={<div>Loading feed...</div>}>*/}
              {/*      {[...Array(3)].map((d, index) => (*/}
              {/*        <Img*/}
              {/*          key={"imageList" + index}*/}
              {/*          src="/images/img_giuong_detail.png"*/}
              {/*          alt="List Image"*/}
              {/*          className="h-[56px] w-[32%] object-contain md:w-full"*/}
              {/*        />*/}
              {/*      ))}*/}
              {/*    </Suspense>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div style={{width: '51%', margin: '0 auto'}}> {/* Điều chỉnh chiều rộng Carousel */}
                <Carousel arrows infinite={false}>
                  <div>
                    {/*<h3 style={contentStyle}>1</h3>*/}
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                </Carousel>
              </div>
              <div className="flex w-[50%] justify-center rounded-[20px] bg-green-400 p-3.5 md:w-full">
                <div className="mt-3 flex w-full flex-col items-start">
                  <Heading size="textxs" as="h2" className="ml-2.5 text-[15px] font-medium text-black-900 md:ml-0">
                    Tiêu đề: Giường ngủ cũ 2025
                  </Heading>
                  <Heading size="textmd" as="h3" className="ml-2.5 mt-4 text-[18px] font-medium text-black-900 md:ml-0">
                    Tên sản phẩm: GIUONG NGU
                  </Heading>
                  <Heading as="h4" className="ml-1.5 mt-[18px] text-[20px] font-medium text-black-900 md:ml-0">
                    Tên thương hiệu: VUA NỆM
                  </Heading>
                  <Heading
                      size="texts"
                      as="h5"
                      className="ml-2.5 mt-3 w-[96%] font-jost text-[16px] font-medium leading-7 text-black-900 md:ml-0 md:w-full"
                  >
                    Mô tả:Giường ngủ cũ thường mang nét hoài niệm và dấu ấn thời gian, với khung gỗ hoặc kim loại đã có
                    dấu hiệu mài mòn, bong tróc sơn, hoặc những vết trầy xước nhỏ. Tuy nhiên, chính những vết dấu này
                    lại tạo nên vẻ đẹp mộc mạc, cổ điển, gợi nhớ về những kỷ niệm xưa cũ.
                  </Heading>
                  <div className="ml-2.5 mt-4 flex flex-col items-start self-stretch md:ml-0">
                    <div className="flex flex-col items-start">
                      <Heading size="texts" as="h6" className="font-medium text-blue_gray-900">
                        Danh mục
                      </Heading>
                      <Typography variant="h5">Material Tailwind</Typography>
                      <Heading size="texts" as="p" className="mt-4 text-[16px] font-medium text-black-900">
                        Tình trạng: Đã qua sử dụng 1 lần
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



