import { Text, Heading, Img } from "./..";
import React from "react";

export default function ProductInfo1({
  productImage = "images/img_image_30_2.png",
  categoryText = "Thời trang",
  productDescription = "Khoác gió chống nắng thời trang Adidas",
  currentPrice,
  originalPrice = "328.000đ",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-[24%] md:w-full border-gray-200 border border-solid bg-bg-white`}
    >
      <div className="self-stretch bg-bg-white px-5 py-6 sm:py-5">
        <Img src={productImage} alt="Product Image" className="h-[230px] w-[230px] object-cover" />
      </div>
      <div className="mx-3.5 mb-6 flex flex-col items-start gap-3 self-stretch">
        <Text as="p" className="text-[12px] font-normal text-blue_gray-600">
          {categoryText}
        </Text>
        <div className="flex flex-col gap-9 self-stretch">
          <Heading size="headingxs" as="h6" className="text-[16px] font-semibold leading-[150%] text-blue_gray-900">
            {productDescription}
          </Heading>
          <div className="flex flex-wrap items-center gap-2.5">
            <Heading as="h6" className="flex text-[18px] font-semibold text-blue_gray-900">
              <span>278.000</span>
              <a href="#" className="inline underline">
                đ
              </a>
            </Heading>
            <Text
              size="textmd"
              as="p"
              className="self-start text-[14px] font-normal capitalize text-blue_gray-600 line-through"
            >
              {originalPrice}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}



