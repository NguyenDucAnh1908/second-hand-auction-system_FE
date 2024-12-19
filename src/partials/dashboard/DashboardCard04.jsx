import React from 'react';
import BarChart from '../../charts/BarChart01';
import { useGetOrderUserByMonthQuery } from "@/services/order.service.js";
// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {
  // Function to format currency in VNĐ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  // Fetch data from API
  const { data, isLoading, isError } = useGetOrderUserByMonthQuery();
  console.log("Data",data)
  // Check if the data is loading or there is an error
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // Assuming that the `data` is an object with labels and two sets of data: 'chuaThanhToan' and 'thanhToan'
  const chartData = {
    labels: data.labels || [],  // Ensure labels are from the API response
    datasets: [
      {
        label: 'Chưa thanh toán (VNĐ)',
        data: data.chuaThanhToan || [],  // 'chuaThanhToan' should be an array of amounts
        backgroundColor: tailwindConfig().theme.colors.sky[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.sky[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      {
        label: 'Thanh toán (VNĐ)',
        data: data.thanhToan || [],  // 'thanhToan' should be an array of amounts
        backgroundColor: tailwindConfig().theme.colors.violet[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.violet[600],
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += formatCurrency(context.raw);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return formatCurrency(value);
          },
        },
      },
    },
  };

  return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Số order</h2>
        </header>
        {/* Chart built with Chart.js 3 */}
        <BarChart data={chartData} options={chartOptions} width={595} height={248} />
      </div>
  );
}

export default DashboardCard04;
