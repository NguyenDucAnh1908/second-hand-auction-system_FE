// import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import FilterButton from '../../../components/DashboardSeller/DropdownFilter';
import Datepicker from '../../../components/DashboardSeller/Datepicker';

import Banner from '../../../partials/Banner';

import {
  ButtonDH,
  Img,
  Text,
  Heading,
  SelectBox,
  InputDH,
  TextArea,
} from "../../../components";
import React, { useState } from "react";


function RegisterProductPage() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [manufactureDate, setManufactureDate] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">


            </div>


            {/* cái chính */}
            <div
              className="w-full"
            >
              <div className="flex items-start md:flex-col">
                <div className="mt-3.5 flex flex-1 flex-col gap-16 self-center md:self-stretch sm:gap-8">
                  <div className="ml-10 md:ml-0">
                    <div className="flex flex-col items-start gap-4">
                      <Heading
                        size="text2xl"
                        as="h1"
                        className="text-[30px] font-medium text-black-900 md:ml-0 md:text-[28px] sm:text-[26px]"
                      >
                        Đăng kí sản phẩm
                      </Heading>
                    
                      <div className="flex gap-[30px] self-stretch md:flex-col">
                        <div className="flex flex-1 flex-col gap-[34px] md:self-stretch">
                          <div className=" flex flex-col items-start justify-center gap-1.5 md:mx-0">
                            <Heading
                              as="h3"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Tiêu đề
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Title Field"
                              placeholder={`Tiêu đề sản phẩm`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className=" flex flex-col items-start justify-center gap-1.5 md:mx-0">
                            <Heading
                              as="h4"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Tên sản phẩm
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Product Name Field"
                              placeholder={`Tên sản phẩm sản phẩm`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-1 md:mx-0">
                            <Heading
                              as="h5"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Tên thương hiệu
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Brand Name Field"
                              placeholder={`Tiêu đề thương hiệu`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-[18px]">
                            <Heading
                              as="h6"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Mô tả
                            </Heading>
                            <TextArea
                              shape="round"
                              name="Description Area"
                              placeholder={`Mô tả`}
                              className="w-[88%] rounded-md !border !border-gray-200 px-5 font-jost leading-[10px] text-blue_gray-600"
                            />
                          </div>
                        </div>

                        <div className="flex w-[44%] flex-col items-start md:w-full">
                          <Heading
                            as="p"
                            className="ml-3 font-jost text-[16px] font-medium text-black-900 md:ml-0"
                          >
                            Hình ảnh sản phẩm
                          </Heading>
                          <div className="mr-1.5 mt-2 flex flex-col items-start gap-5 self-stretch rounded-[20px] bg-blue-200 px-[52px] py-[30px] md:mr-0 md:px-5 sm:p-5">
                            <div className="flex justify-center gap-4">
                              <div className="flex justify-center gap-4">
                                <Img
                                  src="images/img_giuong.png"
                                  alt="Product Image 1"
                                  className="h-[100px] w-[100px] rounded-[5px] object-cover"
                                />
                                <Img
                                  src="images/img_tv.png"
                                  alt="Product Image 2"
                                  className="h-[100px] w-[100px] rounded-[5px] object-cover"
                                />
                              </div>

                            </div>
                            <Heading
                              size="headingxs"
                              as="h6"
                              className="mb-3.5 text-[16px] font-semibold text-gray-900_01"
                            >
                              Thả tệp vào đây hoặc nhấp để tải lên
                            </Heading>
                          </div>
                          <div className="mt-11 flex flex-col items-start gap-1.5 self-stretch">
                            <Heading
                              as="p"
                              className="ml-3 font-jost text-[16px] font-medium text-black-900 md:ml-0"
                            >
                              Import file
                            </Heading>
                            <div className="flex items-center gap-[21px] self-stretch rounded-[20px] bg-blue-200_01 px-7 py-1.5 sm:px-5">
                              <Img
                                src="images/img_upload.png"
                                alt="Import Image"
                                className="h-[38px] object-cover"
                              />
                              <Heading
                                as="p"
                                className="font-jost text-[16px] font-medium text-black-900"
                              >
                                Giấy tờ liên quan đến sản phẩm
                              </Heading>
                            </div>
                          </div>
                          <div className="mt-[42px] flex flex-col gap-3 self-stretch ">
                            <div className="flex flex-col items-start justify-center gap-1 w-[50%] bg-white">
                              <Heading
                                as="p"
                                className="font-jost text-[16px] font-medium "
                              >
                                Danh mục
                              </Heading>
                              <SelectBox
                                shape="round"
                                indicator={
                                  <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500`} viewBox="0 0 12 12">
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                }
                                name="Category Dropdown"
                                placeholder={`Danh mục sản phẩm`}
                                color="white"
                                className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost "
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-1 w-[50%]">
                              <Heading
                                as="p"
                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                              >
                                Trình trạng
                              </Heading>
                              <SelectBox
                                shape="round"
                                indicator={
                                  <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500`} viewBox="0 0 12 12">
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                  </svg>
                                }
                                name="Condition Dropdown"
                                placeholder={`Tình trạng sản phẩm`}
                                color="white"
                                className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost"
                              />
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className=" md:ml-0">
                    <div className="flex flex-col  gap-12">
                      <Heading
                        size="textxl"
                        as="p"
                        className="bg-green-a700_01 px-[34px] pb-1.5 pt-0.5 text-[25px] font-medium text-bg-white md:text-[23px] sm:px-5 sm:text-[21px]"
                      >
                        Thông tin chi tiết của sản phẩm
                      </Heading>
                      <div className="ml-7 flex items-center self-stretch md:ml-0 md:flex-col">
                        <div className="flex w-full flex-col gap-[26px]">
                          <div className="flex flex-col items-start justify-center gap-1.5">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Màu sắc
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Color Field"
                              placeholder={`Màu sắc sản phẩm`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-1">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Khối lượng
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Weight Field"
                              placeholder={`Khối lượng sản phẩm`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-center gap-1.5">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Phần trăm
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Percentage Field"
                              placeholder={`Phần trăm giá trị sản phẩm`}
                              className="w-[88%] rounded-md border px-3.5 font-jost"
                            />
                          </div>
                        </div>
                        <div className="flex w-full flex-col items-end gap-5">
                          <div className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Nguồn gốc/Xuất xứ
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Origin Field"
                              placeholder={`Ghi rõ thông tin xuất xứ`}
                              className="self-stretch rounded-md border px-3.5 font-jost"
                            />
                          </div>
                          <div className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Giá trị định giá
                            </Heading>
                            <InputDH
                              shape="round"
                              name="Pricing Field"
                              placeholder={`Nhập giá trị sản phẩm`}
                              suffix={
                                <Text className="w-[32px] font-jost text-[15px] font-normal text-colors">
                                  VND
                                </Text>
                              }
                              className="gap-4 self-stretch rounded-md border px-3 font-jost"
                            />
                          </div>
                          <div className="flex flex-col w-[88%] items-start justify-center gap-1 md:w-full mt-5">
                            <Heading
                              as="p"
                              className="font-jost text-[16px] font-medium text-blue_gray-900"
                            >
                              Ngày sản xuất
                            </Heading>
                            <div className="w-full">
                              <DatePicker
                                selected={manufactureDate} // Sử dụng state manufactureDate
                                onChange={(date) => setManufactureDate(date)} // Cập nhật state khi chọn ngày
                                placeholderText="Chọn ngày sản xuất" // Placeholder
                                className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost w-full"
                                dateFormat="dd/MM/yyyy" // Định dạng ngày
                                popperPlacement="bottom" // Đặt vị trí của popper (lịch) nếu cần
                                isClearable // Cho phép xóa ngày đã chọn
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" md:ml-0">
                    <div className="flex flex-col items-center gap-[62px] sm:gap-[31px]">
                      <div className="flex flex-col items-center self-stretch">
                        <Heading
                          size="textxl"
                          as="p"
                          className="bg-green-a700_01 px-[34px] pt-2 text-[25px] font-medium text-bg-white md:text-[23px] sm:px-5 sm:text-[21px]"
                        >
                          Chính sách của hệ thống
                        </Heading>

                        <div className="mt-9 flex items-center justify-center gap-3 self-stretch md:flex-col">
                          <input
                            type="checkbox"
                            id="policyOne"
                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                          />
                          <label
                            htmlFor="policyOne"
                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                          >
                            Tôi cam kết rằng mọi thông tin cá nhân và dữ liệu liên quan đến sản phẩm của tôi sẽ được bảo mật và không bị tiết lộ cho bên thứ ba mà không có sự đồng ý của tôi.
                          </label>
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-3 self-stretch md:flex-col">
                          <input
                            type="checkbox"
                            id="policyTwo"
                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                          />
                          <label
                            htmlFor="policyTwo"
                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                          >
                            Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả sản phẩm mà tôi cung cấp là chính xác, đầy đủ và không gây hiểu nhầm cho người mua. Tôi sẽ chịu trách nhiệm về tính chính xác của thông tin này.
                          </label>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-3 self-stretch md:flex-col">
                          <input
                            type="checkbox"
                            id="policyThree"
                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                          />
                          <label
                            htmlFor="policyThree"
                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                          >
                            Tôi cam kết tuân thủ tất cả các quy định và điều khoản mà hệ thống đặt ra, bao gồm nhưng không giới hạn ở quy trình đăng bán, thẩm định sản phẩm và quy trình giao dịch.
                          </label>
                        </div>
                      </div>


                      <div className="flex w-[38%] justify-between gap-5 md:w-full">
                        <ButtonDH
                          size="md"
                          className="min-w-[152px] rounded-md bg-green-500 text-white hover:bg-green-600" // Thêm màu nền và màu chữ cho nút "Gửi thẩm định"
                        >
                          Gửi thẩm định
                        </ButtonDH>
                        <ButtonDH
                          size="md"
                          className="min-w-[152px] rounded-md bg-red-500 text-white hover:bg-red-600" // Thêm màu nền và màu chữ cho nút "Hủy bỏ"
                        >
                          Hủy bỏ
                        </ButtonDH>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}


export default RegisterProductPage;


