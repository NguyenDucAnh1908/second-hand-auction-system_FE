import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import { ReactTable1 } from "../../components/ReactTable1";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";

const tableData = [
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.500.000đ",
    dateRow: "2024-09-20",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.400.000đ",
    dateRow: "2024-09-19",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.300.000đ",
    dateRow: "2024-09-18",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.200.000đ",
    dateRow: "2024-09-17",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.200.000đ",
    dateRow: "2024-09-17",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.200.000đ",
    dateRow: "2024-09-16",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.200.000đ",
    dateRow: "2024-09-15",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "2.200.000đ",
    dateRow: "2024-09-14",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "250.000đ",
    dateRow: "2024-09-12",
  },
  {
    idRow: "#6548",
    customerRow: "Joseph*******",
    bidRow: "250.000đ",
    dateRow: "2024-09-12",
  },
];

export default function ListOfBuyerBids() {
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("idRow", {
        cell: (info) => (
          <div className="flex px-3.5">
            <Heading as="h2" className="text-[15px] font-semibold text-blue_gray-900">
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex p-4">
            <Heading size="headings" as="h1" className="text-[16px] font-semibold text-blue_gray-900 sm:text-[13px]">
              Mã ID
            </Heading>
          </div>
        ),
        meta: { width: "88px" },
      }),
      tableColumnHelper.accessor("customerRow", {
        cell: (info) => (
          <div className="ml-[94px] flex px-3">
            <Text size="textxs" as="p" className="self-end text-[15px] font-normal text-blue_gray-900">
              {info.getValue()}
            </Text>
          </div>
        ),
        header: (info) => (
          <div className="ml-[94px] flex p-4">
            <Heading
              size="headings"
              as="h2"
              className="self-end text-[16px] font-semibold text-blue_gray-900 sm:text-[13px]"
            >
              Khách hàng
            </Heading>
          </div>
        ),
        meta: { width: "230px" },
      }),
      tableColumnHelper.accessor("bidRow", {
        cell: (info) => (
          <div className="ml-[30px] flex px-3.5">
            <Text as="p" className="text-[16px] font-normal text-blue_gray-900 sm:text-[13px]">
              {info.getValue()}
            </Text>
          </div>
        ),
        header: (info) => (
          <div className="ml-[30px] flex p-4">
            <Heading size="headings" as="h3" className="text-[16px] font-semibold text-blue_gray-900 sm:text-[13px]">
              Giá thầu
            </Heading>
          </div>
        ),
        meta: { width: "158px" },
      }),
      tableColumnHelper.accessor("dateRow", {
        cell: (info) => (
          <div className="ml-[98px] flex flex-1 items-center">
            <Text as="p" className="text-[16px] font-normal text-blue_gray-900 sm:text-[13px]">
              {info.getValue()}
            </Text>
            <div className="h-[22px] w-[8px] rounded bg-green-a700_28" />
          </div>
        ),
        header: (info) => (
          <div className="ml-[98px] flex flex-1 py-4">
            <Heading
              size="headings"
              as="h4"
              className="self-end text-[16px] font-semibold text-blue_gray-900 sm:text-[13px]"
            >
                   Ngày
            </Heading>
          </div>
        ),
        meta: { width: "268px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>Product Bid History - Detailed Bidding Information</title>
        <meta
          name="description"
          content="Explore the comprehensive bid history for product ID #6548. Review the competitive bids, customer names, and dates to understand the bidding timeline and pricing trends."
        />
      </Helmet>
      <div className="w-full">
      <Header2 />
        <ReactTable1
          size="xs"
          className="tablemid border-separate border-spacing-0 rounded-[16px] bg-white-a700 p-[30px] sm:block sm:overflow-x-auto sm:whitespace-nowrap sm:p-5"
          bodyProps={{ className: "" }}
          headerCellProps={{ className: "bg-gray-100" }}
          headerProps={{ className: "border-gray-100 border-b border-solid" }}
          cellProps={{ className: "border-indigo-50 border-b border-solid" }}
          columns={tableColumns}
          data={tableData}
        />
         <div className="mt-[194px] self-stretch">
          <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </div>
      </div>
    </>
  );
}





