import { Card, Input, Button, Typography, Select, message, Spin } from "@material-tailwind/react";
import { Form } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export function FormAddAddress({ onClose, onSubmit }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedWardId, setSelectedWardId] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // Thêm loading state

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                    }
                });
                if (response.data.code === 200) {
                    setProvinces(response.data.data);
                } else {
                    message.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching provinces:", error);
                message.error("Có lỗi xảy ra khi lấy dữ liệu tỉnh.");
            }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (value) => {
        setSelectedProvinceId(value);
        setDistricts([]);
        setWards([]);
        setSelectedDistrictId(null);
        setSelectedWardId(null);

        setLoading(true); // Bắt đầu tải dữ liệu

        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`, {
                headers: {
                    'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                }
            });

            if (response.data.code === 200) {
                setDistricts(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching districts:", error);
            message.error("Có lỗi xảy ra khi lấy dữ liệu huyện.");
        } finally {
            setLoading(false); // Kết thúc tải dữ liệu
        }
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrictId(value);
        setWards([]); // Đặt lại wards
        setSelectedWardId(null); // Đặt lại ward khi district thay đổi

        setLoading(true); // Bắt đầu tải dữ liệu

        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`, {
                headers: {
                    'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                }
            });

            if (response.data.code === 200) {
                // Chỉ lấy dữ liệu cần thiết và đặt vào trạng thái
                const formattedWards = response.data.data.map((ward) => ({
                    WardID: ward.WardCode, // Lưu WardCode
                    WardName: ward.WardName // Lưu WardName
                }));
                setWards(formattedWards); // Cập nhật state wards
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching wards:", error);
            message.error("Có lỗi xảy ra khi lấy dữ liệu xã.");
        } finally {
            setLoading(false); // Kết thúc tải dữ liệu
        }
    };


    const handleWardChange = (value) => {
        setSelectedWardId(value);
        form.setFieldsValue({ ward: value }); // Đặt giá trị trong form
    };


    const handleFormSubmit = async (formData) => {
        const addressData = {
            district_code: selectedDistrictId,
            district_name: districts.find(district => district.DistrictID === selectedDistrictId)?.DistrictName || '',
            address_name: formData.street_address,
            default_address: "string",
            last_name: "string",
            phone_number: "string",
            province: selectedProvinceId,
            province_name: provinces.find(province => province.ProvinceID === selectedProvinceId)?.ProvinceName || '',
            street_address: formData.street_address,
            ward_code: selectedWardId || null,
            ward_name: wards.find(ward => ward.WardID === selectedWardId)?.WardName || null
          
        };

        // Gọi hàm onSubmit từ props để gửi dữ liệu
        await onSubmit(addressData);
    };

    return (
        <Form form={form} onFinish={handleFormSubmit} layout="horizontal">
            <Form.Item name="street_address" label="Địa chỉ" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item name="province" label="Tỉnh" rules={[{ required: true }]} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Select onChange={handleProvinceChange} placeholder="Chọn tỉnh" loading={loading}>
                    {provinces.map((province) => (
                        <Select.Option key={province.ProvinceID} value={province.ProvinceID}>
                            {province.ProvinceName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="district" label="Huyện" rules={[{ required: true }]} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Select onChange={handleDistrictChange} placeholder="Chọn huyện" loading={loading}>
                    {districts.map((district) => (
                        <Select.Option key={district.DistrictID} value={district.DistrictID}>
                            {district.DistrictName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="ward" label="Xã" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
                <Select onChange={handleWardChange} placeholder="Chọn xã" loading={loading}>
                    {wards.map((ward) => (
                        <Select.Option key={ward.WardID} value={ward.WardID}>
                            {ward.WardName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
    
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    Thêm địa chỉ
                </Button>
            </Form.Item>
        </Form>
    );
    
}
