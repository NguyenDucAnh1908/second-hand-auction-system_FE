import { Text, Heading, Img } from "./..";
import React from "react";

export default function ProductProfile({
  productImage = "images/img_image_44.png",
  brandName = "Samsung",
  productCount = "29 sản phẩm",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-[14%] md:w-full gap-[18px]`}
    >
      <div className="self-stretch rounded-[74px] bg-gray-100_02 px-[22px] py-[42px] md:py-5 sm:p-5">
        <Img
          src={productImage}
          alt="Product Image"
          className="h-[64px] w-full object-cover"
        />
      </div>
      <div className="mx-9 flex flex-col items-center self-stretch">
        <Heading
          as="p"
          className="font-jost text-[16px] font-medium text-blue_gray-900_01"
        >
          {brandName}
        </Heading>
        <Text
          size="textxs"
          as="p"
          className="text-[12px] font-normal text-blue_gray-600_01"
        >
          {productCount}
        </Text>
      </div>
    </div>
  );
}
