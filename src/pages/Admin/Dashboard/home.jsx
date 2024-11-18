import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../../widgets/cards";
import { StatisticsChart } from "../../../widgets/charts";
import { useGetBalanceQuery } from "../../../services/walletCustomerService";
import { useGetOrderRevenueQuery } from "../../../services/order.service";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import statisticsCardsData from "../../../data/statistics-cards-data";
import statisticsChartsData from "../../../data/statistics-charts-data";
import ordersOverviewData from "../../../data/orders-overview-data";

export function Home() {
  // API Calls
  const { data: balanceData, isLoading: isBalanceLoading, isError: isBalanceError } = useGetBalanceQuery();
  const { data: orderRevenueData, isLoading: isOrderRevenueLoading, isError: isOrderRevenueError } = useGetOrderRevenueQuery();
  console.log("orderRevenueData",orderRevenueData)
  // Kiểm tra trạng thái tải dữ liệu hoặc lỗi
  if (isBalanceLoading || isOrderRevenueLoading) {
    return <div>Loading...</div>;
  }

  if (isBalanceError || isOrderRevenueError) {
    return <div>Error loading data</div>;
  }

  // Kiểm tra nếu dữ liệu không tồn tại trước khi sử dụng
  if (!balanceData || !orderRevenueData) {
    return <div>Data is unavailable</div>;
  }

  // Lấy các giá trị từ dữ liệu trả về
  const totalRevenue = orderRevenueData?.data?.totalRevenue;
  const totalBalance = orderRevenueData?.data?.balance || 0;
  const totalTransaction = orderRevenueData?.data?.totalTransaction || 0;
  const revenuePercentage = orderRevenueData?.data?.totalRevenue ? `${orderRevenueData.totalRevenue * 100}%` : "0%";
  console.log("totalRevenue",totalBalance)
  return (
    <div className="mt-12">
      {/* Statistics Cards */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
            footer={
              footer && (
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              )
            }
          />
        ))}
      </div>

      {/* Statistics Charts */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography variant="small" className="flex items-center font-normal text-blue-gray-600">
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      {/* Revenue Card */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 flex items-center justify-between p-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Revenue
              </Typography>
              <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
                <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
                <strong>{revenuePercentage}</strong> this month
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {/* Revenue info */}
            <Typography variant="h5" color="blue-gray">
              Total Revenue: {totalRevenue}
            </Typography>
            <Typography variant="small" color="blue-gray">
              Total Transactions: {totalTransaction}
            </Typography>
          </CardBody>
        </Card>

        {/* Orders Overview Card */}
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
              <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
              <strong>{revenuePercentage}</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {/* Orders list */}
            {ordersOverviewData.map(({ icon, color, title, description }, key) => (
              <div key={title} className="flex items-start gap-4 py-3">
                <div className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"}`}>
                  {React.createElement(icon, { className: `!w-5 !h-5 ${color}` })}
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="block font-medium">
                    {title}
                  </Typography>
                  <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                    {description}
                  </Typography>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
