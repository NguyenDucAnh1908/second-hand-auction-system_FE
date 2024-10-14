import { Text, Img, ButtonDH, Heading } from "./..";
import React, { Suspense } from "react";

export default function SellerDetailHeader({ ...props }) {
  return (
    <header
      {...props}
      className={`${props.className} flex sm:flex-col self-stretch items-center mx-[58px] md:mx-0`}
    >
      <div className="relative mb-1.5 flex h-[216px] flex-1 flex-col items-start border border-solid border-black-900 bg-[url(/public/images/img_giuong.png)] bg-cover bg-no-repeat px-[70px] py-[30px] md:h-auto md:self-stretch sm:px-5">
        {/* Container for Avatar and Store Information */}
        <div className="flex w-full items-center gap-5">
          <div className="flex items-center">
            <Img
              src="images/img_avata_seller.png"
              alt="Profile Image"
              className="h-[56px] w-[56px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <Heading
              size="headingmd"
              as="h5"
              className="text-[28px] font-bold uppercase text-bg-white"
            >
              ADIDAS Store
            </Heading>
            <Text as="p" className="text-[14px] font-normal text-bg-white">
              Online 5 phút trước
            </Text>
          </div>
        </div>
        {/* Buttons Section */}
        <div className="mt-4 flex w-full justify-start gap-5">
          <ButtonDH
            shape="round"
            className="min-w-[130px] rounded-md px-[34px] border-2 border-blue-500 text-blue-500"
          >
            Theo dõi
          </ButtonDH>
          <ButtonDH
            shape="round"
            className="min-w-[130px] rounded-md px-[34px] sm:px-5 border-2 border-blue-500 text-blue-500"
          >
            Chat
          </ButtonDH>
        </div>
      </div>
      <div className="ml-[54px] mr-[506px] grid w-[42%] grid-cols-2 gap-6 self-end md:mx-0 sm:self-auto">
        <Suspense fallback={<div>Loading feed...</div>}>
          {[...Array(6)].map((d, index) => (
            <div
              key={"productsGrid" + index}
              className="flex w-full items-center gap-3.5"
            >
              <a href="#">
                <Img
                  src="images/img_image_162.png"
                  alt="Product Image"
                  className="h-[36px] object-cover"
                />
              </a>
              <Text as="p" className="text-[12px] font-normal text-black-900">
                <span className="text-black-900">Sản Phẩm:&nbsp;</span>
                <span className="text-deep_orange-a700">220</span>
              </Text>
            </div>
          ))}
        </Suspense>
      </div>
    </header>
  );
}
