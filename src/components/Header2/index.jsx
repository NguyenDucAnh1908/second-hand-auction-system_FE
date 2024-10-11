import { CloseSVG } from "../InputDH/close.jsx";
import { Text, SelectBox, Img, ButtonDH, InputDH } from "./..";
import React from "react";
import NavBarBK from "@/components/NavBarBK/index.jsx";

export default function Header2({ ...props }) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <header
      {...props}
      className={`${props.className} flex self-stretch items-center z-[3] relative bg-gradient-to-b from-blue-gray-100 to-blue-gray-200`}
    >
      <div className="w-full">
        <div className="flex flex-col items-center bg-gradient-to-b from-blue-gray-100 to-blue-gray-200 py-2.5">
          <div className="flex flex-col items-center gap-1 self-stretch">
            <div className="container-sm flex items-start justify-between gap-5 self-stretch md:flex-col md:px-5">
              <div className="flex w-[40%] items-center justify-center md:w-full sm:flex-col ">
            
                <div className="ml-4 h-[32px] w-px bg-gray-200 sm:ml-0 sm:h-px sm:w-[32px]" />
           
              </div>

              <div className="mt-2 flex w-[28%] justify-center self-end p-2 md:w-full md:self-auto">
                <div className="flex w-[86%] items-center justify-center gap-3 md:w-full">
                  <div className="flex flex-1 items-center justify-center">
                    <div className="flex w-[34%] justify-center gap-[30px]">
                      <div className="flex flex-1">
                        <div className="h-[20px] w-px bg-gray-200" />
                      </div>
                      <div className="h-[20px] w-px bg-gray-200" />
                    </div>
            
                  </div>
                  <div className="h-[20px] w-px bg-gray-200" />
                  <div className="flex items-center gap-4 self-end">
                    <Img
                      src="images/img_facebook.svg"
                      alt="Facebook Icon"
                      className="h-[12px]"
                    />
                    <Img
                      src="images/img_intagram.svg"
                      alt="Instagram Icon"
                      className="h-[12px]"
                    />
                    <Img
                      src="images/img_twitter.svg"
                      alt="Twitter Icon"
                      className="h-[12px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1.17px] w-full self-stretch bg-gray-200" />
          </div>
          <div className="container-md mt-5 flex flex-col gap-9 self-stretch md:px-5">
            <div className="ml-[74px] mr-6 flex items-center justify-between gap-5 md:mx-0 md:flex-col">
              <a href="/">
                <Img
                  src="images/img_auction.png"
                  alt="Header Logo"
                  className="h-[60px] w-[60px] self-end object-contain md:self-auto"
                />
              </a>
              <div className="flex w-[86%] items-center justify-between gap-5 md:w-full md:flex-col">
                <InputDH
                  name="Search Box"
                  placeholder={`Tìm kiếm`}
                  value={searchBarValue}
                  onChange={(e) => setSearchBarValue(e.target.value)}
                  suffix={
                    searchBarValue?.length > 0 ? (
                      <CloseSVG
                        onClick={() => setSearchBarValue("")}
                        width={22}
                        fillColor="#112137ff"
                      />
                    ) : (
                      <Img
                        src="images/img_search.svg"
                        alt="Search"
                        className="h-[20px] w-[22px]"
                      />
                    )
                  }
                  className="mb-1 h-[38px] w-[62%] gap-4 self-end rounded-md border border-solid border-green-a700 px-3.5 text-[14px] text-blue_gray-600_01 md:w-full md:self-auto"
                />

                <div className="mr-4 flex w-[32%] items-end justify-center gap-4 md:mr-0 md:w-full sm:flex-col">
                  <div className="flex flex-1 justify-center gap-3.5 sm:self-stretch">
                    <div className="flex rounded-md bg-green-50 p-2.5">
                      <a href="#">
                        <Img
                          src="images/img_heart_1.svg"
                          alt="Heart Icon"
                          className="h-[18px]"
                        />
                      </a>
                    </div>
                    <Text className="font-semibold text-[14px] leading-[22px] text-gray-900">
                      <span className="text-[13px] font-normal">
                        Kênh
                        <br />
                      </span>
                      <span className="text-[16px] font-medium">Cửa hàng</span>
                    </Text>
                  </div>

                  <div className="flex flex-1 items-center justify-center gap-3.5 sm:self-stretch">
                    <a href="#">
                      <ButtonDH className="h-[48px] w-[50px] rounded-md bg-green-50 p-2.5 flex items-center justify-center">
                        <Img src="images/img_profile_1.svg" className="h-[20px]" />
                      </ButtonDH>
                    </a>
                    <Text className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                      <span className="text-[13px] font-normal">
                        Đăng nhập
                        <br />
                      </span>
                      <span className="text-[16px] font-medium">Tài khoản</span>
                    </Text>
                  </div>

                  <div className="relative h-[52px] w-[14%] self-center sm:w-full">
                    <div className="absolute bottom-[-0.82px] left-0 flex flex-col items-center rounded-md bg-green-500 px-3 py-3.5">
                      <a href="#">
                        <Img
                          src="images/img_shopping_cart_1.svg"
                          alt="Cart Icon"
                          className="h-[18px]"
                        />
                      </a>
                    </div>
                    <Text className="absolute right-0 top-0 m-auto rounded-md bg-orange-300 p-0.5 text-[8px] font-bold text-blue_gray-900_02">
                      2
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <NavBarBK />
          </div>
        </div>
      </div>
    </header>
  );
}
