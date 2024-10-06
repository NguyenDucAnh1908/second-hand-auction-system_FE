import { Text, ButtonDH, InputDH, Heading, Img } from "../../components";
import React from "react";

export default function RegisterSection() {
  return (
    <>
      {/* register section */}
      <div className="mt-[116px] flex justify-center">
        <div className="container-xs flex items-center justify-center gap-[42px] md:flex-col md:px-5">
          <div className="flex-1 md:self-stretch">
            <Img
              src="images/img_image_1036x648.png"
              alt="Featured Image"
              className="h-[1036px] w-full rounded-[40px] object-cover md:h-auto"
            />
          </div>
          <div className="flex w-[48%] flex-col items-end rounded-[40px] bg-white-a700_4c px-7 py-[54px] md:w-full md:py-5 sm:p-5">
            <Heading
              size="heading4xl"
              as="h1"
              className="mr-9 text-[40px] font-semibold uppercase leading-[50px] text-blue_gray-900_01 md:mr-0 md:text-[38px] sm:text-[36px]"
            >
              Tạo tài khoản
            </Heading>
            <div className="mb-[142px] ml-4 flex flex-col items-center gap-[54px] self-stretch md:ml-0 sm:gap-[27px]">
              <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                <Heading
                  size="headingxl"
                  as="h2"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Tên
                </Heading>
                <InputDH
                  shape="round"
                  name="Name Field"
                  placeholder={`Nguyen Van A`}
                  className="self-stretch rounded-md border border-solid border-blue_gray-900_01 px-3.5 shadow-lg"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                <Heading
                  size="headingxl"
                  as="h3"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Số điện thoại
                </Heading>
                <InputDH
                  shape="round"
                  type="number"
                  name="Phone Field"
                  placeholder={`0123456789`}
                  className="self-stretch rounded-md border border-solid border-gray-200 px-3.5"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                <Heading
                  size="headingxl"
                  as="h4"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Email
                </Heading>
                <InputDH
                  shape="round"
                  type="email"
                  name="Email Field"
                  placeholder={`nguyenvana@gmail.com`}
                  className="self-stretch rounded-md border border-solid border-gray-200 px-3.5"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-2.5 self-stretch">
                <Heading
                  size="headingxl"
                  as="h5"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Mật khẩu
                </Heading>
                <InputDH
                  shape="round"
                  type="password"
                  name="Password Field"
                  placeholder={`******************`}
                  className="self-stretch rounded-md border border-solid border-gray-200 px-3.5"
                />
              </div>
              <a
                href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                target="_blank"
              >
                <ButtonDH
                  color="green_A700"
                  size="5xl"
                  shape="round"
                  className="self-stretch rounded-md border border-solid border-green-a700 px-[33px] font-semibold shadow-md sm:px-5"
                >
                  Tạo tài khoản
                </ButtonDH>
              </a>
              <a
                href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                target="_blank"
              >
                <Text
                  as="p"
                  className="text-[14px] font-normal text-blue_gray-900_01"
                >
                  <span className="text-blue_gray-900_01">
                    Bạn đã có tài khoản?&nbsp;
                  </span>
                  <span className="text-green-a700">Đăng nhập</span>
                </Text>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
