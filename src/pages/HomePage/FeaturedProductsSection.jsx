import { Img, ButtonDH, Text, Heading } from "../../components";
import React from "react";

export default function FeaturedProductsSection() {
  return (
    <>
      {/* featured products section */}
      <div className="relative mt-[74px] h-[400px] self-stretch">
        <div className="container-xs absolute bottom-0 left-0 right-0 top-0 my-auto flex h-max flex-col items-end md:px-5">
          <div className="mr-3.5 self-stretch bg-gray-100_01 px-14 py-[60px] md:mr-0 md:p-5">
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <Text
                  as="p"
                  className="text-[14px] font-normal text-blue_gray-600_01"
                >
                  ĐỒNG HỒ ĐÔI - GẮN KẾT YÊU THƯƠNG
                </Text>
                <Heading
                  size="heading5xl"
                  as="h2"
                  className="text-[48px] font-semibold uppercase leading-[60px] text-blue_gray-900_01 md:text-[44px] sm:text-[38px]"
                >
                  <>
                    TÌM KIẾM MỚI
                    <br />
                    ĐỒNG HỒ CỦA BẠN
                  </>
                </Heading>
                <Text
                  as="p"
                  className="w-[22%] text-[14px] font-normal leading-[150%] text-blue_gray-600_01 md:w-full"
                >
                  Đồng hồ và dây đeo của bạn phải kết hợp hoàn hảo với nhau.
                </Text>
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
          </div>
          <div className="relative mr-60 mt-[-46px] h-[46px] w-[28px] rotate-[4deg] rounded-[50%] bg-light_green-900_99 blur-[40.00px] backdrop-opacity-[0.5] md:mr-0" />
        </div>
        <div className="absolute bottom-[0.82px] right-[24.40px] m-auto h-[312px] w-[34%] rounded-[242px] bg-green-a700_19" />
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[384px] w-[84%] content-center md:h-auto">
          <Img
            src="images/img_model_women.png"
            alt="Model Image"
            className="ml-auto h-[384px] w-[40%] object-contain"
          />
          <div className="absolute bottom-[-1.61px] right-[9%] m-auto h-[172px] w-[12%] rotate-[17deg] rounded-[50%] bg-gray-900_99 blur-[60.00px] backdrop-opacity-[0.5]" />
        </div>
        <Img
          src="images/img_model_men.png"
          alt="Men Model"
          className="absolute bottom-0 right-[1.13px] top-0 my-auto h-[394px] w-[28%] object-contain"
        />
      </div>
    </>
  );
}
