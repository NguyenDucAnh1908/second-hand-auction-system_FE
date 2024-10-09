import { Input } from '@material-tailwind/react';
import React from 'react';
import { Heading } from '../../components';

const AddressForm = () => {
    return (
        <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
            <Heading size="textmd" as="h3" className="text-[18px] font-semibold text-blue_gray-900">
                Địa chỉ
            </Heading>
            <div className="flex gap-6"> {/* Hàng đầu tiên với Thành Phố và Quận/Huyện */}
                <div className="flex flex-col w-[48%]"> {/* Cột 1: Thành Phố */}
                    <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Thành Phố</label>
                    <Input
                        size="sm"
                        name="province"
                        placeholder="Tỉnh/Thành Phố"
                        className="rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col w-[48%]"> {/* Cột 2: Quận/Huyện */}
                    <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Quận/Huyện</label>
                    <Input
                        size="sm"
                        name="district"
                        placeholder="Quận/Huyện"
                        className="rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex gap-6"> {/* Hàng thứ hai với Xã và Địa chỉ */}
                <div className="flex flex-col w-[48%]"> {/* Cột 1: Xã */}
                    <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Xã</label>
                    <Input
                        size="sm"
                        name="ward"
                        placeholder="Xã/Phường"
                        className="rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col w-[48%]"> {/* Cột 2: Địa chỉ */}
                    <label className="text-[14px] font-medium text-blue_gray-800 mb-1">Địa chỉ</label>
                    <Input
                        size="sm"
                        name="address"
                        placeholder="Địa chỉ chi tiết..."
                        className="rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
