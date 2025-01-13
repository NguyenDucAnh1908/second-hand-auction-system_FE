import React from 'react';
import Header2 from '../../components/Header2';
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import { setUserKycStatus } from "../../redux/user/userSlice";


export default function MenuKyc() {
    const navigate = useNavigate();

    const userKycStatus = useSelector((state) => state.user.kycStatus);

    console.log("KYC: ",userKycStatus);

    const handleCreate = () => {
        navigate('/RegisterKYC');
    };

    const handleUpdate = () => {
        navigate('/UpdateKyc');
    };

    let mainButtonLabel = "";      // Text hiển thị trên nút chính
    let mainButtonAction = null;   // Hành động onClick

    if (userKycStatus === "none") {
        mainButtonLabel = "Tiếp tục";       // chưa gửi -> gửi mới
        mainButtonAction = handleCreate;
    } else if (userKycStatus === "rejected") {
        mainButtonLabel = "Cập nhật xác minh danh tính";
        mainButtonAction = handleUpdate;
    }

    return (
        <>
            <Header2 />
            <div className="flex container mx-auto mt-10 p-6">
                {/* Sidebar sát lề trái */}
                <div className="w-1/4 fixed left-0 h-full">
                    <SiderUserBK className="h-full bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-r-lg p-6 border-r border-gray-200" />
                </div>

                {/* Form xác minh danh tính */}
                <div className="flex-1 ml-64 p-10 bg-white rounded-2xl shadow-2xl mt-10">
                    <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200 mb-8 flex items-start shadow-sm">
                        <img
                            src="https://img.freepik.com/free-vector/shield-lock-cartoon-style_78370-1621.jpg"
                            alt="KYC Image"
                            className="w-20 h-20 mr-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <div>
                            <p className="text-blue-600 font-bold text-xl">Xác nhận danh tính</p>
                            {userKycStatus === "rejected" ? (
                                // TH kyc bị từ chối
                                <p className="text-red-600 mt-2 text-base leading-relaxed">
                                    Xác minh danh tính của bạn đã bị từ chối.<br />
                                    Vui lòng bấm nút <strong>Bổ sung</strong> để xem lý do từ chối và cập nhật lại thông tin.
                                </p>
                            ) : (
                                // TH khác
                                <p className="text-gray-700 mt-2 text-base leading-relaxed">
                                    Vui lòng hoàn tất xác thực danh tính để được đăng bán sản phẩm.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {/* Nếu trạng thái là none hoặc rejected => hiển thị nút chính */}
                        {(userKycStatus === "none" ||
                            userKycStatus?.toLowerCase() === "rejected") && (
                            <button
                                onClick={mainButtonAction}
                                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-blue-700"
                            >
                                {mainButtonLabel}
                            </button>
                        )}

                        {/* Nút Bổ sung thông tin (tuỳ logic hiển thị) */}
                        <button
                            onClick={handleUpdate}
                            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-gray-200"
                        >
                            Bổ sung thông tin
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
