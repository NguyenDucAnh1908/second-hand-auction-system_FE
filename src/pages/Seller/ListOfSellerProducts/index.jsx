import { Helmet } from "react-helmet";
import { Img, Text, ButtonDH, Heading, InputDH } from "../../../components";
import HeaderSeller from "../../../components/HeaderSeller/index.jsx";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable1 } from "../../../components/ReactTable1";
import SidebarSeller from "../../../components/SidebarSeller/index.jsx";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

const tableData = [
  {
    idHeaderRow: "#1923",
    productHeaderRow: "Áo Thun Nam Nike",
    imageHeaderRow: "images/img_items.png",
    timeHeaderRow: "15/9/2024\n21:30",
    statusHeaderRow: "Chưa duyệt",
    priceHeaderRow: "250.000đ",
    editHeaderRow: "images/img_group_26.svg",
  },
  {
    idHeaderRow: "#1922",
    productHeaderRow: "Áo Thun Nữ Adidas",
    imageHeaderRow: "images/img_items.png",
    timeHeaderRow: "15/9/2024\n21:30",
    statusHeaderRow: "Đã duyệt",
    priceHeaderRow: "250.000đ",
    editHeaderRow: "images/img_group_26.svg",
  },
  {
    idHeaderRow: "#1921",
    productHeaderRow: "Áo Thun Nữ Adidas",
    imageHeaderRow: "images/img_items.png",
    timeHeaderRow: "15/9/2024\n21:30",
    statusHeaderRow: "Không đạt",
    priceHeaderRow: "250.000đ",
    editHeaderRow: "images/img_group_26.svg",
  },
  {
    idHeaderRow: "#1921",
    productHeaderRow: "Áo Thun Nữ Adidas",
    imageHeaderRow: "images/img_items.png",
    timeHeaderRow: "15/9/2024\n21:30",
    statusHeaderRow: "Đã duyệt",
    priceHeaderRow: "250.000đ",
    editHeaderRow: "images/img_group_26.svg",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Chưa duyệt":
      return "bg-yellow-500"; // Màu vàng cho trạng thái chưa duyệt
    case "Đã duyệt":
      return "bg-green-500"; // Màu xanh cho trạng thái đã duyệt
    case "Không đạt":
      return "bg-red-500"; // Màu đỏ cho trạng thái không đạt
    default:
      return "bg-gray-300"; // Màu xám cho trạng thái mặc định
  }
};

