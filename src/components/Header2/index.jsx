import { CloseSVG } from "../InputDH/close.jsx";
import { Text, SelectBox, Img, ButtonDH, InputDH } from "./..";
import NavBar from "../NavBar/index.jsx";
import React from "react";

export default function Header2({ ...props }) {
  const [searchBarValue, setSearchBarValue] = React.useState("");

  return (
    <header
      {...props}
      className={`${props.className} flex self-stretch items-center z-[3] relative`}
    >
      <div className="w-full">
        <div className="flex flex-col items-center bg-bg-white py-2.5">
          <div className="flex flex-col items-center gap-1 self-stretch">
            <div className="container-sm flex items-start justify-between gap-5 self-stretch md:flex-col md:px-5">
              <div className="flex w-[36%] items-center justify-center md:w-full sm:flex-col">
                <a href="#">
                  <Img
                    src="images/img_pin_1.svg"
                    alt="Pin Icon"
                    className="h-[24px] sm:w-full"
                  />
                </a>
                <Text className="ml-1 self-start text-[13px] font-normal text-blue_gray-900_01 sm:ml-0 sm:self-auto">
                  118 Cách Mạng Tháng 8
                </Text>
                <div className="ml-4 h-[32px] w-px bg-gray-200 sm:ml-0 sm:h-px sm:w-[32px]" />
                <div className="ml-5 flex flex-1 items-start justify-center gap-1 sm:ml-0 sm:self-stretch">
                  <a href="#">
                    <Img
                      src="images/img_phone_1.svg"
                      alt="Phone Icon"
                      className="h-[24px] self-end"
                    />
                  </a>
                  <Text className="font-bevietnampro text-[13px] font-normal text-blue_gray-900_01">
                    <span>Bạn cần trợ giúp? Gọi ngay:&nbsp;</span>
                    <span className="font-medium">+84 1800 900</span>
                  </Text>
                </div>
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
                    <ul className="relative !ml-[-82px] flex flex-wrap gap-[46px] self-end">
                      <li>
                        <a href="#">
                          <Text className="text-[13px] font-normal text-blue_gray-900_01">
                            Trợ giúp
                          </Text>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <Text className="text-[13px] font-normal text-blue_gray-900_01">
                            Tìm cửa hàng
                          </Text>
                        </a>
                      </li>
                    </ul>
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
              <Img
                src="images/img_header_logo.png"
                alt="Header Logo"
                className="h-[32px] w-[92px] self-end object-contain md:self-auto"
              />
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
                    <div className="flex rounded-md bg-green-a700_11 p-2.5">
                      <a href="#">
                        <Img
                          src="images/img_heart_1.svg"
                          alt="Heart Icon"
                          className="h-[18px]"
                        />
                      </a>
                    </div>
                    <Text className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                      <span className="text-[13px] font-normal">
                        <>
                          Yêu thích
                          <br />
                        </>
                      </span>
                      <span className="text-[16px] font-medium">Sản phẩm</span>
                    </Text>
                  </div>
                  <div className="flex flex-1 items-center justify-center gap-3.5 sm:self-stretch">
                    <a href="#">
                      <ButtonDH className="h-[48px] w-[50px] rounded-md bg-green-a700_11 p-2.5">
                        <Img src="images/img_profile_1.svg" />
                      </ButtonDH>
                    </a>
                    <Text className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                      <span className="text-[13px] font-normal">
                        <>
                          Đăng nhập
                          <br />
                        </>
                      </span>
                      <span className="text-[16px] font-medium">Tài khoản</span>
                    </Text>
                  </div>
                  <div className="relative h-[52px] w-[14%] self-center sm:w-full">
                    <div className="absolute bottom-[-0.82px] left-0 my-auto ml-auto mr-1 flex flex-1 flex-col items-center rounded-md bg-green-a700 px-3 py-3.5 md:mr-0">
                      <a href="#">
                        <Img
                          src="images/img_shopping_cart_1.svg"
                          alt="Cart Icon"
                          className="h-[18px]"
                        />
                      </a>
                    </div>
                    <Text className="absolute right-[0.12px] top-0 m-auto rounded-md bg-orange-300 p-0.5 text-[8px] font-bold text-blue_gray-900_02">
                      2
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[0.67px] bg-gray-200" />
          </div>
          <NavBar />
          {/*<div className="container-xs mt-1.5 flex flex-col items-start md:px-5">*/}
          {/*  <div className="flex w-[62%] items-start justify-between gap-5 md:w-full md:flex-col">*/}
          {/*    <SelectBox*/}
          {/*      indicator={<Img src="images/img_vector_bg_white_.svg" alt="Vector" className="h-[6px] w-[8px]" />}*/}
          {/*      name="Dropdown Categories"*/}
          {/*      placeholder={`Danh mục`}*/}
          {/*      options={dropDownOptions}*/}
          {/*      className="w-[38%] gap-4 self-center bg-green-a700 py-[18px] pl-[22px] pr-8 text-[16px] font-semibold text-bg-white md:w-full sm:px-5"*/}
          {/*    />*/}
          {/*    <ul className="!mt-3.5 flex flex-wrap gap-[66px] md:gap-5">*/}
          {/*      <li>*/}
          {/*        <a href="#">*/}
          {/*          <Text className="text-[16px] font-medium text-blue_gray-900_01">Trang chủ</Text>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <a href="#">*/}
          {/*          <Text className="text-[16px] font-medium text-blue_gray-900_01">Sản phẩm</Text>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <a href="#">*/}
          {/*          <Text className="text-[16px] font-medium text-blue_gray-900_01">Liên hệ</Text>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <a href="#">*/}
          {/*          <Text className="text-[16px] font-medium text-blue_gray-900_01">Bài viết</Text>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </header>
  );
}
