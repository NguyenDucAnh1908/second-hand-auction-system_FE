import { Helmet } from "react-helmet";
import { Img, Text, RatingBar, Heading, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable1 } from "../../../components/ReactTable1";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const tableData = [
    {
        idColumn: "#1923",
        productColumn: "Máy ảnh",
        sellerColumn: "Eleanor Pena",
        commentColumn: "Sản phẩm  quá tuyệt anh ",
        ratingColumn: 1,
        dateRow: "19-09-2024",
    },
    {
        idColumn: "#1923",
        productColumn: "CD",
        sellerColumn: "Eleanor Pena",
        commentColumn: "Sản phẩm  tốt ",
        ratingColumn: 1,
        dateRow: "19-09-2024",
    },
];

export default function ManageFeedback() {
    const [searchBarValue, setSearchBarValue] = React.useState("");
    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("idColumn", {
                cell: (info) => (
                    <div className="flex flex-col items-center">
                        <Text as="p" className="mt-6 text-[13.97px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex flex-col items-start gap-[68px] sm:gap-[34px]">
                        <Heading as="h2" className="ml-1.5 text-[14.9px] font-medium text-blue_gray-900 md:ml-0">
                            ID
                        </Heading>
                      
                    </div>
                ),
                meta: { width: "44px" },
            }),
            tableColumnHelper.accessor("productColumn", {
                cell: (info) => (
                    <div className="ml-8 flex flex-col items-start">
                        <div className="relative border-bg-white bg-teal-300" />
                        <Text as="p" className="text-[13.97px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-8 flex flex-col items-start">
                        <Heading as="h3" className="text-[14.9px] font-medium text-blue_gray-900">
                            Sản phẩm
                        </Heading>
                       
                    </div>
                ),
                meta: { width: "110px" },
            }),
            tableColumnHelper.accessor("sellerColumn", {
                cell: (info) => (
                    <div className="flex">
                        <Heading as="p" className="mt-[22px] text-[14.9px] font-medium text-blue_gray-900">
                            {info.getValue()}
                        </Heading>
                    </div>
                ),
                header: (info) => (
                    <div className="flex flex-col items-start gap-[66px] sm:gap-[33px]">
                        <Heading as="h4" className="text-[14.9px] font-medium text-blue_gray-900">
                            Seller
                        </Heading>
                      
                    </div>
                ),
                meta: { width: "96px" },
            }),
            tableColumnHelper.accessor("commentColumn", {
                cell: (info) => (
                    <div className="ml-[22px] flex">
                        <Text size="textmd" as="p" className="mt-4 text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-[22px] flex flex-col items-start gap-[68px] sm:gap-[34px]">
                        <Heading as="h6" className="ml-1.5 text-[14.9px] font-medium text-blue_gray-900 md:ml-0">
                            Bình luận
                        </Heading>
                       
                    </div>
                ),
                meta: { width: "180px" },
            }),
            tableColumnHelper.accessor("ratingColumn", {
                cell: (info) => (
                    <div className="ml-3 flex px-3">
                        <RatingBar value={info.getValue()} isEditable={true} size={18} className="mt-2.5 flex gap-2.5" />
                    </div>
                ),
                header: (info) => (
                    <div className="ml-3 flex flex-col items-start gap-[66px] px-3 sm:gap-[33px]">
                        <Heading as="p" className="text-[14.9px] font-medium text-blue_gray-900">
                            Đánh giá
                        </Heading>
                    </div>
                ),
                meta: { width: "146px" },
            }),
            tableColumnHelper.accessor("dateRow", {
                cell: (info) => (
                    <div className="ml-8 flex flex-col items-start">
                        <div className="relative  border-bg-white bg-teal-300" />
                        <Text as="p" className="text-[13.97px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-3 flex flex-col items-start gap-[66px] px-3 sm:gap-[33px]">
                        <Heading as="p" className="text-[14.9px] font-medium text-blue_gray-900">
                           Ngày đăng
                        </Heading>
                    </div>
                ),
                meta: { width: "146px" },
            }),
           
        ];
    }, []);

    return (
        <>
         
            <div className="flex w-full ">
                <div className="mx-auto mb-1 flex w-full max-w-[988px] flex-col gap-8">
                    <div className="flex flex-col items-start">
                        <Heading
                            size="textxl"
                            as="h1"
                            className="text-[28px] font-medium text-blue_gray-900 md:text-[26px] sm:text-[24px]"
                        >
                            Khách hàng
                        </Heading>
                        <Text size="textlg" as="p" className="text-[16px] font-normal text-blue_gray-900">
                            Danh sách phản hồi của khách hàng
                        </Text>
                    </div>
                    <div className="flex flex-col items-start gap-7 rounded-[14px] bg-bg-white py-5 shadow-xs">
                        <InputDH
                            name="SearchCustomer"
                            placeholder={`Tìm kiếm khách hàng`}
                            value={searchBarValue}
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            suffix={
                                searchBarValue?.length > 0 ? (
                                    <CloseSVG onClick={() => setSearchBarValue("")} height={16} width={22} fillColor="#041e42ff" />
                                ) : (
                                    <Img
                                        src="/images/img_search.svg"
                                        alt="Search 1"
                                        className="h-[16px] w-[22px] object-cover"
                                    />
                                )
                            }
                            className="flex h-[40px] w-[46%] items-center justify-center gap-4 rounded border-[0.93px] border-solid border-gray-200 bg-bg-white pl-4 pr-5 text-[13.97px] text-blue_gray-600"
                        />
                        <ReactTable1
                            bodyProps={{ className: "" }}
                            cellProps={{ className: "border-gray-100 border-b border-solid" }}
                            className="mb-[260px] mr-3.5 self-stretch py-[18px] md:mr-0 sm:block sm:overflow-x-auto sm:whitespace-nowrap"
                            columns={tableColumns}
                            data={tableData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}






