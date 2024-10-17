import {Img, ButtonDH, Text, InputDH, Heading} from "../../components";
import React from "react";
import {Link} from "react-router-dom"; // Import Link
import {Input} from "@material-tailwind/react";

export default function RegisterSection({
                                            email, setEmail, password, setPassword, fullName, setFullName,
                                            phoneNumber, setPhoneNumber, handleSubmit, isLoading
                                        }) {
    return (
        <div className="mt-[134px] flex justify-center">
            <div className="container-xs flex w-full items-stretch justify-between gap-5 px-2.5 md:flex-col md:px-5">
                {/* Left side: Image */}
                <Img
                    src="https://c.pxhere.com/photos/3f/aa/watch_3d_graphics_ticker_men_s_watch-386868.jpg!d"
                    alt="Featured Image"
                    className="h-[742px] w-[60%] rounded-[20px] object-cover md:w-full"
                />

                {/* Right side: Registration form */}
                <div className="relative w-[60%] md:w-full h-[742px]"> {/* Set height to match image height */}
                    <div
                        className="ml-1 flex flex-col items-start gap-[40px] rounded-[20px] bg-blue-gray-200 bg-opacity-90 backdrop-blur-lg py-7 pl-10 pr-10 md:ml-0 md:px-5 sm:p-5 shadow-lg h-full"> {/* Use h-full to take full height */}
                        <Heading
                            size="heading4xl"
                            as="h1"
                            className="ml-[0px] text-[38px] font-semibold uppercase text-blue-gray-800 md:ml-0 md:text-[44px] sm:text-[38px]"
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
                                    placeholder={`Input name`}
                                    className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
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
                                    placeholder={`Phone number`}
                                    className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                                    placeholder={`email`}
                                    className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    placeholder={`password`}
                                    className="self-stretch rounded-lg border-2 border-gray-400 bg-white text-gray-800 placeholder-gray-500 px-4 py-3 focus:ring-2 focus:ring-gray-600 focus:outline-none transition duration-150 ease-in-out shadow-md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Link to Login */}
                            <Link to="/login" className="mt-[26px] text-[14px] font-normal hover:text-gray-700">
                                <Text as="p" className="text-light-blue-800">
                                    Bạn đã có tài khoản?&nbsp;
                                    <span className="text-green-a700">Đăng nhập</span>
                                </Text>
                            </Link>

                            {/* Submit Button */}
                            <ButtonDH
                                color="green_A700"
                                size="3xl"
                                shape="round"
                                className="self-stretch w-full mt-5 rounded-full bg-blue-gray-500 text-white px-10 py-3 font-semibold text-lg shadow-lg transition transform hover:bg-black-800 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-6"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                Tạo tài khoản
                            </ButtonDH>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
