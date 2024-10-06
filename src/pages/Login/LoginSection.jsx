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
//import { useTranslation } from "react-i18next";

export default function LoginSection() {
  // const { t } = useTranslation();
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
  console.log("email: ", email);
  console.log("password: ", password);
  return (
    <>
      {/* login section */}
      <div className="mt-[134px] flex justify-center">
        <div className="container-xs flex items-center justify-between gap-5 px-2.5 md:flex-col md:px-5">
          <div className="ml-1 flex w-[50%] flex-col items-start gap-[50px] rounded-[40px] bg-white-a700_4c py-7 pl-20 pr-14 md:ml-0 md:w-full md:px-5 sm:p-5">
            <Heading
              size="heading5xl"
              as="h1"
              className="ml-[72px] text-[48px] font-semibold uppercase text-blue_gray-900_01 md:ml-0 md:text-[44px] sm:text-[38px]"
            >
              Đăng nhập
            </Heading>
            <div className="mb-[102px] mr-2 self-stretch md:mr-0">
              <div className="flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h2"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Tài khoản
                </Heading>
                <InputDH
                  shape="round"
                  name="Name Field"
                  placeholder={`Nhập tên đầy đủ`}
                  value={email}
                  onChange={handleUserInput}
                  ref={userRef}
                  required
                  className="self-stretch rounded-md border-none outline-none px-3.5 !text-blue_gray-900_01 shadow-none"
                />
              </div>
              <div className="mt-5 flex flex-col items-start justify-center gap-2.5">
                <Heading
                  size="headingxl"
                  as="h3"
                  className="text-[16px] font-semibold text-blue_gray-900_01"
                >
                  Mật khẩu
                </Heading>
                <InputDH
                  shape="round"
                  type="password"
                  name="Password Field"
                  placeholder={`Mật khẩu của bạn`}
                  value={password}
                  onChange={handlePwdInput}
                  required
                  className="self-stretch rounded-md border border-solid border-gray-200 px-3.5"
                />
              </div>
              <div className="mt-9 flex flex-col items-center">
                <div className="self-stretch">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-5">
                      <CheckBox
                        name="Remember Checkbox"
                        label="Nhớ mật khẩu"
                        id="RememberCheckbox"
                        className="mt-1 gap-3 self-end text-[14px] text-blue_gray-900_01"
                      />
                      <Text
                        as="p"
                        className="self-start text-[14px] font-normal text-blue_gray-600_01"
                      >
                        Quên mật khẩu?
                      </Text>
                    </div>
                    <ButtonDH
                      color="green_A700"
                      size="3xl"
                      shape="round"
                      className="self-stretch rounded-md border-[0.5px] border-solid border-green-a700 px-[34px] font-semibold shadow-md sm:px-5"
                      onClick={handleSubmit}
                    >
                      Đăng nhập
                    </ButtonDH>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/embed/bv8Fxk0sz7I"
                  target="_blank"
                >
                  <Text
                    as="p"
                    className="mt-[26px] text-[14px] font-normal text-blue_gray-900_01"
                  >
                    <span className="text-blue_gray-900_01">
                      Bạn chưa có tài khoản?&nbsp;
                    </span>
                    <span className="text-green-a700">Đăng ký</span>
                  </Text>
                </a>
                <div className="mt-3.5 flex rounded-[24px] bg-bg-white p-1.5">
                  <Text
                    as="p"
                    className="text-[14px] font-normal text-blue_gray-900_01"
                  >
                    hoặc
                  </Text>
                </div>
                <ButtonDH
                  size="xs"
                  shape="round"
                  leftIcon={
                    <Img
                      src="images/img_image.png"
                      alt="Image"
                      className="mb-0.5 h-[16px] w-[24px] object-cover"
                    />
                  }
                  className="mt-[18px] min-w-[208px] rounded-lg border-[0.5px] border-solid border-black-900 px-6 capitalize text-black-900 sm:px-5"
                >
                  Login with Google
                </ButtonDH>
              </div>
            </div>
          </div>
          <Img
            src="images/img_image_742x550.png"
            alt="Promo Image"
            className="h-[742px] w-[42%] rounded-[20px] object-contain md:w-full"
          />
        </div>
      </div>
    </>
  );
}
