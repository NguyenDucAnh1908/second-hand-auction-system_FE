import React, {useEffect, useState} from "react";
import {useGetOrderRevenueQuery} from "@/services/order.service.js";
import {useGetUserComparisonQuery} from "@/services/user.service.js";
import {useGetAuctionCreatedTodayQuery} from "@/services/auction.service.js";
import {BanknotesIcon, PresentationChartBarIcon, UsersIcon, ChartBarIcon} from "@heroicons/react/24/solid";
import {ArrowUpIcon, ClockIcon} from "@heroicons/react/24/outline";
import {Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import {StatisticsChart} from "@/widgets/charts/index.js";

import statisticsChartsData from "@/data/statistics-charts-data.js";
import ordersOverviewData from "../../../data/orders-overview-data";

export function Home() {
    const {data: orderRevenueData, isLoading, isError} = useGetOrderRevenueQuery();
    const {data: userData} = useGetUserComparisonQuery();
    const {data: auctionData} = useGetAuctionCreatedTodayQuery();

    console.log("test", auctionData);


    const [statisticsData, setStatisticsData] = useState([]);
    useEffect(() => {
        if (orderRevenueData) {
            setStatisticsData([
                {
                    color: "gray",
                    icon: BanknotesIcon,
                    title: "Số dư",
                    value: `${new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(orderRevenueData?.data?.balance ?? 0)} `,
                    footer: {
                        color: "text-green-500",
                        value: "",
                        label: "",
                    },
                },

                {
                    color: "gray",
                    icon: UsersIcon,
                    title: "Tổng số người dùng",
                    value: orderRevenueData?.data?.totalUser ?? "0",
                    footer: {
                        color: userData?.change >= 0 ? "text-green-500" : "text-red-500",
                        value: "",
                        label: (
                            <div className="flex items-center space-x-2">
                                <ArrowUpIcon
                                    className={`h-5 w-5 ${userData?.change >= 0 ? "text-green-500" : "text-red-500"}`}
                                />
                                <span className="text-sm font-medium">
                {`${userData?.change >= 0 ? "Thêm" : "Giảm"} ${Math.abs(userData?.change)} người dùng`}
            </span>
                            </div>
                        ),
                    },

                },
                {
                    color: "gray",
                    icon: PresentationChartBarIcon,
                    title: "Tổng số phiên đấu",
                    value: orderRevenueData?.data?.totalAuction ?? "0",
                    footer: {
                        color: userData?.change >= 0 ? "text-green-500" : "text-red-500",
                        value: "",
                        label: (
                            <div className="flex items-center space-x-2">
                                <ArrowUpIcon
                                    className={`h-5 w-5 ${auctionData >= 0 ? "text-green-500" : "text-red-500"}`}
                                />
                                <span className="text-sm font-medium">
                {`${auctionData >= 0 ? "Thêm" : "Giảm"} ${Math.abs(auctionData)} phiên đấu`}
            </span>
                            </div>
                        ),
                    },
                },
                {
                    color: "gray",
                    icon: ChartBarIcon,
                    title: "Tổng số giao dịch",
                    value: `${orderRevenueData?.data?.totalTransaction ?? "0"}`,
                    footer: {
                        color: "text-green-500",
                        value: "",
                        label: "",
                    },
                },
            ]);
        }
    }, [orderRevenueData]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="mt-12">
            {/* Statistics Cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {statisticsData.length > 0 ? (
                    statisticsData.map((card, index) => (
                        <div key={index} className={`bg-${card.color}-100 p-6 rounded-lg shadow-lg`}>
                            <div className="flex items-center">
                                <div className="h-8 w-8 text-gray-500">
                                    <card.icon/>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                    <p className="text-2xl font-bold">{card.value}</p>
                                    <div className={`text-sm ${card.footer.color}`}>
                                        <span>{card.footer.value}</span> {card.footer.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No data available...</div>
                )}
            </div>

            {/* Statistics Charts */}
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400"/>
                                &nbsp;{props.footer}
                            </Typography>
                        }
                    />
                ))}
            </div>

            {/* Revenue Card */}
            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/*<Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">*/}
                {/*    <CardHeader floated={false} shadow={false} color="transparent"*/}
                {/*                className="m-0 flex items-center justify-between p-6">*/}
                {/*        <div>*/}
                {/*            <Typography variant="h6" color="blue-gray" className="mb-1">*/}
                {/*                Revenue*/}
                {/*            </Typography>*/}
                {/*            <Typography variant="small"*/}
                {/*                        className="flex items-center gap-1 font-normal text-blue-gray-600">*/}
                {/*                <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500"/>*/}
                {/*                <strong>+10%</strong> this month*/}
                {/*            </Typography>*/}
                {/*        </div>*/}
                {/*    </CardHeader>*/}
                {/*    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">*/}
                {/*        /!* Revenue info *!/*/}
                {/*        <Typography variant="h5" color="blue-gray">*/}
                {/*            Total Revenue: ${orderRevenueData?.data?.totalRevenue ?? "0"}*/}
                {/*        </Typography>*/}
                {/*        <Typography variant="small" color="blue-gray">*/}
                {/*            Total Transactions: {orderRevenueData?.data?.totalTransaction ?? "0"}*/}
                {/*        </Typography>*/}
                {/*    </CardBody>*/}
                {/*</Card>*/}

                {/* Orders Overview Card */}
                {/*<Card className="border border-blue-gray-100 shadow-sm">*/}
                {/*    <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">*/}
                {/*        <Typography variant="h6" color="blue-gray" className="mb-2">*/}
                {/*            Orders Overview*/}
                {/*        </Typography>*/}
                {/*    </CardHeader>*/}
                {/*    <CardBody className="pt-0">*/}
                {/*        /!* Orders list *!/*/}
                {/*        {ordersOverviewData.map(({icon, color, title, description}, key) => (*/}
                {/*            <div key={title} className="flex items-start gap-4 py-3">*/}
                {/*                <div*/}
                {/*                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"}`}>*/}
                {/*                    {React.createElement(icon, {className: `!w-5 !h-5 ${color}`})}*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <Typography variant="small" color="blue-gray" className="block font-medium">*/}
                {/*                        {title}*/}
                {/*                    </Typography>*/}
                {/*                    <Typography as="span" variant="small"*/}
                {/*                                className="text-xs font-medium text-blue-gray-500">*/}
                {/*                        {description}*/}
                {/*                    </Typography>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </CardBody>*/}
                {/*</Card>*/}
            </div>
        </div>
    );
}

export default Home;
