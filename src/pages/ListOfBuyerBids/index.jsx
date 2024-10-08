import {Helmet} from "react-helmet";
import React from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import {
    Button,
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Input,
} from "@material-tailwind/react";

import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {DocumentMagnifyingGlassIcon, FlagIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import Pagination from "@/components/Pagination/index.jsx";

const TABLE_ROW = [
    {
        customer: "Nguyen Van A",
        bidPrice: "$1,000",
        change: "+10%",
        bidDate: "2023-10-05",
        trend: 4,
        actions: "",
        color: "green",
    },
    {
        customer: "Tran Thi B",
        bidPrice: "$950",
        change: "-5%",
        bidDate: "2023-10-04",
        actions: "",
        color: "red",
    },
    {
        customer: "Le Van C",
        bidPrice: "$980",
        change: "+2%",
        bidDate: "2023-10-04",
        actions: "",
        color: "green",
    },
];

const TABLE_HEAD = [
    {head: "Khách hàng", customeStyle: "!text-left"},
    {head: "Giá thầu", customeStyle: "text-right"},
    {head: "Thay đổi", customeStyle: "text-right"},
    {head: "Ngày", customeStyle: "text-right"},
    {head: "Trend", customeStyle: "text-right"},
    {head: "Hành động", customeStyle: "text-right"},
];

export default function ListOfBuyerBids() {
    return (
        <>
            <Helmet>
                <title>Lịch sử giá thầu sản phẩm</title>
                <meta
                    name="description"
                    content="Xem lại lịch sử đấu giá của sản phẩm với các thông tin chi tiết về giá thầu, khách hàng và ngày tháng."
                />
            </Helmet>
            <div className="w-full">
                <Header2/>
                <section className="m-10">
                    <Card className="h-full w-full">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
                        >
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Lịch sử đấu giá
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="text-gray-600 font-normal mt-1"
                                >
                                    Xem chi tiết lịch sử giá thầu từ các khách hàng.
                                </Typography>
                            </div>
                            <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
                                <div className="w-full md:w-72">
                                    <Input
                                        size="lg"
                                        label="Tìm kiếm"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                    />
                                </div>
                                <Button variant="outlined" className="flex items-center gap-2">
                                    24h
                                    <ChevronDownIcon strokeWidth={3} className="w-3 h-3"/>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll !px-0 py-2">
                            <table className="w-full min-w-max table-auto">
                                <thead>
                                <tr>
                                    {TABLE_HEAD.map(({head, customeStyle}) => (
                                        <th
                                            key={head}
                                            className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                                        >
                                            <Typography
                                                color="blue-gray"
                                                variant="small"
                                                className="!font-bold"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {TABLE_ROW.map(
                                    ({customer, bidPrice, change, bidDate, color}, index) => {
                                        const isLast = index === TABLE_ROW.length - 1;
                                        const classes = isLast
                                            ? "!p-4"
                                            : "!p-4 border-b border-gray-300";
                                        return (
                                            <tr key={customer}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="!font-semibold"
                                                    >
                                                        {customer}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="!font-normal text-gray-600 text-right"
                                                    >
                                                        {bidPrice}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color={color}
                                                        className="!font-bold text-right"
                                                    >
                                                        {change}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="!font-normal text-gray-600 text-right"
                                                    >
                                                        {bidDate}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="max-w-[12rem] ml-auto h-12 -translate-y-6">
                                                        {/*<AreaChart*/}
                                                        {/*    colors={["#2196F373"]}*/}
                                                        {/*    options={{}}*/}
                                                        {/*    series={[*/}
                                                        {/*        {*/}
                                                        {/*            name: "2023 Sales",*/}
                                                        {/*            data: [*/}
                                                        {/*                30, 40, 500, 420, 700, 350, 500, 330, 900,*/}
                                                        {/*            ],*/}
                                                        {/*        },*/}
                                                        {/*    ]}*/}
                                                        {/*/>*/}
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex justify-end gap-4">
                                                        <IconButton variant="text" size="sm">
                                                            <DocumentMagnifyingGlassIcon
                                                                className="h-5 w-5 text-gray-900"/>
                                                        </IconButton>
                                                        <IconButton variant="text" size="sm">
                                                            <FlagIcon className="h-5 w-5 text-gray-900"/>
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                                </tbody>
                            </table>
                        </CardBody>
                        <div className="flex justify-center items-center mt-4">
                            <Pagination/>
                        </div>
                    </Card>
                </section>

                <div className="mt-[194px] self-stretch">
                    <FooterBK
                        className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"
                    />
                </div>
            </div>
        </>
    );
}
