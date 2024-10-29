import { Heading, Img } from "../../../components";
import React, { Suspense } from "react";
import {Carousel} from "antd";
import {Typography} from "@material-tailwind/react";
import {Descriptions} from 'antd';
export default function AuctionCreationSection() {
  const items = [
    {
      key: '1',
      label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Tên sản phẩm</span>,
      children: <span style={{ fontSize: '16px' }}>Sản phẩm A</span>,
      span: 4,
    },
    {
      key: '2',
      label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Sub category</span>,
      children: <span style={{ fontSize: '16px' }}>Danh mục A</span>,
      span: 2,
    },
    {
      key: '3',
      label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>ItemStatus</span>,
      children: <span style={{ fontSize: '16px' }}>Còn hàng</span>,
      span: 2,
    },
    {
      key: '4',
      label: <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Item Description</span>,
      children: <span style={{ fontSize: '16px' }}>Chi tiết mô tả</span>,
      span: 4,
    }
  ];

  const itemDescription = [
    {
      key: '4',
      label: 'Phần trăm',
      children: 'N/A',
      span: 2,
    },
    {
      key: '5',
      label: 'Loại',
      children: 'N/A',
      span: 2,
    },
    {
      key: '6',
      label: 'Màu sắc',
      children:  'N/A',
      span: 2,
    },
    {
      key: '7',
      label: 'Trọng lượng',
      children:  'N/A',
      span: 2,
    },
    {
      key: '8',
      label: 'Kích thước',
      children:'N/A',
      span: 2,
    },
    {
      key: '9',
      label: 'Xuất xứ',
      children:  'N/A',
      span: 2,
    },
    {
      key: '10',
      label: 'Ngày sản xuất',
      children: 'N/A',
      span: 2,
    },
    {
      key: '11',
      label: 'Chất liệu',
      children: 'N/A',
      span: 2,
    }
  ];
  return (
    <>
      {/* auction creation section */}
      <div className="mt-[26px] flex flex-col items-center">
        <div className="container-xs flex flex-col items-center gap-[78px] md:gap-[58px] md:px-5 sm:gap-[39px]">
          <Heading
            size="text2xl"
            as="h1"
            className="w-[28%] text-[30px] rounded-[12px] font-medium leading-[55px] text-black-900 md:w-full md:text-[28px] sm:text-[26px]"
          >
            TẠO PHIÊN ĐẤU GIÁ
          </Heading>
          <div className="self-stretch">
            <div className="flex items-center gap-[34px] md:flex-col">
              <div style={{width: '51%', margin: '0 auto'}}> {/* Điều chỉnh chiều rộng Carousel */}
                <Carousel arrows infinite={false}>
                  <div>
                    {/*<h3 style={contentStyle}>1</h3>*/}
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Img
                        src="/images/img_giuong.png"
                        alt="Main Product Image"
                        className="rounded-lg"
                    />
                  </div>
                </Carousel>
              </div>
              <div className="flex-row w-[50%] justify-center rounded-[20px] bg-green-400 p-3.5 md:w-full">
                <Descriptions title={<div className="w-full text-center">Item infomation</div>} layout="vertical" items={items}/>
                <Descriptions title={<div className="w-full text-center">Item Description</div>} items={itemDescription} className="mt-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



