import React, { useState, useEffect } from 'react';
import Header2 from '../../components/Header2';
import { SiderUserBK } from '@/components/SiderUser/SiderUserBK.jsx';
import FooterBK from '../../components/FooterBK';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Button, DatePicker, Radio, message, Upload } from 'antd';
import dayjs from 'dayjs';
import {kycApiSlice, useGetKYCByUserQuery, useUpdateKYCByUserMutation} from '../../services/kyc.service.js';
import useHookUploadImage from "../../hooks/useHookUploadImage.js";
import { useNavigate } from 'react-router-dom';
import { Textarea } from "@material-tailwind/react";

export default function UpdateKYC() {
    const [showPreview, setShowPreview] = useState(false);
    const { data, isLoading, isError } = useGetKYCByUserQuery();
    const navigate = useNavigate();
    const [updateKyc] = useUpdateKYCByUserMutation();

    // State formData: chứa toàn bộ trường chỉnh sửa
    const [formData, setFormData] = useState({
        fullName: '',
        permanentAddress: '',
        nationality: '',
        dob: null,          // Date
        phoneNumber: '',
        gender: '',
        home: '',
        reason: '',
        cccdNumber: '',
        image: '',
    });

    // // State liên quan upload ảnh
    // const [fileList, setFileList] = useState([]);
    // const [uploading, setUploading] = useState(false);
    //
    // const { UploadImage } = useHookUploadImage();

    // Lấy dữ liệu KYC từ API -> set vào form
    useEffect(() => {
        if (data?.data) {
            const userData = data.data;
            // Chuyển đổi dob sang Dayjs nếu có
            const dobDayjs = userData.dob ? dayjs(userData.dob) : null;
            setFormData({
                fullName: userData.fullName || '',
                permanentAddress: userData.permanentAddress || '',
                nationality: userData.nationality || '',
                dob: dobDayjs && dobDayjs.isValid() ? dobDayjs : null,
                home: userData.home || '',
                reason: userData.reason || '',
                gender: userData.gender || '',
                cccdNumber: userData.cccdNumber || '',
                // Nếu API trả về front/backDocumentUrl, có thể gán ở đây
                image: userData.image || '',

            });
        }
    }, [data]);

    console.log("API KYC response: ", data);

    // Xử lý gõ text
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Xử lý ngày sinh
    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, dob: date }));
    };

    // Xử lý giới tính
    const handleGenderChange = (e) => {
        setFormData((prevData) => ({ ...prevData, gender: e.target.value }));
    };

    // // Upload ảnh
    // const getBase64 = (file) =>
    //     new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });

    // const handleChangeImage = async ({ fileList: newFileList }) => {
    //     if (newFileList.length > 2) {
    //         message.warning("Bạn chỉ có thể tải lên tối đa 2 ảnh (mặt trước, mặt sau)!");
    //         return;
    //     }
    //     setFileList(newFileList);
    //
    //     const uploadedUrls = [];
    //     for (const file of newFileList) {
    //         const fileToUpload = file.originFileObj || file;
    //         if (fileToUpload) {
    //             try {
    //                 const imageUrl = await UploadImage(fileToUpload);
    //                 uploadedUrls.push(imageUrl);
    //             } catch (error) {
    //                 message.error(`Tải lên ảnh ${file.name} thất bại: ${error.message}`);
    //             }
    //         }
    //     }
    //
    //     // Nếu bạn muốn tách ra front/back, kiểm tra uploadedUrls[0], [1]...
    //     if (uploadedUrls.length >= 1) {
    //         // Giả sử tấm đầu là front, tấm 2 (nếu có) là back
    //         const [frontDocumentUrl, backDocumentUrl] = uploadedUrls;
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             frontDocumentUrl,
    //             backDocumentUrl: backDocumentUrl || prevData.backDocumentUrl,
    //         }));
    //     }
    // };

    // const handlePreview = async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     // Nếu cần modal xem ảnh, code open modal ở đây
    // };
    console.log("log",formData);
    // Submit update
    const handleUpdate = async () => {
        try {
            // Chuẩn bị payload gửi API
            const payload = {
                ...formData,
                dob: formData.dob ? formData.dob.format('YYYY-MM-DD') : '',
            };

            await updateKyc(payload).unwrap();
            message.success('Cập nhật thông tin KYC thành công! Kết quả sẽ được thông báo trong thời gian sớm nhất');
            navigate('/ProfileDetail');
        } catch (error) {
            const errorMessage = error?.data?.message || 'Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau!';
            message.error(errorMessage);
        }
    };



    console.log("formData", formData);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header2 title="Update Profile" />
            <div className="flex flex-1">
                <SiderUserBK className="w-[200px] bg-white shadow-md" />

                <div className="flex-1 ml-8 mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cập nhật thông tin KYC</h1>

                    {/* Grid form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Họ và tên */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                            <Input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Nhập họ và tên"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Địa chỉ thường trú */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Địa chỉ thường trú</label>
                            <Input
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleInputChange}
                                placeholder="Nhập địa chỉ thường trú"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Quốc gia */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quốc gia</label>
                            <Input
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                placeholder="Nhập quốc gia"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Ngày sinh */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                            <DatePicker
                                value={formData.dob}
                                onChange={handleDateChange}
                                format="DD/MM/YYYY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Quê quán */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quê quán</label>
                            <Input
                                name="home"
                                value={formData.home}
                                onChange={handleInputChange}
                                placeholder="Nhập quê quán"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/*/!* Số điện thoại *!/*/}
                        {/*<div>*/}
                        {/*    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>*/}
                        {/*    <Input*/}
                        {/*        name="phoneNumber"*/}
                        {/*        value={formData.phoneNumber}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        placeholder="Nhập số điện thoại"*/}
                        {/*        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md*/}
                        {/*   focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/* Giới tính */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                            <Radio.Group
                                value={formData.gender}
                                onChange={handleGenderChange}
                                className="w-full mt-2"
                            >
                                <Radio value="MALE">Nam</Radio>
                                <Radio value="FEMALE">Nữ</Radio>
                                <Radio value="OTHER">Khác</Radio>
                            </Radio.Group>
                        </div>

                        {/* Số CCCD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số CCCD</label>
                            <Input
                                name="cccdNumber"
                                value={formData.cccdNumber}
                                onChange={handleInputChange}
                                placeholder="Nhập số CCCD"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Lý do (nếu KYC bị reject, user có thể thấy? Tuỳ logic) */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Lý do (nếu có)</label>
                            <Textarea
                                name="reason"
                                value={formData.reason}
                                readOnly // Chỉ đọc, không chỉnh sửa
                                disabled // Giao diện bị vô hiệu hoá
                                onChange={handleInputChange}
                                placeholder=""
                                className="mt-1 w-full border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* View hình ảnh */}
                        <div className="mt-6">
                            <lable className="text-lg font-medium text-gray-700" >Hình ảnh (CMND/CCCD) </lable>
                            <Input
                                name="imageUrl"
                                value={formData.image}
                                type="hidden"
                                className="mt-1 w-full border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <img
                                src={formData.image}
                                alt="CMND/CCCD Front"
                                className="w-52 h-auto rounded-lg shadow"
                                onClick={() => setShowPreview(true)}
                            />
                            {/* Overlay: chỉ hiển thị khi showPreview = true */}
                            {showPreview && (
                                <div
                                    className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black bg-opacity-70"
                                    onClick={() => setShowPreview(false)}
                                >
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="max-w-[60%] và max-h-[60%] rounded-lg"
                                    />
                                </div>
                            )}
                    </div>



                        {/*<Upload*/}
                        {/*    fileList={fileList}*/}
                        {/*    onChange={handleChangeImage}*/}
                        {/*    onPreview={handlePreview}*/}
                        {/*    listType="picture-card"*/}
                        {/*    maxCount={2}*/}
                        {/*    showUploadList={{ showPreviewIcon: false }}*/}
                        {/*    className="w-full mt-4"*/}
                        {/*>*/}
                        {/*    /!*<div>*!/*/}
                        {/*    /!*    <PlusOutlined />*!/*/}
                        {/*    /!*    <div className="mt-2 text-sm text-blue-500">Chọn ảnh</div>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</Upload>*/}
                    </div>

                    {/* Nút Cập nhật */}
                    <div className="mt-6">
                        <Button
                            type="primary"
                            onClick={handleUpdate}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white
                         py-2 px-4 rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </div>
            <FooterBK />
        </div>
    );
}
