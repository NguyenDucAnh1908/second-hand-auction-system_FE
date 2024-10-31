import { Helmet } from "react-helmet";
import React, { useState } from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, DocumentMagnifyingGlassIcon, FlagIcon } from "@heroicons/react/24/solid";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetAllBidsQuery } from "../../services/bid.service";

const TABLE_HEAD = [
    { head: "Khách hàng", customeStyle: "!text-left" },
    { head: "Giá thầu", customeStyle: "text-right" },
    { head: "Trạng thái", customeStyle: "text-right" },
    { head: "Ngày", customeStyle: "text-right" },
    { head: "Trend", customeStyle: "text-right" },
    { head: "Hành động", customeStyle: "text-right" },
];

export default function ListOfBuyerBids() {
    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useGetAllBidsQuery({ auctionId: 11, page });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <Helmet>
                <title>Danh sách người đấu giá</title>
                <meta
                    name="description"
                    content="Xem lại lịch sử đấu giá của sản phẩm với các thông tin chi tiết về giá thầu, khách hàng và ngày tháng."
                />
            </Helmet>
            <div className="w-full">
                <Header2 />
                <section className="m-10">
                    <Card className="h-full w-full">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
                        >
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Danh sách người đấu giá
                                </Typography>
                            </div>
                            <div className="flex items-center w-full shrink-0 gap-4 md:w-max">
                                <div className="w-[35%] md:w-72">
                                    <Input
                                        size="lg"
                                        label="Tìm kiếm"
                                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll !px-0 py-2">
                            <table className="w-full min-w-max table-auto">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map(({ head, customeStyle }) => (
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
                                    {data?.data.map((bid, index) => {
                                        const { username, bidAmount, winBid, bidTime } = bid;
                                        const isLast = index === data.data.length - 1;
                                        const classes = isLast
                                            ? "!p-4"
                                            : "!p-4 border-b border-gray-300";

                                        return (
                                            <tr key={username}>
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="!font-semibold">
                                                        {username.length > 8
                                                            ? username.slice(0, 3) + '*****' + username.slice(-3)
                                                            : username} 
                                                    </Typography>

                                                </td>


                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="!font-normal text-gray-600 text-right"
                                                    >
                                                        {bidAmount.toLocaleString()} VNĐ
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className={`!font-normal text-right ${winBid ? "text-green-500" : "text-gray-600"}`} // Chỉ hiển thị chữ "Giá cao nhất hiện tại" và màu xanh khi winBid là true
                                                    >
                                                        {winBid ? "Giá cao nhất hiện tại" : null}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="!font-normal text-gray-600 text-right"
                                                    >
                                                        {new Date(bidTime).toLocaleDateString()}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    {/* Bạn có thể thêm biểu đồ hoặc trend ở đây */}
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex justify-end gap-4">
                                                        <IconButton variant="text" size="sm">
                                                            <DocumentMagnifyingGlassIcon
                                                                className="h-5 w-5 text-gray-900"
                                                            />
                                                        </IconButton>
                                                        <IconButton variant="text" size="sm">
                                                            <FlagIcon className="h-5 w-5 text-gray-900" />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                        <div className="flex justify-center items-center mt-4">
                            <Pagination
                                currentPage={page}
                                totalPages={data?.totalPages || 0}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
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
