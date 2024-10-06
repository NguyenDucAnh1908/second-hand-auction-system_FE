import { Text, Heading } from "../../components";
import ProductProfile from "../../components/ProductProfile";
import React, { Suspense } from "react";

const brandProductList = [
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
  {
    productImage: "images/img_image_44.png",
    brandName: "Samsung",
    productCount: "29 sản phẩm",
  },
];

export default function TrendingProductsSection() {
  return (
    <>
      {/* trending products section */}
      <div className="mt-[60px] flex flex-col items-center self-stretch">
        <div className="container-xs flex flex-col gap-7 md:px-5">
          <div className="mr-3 flex items-start justify-between gap-5 md:mr-0">
            <Heading
              size="text7xl"
              as="h2"
              className="self-center text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
            >
              Xu hướng trên eBay
            </Heading>
            <div className="flex w-[6%] flex-col items-start justify-center gap-1">
              <Text
                size="textlg"
                as="p"
                className="text-[11px] font-medium text-gray-900_01"
              >
                Xem tất cả
              </Text>
              <div className="h-[2px] w-[32px] bg-gray-900_01" />
            </div>
          </div>
          <div className="mr-3 flex gap-[38px] md:mr-0 md:flex-col">
            <Suspense fallback={<div>Loading feed...</div>}>
              {brandProductList.map((d, index) => (
                <ProductProfile {...d} key={"itemsList" + index} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
