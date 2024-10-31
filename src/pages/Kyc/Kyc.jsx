import React, { useState, useEffect } from 'react';
import { TextArea, Heading } from "../../components";
import FooterBK from "../../components/FooterBK/index.jsx";
import { ButtonDH } from "../../components/index.jsx";
import { useGetKYCByIdQuery, useUpdateKycMutation } from "../../services/kyc.service.js";
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import DatePicker from 'react-flatpickr';

export default function KiemduyetStaffPage() {
    const { id } = useParams();
    const { data: kycData, error, isLoading } = useGetKYCByIdQuery(id);
    const [updateKyc] = useUpdateKycMutation();
    const [status, setStatus] = useState(kycData?.data?.kycStatus);
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (kycData?.data) {
            setReason(kycData.data.reason || "");
        }
    }, [kycData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading KYC details: {error.message}</div>;

    const handleUpdateKyc = async (newStatus) => {
        console.log("New Status:", newStatus);
        if (!newStatus) {
            alert("Status cannot be null!");
            return;
        }

        try {
            if (!kycData || !kycData.data || !id) {
                throw new Error("KYC data or ID is not defined.");
            }

            const kycUpdateData = {
                kycId: id,
                kycData: { ...kycData.data, status: newStatus, reason },
            };
            console.log("Data to be sent to API:", kycUpdateData);

            const response = await updateKyc(kycUpdateData).unwrap();
            console.log("API response:", response);
            setStatus(newStatus);
            alert("KYC updated successfully!");
        } catch (error) {
            console.error("Error updating KYC:", error);
            alert("Failed to update KYC: " + error.message);
        }
    };

    return (
        <div className="w-full bg-white-a700">
            <div className="flex flex-col items-center gap-10 bg-white-a700">
                <div className="mx-auto mt-5 w-full max-w-[1292px] flex gap-5 px-5">
                    <div className="flex-grow">
                        <Heading size="textlg" as="h2" className="text-[54px] font-bold text-blue_gray-900 text-center">
                            Thẩm định KYC
                        </Heading>
                        <VerificationSection kycData={kycData} />
                        <br />
                        <Input.TextArea
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Nhập lý do (nếu có)"
                        />
                        <div className="flex justify-center pt-6">
                            <div className="flex gap-5">
                                <ButtonDH
                                    shape="round"
                                    className="w-36 py-2 font-semibold bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                                    onClick={() => handleUpdateKyc('APPROVED')}
                                >
                                    <span className="flex items-center justify-center">
                                        Phê Duyệt
                                    </span>
                                </ButtonDH>
                                <ButtonDH
                                    shape="round"
                                    className="w-36 py-2 font-medium bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition duration-300"
                                    onClick={() => handleUpdateKyc('PENDING')}
                                >
                                    <span className="flex items-center justify-center">
                                        YC Bổ Sung
                                    </span>
                                </ButtonDH>
                                <ButtonDH
                                    shape="round"
                                    className="w-36 py-2 font-medium bg-red-500 text-white hover:bg-red-600 transition duration-300"
                                    onClick={() => handleUpdateKyc('REJECTED')}
                                >
                                    <span className="flex items-center justify-center">
                                        Từ Chối
                                    </span>
                                </ButtonDH>
                            </div>
                        </div>
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
                    <Field label="Họ tên đầy đủ" value={kycData.data.fullName} type="text" />
                    <GenderRow gender={kycData.data.gender} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Email" value={kycData.data.email} type="text" />
                    <Field label="Số điện thoại" value={kycData.data.phoneNumber} type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Ngày sinh" value={kycData.data.dob} type="text" />
                    <Field label="CCCD" value={kycData.data.cccdNumber} type="text" />
                </div>
                <DocumentImages frontUrl={kycData.data.frontDocumentUrl} backUrl={kycData.data.backDocumentUrl} />
                <AddressSection address={kycData.data.address} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Ngày tạo" value={kycData.data.submited} type="date" />
                </div>
            </div>
        </form>
    );
}

const Field = ({ label, value, type }) => (
    <div className="flex flex-col gap-2">
        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
            {label}
        </Heading>
        {type === "date" ? (
            <DatePicker
                value={new Date(value)}
                readOnly
                className="border rounded-md p-2"
            />
        ) : (
            <Input className="border rounded-md p-2" value={value || ''} readOnly />
        )}
    </div>
);

const GenderRow = ({ gender }) => (
    <div className="flex flex-col gap-2">
        <Heading size="textmd" as="h3" className="text-lg font-semibold text-gray-800">
            Giới tính
        </Heading>
        <div className="flex gap-3">
            <label className="flex items-center gap-1">
                <input type="radio" name="gender" value="male" checked={gender === "MALE"} readOnly className="text-blue-600" />
                Nam
            </label>
            <label className="flex items-center gap-1">
                <input type="radio" name="gender" value="female" checked={gender === "FEMALE"} readOnly className="text-blue-600" />
                Nữ
            </label>
        </div>
    </div>
);

const DocumentImages = ({ frontUrl, backUrl }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Hình ảnh mặt trước" value={frontUrl} type="text" />
        <Field label="Hình ảnh mặt sau" value={backUrl} type="text" />
    </div>
);

const AddressSection = ({ address }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Thành Phố/Tỉnh thành" value={address?.province_name || 'N/A'} type="text" />
        <Field label="Quận/Huyện" value={address?.district_name || 'N/A'} type="text" />
        <Field label="Phường/Xã" value={address?.ward_name || 'N/A'} type="text" />
        <Field label="Địa chỉ" value={address?.address_name || 'N/A'} type="text" />
    </div>
);