export default function ListOfSellerProductPage() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const [searchBarValue1, setSearchBarValue1] = React.useState("");
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("idHeaderRow", {
        cell: (info) => (
          <div className="flex flex-col items-end">
            <Text
              as="p"
              className="mb-[22px] text-[15px] font-normal text-blue_gray-900_01"
            >
              {info.getValue()}
            </Text>
          </div>
        ),
        header: (info) => (
          <div className="flex justify-center py-4">
            <Heading
              as="h2"
              className="mb-1.5 text-[16px] font-medium text-blue_gray-900_01"
            >
              ID
            </Heading>
          </div>
        ),
        meta: { width: "70px" },
      }),
      tableColumnHelper.accessor("productHeaderRow", {
        cell: (info) => (
          <div className="ml-5 flex flex-1 justify-center px-5">
            <Text
              as="p"
              className="mb-6 text-[15px] font-normal text-blue_gray-900_01"
            >
              {info.getValue()}
            </Text>
          </div>
        ),
        header: (info) => (
          <div className="ml-5 flex justify-center p-4">
            <Heading
              as="h3"
              className="mb-1.5 text-[16px] font-medium text-blue_gray-900_01"
            >
              Sản phẩm
            </Heading>
          </div>
        ),
        meta: { width: "178px" },
      }),
      tableColumnHelper.accessor("imageHeaderRow", {
        cell: (info) => (
          <div className="ml-7 flex px-7 sm:px-5">
            <Img
              src={info.getValue()}
              alt="Product Image"
              className="mb-2.5 h-[80px] w-[80px] object-cover"
            />
          </div>
        ),
        header: (info) => (
          <div className="ml-7 flex justify-center p-3.5">
            <Heading
              as="h4"
              className="mb-2.5 text-[16px] font-medium text-blue_gray-900_01"
            >
              Hình ảnh
            </Heading>
          </div>
        ),
        meta: { width: "146px" },
      }),
      tableColumnHelper.accessor("timeHeaderRow", {
        cell: (info) => (
          <div className="ml-12 flex-1 px-2">
            <div className="mb-3 flex items-center">
              <div className="h-[44px] w-[46%] rounded-md bg-gray-50" />
              <Text
                as="p"
                className="relative ml-[-96px] w-[52%] text-[15px] font-normal leading-[22px] text-blue_gray-900_01"
              >
                {info.getValue()}
              </Text>
            </div>
          </div>
        ),
        header: (info) => (
          <div className="ml-12 flex flex-row justify-start px-[30px] py-[18px] sm:px-5">
            <Heading
              as="h5"
              className="mb-1 text-[16px] font-medium text-blue_gray-900_01"
            >
              Thời gian
            </Heading>
          </div>
        ),
        meta: { width: "166px" },
      }),
      tableColumnHelper.accessor("statusHeaderRow", {
        cell: (info) => (
          <div className="flex">
            <ButtonDH
              className={`mb-[18px] flex h-[34px] min-w-[110px] flex-row items-center justify-center rounded-md ${getStatusColor(info.getValue())} px-3 text-center text-[13px] font-medium text-bg-white sm:px-5`}
              style={{ minWidth: "120px", height: "40px" }} // Thêm chiều rộng tối thiểu và chiều cao cố định
            >
              {info.getValue()}
            </ButtonDH>
          </div>
        ),
        header: (info) => (
          <div className="flex justify-start py-5">
            <Heading
              as="h6"
              className="text-[16px] font-medium text-blue_gray-900_01"
            >
              Trạng thái
            </Heading>
          </div>
        ),
        meta: { width: "130px" },
      }),

      tableColumnHelper.accessor("priceHeaderRow", {
        cell: (info) => (
          <div className="ml-[22px] flex px-7 sm:px-5">
            <Heading
              size="headingxs"
              as="p"
              className="mb-3.5 flex text-[10px] font-semibold capitalize text-blue_gray-900_01 !important" // Thêm !important
            >
              <span>250.000</span>
              <a href="#" className="inline underline">
                đ
              </a>
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="ml-[22px] flex px-4 py-5">
            <div className="flex w-full flex-col items-center">
              <Heading
                as="p"
                className="text-[16px] font-medium text-blue_gray-900_01"
              >
                Giá khởi điểm
              </Heading>
            </div>
          </div>
        ),
        meta: { width: "144px" },
      }),
      tableColumnHelper.accessor("editHeaderRow", {
        cell: (info) => (
          <div className="ml-4 px-1">
            <div className="mb-[30px] ml-2 flex justify-center md:ml-0">
              <Img
                src="images/img_edit.png"
                alt="Edit Icon"
                className="h-[40px]"
              />
              <Img
                src="images/img_delete.png"
                alt="Delete Icon"
                className="h-[40px]"
              />
            </div>
          </div>
        ),
        header: (info) => (
          <div className="ml-4 flex py-4">
            <Heading
              as="p"
              className="mb-1.5 text-[16px] font-medium text-blue_gray-900_01"
            >
              Chỉnh sửa
            </Heading>
          </div>
        ),
        meta: { width: "76px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>Seller Product Management - EZShop</title>
        <meta
          name="description"
          content="Explore the comprehensive list of products managed by sellers on EZShop. Find items by ID, create new listings, and track product approval statuses. Ideal for seller inventory management and order processing."
        />
      </Helmet>
      <div className="w-full bg-gray-50_01">
        <div className="mt-4 flex flex-col items-end">
          <div className="w-[100%] md:w-full md:px-5">
            <HeaderSeller toggleSidebar={toggleSidebar} />
            <div className="flex items-start">
              {isSidebarVisible && <SidebarSeller />}
              <div className="h-[1196px] flex-1 self-center rounded-[16px] bg-[url(/images/img_group_46876.png)] bg-cover bg-no-repeat py-[84px] md:h-auto md:py-5">
                <div className="mb-[86px] flex flex-col gap-7">
                  <div className="ml-1 flex md:ml-0">
                    <Heading
                      size="headingxl"
                      as="h1"
                      className="text-[30px] font-semibold uppercase text-gray-900_01 md:text-[44px] sm:text-[38px] -mt-[80px] ml-[20px]"
                    >
                      Danh sách sản phẩm
                    </Heading>
                  </div>
                  <div className=" mr-[38px] flex justify-between gap-5 md:mx-0 sm:flex-col -mt-[50px] ml-[15px]">
                    <InputDH
                      name="Search Field"
                      placeholder={`Tìm kiếm theo ID`}
                      value={searchBarValue1}
                      onChange={(e) => setSearchBarValue1(e.target.value)}
                      suffix={
                        searchBarValue1?.length > 0 ? (
                          <CloseSVG
                            onClick={() => setSearchBarValue1("")}
                            height={18}
                            width={18}
                            fillColor="#626974ff"
                          />
                        ) : (
                          <Img
                            src="images/img_search.svg"
                            alt="Search"
                            className="h-[18px] w-[18px]"
                          />
                        )
                      }
                      className="flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full "
                    />
                    <ButtonDH className="flex h-[40px] min-w-[152px] flex-row items-center justify-center gap-0.5 rounded-md bg-green-a700  text-center text-[14px] text-bg-white shadow-xs ml-auto">
                      Tạo sản phẩm
                    </ButtonDH>
                  </div>
                  <div className="mr-[38px] flex flex-col gap-8 md:mr-0">
                    <ReactTable1
                      size="xs"
                      className="producttable md:block md:overflow-x-auto md:whitespace-nowrap"
                      bodyProps={{ className: "" }}
                      headerCellProps={{ className: "bg-gray-100_01" }}
                      columns={tableColumns}
                      data={tableData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
