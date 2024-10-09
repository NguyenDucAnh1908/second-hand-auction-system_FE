import React from "react";
import { Helmet } from "react-helmet";
import { TextArea, Heading, InputDH, Text, Img, CheckBox } from "../../components";
import Header2 from "../../components/Header2/index.jsx";
import FooterBK from "../../components/FooterBK/index.jsx";
import { ButtonDH } from "../../components/index.jsx";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import StaffVerificationSection from "./VerifaicationForm.jsx";
import AddressForm from "./Address.jsx";

export default function KiemduyetStaffPage() {
    return (
        <>
            <div className="w-full bg-white-a700">
                <Header2 />
                <div className="flex flex-col items-center gap-10 bg-white-a700">
                    <div className="mx-auto mt-5 w-full max-w-[1292px] flex gap-5 px-5">
                        <SiderUserBK className="flex-none w-[250px]" />
                        <div className="flex-grow">
                            <Heading size="textlg" as="h2" className="text-[24px] font-bold text-blue_gray-900 text-center">
                                Thẩm định KYC
                            </Heading>
                            <br />
                            <StaffVerificationSection />
                            <br />
                            <VerificationSection />
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-5" />
                </div>
            </div>
            <FooterBK />
        </>
    );
}

function VerificationSection() {
    return (
        <form className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <Text className="text-black-900 text-lg text-center">Hình ảnh giấy tờ tùy thân:</Text>
                <div className="flex justify-center gap-4"> {/* Added gap for spacing between images */}
                    <div className="flex flex-col items-center">
                        <Img
                            src="https://2sao.vietnamnetjsc.vn/images/2022/08/29/15/23/anh-the-02.jpg" // Replace with the dynamic image URL for the first image
                            alt="Identity Card Front"
                            className="w-[300px] h-auto rounded-md border" // Adjusted size for better visibility
                        />
                        <Text className="mt-1 text-sm text-gray-700">Mặt trước</Text> {/* Label for the first image */}
                    </div>
                    <div className="flex flex-col items-center">
                        <Img
                            src="https://2sao.vietnamnetjsc.vn/images/2022/08/29/15/23/anh-the-02.jpg" // Replace with the dynamic image URL for the second image
                            alt="Identity Card Back"
                            className="w-[300px] h-auto rounded-md border" // Adjusted size for better visibility
                        />
                        <Text className="mt-1 text-sm text-gray-700">Mặt sau</Text> {/* Label for the second image */}
                    </div>
                </div>
            </div>
            <div>
                <AddressForm />
            </div>
            {/* Verification Checkboxes */}
            <div className="flex flex-col gap-4">
                <CheckBox label="Xác minh tên, ngày sinh hợp lệ." className="text-[20px] text-black-900" />
                <CheckBox label="Xác minh giấy tờ tùy thân hợp lệ." className="text-[20px] text-black-900" />
                <CheckBox label="Xác minh địa chỉ hợp lệ." className="text-[20px] text-black-900" />
                <CheckBox label="Tài liệu xác minh hợp lệ." className="text-[20px] text-black-900" />
            </div>

            {/* Buttons */}
         

            {/* Reason Section */}
            <div className="flex flex-col items-start">
                <Heading size="textmd" as="p" className="text-[16px] font-medium text-blue_gray-900">
                    Lý do
                </Heading>
                <TextArea
                    size="sm"
                    name="Reason"
                    placeholder="Lý do..."
                    className="w-full rounded-md border px-3.5"
                />
            </div>
            <div className="flex gap-5 justify-center">
                <ButtonDH
                    shape="round"
                    className="min-w-[152px] px-[33px] font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90 transition duration-300"
                >
                    Phê Duyệt
                </ButtonDH>
                <ButtonDH
                    shape="round"
                    className="min-w-[142px] bg-gradient-to-r from-yellow-400 to-yellow-600 px-[33px] font-medium text-blue_gray-900 hover:opacity-90 transition duration-300"
                >
                    YC Bổ Sung
                </ButtonDH>
                <ButtonDH
                    shape="round"
                    className="min-w-[142px] bg-gradient-to-r from-red-500 to-red-700 px-[33px] font-semibold text-white hover:opacity-90 transition duration-300"
                >
                    Từ Chối
                </ButtonDH>
            </div>
        </form>
    );
}
