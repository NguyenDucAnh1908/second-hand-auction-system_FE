import { Helmet } from "react-helmet";
import { Heading, ButtonDH, Text, Img, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { ReactTable1 } from "../../../components/ReactTable1";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { useNavigate } from "react-router-dom"; 

const tableData = [
    {
        idHeader: "#1923",
        productHeader: "Áo Thun Nam Nike",
        imageHeader: "/images/img_items.png",
        timeHeader: "15/9/2024\n21:30",
        statusHeader: "Đang chờ",
        sellerHeader: "Chánh Tổng",
        assessmentButtonDH: "Thẩm định",
    },
    {
        idHeader: "#1923",
        productHeader: "Áo Thun Nam Nike",
        imageHeader: "/images/img_items.png",
        timeHeader: "15/9/2024\n21:30",
        statusHeader: "Đã duyệt",
        sellerHeader: "Chánh Tổng",
        assessmentButtonDH: "",
    },
    {
        idHeader: "#1923",
        productHeader: "Áo Thun Nam Nike",
        imageHeader: "/images/img_items.png",
        timeHeader: "15/9/2024\n21:30",
        statusHeader: "Đã từ chối",
        sellerHeader: "Chánh Tổng",
        assessmentButtonDH: "",
    },
];

export default function StaffProductListPage() {

    const [searchBarValue, setSearchBarValue] = React.useState("");
    const navigate = useNavigate();

    const tableColumns = React.useMemo(() => {
        const tableColumnHelper = createColumnHelper();
        return [
            tableColumnHelper.accessor("idHeader", {
                cell: (info) => (
                    <div className="flex items-center justify-end">
                        <Text as="p" className="text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex py-4 justify-center">
                        <Heading size="textmd" as="h1" className="text-[16px] font-medium text-blue_gray-900">
                            ID
                        </Heading>
                    </div>
                ),
                meta: { width: "70px" },
            }),
            tableColumnHelper.accessor("productHeader", {
                cell: (info) => (
                    <div className="ml-4 flex px-4">
                        <Text as="p" className="text-[15px] font-normal text-blue_gray-900">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="ml-4 flex p-4 justify-start">
                        <Heading size="textmd" as="h2" className="text-[16px] font-medium text-blue_gray-900">
                            Sản phẩm
                        </Heading>
                    </div>
                ),
                meta: { width: "174px" },
            }),
            tableColumnHelper.accessor("imageHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <Img src={info.getValue()} alt="Product Image" className="h-[80px] w-[80px] object-cover" />
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-3.5">
                        <Heading size="textmd" as="h3" className="text-[16px] font-medium text-blue_gray-900">
                            Hình ảnh
                        </Heading>
                    </div>
                ),
                meta: { width: "144px" },
            }),
            tableColumnHelper.accessor("timeHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <Text as="p" className="text-[15px] font-normal leading-[22px] text-blue_gray-900 text-center">
                            {info.getValue()}
                        </Text>
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-3">
                        <Heading size="textmd" as="h4" className="text-[16px] font-medium text-blue_gray-900">
                            Thời gian
                        </Heading>
                    </div>
                ),
                meta: { width: "152px" },
            }),
            tableColumnHelper.accessor("statusHeader", {
                cell: (info) => (
                    <div className="flex justify-center">
                        <ButtonDH
                            className={`h-[34px] min-w-[110px] rounded-md px-6 text-[13px] font-medium text-bg-white ${
                                info.getValue() === "Đã duyệt"
                                    ? "bg-green-500"
                                    : info.getValue() === "Đã từ chối"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                            }`}
                        >
                            {info.getValue()}
                        </ButtonDH>
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-center py-4">
                        <Heading size="textmd" as="h5" className="text-[16px] font-medium text-blue_gray-900">
                            Trạng thái
                        </Heading>
                    </div>
                ),
                meta: { width: "116px" },
            }),
            tableColumnHelper.accessor("sellerHeader", {
                cell: (info) => (
                    <div className="flex justify-between items-center">
                        <Text as="p" className="text-[13px] font-medium text-black-900">
                            {info.getValue()}
                        </Text>
                        {info.row.original.assessmentButtonDH === "Thẩm định" && (
                            <ButtonDH
                                className="h-[34px] min-w-[110px] rounded-md bg-blue-500 px-5 text-[13px] font-medium text-white"
                                onClick={() => navigate('/dashboard/AppraisalForm')} // Chuyển hướng đến AppraisalForm
                            >
                                {info.row.original.assessmentButtonDH}
                            </ButtonDH>
                        )}
                    </div>
                ),
                header: (info) => (
                    <div className="flex justify-start py-4">
                        <Heading size="textmd" as="h6" className="text-[16px] font-medium text-blue_gray-900">
                            Người bán
                        </Heading>
                    </div>
                ),
                meta: { width: "272px" },
            }),
            
            
        ];
    }, [navigate]);

    return (
        <>
           
            <div className="flex w-full flex-col items-start justify-center gap-10 bg-bg-white   pr-14 md:p-5">
                <InputDH
                    name="Search Box"
                    placeholder={`Tìm kiếm theo ID`}
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    suffix={
                        searchBarValue?.length > 0 ? (
                            <CloseSVG onClick={() => setSearchBarValue("")} height={18} width={18} fillColor="#626974ff" />
                        ) : (
                            <Img src="/images/img_search.svg" alt="Search" className="h-[18px] w-[18px]" />
                        )
                    }
                    className=" flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs md:ml-0"
                />
                <div className="w-[92%] md:w-full">
                    <ReactTable1
                        size="xs"
                        className="table-auto"
                        columns={tableColumns}
                        data={tableData}
                        defaultPageSize={6}
                    />
                </div>
            </div>
        </>
    );
}
