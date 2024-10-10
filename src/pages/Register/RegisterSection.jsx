import { Img, ButtonDH, Text, InputDH, Heading } from "../../components";
import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { Input } from "@material-tailwind/react";

export default function RegisterSection() {
  return (
    <div className="mt-[134px] flex justify-center">
      <div className="container-xs flex w-full items-center justify-between gap-5 px-2.5 md:flex-col md:px-5">
        {/* Left side: Image */}
        <Img
          src="images/img_image_1036x648.png"
          alt="Featured Image"
          className="h-[742px] w-[50%] rounded-[20px] object-contain md:w-full"
        />

        {/* Right side: Registration form */}
        <div className="relative w-[50%] md:w-full">
          <div className="ml-1 flex flex-col items-start gap-[40px] rounded-[40px] bg-white bg-opacity-60 backdrop-blur-lg py-7 pl-20 pr-14 md:ml-0 md:px-5 sm:p-5">
            <Heading
              size="heading5xl"
              as="h1"
              className="ml-[72px] text-[48px] font-semibold uppercase text-blue-gray-800 md:ml-0 md:text-[44px] sm:text-[38px]"
            >
              Tạo tài khoản
            </Heading>

            <div className="mb-[100px] mr-2 self-stretch md:mr-0">
              {/* Name Input */}
              <div className="flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h2"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Tên
                </Heading>
                <Input
                  shape="round"
                  name="Name Field"
                  placeholder={`Nguyen Van A`}
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                />
              </div>

              {/* Phone Input */}
              <div className="mt-5 flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h3"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Số điện thoại
                </Heading>
                <Input
                  shape="round"
                  type="text"
                  name="Phone Field"
                  placeholder={`0123456789`}
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                />
              </div>

              {/* Email Input */}
              <div className="mt-5 flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h4"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Email
                </Heading>
                <Input
                  shape="round"
                  type="email"
                  name="Email Field"
                  placeholder={`nguyenvana@gmail.com`}
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                />
              </div>

              {/* Password Input */}
              <div className="mt-5 flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h5"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Mật khẩu
                </Heading>
                <Input
                  shape="round"
                  type="password"
                  name="Password Field"
                  placeholder={`******************`}
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                />
              </div>

              {/* Submit Button */}
              <ButtonDH
                color="green_A700"
                size="3xl"
                shape="round"
                className="self-stretch w-full mt-5 rounded-full bg-blue-gray-500 text-white px-10 py-3 font-semibold text-lg shadow-lg transition transform hover:bg-black-800 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-6"
              >
                Tạo tài khoản
              </ButtonDH>


              {/* Link to Login */}
              <Link to="/login" className="mt-[26px] text-[14px] font-normal hover:text-gray-700">
                <Text as="p" className="text-blue_gray-900_01">
                  Bạn đã có tài khoản?&nbsp;
                  <span className="text-green-a700">Đăng nhập</span>
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
