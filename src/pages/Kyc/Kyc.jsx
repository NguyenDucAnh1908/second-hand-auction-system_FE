import React, { useState } from 'react';
import { TextArea, Heading } from "../../components";
import FooterBK from "../../components/FooterBK/index.jsx";
import { ButtonDH } from "../../components/index.jsx";
import { useGetKYCByIdQuery, useUpdateKycMutation } from "../../services/kyc.service.js";
import { useParams } from 'react-router-dom';
import DatePicker from 'react-flatpickr';
import { Input } from 'antd';

export default function KiemduyetStaffPage() {
    const { id } = useParams();
    const { data: kycData, error, isLoading } = useGetKYCByIdQuery(id);
    const [updateKyc] = useUpdateKycMutation();
    const [verifiedBy, setVerifiedBy] = useState('');
    const [reason, setReason] = useState('');
    const [isReasonFormOpen, setIsReasonFormOpen] = useState(false);
    const [actionStatus, setActionStatus] = useState('');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading KYC details: {error.message}</div>;

    const handleRejectClick = () => {
        setIsReasonFormOpen(!isReasonFormOpen);
        setActionStatus('REJECTED');
    };

    const handleApproveClick = async () => {
        setActionStatus('APPROVED');
        await handleUpdateKyc('APPROVED');
    };

    const handleAdditionalRequestClick = async () => {
        setActionStatus('PENDING');
        await handleUpdateKyc('PENDING');
    };

    const handleUpdateKyc = async (status) => {
        try {
            await updateKyc({ kycId: id, verifiedBy, reason }).unwrap();
            console.log(`KYC ${status} successfully`);
        } catch (err) {
            console.error("Failed to update KYC:", err);
        }
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };

    // Destructuring kycData here for easy access
    const { fullName, gender, email, phoneNumber, birthday, cccdNumber, occupation, age, frontDocumentUrl, backDocumentUrl } = kycData?.data || {};

    return (
        <div className="w-full bg-white-a700">
            <div className="flex flex-col items-center gap-10 bg-white-a700">
                <div className="mx-auto mt-5 w-full max-w-[1292px] flex gap-5 px-5">
                    <div className="flex-grow">
                        <Heading size="textlg" as="h2" className="text-[24px] font-bold text-blue_gray-900 text-center">
                            Thẩm định KYC
                        </Heading>
                        <VerificationSection kycData={kycData} />
                        <br/>
                        <div className="flex gap-5 justify-center">
                            <ButtonDH
                                shape="round"
                                className="min-w-[152px] px-[33px] font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90 transition duration-300"
                                onClick={handleApproveClick}
                            >
                                Phê Duyệt
                            </ButtonDH>
                            <ButtonDH
                                shape="round"
                                className="min-w-[142px] bg-gradient-to-r from-yellow-400 to-yellow-600 px-[33px] font-medium text-blue_gray-900 hover:opacity-90 transition duration-300"
                                onClick={handleAdditionalRequestClick}
                            >
                                YC Bổ Sung
                            </ButtonDH>
                            <ButtonDH
                                shape="round"
                                className="min-w-[142px] bg-gradient-to-r from-red-500 to-red-700 px-[33px] font-medium text-white hover:opacity-90 transition duration-300"
                                onClick={handleRejectClick}
                            >
                                Từ Chối
                            </ButtonDH>
                        </div>

                        {isReasonFormOpen && (
                            <div className="mt-4">
                                <TextArea
                                    label="Lý do từ chối"
                                    value={reason}
                                    onChange={handleReasonChange}
                                    rows={4}
                                />
                                <ButtonDH
                                    shape="round"
                                    className="mt-2 bg-gradient-to-r from-red-500 to-red-700 text-white"
                                    onClick={async () => {
                                        await handleUpdateKyc('REJECTED');
                                        console.log("Rejected with reason:", reason);
                                        setIsReasonFormOpen(false);
                                    }}
                                >
                                    Gửi lý do
                                </ButtonDH>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full h-px bg-gray-200 my-5" />
            </div>
        </div>
    );
}

function VerificationSection({ kycData }) {
    if (!kycData || !kycData.data) return null;

    return (
        <form className="flex flex-col gap-8 w-full p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Họ tên đầy đủ
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.fullName}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Giới tính
                        </Heading>
                        <div className="flex gap-3">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={kycData.data.gender === "MALE"}
                                    readOnly
                                    className="text-blue-600"
                                />
                                Nam
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={kycData.data.gender === "FEMALE"}
                                    readOnly
                                    className="text-blue-600"
                                />
                                Nữ
                            </label>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Email
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.email}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Số điện thoại
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.phoneNumber}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Ngày sinh
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.birthday}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            CCCD
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.cccdNumber}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Ảnh mặt trước
                        </Heading>
                        <img className="w-[50%] h-[50%] object-cover rounded-md" src={kycData.data.frontDocumentUrl} alt="Front Document" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Ảnh mặt sau
                        </Heading>
                        <img className="w-[50%] h-[50%] object-cover rounded-md" src={kycData.data.backDocumentUrl} alt="Back Document" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Thành Phố/Tỉnh thành
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.address.province_name}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Quận/Huyện
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.address.district_name}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Phường/Xã
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.address.ward_name}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Địa chỉ
                        </Heading>
                        <span className="border rounded-md bg-gray-100 px-4 py-2">
                            {kycData.data.address.address_name}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Ngày tạo
                        </Heading>
                        <DatePicker className="border rounded-md p-2" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Người kiểm duyệt
                        </Heading>
                        <Input className="border rounded-md p-2" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
                            Lý do
                        </Heading>
                        <Input className="border rounded-md p-2" />
                    </div>
                </div>
            </div>
        </form>
    );
}
