import { Heading, Img } from "../../../components";
import React, { useState } from "react";
import { Carousel, Descriptions, Avatar, Typography, Upload, Modal, Image, Col, Row, Flex } from 'antd';
import { useGetSellerQuery } from "../../../services/item.service";
import { UploadOutlined } from "@ant-design/icons";
import { DatePicker } from 'antd';
import moment from 'moment';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import { Button } from "@material-tailwind/react";


export default function ProductReviewSection({ itemDetail }) {
    const [previewImages, setPreviewImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const { data: seller } = useGetSellerQuery({ id: itemDetail.itemId });
    const staff = JSON.parse(localStorage.getItem('user'));

    if (!itemDetail) {
        return <div className="text-center text-xl text-gray-600">Loading...</div>;
    }
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
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
                return 'text-blue-500 bg-blue-100 border-2 border-blue-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Xanh cho "Đang chờ"
            case 'PENDING_AUCTION':
                return 'text-orange-500 bg-orange-100 border-2 border-orange-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Cam cho "Đang đấu giá"
            case 'ACCEPTED':
                return 'text-green-500 bg-green-100 border-2 border-green-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Xanh lá cho "Đã chấp nhận"
            case 'REJECTED':
                return 'text-red-500 bg-red-100 border-2 border-red-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Đỏ cho "Bị từ chối"
            case 'INACTIVE':
                return 'text-gray-500 bg-gray-100 border-2 border-gray-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Xám cho "Không hoạt động"
            default:
                return 'text-gray-600 bg-gray-100 border-2 border-gray-400 rounded-lg px-6 py-3 text-xl font-semibold'; // Xám nếu không xác định trạng thái
        }
    };


    const formatItemStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return 'Đang chờ';
            case 'PENDING_AUCTION':
                return 'Đang đấu giá';
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

    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };
    const items = [

        //start
    
            {
                key: '1',
                label: <label className="font-bold text-black">Tên Sản Phẩm</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                       {itemDetail.itemName}
                    </div>
                ),
            },
            {
                key: '2',
                label: <label className="font-bold text-black">Serial</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.serial}
                    </div>
                ),
            },
            {
                key: '3',
                label: <label className="font-bold text-black">Hỗ trợ Sim</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.itemSpecific.sim}
                    </div>
                ),
            },
            {
                key: '4',
                label: <label className="font-bold text-black">Số khe cắm sim</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.itemSpecific.simSlots}
                    </div>
                ),
            },
            {
                key: '5',
                label: <label className="font-bold text-black">Phiên bản</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.itemSpecific.os}
                    </div>
                ),
            },
            {
                key: '6',
                label: <label className="font-bold text-black">Hệ điều hành</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.itemSpecific.osFamily}
                    </div>
                ),
            },
            {
                key: '7',
                label: <label className="font-bold text-black">Bluetooth</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                        {itemDetail.itemSpecific.bluetooth}
                    </div>
                ),
            }
            ,
            {
                key: '8',
                label: <label className="font-bold text-black">Cổng USB</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                    {itemDetail.itemSpecific.usb}
                </div>
                ),
            },
            {
                key: '9',
                label: <label className="font-bold text-black">Wi-Fi</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                    {itemDetail.itemSpecific.wlan}
                </div>
                ),
            },
            {
                key: '10',
                label: <label className="font-bold text-black">Tốc độ kết nối mạng</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                    {itemDetail.itemSpecific.speed}
                </div>
                ),
            },
            {
                key: '11',
                label: <label className="font-bold text-black">Công nghệ mạng hỗ trợ</label>,
                children: (
                    <div className="rounded-md border p-3 w-full bg-gray-100">
                    {itemDetail.itemSpecific.networkTechnology}
                </div>
                ),
            },
            {
                key: '11',
                label: <label className="font-bold text-black">Mã model</label>,
                children: (
                    <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                      {itemDetail.model}
                    </ul>
                ),
            },
            
       
    





        //end
        ,
        // {
        //     key: '1',
        //     label: <label className="font-bold text-black">Tên sản phẩm</span>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.itemName || 'N/A'}</span>,
        //     span: 1
        // },
        // {
        //     key: '2',
        //     label: <label className="font-bold text-black">Hãng điện thoại</span>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.scId?.sub_category || 'N/A'}</span>,
        //     span: 1
        // },
        {
            key: '3',
            label:  <label className="font-bold text-black">Bước giá mong muốn</label>,
            children:  <div className="rounded-md border p-3 w-full bg-gray-100">{formatCurrency(itemDetail?.priceStepItem) || 'N/A'}</div>,
            span: 1
        },
       
        {
            key: '5',
            label: <label className="font-bold text-black">Mức giá mong muốn</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{formatCurrency(itemDetail?.priceBuyNow) || 'N/A'}</div>,
            span: 1
        },
       
        {
            key: '7',
            label: <label className="font-bold text-black">Màu sắc</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.color || 'N/A'}</div>,
            span: 1
        },
        {
            key: '8',
            label: <label className="font-bold text-black">Tình trạng pin</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.batteryHealth || 'N/A'}</div>,
            span: 1
        },
        {
            key: '9',
            label: <label className="font-bold text-black">Tình trạng thân máy</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.bodyCondition || 'N/A'}</div>,
            span: 1
        },
        // {
        //     key: '10',
        //     label: <label className="font-bold text-black">Hệ điều hành</span>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.osVersion || 'N/A'}</span>,
        //     span: 1
        // },
        // {
        //     key: '11',
        //     label: <label className="font-bold text-black">Đám mây</span>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.icloudStatus || 'N/A'}</span>,
        //     span: 1
        // },
        {
            key: '12',
            label: <label className="font-bold text-black">Tình trạng cổng kết nối</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.portCondition || 'N/A'}</div>,
            span: 1
        },
        // {
        //     key: '13',
        //     label: <label className="font-bold text-black">Tình trạng nút điện thoại</span>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.buttonCondition || 'N/A'}</span>,
        //     span: 1
        // },
        {
            key: '14',
            label: <label className="font-bold text-black">Tình trạng màn hình</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.screenCondition || 'N/A'}</div>,
            span: 1
        },
        {
            key: '15',
            label: <label className="font-bold text-black">Tình trạng camera</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.cameraCondition || 'N/A'}</div>,
            span: 1
        },
        {
            key: '16',
            label: <label className="font-bold text-black">Bộ nhớ</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.storage || 'N/A'}</div>,
            span: 1
        },
        {
            key: '17',
            label: <label className="font-bold text-black">IMEI</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.imei || 'N/A'}</div>,
            span: 1
        },

        // {
        //     key: '18',
        //     label: <label className="font-bold text-black">Tình trạng khoá iCloud</label>,
        //     children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.icloudStatus || 'N/A'}</div>,
        //     span: 1
        // },
      
        {
            key: '20',
            label: <label className="font-bold text-black">RAM</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.itemSpecific?.ram || 'N/A'}</div>,
            span: 1
        },
        {
            key: '21',
            label: <label className="font-bold text-black">Kích thước màn hình</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.itemSpecific?.screen_size || 'N/A'} inch</div>,
            span: 1
        },
        {
            key: '22',
            label: <label className="font-bold text-black">Thống số camera</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.itemSpecific?.camera_specs || 'N/A'}</div>,
            span: 1
        },
        {
            key: '23',
            label: <label className="font-bold text-black">Cảm biến</label>,
            children: <div className="rounded-md border p-3 w-full bg-gray-100">{itemDetail?.itemSpecific?.sensors || 'N/A'}</div>,
            span: 2
        },
        {
            key: '6',
            label: <label className="font-bold text-black">Mô tả sản phẩm</label>,
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
            key: '4',
            label: <label className="font-bold text-black">Trạng thái sản phẩm</label>,
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

            <div className="flex flex-col items-center py-10 bg-gray-50 ">
                <div className="container-xs flex flex-col items-center gap-5 md:px-5">
                    <Heading
                        size="text4xl"
                        as="h1"
                        className="text-4xl font-medium text-black-900"
                    >
                        Thẩm định
                    </Heading>
                    <div className="flex flex-wrap gap-10 w-full py-10">
                        {/* Phần thông tin */}
                        <div className="flex-row-reverse bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-500 max-w-2xl w-full">
                            <Descriptions
                                layout="vertical"
                                items={items}
                                className="space-y-6"
                            />
                        </div>

                        {/* Phần hình ảnh */}
                        <div className="flex-1 bg-blue-100 rounded-2xl p-8 shadow-lg max-w-xl w-full">
                            <div className="grid grid-cols-1 gap-6">
                                {itemDetail.images.slice(0, 9).map((image, index) => (
                                    <div key={index} className="flex justify-center items-center rounded-lg overflow-hidden shadow-lg">
                                        <Image
                                            src={image.image}
                                            alt={`Image ${index + 1}`}
                                            width={400}
                                            height={300}
                                            className="object-cover w-full h-auto rounded-lg" // Giữ tỷ lệ hình ảnh
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>





                    {/* Thông tin người bán và người thẩm định */}
                    <div className="flex flex-row w-full justify-between gap-8">
                        {/* Người bán */}
                        <div className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl w-1/2">
                            <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Người
                                bán</Heading>
                            <div className="w-full flex justify-center">
                                <div
                                    className="mb-8 flex flex-col items-center gap-6 bg-white p-5 rounded-2xl shadow-md max-w-4xl w-full">  {/* max-w-4xl giới hạn chiều rộng của phần tử con */}
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            src={seller?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
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
                                        <Avatar
                                            src={staff?.avatar || "https://docs.material-tailwind.com/img/face-2.jpg"}
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

                    {(itemDetail.itemDocument) && (
                        <>
                            <Heading size="textxs" as="p" className="text-xl font-medium text-black-900 mb-5">Giấy tờ thẩm định</Heading>
                            <div style={{ width: '100%', height: '50vh', border: '1px solid #ddd' }}>
                                <iframe
                                    src={itemDetail.itemDocument}
                                    title="PDF Viewer"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </>


                    )}

                    <div
                        className="flex items-center justify-between w-full p-3 bg-white shadow-md rounded-2xl border border-gray-200">
                        <Heading size="textxs" as="p" className="text-xl font-semibold text-black-900 mb-2">
                            Ngày thẩm định
                        </Heading>

                        <DatePicker
                            value={moment()} // Ngày hôm nay
                            disabled // Vô hiệu hóa chỉnh sửa
                            className="ml-auto border border-gray-300 rounded-lg shadow-sm px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                </div>
            </div>
        </>
    )
        ;
}