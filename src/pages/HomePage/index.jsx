import { Helmet } from "react-helmet";
import { Text, Heading, Img, ButtonDH, Slider } from "../../components";
import Header2 from "../../components/Header2";
import FeaturedProductsSection from "./FeaturedProductsSection";
import RecentProductsSection from "./RecentProductsSection";
import TrendingProductsSection from "./TrendingProductsSection";
import React, { Suspense } from "react";
import FooterBK from "../../components/FooterBK/index.jsx";
import { Button, IconButton } from "@material-tailwind/react";
import {
  useGetFeatureItemsQuery,
  useGetMostParticipatingItemsQuery,
} from "@/services/item.service.js";
import "./index.css";

export default function HomePagePage() {
  const [sliderState, setSliderState] = React.useState(0);
  const [sliderState1, setSliderState1] = React.useState(0);
  const sliderRef1 = React.useRef(null);
  const sliderRef = React.useRef(null);
  // const items = Array.isArray(data) ? data : [];
  const {
    data: itemData,
    isError: itemError,
    isLoading: itemLoading,
    refetch,
  } = useGetMostParticipatingItemsQuery();
  const {
    data: dataFT,
    isLoading: loadingFT,
    isError,
    error,
  } = useGetFeatureItemsQuery();
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
        settings: { slidesToShow: 3, centerPadding: "50px" },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, centerPadding: "30px" },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: "10px" },
      },
    ],
  };
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="w-full bg-bg-white">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center self-stretch ">
            <Header2 />
            <div className="container-xs relative mt-3 md:px-5">
              <div className="relative mr-2.5 h-[450px] content-end rounded-md border-spacing-3 bg-gradient-to-b from-blue-gray-100 to-blue-gray-600 border-gray-600 bg-gray-200 md:mr-0 md:h-auto">
                <div className="mx-auto flex w-full px-1">
                  <Slider {...sliderSettings} ref={sliderRef}>
                    {/* Slide 1 */}

                    <div className="flex items-start md:flex-col mt-2 rounded-full object-fill">
                      {/* Phần nội dung bên trái */}
                      <div className="mt-[62px] flex w-[46%] flex-col items-start gap-6 md:w-full ml-auto">
                        <Heading
                          size="heading5xl"
                          as="h1"
                          className="text-[48px] font-semibold uppercase leading-[60px] bg-gradient-to-tl from-gray-500 to-gray-900 text-transparent bg-clip-text md:text-[44px] sm:text-[38px]"
                        >
                          <span className="inline-block animate-fade-up">
                            ĐẤU GIÁ ĐIỆN THOẠI CŨ
                          </span>
                        </Heading>
                        <Heading
                          as="h2"
                          className="w-[86%] text-[16px] font-normal leading-[150%] text-blue-gray-600 md:w-full"
                        >
                          Săn lùng smartphone chất lượng với mức giá “không
                          tưởng”
                        </Heading>

                        {/* Mô tả chi tiết */}
                        <p className="text-blue-gray-700 text-[14px] leading-[22px] mt-2">
                          Bạn đang tìm kiếm một chiếc điện thoại cũ bền bỉ, đã
                          qua kiểm định để tiết kiệm chi phí nhưng vẫn đảm bảo
                          chất lượng? Hãy tham gia phiên đấu giá ngay hôm nay!
                          Tại Đấu Giá Việt, mọi sản phẩm đều được kiểm tra kỹ
                          lưỡng trước khi đưa ra đấu giá, giúp bạn yên tâm về
                          nguồn gốc và tình trạng thiết bị. Bạn sẽ có cơ hội sở
                          hữu những chiếc flagship đời trước hay những mẫu tầm
                          trung đáng tin cậy – tất cả với mức giá vô cùng hấp
                          dẫn.
                        </p>

                        {/* Nút kêu gọi hành động */}
                        <Button
                          color="green_A700"
                          size="xl"
                          shape="round"
                          className="min-w-[176px] rounded-md px-[34px] sm:px-5 mt-4 bg-teal-500 text-white transition-transform duration-300 hover:scale-105 hover:bg-teal-600 shadow-lg hover:shadow-xl"
                          onClick={() => e.target}
                        >
                          Tham gia ngay
                        </Button>
                      </div>

                      {/* Phần hình ảnh bên phải */}
                      <div className="relative h-[446px] w-[50%] flex items-center justify-center px-8 md:h-auto md:w-full sm:px-5">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-[360px] w-[360px] rounded-full bg-green-500 opacity-20" />
                        </div>
                        <div className="relative w-full max-w-[80%]">
                          <Img
                            src="https://firebasestorage.googleapis.com/v0/b/asfsg-538c3.appspot.com/o/banner1.jpg?alt=media&token=04c60fb5-896d-45d3-b43a-a77e4ba8ce63"
                            alt="Used Smartphone Auction"
                            className="w-full h-[300px] rounded-xl object-cover shadow-lg transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slide 2 - Đồ Secondhand */}
                    <div className="flex items-start md:flex-col mt-2 rounded-full object-fill">
                      {/* Phần nội dung bên trái */}
                      <div className="mt-[62px] flex w-[46%] flex-col items-start gap-6 md:w-full ml-auto">
                        <Heading
                          size="heading5xl"
                          as="h1"
                          className="text-[48px] font-semibold uppercase leading-[60px] bg-gradient-to-tl from-gray-500 to-gray-900 text-transparent bg-clip-text md:text-[44px] sm:text-[38px]"
                        >
                          <span className="inline-block animate-fade-up">
                            ĐẤU GIÁ SECONDHAND
                          </span>
                        </Heading>
                        <Heading
                          as="h2"
                          className="w-[86%] text-[16px] font-normal leading-[150%] text-blue-gray-600 md:w-full"
                        >
                          Sưu tầm và tái sử dụng những món đồ “có một không hai”
                        </Heading>

                        {/* Mô tả chi tiết */}
                        <p className="text-blue-gray-700 text-[14px] leading-[22px] mt-2">
                          Đối với những tín đồ mê “đồ đã qua sử dụng”, mỗi món
                          secondhand đều ẩn chứa một câu chuyện riêng. Tại Đấu
                          Giá Việt, chúng tôi chỉ tập trung vào những sản phẩm
                          secondhand chất lượng – từ điện thoại, quần áo, phụ
                          kiện thời trang, đồ gia dụng cho đến đồ cổ có giá trị
                          sưu tầm. Hãy tham gia phiên đấu giá để sở hữu những
                          món đồ độc đáo, góp phần bảo vệ môi trường và tối ưu
                          chi phí. Tất cả sản phẩm đều được kiểm định kỹ lưỡng,
                          giúp bạn hoàn toàn yên tâm khi đặt giá.
                        </p>

                        {/* Nút kêu gọi hành động */}
                        <Button
                          color="green_A700"
                          size="xl"
                          shape="round"
                          className="min-w-[176px] rounded-md px-[34px] sm:px-5 mt-4 bg-teal-500 text-white transition-transform duration-300 hover:scale-105 hover:bg-teal-600 shadow-lg hover:shadow-xl"
                          onClick={() => e.target}
                        >
                          Khám phá ngay
                        </Button>
                      </div>

                      {/* Phần hình ảnh bên phải */}
                      <div className="relative h-[446px] w-[50%] flex items-center justify-center px-8 md:h-auto md:w-full sm:px-5">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-[360px] w-[360px] rounded-full bg-green-500 opacity-20" />
                        </div>
                        <div className="relative w-full max-w-[80%]">
                          <Img
                            src="https://firebasestorage.googleapis.com/v0/b/asfsg-538c3.appspot.com/o/banner2.jpg?alt=media&token=ea18305c-e4f3-4399-a24a-01d56892819e"
                            alt="Secondhand Auction"
                            className="w-full h-[300px] rounded-xl object-cover shadow-lg transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slide 3 - Secondhand & Bảo vệ môi trường */}
                    <div className="flex items-start md:flex-col mt-2 rounded-full object-fill">
                      {/* Phần nội dung bên trái */}
                      <div className="mt-[40px] flex w-[50%] flex-col items-start gap-6 md:w-full ml-auto">
                        <Heading
                          size="heading5xl"
                          as="h1"
                          className="text-[45px] font-semibold uppercase leading-[60px] bg-gradient-to-tl from-gray-500 to-gray-900 text-transparent bg-clip-text md:text-[44px] sm:text-[38px]"
                        >
                          <span className="inline-block animate-fade-up">
                            CHUNG TAY BẢO VỆ MÔI TRƯỜNG
                          </span>
                        </Heading>

                        <Heading
                          as="h2"
                          className="w-[86%] text-[16px] font-normal leading-[150%] text-blue-gray-600 md:w-full"
                        >
                          Sử dụng lại, tiếp nối vòng đời cho món đồ secondhand
                        </Heading>

                        {/* Mô tả chi tiết */}
                        <p className="text-blue-gray-700 text-[14px] leading-[22px] mt-2">
                          Mỗi món đồ secondhand tiếp tục được sử dụng là một
                          cách tích cực để giảm thiểu rác thải, tiết kiệm năng
                          lượng và tài nguyên sản xuất mới. Tại Đấu Giá Việt,
                          chúng tôi tạo ra một không gian đấu giá minh bạch, nơi
                          bạn có thể “hồi sinh” những món đồ cũ thành những vật
                          phẩm ý nghĩa, đồng thời tiết kiệm chi phí. Hãy tham
                          gia để chung tay bảo vệ môi trường – mọi hành động nhỏ
                          bé hôm nay sẽ góp phần tạo nên tương lai bền vững cho
                          thế hệ mai sau.
                        </p>

                        {/* Nút kêu gọi hành động */}
                        <Button
                          color="green_A700"
                          size="xl"
                          shape="round"
                          className="min-w-[176px] rounded-md px-[34px] sm:px-5 mt-4 bg-teal-500 text-white transition-transform duration-300 hover:scale-105 hover:bg-teal-600 shadow-lg hover:shadow-xl"
                          onClick={() => e.target}
                        >
                          Đấu giá ngay
                        </Button>
                      </div>

                      {/* Phần hình ảnh bên phải */}
                      <div className="relative h-[446px] w-[45%] flex items-center justify-center px-8 md:h-auto md:w-full sm:px-5">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-[360px] w-[360px] rounded-full bg-green-500 opacity-20" />
                        </div>
                        <div className="relative w-full max-w-[80%]">
                          <Img
                            src="https://firebasestorage.googleapis.com/v0/b/asfsg-538c3.appspot.com/o/banner3.jpg?alt=media&token=4275a56e-feb4-4f03-ad2a-0bf0f689fb26"
                            alt="Secondhand Green Auction"
                            className="w-full h-[300px] rounded-xl object-cover shadow-lg transition-transform duration-500 ease-in-out hover:scale-110 hover:shadow-2xl"
                          />
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
              <TrendingProductsSection />
            </div>
          </div>

          {/*/!* featured products section *!/*/}
          {/*<div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">*/}
          {/*  <div className="mr-3.5 md:mr-0">*/}
          {/*    <FeaturedProductsSection />*/}
          {/*  </div>*/}
          {/*</div>*/}
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
              Sản phẩm được đăng ký tham gia nhiều
            </Heading>
            <div className="mr-3.5 md:mr-0">
              {/*<FeaturedProducts/>*/}
              <RecentProductsSection
                itemData={dataFT}
                itemLoading={loadingFT}
                itemError={isError}
              />
            </div>
          </div>

          {/* recent products section
          <div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">
            <Heading
              size="text7xl"
              as="h2"
              className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
            >
              Sản phẩm tham gia nhiều nhất
            </Heading>
            <div className="mr-3.5 md:mr-0">
              <RecentProductsSection
                itemData={itemData}
                itemLoading={itemLoading}
                itemError={itemError}
              />
            </div>
          </div> */}

          {/*/!* trusted brands section *!/*/}
          {/*<div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">*/}
          {/*  <Heading*/}
          {/*    size="text7xl"*/}
          {/*    as="h2"*/}
          {/*    className="self-center text-[28px] mb-5 font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"*/}
          {/*  >*/}
          {/*    Các phiên đấu giá*/}
          {/*  </Heading>*/}
          {/*  <div className="mr-3.5 md:mr-0">*/}
          {/*    <RecentProductsSection*/}
          {/*      itemData={itemData}*/}
          {/*      itemLoading={itemLoading}*/}
          {/*      itemError={itemError}*/}
          {/*    />*/}
          {/*    /!*<TrustedBrandsSection />*!/*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*/!* fashion promotion section *!/*/}
          {/*<div className="container-xs mt-[92px] flex flex-col gap-[30px] md:px-5">*/}
          {/*  <div className="mr-3.5 md:mr-0">*/}
          {/*    <FeaturedProductsSection />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<FashionPromotionSection />*/}
          <div className="mt-[19px] self-stretch">
            <FooterBK />
          </div>
        </div>
      </div>
    </>
  );
}
