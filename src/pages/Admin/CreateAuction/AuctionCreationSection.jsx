import { Heading, Img } from "../../../components";
import React, { Suspense, useState } from "react";
import { Avatar, Carousel, Image, Modal } from "antd";
import { Button, Typography } from "@material-tailwind/react";
import { Descriptions } from 'antd';
import { useGetSellerQuery } from "@/services/item.service.js";
import { useGetUserByIdQuery } from "@/services/user.service.js";
import DescriptionItem from "@/components/DescriptionItem/index.jsx";

export default function AuctionCreationSection({ itemDetail }) {


    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const { data: seller } = useGetSellerQuery({ id: itemDetail?.itemId });
    const { data: staff } = useGetUserByIdQuery();
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };


    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };

    const formatCurrency = (value) => {
        if (!value) return 'N/A';

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    const getItemStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'text-blue-500 bg-blue-100 border border-blue-400 rounded-md px-3 py-1 text-sm font-medium'; // Xanh cho "Đang chờ"
            case 'PENDING_AUCTION':
                return 'text-orange-500 bg-orange-100 border border-orange-400 rounded-md px-3 py-1 text-sm font-medium'; // Cam cho "Đang đấu giá"
            case 'ACCEPTED':
                return 'text-green-500 bg-green-100 border border-green-400 rounded-md px-3 py-1 text-sm font-medium'; // Xanh lá cho "Đã chấp nhận"
            case 'REJECTED':
                return 'text-red-500 bg-red-100 border border-red-400 rounded-md px-3 py-1 text-sm font-medium'; // Đỏ cho "Bị từ chối"
            case 'INACTIVE':
                return 'text-gray-500 bg-gray-100 border border-gray-400 rounded-md px-3 py-1 text-sm font-medium'; // Xám cho "Không hoạt động"
            default:
                return 'text-gray-600 bg-gray-100 border border-gray-400 rounded-md px-3 py-1 text-sm font-medium'; // Xám nếu không xác định trạng thái
        }
    };



    const formatItemStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Đang chờ';
            case 'PENDING_AUCTION':
                return 'Đang tao phien dau gia';
            case 'ACCEPTED':
                return 'Đã chấp nhận';
            case 'REJECTED':
                return 'Bị từ chối';
            case 'INACTIVE':
                return 'Không hoạt động';
            default:
                return 'N/A';
        }
    };

    const items = [
        {
            key: '1',
            label: <span className="font-semibold text-xl text-gray-800">Tên sản phẩm</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemName || 'N/A'}</span>,
            span: 1
        },
        {
            key: '2',
            label: <span className="font-semibold text-xl text-gray-800">Hãng điện thoại</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.scId?.sub_category || 'N/A'}</span>,
            span: 1
        },
        {
            key: '3',
            label: <span className="font-semibold text-xl text-gray-800">Bước giá mong muốn</span>,
            children: <span className="text-base text-gray-600">{formatCurrency(itemDetail?.priceStepItem) || 'N/A'}</span>,
            span: 1
        },
        {
            key: '4',
            label: <span className="font-semibold text-lg text-gray-800">Trạng thái sản phẩm</span>,
            children: (
                <span
                    className={`text-xs ${getItemStatusClass(itemDetail?.itemStatus)} text-gray-600 font-medium inline-block px-3 py-1 rounded-full 
                                   ${itemDetail?.itemStatus ? 'bg-green-100' : 'bg-red-100'} 
                                   transition-all duration-300 ease-in-out shadow-sm hover:shadow-md`}
                >
                    {itemDetail?.itemStatus ? formatItemStatus(itemDetail?.itemStatus) : 'N/A'}
                </span>
            ),
            span: 1
        },
        {
            key: '5',
            label: <span className="font-semibold text-xl text-gray-800">Mức giá mong muốn</span>,
            children: <span className="text-base text-gray-600">{formatCurrency(itemDetail?.priceBuyNow) || 'N/A'}</span>,
            span: 1
        },
        {
            key: '6',
            label: <span className="font-semibold text-xl text-gray-800">Mô tả sản phẩm</span>,
            children: (
                <Button
                    onClick={() => handleOpenDescriptionModal(itemDetail?.itemDescription)}
                    className="bg-blue-500 text-white hover:bg-yellow-600 px-4 py-2 rounded"
                >
                    Xem mô tả
                </Button>
            ),
            span: 1
        },
        {
            key: '7',
            label: <span className="font-semibold text-xl text-gray-800">Màu sắc</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.color || 'N/A'}</span>,
            span: 1
        },
        {
            key: '8',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng pin</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.batteryHealth || 'N/A'}</span>,
            span: 1
        },
        {
            key: '9',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng thân máy</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.bodyCondition || 'N/A'}</span>,
            span: 1
        },
        {
            key: '10',
            label: <span className="font-semibold text-xl text-gray-800">Hệ điều hành</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.osVersion || 'N/A'}</span>,
            span: 1
        },
        {
            key: '11',
            label: <span className="font-semibold text-xl text-gray-800">Đám mây</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.icloudStatus || 'N/A'}</span>,
            span: 1
        },
        {
            key: '12',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng cổng kết nối</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.portCondition || 'N/A'}</span>,
            span: 1
        },
        {
            key: '13',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng nút điện thoại</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.buttonCondition || 'N/A'}</span>,
            span: 1
        },
        {
            key: '14',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng màn hình</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.screenCondition || 'N/A'}</span>,
            span: 1
        },
        {
            key: '15',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng camera</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.cameraCondition || 'N/A'}</span>,
            span: 1
        },
        {
            key: '16',
            label: <span className="font-semibold text-xl text-gray-800">Bộ nhớ</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.storage || 'N/A'}</span>,
            span: 1
        },
        {
            key: '17',
            label: <span className="font-semibold text-xl text-gray-800">IMEI</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.imei || 'N/A'}</span>,
            span: 1
        },

        {
            key: '18',
            label: <span className="font-semibold text-xl text-gray-800">Tình trạng khoá iCloud</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.icloudStatus || 'N/A'}</span>,
            span: 1
        },
        {
            key: '19',
            label: <span className="font-semibold text-xl text-gray-800">CPU</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemSpecific?.cpu || 'N/A'}</span>,
            span: 1
        },
        {
            key: '20',
            label: <span className="font-semibold text-xl text-gray-800">RAM</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemSpecific?.ram || 'N/A'}</span>,
            span: 1
        },
        {
            key: '21',
            label: <span className="font-semibold text-xl text-gray-800">Kích thước màn hình</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemSpecific?.screen_size || 'N/A'} inch</span>,
            span: 1
        },
        {
            key: '22',
            label: <span className="font-semibold text-xl text-gray-800">Thống số camera</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemSpecific?.camera_specs || 'N/A'}</span>,
            span: 1
        },
        {
            key: '23',
            label: <span className="font-semibold text-xl text-gray-800">Cảm biến</span>,
            children: <span className="text-base text-gray-600">{itemDetail?.itemSpecific?.sensors || 'N/A'}</span>,
            span: 2
        },
    ];



    return (
        <>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    // eslint-disable-next-line react/jsx-key
                    <Button color="blue" onClick={handleCloseDescriptionModal}
                        className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription} />
            </Modal>
            {/* auction creation section */}
            <div className="mt-[26px] flex flex-col items-center">
  <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] sm:gap-[39px] px-5">
    {/* Tiêu đề */}
    <Heading
      size="text2xl"
      as="h1"
      className="text-[20px] md:text-[28px] sm:text-[26px] text-black font-semibold text-center leading-[1.2] md:w-4/5 w-full"
    >
      TẠO PHIÊN ĐẤU GIÁ
    </Heading>

    <div className="self-stretch flex flex-col md:flex-row gap-[34px] md:gap-[58px]">
      {/* Thông tin sản phẩm */}
      <div className="flex flex-1 flex-col bg-light-blue-50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <Descriptions
          layout="vertical"
          items={items}
        />
      </div>

      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col flex-1 bg-light-blue-50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      <div className="w-full">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(itemDetail?.images || []).map((images, index) => (
                <div key={index} className="flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
                  <Image
                    width={400}
                    height={300}
                    src={images.image}
                    alt={`Image ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      </div>
    </div>
  </div>
</div>



            <div className="flex flex-row w-full justify-between gap-8 mt-5">
                {/* Người bán */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người
                        bán</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                            <div className="flex items-center gap-4">
                                <Avatar src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                    alt="avatar" variant="rounded" className="w-16 h-16" />
                                <div>
                                    <Typography variant="h6"
                                        className="font-medium text-gray-800">{seller?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                        className="font-normal">{seller?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {seller?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                className="text-sm font-medium text-gray-700">Email: {seller?.email || 'N/A'}</Heading>
                        </div>
                    </div>

                </div>

                {/* Người thẩm định */}
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                    <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người thẩm
                        định</Heading>
                    <div className="w-full flex justify-center">
                        <div
                            className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl sẽ giới hạn chiều rộng tối đa */}
                            <div className="flex items-center gap-4">
                                <Avatar src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
                                    alt="avatar" variant="rounded" className="w-16 h-16" />
                                <div>
                                    <Typography variant="h6"
                                        className="font-medium text-gray-800">{staff?.fullName || 'N/A'}</Typography>
                                    <Typography variant="small" color="gray"
                                        className="font-normal">{staff?.role || 'N/A'}</Typography>
                                </div>
                            </div>
                            <Heading size="textxs" as="p" className="text-sm font-medium text-gray-700">Số điện
                                thoại: {staff?.phoneNumber || 'N/A'}</Heading>
                            <Heading size="textxs" as="p"
                                className="text-sm font-medium text-gray-700">Email: {staff?.email || 'N/A'}</Heading>
                        </div>
                    </div>


                </div>

            </div>
        </>
    );
}



