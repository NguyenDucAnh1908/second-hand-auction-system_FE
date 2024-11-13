import {Helmet} from "react-helmet";
import {Text, Heading, Img, ButtonDH, Slider} from "../../components";
import Header2 from "../../components/Header2";
import FeaturedProductsSection from "./FeaturedProductsSection";
import RecentProductsSection from "./RecentProductsSection";
import TrendingProductsSection from "./TrendingProductsSection";
import React, {Suspense} from "react";
import FooterBK from "../../components/FooterBK/index.jsx";
import {Button, IconButton} from "@material-tailwind/react";
import {useGetFeatureItemsQuery, useGetMostParticipatingItemsQuery} from "@/services/item.service.js";
import './index.css'

export default function HomePagePage() {
    const [sliderState, setSliderState] = React.useState(0);
    const [sliderState1, setSliderState1] = React.useState(0);
    const sliderRef1 = React.useRef(null);
    const sliderRef = React.useRef(null);
    // const items = Array.isArray(data) ? data : [];
    const {data: itemData, isError: itemError, isLoading: itemLoading, refetch} = useGetMostParticipatingItemsQuery();
    const {data: dataFT, isLoading: loadingFT, isError, error} = useGetFeatureItemsQuery();
    //console.log("itemData: ", itemData)

    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 4,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {slidesToShow: 3, centerPadding: "50px"},
            },
            {
                breakpoint: 768,
                settings: {slidesToShow: 2, centerPadding: "30px"},
            },
            {
                breakpoint: 480,
                settings: {slidesToShow: 1, centerPadding: "10px"},
            },
        ],
    };
    return (
        <>
            <Helmet>
                <title>
                    Home Page
                </title>
            </Helmet>
            <div className="w-full bg-bg-white">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center self-stretch ">
                        <Header2/>
                        <div className="container-xs relative mt-3 md:px-5">
                            <div
                                className="relative mr-2.5 h-[450px] content-end rounded-md border-spacing-3 bg-gradient-to-b from-blue-gray-100 to-blue-gray-600 border-gray-600 bg-gray-200 md:mr-0 md:h-auto">
                                <div className="mx-auto flex w-full px-1">
                                    <Slider {...sliderSettings} ref={sliderRef}>
                                        <div
                                            className="flex items-start md:flex-col mt-2 rounded-full object-fill ">
                                            <div
                                                className="mt-[62px] flex w-[30%] flex-col items-start gap-6 md:w-full ml-auto">
                                                <div className="flex flex-col items-start self-stretch">
                                                    <div className="flex flex-col items-start self-stretch">
                                                    </div>
                                                    <br/>
                                                    <Heading
                                                        size="heading5xl"
                                                        as="h1"
                                                        className="text-[48px] font-semibold  uppercase leading-[60px] bg-gradient-to-tl from-gray-500 to-blue-gray-900 text-transparent bg-clip-text md:text-[44px] sm:text-[38px]"
                                                    >
                                                        {Array.from("ĐẤU GIÁ VINTAGE").map((letter, index) => (
                                                            <span
                                                                key={index}
                                                                className="letter"
                                                                style={{
                                                                    animationDelay: `${index * 0.1}s`,
                                                                    opacity: 1,
                                                                    animationFillMode: 'forwards',
                                                                }}
                                                            >{letter}</span>
                                                        ))}
                                                    </Heading>

                                                    <Heading
                                                        as="h2"
                                                        className="w-[86%] text-[16px] font-normal leading-[150%] text-blue_gray-600 md:w-full"
                                                    >
                                                        Khám phá những món đồ cổ quý giá để sở hữu
                                                    </Heading>
                                                </div>

                                                <Button
                                                    color="green_A700"
                                                    size="xl"
                                                    shape="round"
                                                    className="min-w-[176px] rounded-md px-[34px] sm:px-5 mt-4"
                                                >
                                                    Tham gia ngay
                                                </Button>
                                            </div>
                                            <div
                                                className="relative h-[446px] w-[56%] content-end self-center px-8 md:h-auto md:w-full sm:px-5">
                                                <div
                                                    className="mx-auto h-[360px] flex-1 rounded-[318px] bg-green-a700_19"/>
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 items-center px-6 sm:relative sm:flex-col sm:px-5">
                                                    <div
                                                        className="relative flex-1 content-center md:h-auto sm:w-full sm:flex-none sm:self-stretch">
                                                        <Img
                                                            src="https://assets2.htv.com.vn/Images/1/News/118276/34.jpg"
                                                            alt="Vintage Auction"
                                                            className="ml-auto w-full h-[300px] rounded-md object-cover mr-auto"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* free shipping section
          <FreeShippingSection /> */}


                    {/* trending products section */}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <div className="mr-3.5 md:mr-0">
                            <TrendingProductsSection/>
                        </div>
                    </div>

                    {/* featured products section */}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <div className="mr-3.5 md:mr-0">
                            <FeaturedProductsSection/>
                        </div>
                    </div>
                    {/*<div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">*/}

                    {/*    <div className="mr-3.5 md:mr-0">*/}
                    {/*        <FeaturedProducts/>*/}
                    {/*        <div className="mt-[116px] flex flex-col items-start gap-[30px]">*/}
                    {/*            <Heading*/}
                    {/*                size="text7xl"*/}
                    {/*                as="h4"*/}
                    {/*                className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"*/}
                    {/*            >*/}
                    {/*                Các sản phẩm mới*/}
                    {/*            </Heading>*/}
                    {/*            <div className="mr-4 flex gap-[26px] self-stretch md:mr-0 md:flex-col">*/}
                    {/*                <div*/}
                    {/*                    className="relative h-[390px] w-[42%] rounded-md bg-gray-100_01 md:w-full">*/}
                    {/*                    <Img*/}
                    {/*                        src="https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_1280.jpg"*/}
                    {/*                        alt="Mens Clothing Image"*/}
                    {/*                        className="absolute bottom-[-1px] right-[0.96px] m-auto h-[234px] w-[86%] rounded-md object-contain"*/}
                    {/*                    />*/}
                    {/*                    <div*/}
                    {/*                        className="absolute left-0 right-0 top-[11%] mx-[46px] my-auto flex flex-1 flex-col items-start gap-2 md:mx-0">*/}
                    {/*                        <Text*/}
                    {/*                            as="p"*/}
                    {/*                            className="text-[14px] font-normal text-blue-a700"*/}
                    {/*                        >*/}
                    {/*                            Chỉ từ 150K*/}
                    {/*                        </Text>*/}
                    {/*                        <Heading*/}
                    {/*                            size="text7xl"*/}
                    {/*                            as="h5"*/}
                    {/*                            className="text-[28px] font-medium leading-[35px] text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"*/}
                    {/*                        >*/}
                    {/*                            <>*/}
                    {/*                                Discover Real <br/>*/}
                    {/*                                Organic Flavors*/}
                    {/*                            </>*/}
                    {/*                        </Heading>*/}
                    {/*                        <div*/}
                    {/*                            className="flex flex-col items-start justify-center gap-0.5 self-stretch">*/}
                    {/*                            <Text*/}
                    {/*                                size="textlg"*/}
                    {/*                                as="p"*/}
                    {/*                                className="text-[15px] font-medium text-gray-900_01"*/}
                    {/*                            >*/}
                    {/*                                Mua ngay*/}
                    {/*                            </Text>*/}
                    {/*                            <div className="h-[2px] w-[32px] bg-gray-900_01"/>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div*/}
                    {/*                    className="ml-[26px] flex flex-1 gap-3 md:ml-0 md:flex-col md:self-stretch">*/}
                    {/*                    <Suspense fallback={<div>Loading feed...</div>}>*/}
                    {/*                        {fashionItemsList.map((d, index) => (*/}
                    {/*                            <ProductDetails*/}
                    {/*                                {...d}*/}
                    {/*                                key={"productList" + index}*/}
                    {/*                                className="mt-1 w-[34%] md:mt-0 md:w-full"*/}
                    {/*                            />*/}
                    {/*                        ))}*/}
                    {/*                    </Suspense>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="mt-[76px] flex flex-col items-start gap-[30px]">*/}
                    {/*            <Heading*/}
                    {/*                size="text7xl"*/}
                    {/*                as="h6"*/}
                    {/*                className="ml-2.5 text-[28px] font-medium text-black-900 md:ml-0 md:text-[26px] sm:text-[24px]"*/}
                    {/*            >*/}
                    {/*                Các sản phẩm đang đấu giá*/}
                    {/*            </Heading>*/}
                    {/*            <div*/}
                    {/*                className="mr-2.5 flex items-center gap-5 self-stretch md:mr-0 md:flex-col">*/}
                    {/*                <div*/}
                    {/*                    className="relative h-[390px] w-[42%] rounded-md bg-gray-100_01 md:w-full">*/}
                    {/*                    <Img*/}
                    {/*                        src="images/img_men_s_clothing_234x450.png"*/}
                    {/*                        alt="Auction Clothing Image"*/}
                    {/*                        className="absolute bottom-[-1px] right-[1.54px] m-auto h-[234px] w-[86%] rounded-md object-contain"*/}
                    {/*                    />*/}
                    {/*                    <div*/}
                    {/*                        className="absolute left-0 right-0 top-[11%] mx-12 my-auto flex flex-1 flex-col items-start gap-2 md:mx-0">*/}
                    {/*                        <Text*/}
                    {/*                            as="p"*/}
                    {/*                            className="text-[14px] font-normal text-blue-a700"*/}
                    {/*                        >*/}
                    {/*                            Chỉ từ 150K*/}
                    {/*                        </Text>*/}
                    {/*                        <Heading*/}
                    {/*                            size="text7xl"*/}
                    {/*                            as="p"*/}
                    {/*                            className="text-[28px] font-medium leading-[35px] text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"*/}
                    {/*                        >*/}
                    {/*                            <>*/}
                    {/*                                Discover Real <br/>*/}
                    {/*                                Organic Flavors*/}
                    {/*                            </>*/}
                    {/*                        </Heading>*/}
                    {/*                        <div*/}
                    {/*                            className="flex flex-col items-start justify-center gap-0.5 self-stretch">*/}
                    {/*                            <Text*/}
                    {/*                                size="textlg"*/}
                    {/*                                as="p"*/}
                    {/*                                className="text-[15px] font-medium text-gray-900_01"*/}
                    {/*                            >*/}
                    {/*                                Mua ngay*/}
                    {/*                            </Text>*/}
                    {/*                            <div className="h-[2px] w-[32px] bg-gray-900_01"/>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="ml-5 flex flex-1 md:ml-0 md:flex-col md:self-stretch">*/}
                    {/*                    <Suspense fallback={<div>Loading feed...</div>}>*/}
                    {/*                        {beautyProductsList.map((d, index) => (*/}
                    {/*                            <ProductDetails11*/}
                    {/*                                {...d}*/}
                    {/*                                key={"auctionProductList" + index}*/}
                    {/*                                className="w-[32%]"*/}
                    {/*                            />*/}
                    {/*                        ))}*/}
                    {/*                    </Suspense>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <Heading
                            size="text7xl"
                            as="h2"
                            className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                        >
                            Sản phẩm tham gia nhiều nhất
                        </Heading>
                        <div className="mr-3.5 md:mr-0">
                            {/*<FeaturedProducts/>*/}
                            <RecentProductsSection itemData={dataFT} itemLoading={loadingFT} itemError={isError}/>
                        </div>
                    </div>

                    {/* recent products section */}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <Heading
                            size="text7xl"
                            as="h2"
                            className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                        >
                            Sản phẩm tham gia nhiều nhất
                        </Heading>
                        <div className="mr-3.5 md:mr-0">
                            <RecentProductsSection itemData={itemData} itemLoading={itemLoading} itemError={itemError}/>
                        </div>
                    </div>

                    {/* trusted brands section */}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <Heading
                            size="text7xl"
                            as="h2"
                            className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                        >
                            Sản phẩm
                        </Heading>
                        <div className="mr-3.5 md:mr-0">
                            <RecentProductsSection itemData={itemData} itemLoading={itemLoading} itemError={itemError}/>
                            {/*<TrustedBrandsSection />*/}
                        </div>
                    </div>

                    {/* fashion promotion section */}
                    <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
                        <div className="mr-3.5 md:mr-0">
                            <FeaturedProductsSection/>
                        </div>
                    </div>
                    {/*<FashionPromotionSection />*/}
                    <div className="mt-[19px] self-stretch">
                        <FooterBK/>
                    </div>
                </div>
            </div>
        </>
    );
}
