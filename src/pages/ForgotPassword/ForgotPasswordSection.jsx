import React from 'react';
import { Heading } from '../../components';

const ForgotPasswordSection = () => {
    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen ">
            
            <div className="flex items-center w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden"> {/* Tăng shadow và border-radius */}
               
                {/* Hình ảnh nằm ngang với form */}
                <img
                    src="https://static.danhgiaxe.com/data/201435/xe_co_mercedes-benz_999.jpg"
                    alt="Forgot Password"
                    className="w-1/2 h-auto max-h-[450px] object-cover rounded-l-lg" // Bo góc cho ảnh
                />
                <div className="p-12 w-1/2"> {/* Tăng padding cho form */}
                    <h2 className="text-4xl font-bold mb-8 text-center">Forgot Password</h2> {/* Tăng kích thước tiêu đề */}
                    <form>
                        {/* Ô nhập Email */}
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-lg font-bold mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Ô nhập OTP */}
                        <div className="mb-6">
                            <label
                                htmlFor="otp"
                                className="block text-gray-700 text-lg font-bold mb-2"
                            >
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter the OTP you received"
                                required
                                className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Ô nhập Mật khẩu mới */}
                        <div className="mb-6">
                            <label
                                htmlFor="newPassword"
                                className="block text-gray-700 text-lg font-bold mb-2"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter your new password"
                                required
                                className="shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Nút xác nhận */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className=" bg-blue-gray-500 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordSection;
