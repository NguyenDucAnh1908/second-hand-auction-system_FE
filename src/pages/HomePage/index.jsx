import { Helmet } from "react-helmet";
import { Text, Heading, Img, ButtonDH, Slider } from "../../components";
import Header2 from "../../components/Header2";
import ProductDetails from "../../components/ProductDetails";
import ProductDetails11 from "../../components/ProductDetails11";
import ProductDetails4 from "../../components/ProductDetails4";
import FashionPromotionSection from "./FashionPromotionSection";
import FeaturedProductsSection from "./FeaturedProductsSection";
import FreeShippingSection from "./FreeShippingSection";
import RecentProductsSection from "./RecentProductsSection";
import RecentlyViewedSection from "./RecentlyViewedSection";
import TrendingProductsSection from "./TrendingProductsSection";
import TrustedBrandsSection from "./TrustedBrandsSection";
import React, { Suspense } from "react";
import ProductDetails31 from "../../components/ProductDetails31/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import {IconButton} from "@material-tailwind/react";

const fashionItemsList = [
  {
    productImage: "images/img_image_30_184x194.png",
    categoryText: "Thời trang",
    productTitle: "Dễ Thương Dép Bông Đi Trong Nhà",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_188x188.png",
    categoryText: "Thời trang",
    productTitle: "Vớ Lông Cừu Dày Dặn Giữ Ấm Màu Hồng",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_188x194.png",
    categoryText: "Thời trang",
    productTitle: "Quần jeans Ống Rộng Lưng Cao Thêu Hình",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
];
const beautyProductsList = [
  {
    productImage: "images/img_image_30_190x190.png",
    productTitle: "Sắc đẹp",
    productDescription: (
      <>
        Son Romand siêu đẹp
        <br />
        mới dùng
      </>
    ),
    reviewCount: "3,014 đánh giá",
    currentPrice: "248.000đ",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_190x190.png",
    productTitle: "Sắc đẹp",
    productDescription: (
      <>
        Son Romand siêu đẹp
        <br />
        mới dùng
      </>
    ),
    reviewCount: "3,014 đánh giá",
    currentPrice: "248.000đ",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_190x190.png",
    productTitle: "Sắc đẹp",
    productDescription: (
      <>
        Son Romand siêu đẹp
        <br />
        mới dùng
      </>
    ),
    reviewCount: "3,014 đánh giá",
    currentPrice: "248.000đ",
    originalPrice: "328.000đ",
  },
];

export default function HomePagePage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [sliderState1, setSliderState1] = React.useState(0);
  const sliderRef1 = React.useRef(null);

  return (
    <>
      <Helmet>
        <title>
          Home Fashion - Discover Winter Collection and Exclusive Deals
        </title>
        <meta
          name="description"
          content="Explore our Home Fashion page for the latest winter collection and enjoy exclusive end-of-month promotions. Free shipping on orders over 200K and a 30-day money-back guarantee."
        />
      </Helmet>
      <div className="w-full bg-bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center self-stretch">
            <Header2 />
            <div className="container-xs relative mt-[-34px] md:px-5">
              <div className="relative mr-2.5 h-[486px] content-end rounded-md bg-gray-100_01 md:mr-0 md:h-auto">
                <div className="mx-auto flex w-full px-1">
                  <Slider
                    autoPlay
                    autoPlayInterval={2000}
                    responsive={{
                      0: { items: 1 },
                      551: { items: 1 },
                      1051: { items: 1 },
                    }}
                    disableDotsControls
                    activeIndex={sliderState1}
                    onSlideChanged={(e) => {
                      setSliderState1(e?.item);
                    }}
                    ref={sliderRef1}
                    items={[...Array(3)].map(() => (
                      <React.Fragment key={Math.random()}>
                        <div className="flex items-start md:flex-col">
                          <div className="mt-[62px] flex w-[30%] flex-col items-start gap-6 md:w-full">
                            <div className="flex flex-col items-start gap-2.5 self-stretch">
                              <ButtonDH
                                color="blue_gray_900_01"
                                size="xs"
                                shape="round"
                                className="min-w-[172px] rounded-md px-3.5 font-medium"
                              >
                                Khuyến mãi cuối tháng
                              </ButtonDH>
                              <Heading
                                size="heading5xl"
                                as="h1"
                                className="text-[48px] font-semibold uppercase leading-[60px] text-blue_gray-900_01 md:text-[44px] sm:text-[38px]"
                              >
                                <>
                                  BỘ SƯU TẬP
                                  <br />
                                  MÙA ĐÔNG
                                </>
                              </Heading>
                              <Heading
                                as="h2"
                                className="w-[86%] text-[16px] font-normal leading-[150%] text-blue_gray-600 md:w-full"
                              >
                                Những gì chúng tôi mất hàng giờ để thực hiện sẽ
                                là của bạn để tận hưởng
                              </Heading>
                            </div>
                            <ButtonDH
                              color="green_A700"
                              size="xl"
                              shape="round"
                              className="min-w-[176px] rounded-md px-[34px] sm:px-5"
                            >
                              Khám phá ngay
                            </ButtonDH>
                          </div>
                          <div className="relative h-[446px] w-[56%] content-end self-center px-8 md:h-auto md:w-full sm:px-5">
                            <div className="mx-auto h-[360px] flex-1 rounded-[318px] bg-green-a700_19" />
                            <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 items-center px-6 sm:relative sm:flex-col sm:px-5">
                              <div className="relative h-[428px] flex-1 content-center md:h-auto sm:w-full sm:flex-none sm:self-stretch">
                                <Img
                                  src="images/img_man.png"
                                  alt="Man Image"
                                  className="ml-auto h-[428px] flex-1 rounded-md object-cover"
                                />
                                <div className="absolute bottom-[0.55px] right-[17.46px] m-auto h-[224px] w-[28%] rounded-[50%] bg-gray-900_cc blur-[20.00px] backdrop-opacity-[0.5]" />
                              </div>
                              <Img
                                src="images/img_women.png"
                                alt="Woman Image"
                                className="relative z-[1] ml-[-186px] h-[446px] w-[50%] rounded-md object-contain sm:ml-0 sm:w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-0 z-[2] m-auto flex h-max flex-1 justify-between gap-5">
                  {/*<ButtonDH*/}
                  {/*  onClick={() => {*/}
                  {/*    sliderRef1?.current?.slidePrev();*/}
                  {/*  }}*/}
                  {/*  className="w-[60px] rounded-[24px] px-4 shadow-xs"*/}
                  {/*>*/}
                  {/*  <Img src="images/img_arrow_left.svg" />*/}
                  {/*</ButtonDH>*/}
                  <IconButton variant="outlined" className="rounded-full"
                              onClick={() => {
                                sliderRef?.current?.slidePrev();
                              }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                  </IconButton>
                  {/*<ButtonDH*/}
                  {/*  onClick={() => {*/}
                  {/*    sliderRef1?.current?.slideNext();*/}
                  {/*  }}*/}
                  {/*  className="mr-1 w-[60px] rounded-[24px] px-4 shadow-xs"*/}
                  {/*>*/}
                  {/*  <Img src="images/img_arrow_right_blue_gray_900_1.svg" />*/}
                  {/*</ButtonDH>*/}
                  <IconButton variant="outlined" className="rounded-full"
                              onClick={() => {
                                sliderRef?.current?.slideNext();
                              }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          {/* free shipping section */}
          <FreeShippingSection />

          {/* recently viewed section */}
          <RecentlyViewedSection />

          {/* trending products section */}
          <TrendingProductsSection />

          {/* featured products section */}
          <FeaturedProductsSection />
          <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
            <div className="flex items-center justify-between gap-5 md:flex-col">
              <Heading
                size="text7xl"
                as="h2"
                className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
              >
                Sản phẩm nổi bật
              </Heading>
              <div className="flex w-[30%] flex-col items-start justify-center gap-0.5 md:w-full">
                <Heading
                  size="headingxl"
                  as="h3"
                  className="text-[16px] font-semibold text-blue_gray-600_01"
                >
                  Top 10 Điện tử Thời trang Gia dụng Tất cả
                </Heading>
                {/*<div className="h-[2px] w-[48px] bg-blue_gray-900_01" />*/}
              </div>
            </div>
            <div className="mr-3.5 md:mr-0">
              <div className="relative h-[452px] content-center md:h-auto">
                <div className="mx-auto flex w-full">
                  <Slider
                    autoPlay
                    autoPlayInterval={2000}
                    responsive={{
                      0: { items: 1 },
                      551: { items: 1 },
                      1051: { items: 1 },
                    }}
                    disableDotsControls
                    activeIndex={sliderState}
                    onSlideChanged={(e) => {
                      setSliderState(e?.item);
                    }}
                    ref={sliderRef}
                    items={[...Array(3)].map(() => (
                      <React.Fragment key={Math.random()}>
                        <div className="flex gap-8 md:flex-col">
                          <div className="flex w-full gap-8 md:flex-col">
                            <ProductDetails31 className="w-full border border-solid border-gray-200 bg-bg-white" />
                          </div>
                          <div className="flex w-full gap-8 md:flex-col">
                            <ProductDetails31 className="w-full border border-solid border-gray-200 bg-bg-white" />
                          </div>
                          <div className="flex w-full gap-8 md:flex-col">
                            <ProductDetails31 className="w-full border border-solid border-gray-200 bg-bg-white" />
                          </div>
                          <div className="flex w-full gap-8 md:flex-col">
                            <ProductDetails31 className="w-full border border-solid border-gray-200 bg-bg-white" />
                          </div>
                        </div>
                        {/*<div className="flex gap-8 md:flex-col">*/}
                        {/*  <div className="flex w-full gap-8 md:flex-col">*/}
                        {/*    <ProductDetails4 className="w-full border border-solid border-gray-200 bg-bg-white"/>*/}
                        {/*    <ProductDetails4*/}
                        {/*        productImage="images/img_image_30_3.png"*/}
                        {/*        productDescription="Áo nỉ chần bông màu xám có dây Nike"*/}
                        {/*        className="w-full border border-solid border-gray-200 bg-bg-white"*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*  <div className="flex w-full gap-[30px] md:flex-col">*/}
                        {/*    <ProductDetails4*/}
                        {/*        productImage="images/img_image_30_4.png"*/}
                        {/*        productDescription="Khoác gió chống nắng thời trang Adidas"*/}
                        {/*        className="w-full border border-solid border-gray-200 bg-bg-white"*/}
                        {/*    />*/}
                        {/*    <ProductDetails4*/}
                        {/*        productImage="images/img_image_30_5.png"*/}
                        {/*        productDescription="Áo khoác unisex màu trắng tập gym Adidas"*/}
                        {/*        className="w-full border border-solid border-gray-200 bg-bg-white"*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </React.Fragment>
                    ))}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 justify-between gap-5">
                  {/*<ButtonDH*/}
                  {/*  onClick={() => {*/}
                  {/*    sliderRef?.current?.slidePrev();*/}
                  {/*  }}*/}
                  {/*  className="ml-2.5 w-[44px] rounded-[22px] border border-solid border-gray-200 px-3.5"*/}
                  {/*>*/}
                  {/*  <Img src="images/img_arrow_left_blue_gray_900.svg" />*/}
                  {/*</ButtonDH>*/}
                  <IconButton variant="outlined" className="rounded-full"
                                onClick={() => {
                                  sliderRef?.current?.slidePrev();
                                }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                  </IconButton>
                  <IconButton variant="outlined" className="rounded-full"
                              onClick={() => {
                                sliderRef?.current?.slideNext();
                              }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                  </IconButton>
                  {/*<ButtonDH*/}
                  {/*  onClick={() => {*/}
                  {/*    sliderRef?.current?.slideNext();*/}
                  {/*  }}*/}
                  {/*  className="w-[44px] rounded-[22px] border border-solid border-blue_gray-900 px-3.5"*/}
                  {/*>*/}
                  {/*  <Img src="images/img_arrow_right_blue_gray_900_1.svg" />*/}
                  {/*</ButtonDH>*/}
                </div>
              </div>
              <div className="mt-[116px] flex flex-col items-start gap-[30px]">
                <Heading
                  size="text7xl"
                  as="h4"
                  className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                >
                  Các sản phẩm mới
                </Heading>
                <div className="mr-4 flex gap-[26px] self-stretch md:mr-0 md:flex-col">
                  <div className="relative h-[390px] w-[42%] rounded-md bg-gray-100_01 md:w-full">
                    <Img
                      src="images/img_men_s_clothing.png"
                      alt="Mens Clothing Image"
                      className="absolute bottom-[-1px] right-[0.96px] m-auto h-[234px] w-[86%] rounded-md object-contain"
                    />
                    <div className="absolute left-0 right-0 top-[11%] mx-[46px] my-auto flex flex-1 flex-col items-start gap-2 md:mx-0">
                      <Text
                        as="p"
                        className="text-[14px] font-normal text-blue-a700"
                      >
                        Chỉ từ 150K
                      </Text>
                      <Heading
                        size="text7xl"
                        as="h5"
                        className="text-[28px] font-medium leading-[35px] text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                      >
                        <>
                          Discover Real <br />
                          Organic Flavors
                        </>
                      </Heading>
                      <div className="flex flex-col items-start justify-center gap-0.5 self-stretch">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[15px] font-medium text-gray-900_01"
                        >
                          Mua ngay
                        </Text>
                        <div className="h-[2px] w-[32px] bg-gray-900_01" />
                      </div>
                    </div>
                  </div>
                  <div className="ml-[26px] flex flex-1 gap-3 md:ml-0 md:flex-col md:self-stretch">
                    <Suspense fallback={<div>Loading feed...</div>}>
                      {fashionItemsList.map((d, index) => (
                        <ProductDetails
                          {...d}
                          key={"productList" + index}
                          className="mt-1 w-[34%] md:mt-0 md:w-full"
                        />
                      ))}
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="mt-[76px] flex flex-col items-start gap-[30px]">
                <Heading
                  size="text7xl"
                  as="h6"
                  className="ml-2.5 text-[28px] font-medium text-black-900 md:ml-0 md:text-[26px] sm:text-[24px]"
                >
                  Các sản phẩm đang đấu giá
                </Heading>
                <div className="mr-2.5 flex items-center gap-5 self-stretch md:mr-0 md:flex-col">
                  <div className="relative h-[390px] w-[42%] rounded-md bg-gray-100_01 md:w-full">
                    <Img
                      src="images/img_men_s_clothing_234x450.png"
                      alt="Auction Clothing Image"
                      className="absolute bottom-[-1px] right-[1.54px] m-auto h-[234px] w-[86%] rounded-md object-contain"
                    />
                    <div className="absolute left-0 right-0 top-[11%] mx-12 my-auto flex flex-1 flex-col items-start gap-2 md:mx-0">
                      <Text
                        as="p"
                        className="text-[14px] font-normal text-blue-a700"
                      >
                        Chỉ từ 150K
                      </Text>
                      <Heading
                        size="text7xl"
                        as="p"
                        className="text-[28px] font-medium leading-[35px] text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                      >
                        <>
                          Discover Real <br />
                          Organic Flavors
                        </>
                      </Heading>
                      <div className="flex flex-col items-start justify-center gap-0.5 self-stretch">
                        <Text
                          size="textlg"
                          as="p"
                          className="text-[15px] font-medium text-gray-900_01"
                        >
                          Mua ngay
                        </Text>
                        <div className="h-[2px] w-[32px] bg-gray-900_01" />
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex flex-1 md:ml-0 md:flex-col md:self-stretch">
                    <Suspense fallback={<div>Loading feed...</div>}>
                      {beautyProductsList.map((d, index) => (
                        <ProductDetails11
                          {...d}
                          key={"auctionProductList" + index}
                          className="w-[32%]"
                        />
                      ))}
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* recent products section */}
          <RecentProductsSection />

          {/* trusted brands section */}
          <RecentProductsSection />
          {/*<TrustedBrandsSection />*/}

          {/* fashion promotion section */}
          <FeaturedProductsSection />
          {/*<FashionPromotionSection />*/}
          <div className="mt-[19px] self-stretch">
            {/*<Footer5 className="mt-[34px] h-[410px] bg-[url(/public/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />*/}
            <FooterBK />
          </div>
        </div>
      </div>
    </>
  );
}
