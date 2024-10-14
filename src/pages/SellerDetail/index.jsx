import { Helmet } from "react-helmet";
import { Text, Img, InputDH, Heading } from "../../components";
import Header2 from "../../components/Header2";
import ProductInfo from "../../components/ProductInfo"
import ProductInfo1 from "../../components/ProductInfo1";
import React, { Suspense } from "react";
import SellerDetailHeader from "../../components/SellerDetail";

const fashionItemList = [
    {
        productImage: "images/img_image_30_1.png",
        productCategory: "Thời trang",
        productDescription: "Áo nỉ chần bông màu xám có dây Nike",
        productPrice: "278.000đ",
        productOriginalPrice: "328.000đ",
    },
    {
        productImage: "images/img_image_30_2.png",
        productCategory: "Thời trang",
        productDescription: "Khoác gió chống nắng thời trang Adidas",
        productPrice: "278.000đ",
        productOriginalPrice: "328.000đ",
    },
    {
        productImage: "images/img_image_30_1.png",
        productCategory: "Thời trang",
        productDescription: "Áo nỉ chần bông màu xám có dây Nike",
        productPrice: "278.000đ",
        productOriginalPrice: "328.000đ",
    },
];

export default function SellerDetailPage() {
    return (
        <>
            <Helmet>
                <title>ADIDAS Store Seller Profile - Exclusive Deals and Products</title>
                <meta
                    name="description"
                    content="Explore the ADIDAS Store Seller profile for the latest fashion deals. Shop a variety of high-quality products, from tech brands like Apple and Lenovo to trendy Nike and Adidas apparel. Engage with the seller, follow for updates, and discover exclusive offers."
                />
            </Helmet>
            <Header2 />
            <div className="flex w-full flex-col items-center gap-[104px] overflow-auto bg-bg-white py-[66px] md:gap-[78px] md:py-5 sm:gap-[52px]">
                <SellerDetailHeader />
                <div className="mx-auto mb-1 flex w-full max-w-[1394px] items-start gap-4 self-stretch md:flex-col md:px-5">
                    <div className="flex w-[18%] flex-col items-start gap-6 md:w-full">
                        <div className="flex items-center justify-between gap-5 self-stretch">
                            <Heading size="textxl" as="h1" className="text-[18px] font-medium text-blue_gray-900">
                                Lọc theo thương hiệu
                            </Heading>
                            <div className="h-px w-[14px] bg-blue_gray-900" />
                        </div>
                        <div className="flex flex-col gap-5 self-stretch">
                            <InputDH
                                shape="round"
                                name="Brand Search"
                                placeholder={`Tìm thương hiệu`}
                                className="rounded-md border px-[18px]"
                            />
                            <div className="flex flex-col gap-2.5">
                                <div className="flex">
                                    <div className="flex flex-1 items-center gap-[13px]">
                                        <div className="flex w-[8%] flex-col items-center gap-3.5">
                                            <div className="h-[16px] w-[18px] rounded border border-solid border-blue_gray-900" />
                                            <Img
                                                src="images/img_checkmark_blue_gray_900.svg"
                                                alt="Checkmark Image"
                                                className="h-[16px] w-full"
                                            />
                                            <div className="h-[16px] w-[18px] rounded border border-solid border-blue_gray-900" />
                                            <div className="h-[16px] w-[18px] rounded border border-solid border-blue_gray-900" />
                                            <div className="h-[16px] w-[18px] rounded border border-solid border-blue_gray-900" />
                                        </div>
                                        <Text
                                            size="textlg"
                                            as="p"
                                            className="w-[30%] text-[15px] font-normal leading-[30px] text-blue_gray-900"
                                        >
                                            <>
                                                Apple
                                                <br />
                                                Asus
                                                <br />
                                                Acer
                                                <br />
                                                Dell
                                                <br />
                                                Lenovo
                                            </>
                                        </Text>
                                    </div>
                                    <Text
                                        size="texts"
                                        as="p"
                                        className="w-[10%] text-right text-[13px] font-normal leading-[30px] text-blue_gray-600"
                                    >
                                        <>
                                            87
                                            <br />
                                            92
                                            <br />
                                            123
                                            <br />
                                            49
                                            <br />
                                            12
                                        </>
                                    </Text>
                                </div>
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <Text size="textlg" as="p" className="text-[15px] font-medium text-gray-900">
                                        Xem tất cả
                                    </Text>
                                    <div className="h-[2px] w-[32px] bg-gray-900" />
                                </div>
                            </div>
                        </div>
                        <div className="h-px w-[82%] bg-gray-200" />
                    </div>
                    <div className="flex flex-1 md:flex-col md:self-stretch">
                        <ProductInfo1
                            productImage="images/img_image_30.png"
                            productDescription="Áo Hoodie Nike dành cho mùa đông lạnh"
                        />
                        <div className="flex flex-1 md:flex-col md:self-stretch">
                            <Suspense fallback={<div>Loading feed...</div>}>
                                {fashionItemList.map((d, index) => (
                                    <ProductInfo
                                        {...d}
                                        key={"sellerList" + index}
                                        className="border border-solid border-gray-200 bg-bg-white"
                                    />
                                ))}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



