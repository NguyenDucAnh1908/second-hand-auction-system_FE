import {
  Img,
  ButtonDH,
  Text,
  CheckBox,
  InputDH,
  Heading,
} from "../../components";
import React from "react";
import useHook from "./hook/useHook";
import { Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom"; // Import Link

export default function LoginSection() {
  const {
    email,
    password,
    errMsg,
    isLoading,
    userRef,
    errRef,
    handleUserInput,
    handlePwdInput,
    handleSubmit,
  } = useHook();

  return (
    <div className="mt-[134px] flex justify-center">
      <div className="container-xs flex w-full items-center justify-between gap-5 px-2.5 md:flex-col md:px-5">
        {/* Left side: Image */}
        <Img
          src="images/img_image_742x550.png"
          alt="Promo Image"
          className="h-[742px] w-[50%] rounded-[20px] object-contain md:w-full"
        />

        {/* Right side: Blurred Login form */}
        <div className="relative w-[50%] md:w-full">
          <div className="ml-1 flex flex-col items-start gap-[40px] rounded-[40px] bg-white bg-opacity-60 backdrop-blur-lg py-7 pl-20 pr-14 md:ml-0 md:px-5 sm:p-5">
            <Heading
              size="heading5xl"
              as="h1"
              className="ml-[72px] text-[48px] font-semibold uppercase text-blue-gray-800 md:ml-0 md:text-[44px] sm:text-[38px]"
            >
              Đăng nhập
            </Heading>

            <div className="mb-[100px] mr-2 self-stretch md:mr-0">
              {/* Email Input */}
              <div className="flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h2"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Tài khoản
                </Heading>
                <Input
                  shape="round"
                  name="Name Field"
                  placeholder="Nhập tên đầy đủ"
                  value={email}
                  onChange={handleUserInput}
                  ref={userRef}
                  required
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                  style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
              </div>

              {/* Password Input */}
              <div className="mt-5 flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h3"
                  className="text-[16px] font-semibold text-blue-gray-800"
                >
                  Mật khẩu
                </Heading>
                <Input
                  shape="round"
                  name="Password"
                  type="password"
                  placeholder="Nhập tên mật khẩu"
                  value={password}
                  onChange={handlePwdInput}
                  ref={userRef}
                  required
                  className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                  style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                />
              </div>

              {/* Remember me and forgot password */}
              <div className="mt-9 flex flex-col items-center">
                <div className="self-stretch">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-5">
                      <CheckBox
                        name="Remember Checkbox"
                        label="Nhớ mật khẩu"
                        id="RememberCheckbox"
                        className="mt-1 gap-3 self-end text-[14px] text-blue-gray-800"
                      />
                      <Link to="/ForgotPassword" >
                        <Text
                          as="p"
                          className="self-start text-[14px] font-normal text-blue-gray-800 cursor-pointer hover:text-gray-700"
                        >

                          Quên mật khẩu?
                        </Text>
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <ButtonDH
                      color="green_A700"
                      size="3xl"
                      shape="round"
                      className="self-stretch mt-5 rounded-full bg-blue-gray-500 text-white px-8 py-4 font-semibold shadow-lg transition transform hover:bg-black-800 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:px-5"
                      onClick={handleSubmit}
                    >
                      Đăng nhập
                    </ButtonDH>
                  </div>
                </div>

                {/* Register and Social Login */}
                <Link
                  to="/register"
                  className="mt-[26px] text-[14px] font-normal hover:text-gray-700"
                >
                  <Text as="p" className="text-blue_gray-900_01">
                    Bạn chưa có tài khoản?&nbsp;
                    <span className="text-green-a700">Đăng ký</span>
                  </Text>
                </Link>

                <div className="mt-3.5 flex rounded-[24px] bg-bg-white p-1.5">
                  <Text as="p" className="text-[14px] font-normal ">
                    hoặc
                  </Text>
                </div>
                <ButtonDH
                  className="flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold px-6 py-3 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-5"
                >
                  <Img
                    src="https://www.pngmart.com/files/16/Google-Logo-PNG-Image.png" // Replace with your Google icon path
                    alt="Google Icon"
                    className="mr-2 h-5 w-5" // Adjust size as needed
                  />
                  <p>Login with Google</p>
                </ButtonDH>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
