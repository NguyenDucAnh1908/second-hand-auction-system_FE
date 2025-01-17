import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetOrderByMonthQuery } from '@/services/order.service.js';
import { tailwindConfig } from '../../utils/Utils';
import { useGetUserByIdQuery } from '../../services/user.service';

function DashboardCard04() {
    // Function to format currency in VNĐ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value).replace('₫', ' VNĐ'); // Thay đổi ký hiệu ₫ thành VNĐ
    };

    const [dataResults, setDataResults] = useState([]);

    const { data } = useGetOrderByMonthQuery();

    const { data: dataUser } = useGetUserByIdQuery();

    useEffect(() => {
        if (data?.data) {
            // Chắc chắn rằng dữ liệu trả về là hợp lệ
            setDataResults(data.data);
        }
    }, [data]);



    // Tạo một danh sách tháng từ 1 đến 12
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);

    // Tạo dữ liệu cho biểu đồ, với mỗi tháng có giá trị 0 nếu không có dữ liệu
    const chartData = allMonths.map((month) => {
        const monthData = dataResults.find(item => item.month === month);
        return {
            month: `Tháng ${month}`,
            totalAmount: monthData ? monthData.totalAmount : 0, // Nếu không có dữ liệu cho tháng này, set là 0
        };
    });

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                {/* Áp dụng CSS nội tuyến cho số dư tài khoản */}
                <h2
                    style={{
                        fontWeight: '800',
                        fontSize: '2rem',
                        textAlign: 'center',
                        fontFamily: 'Poppins, Arial, sans-serif',
                        color: '#065f46', // Màu xanh lá đậm
                        margin: '20px 0',
                        padding: '10px 0',
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <i
                            className="fas fa-wallet"
                            style={{
                                fontSize: '2rem',
                                color: '#10b981',
                            }}
                        ></i>
                        <span
                            style={{
                                fontFamily: 'Roboto, Poppins, sans-serif',
                                fontWeight: '600',
                                fontSize: '1.8rem',
                            }}
                        >
                            Số dư tài khoản:
                        </span>
                        <span
                            style={{
                                marginLeft: '8px',
                                color: '#10b981',
                                fontFamily: 'Courier New, monospace',
                                fontSize: '1.8rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {dataUser?.balance !== null && dataUser?.balance !== undefined
                                ? `${formatCurrency(dataUser.balance)} `
                                : "Đang tải..."}
                        </span>
                    </span>
                </h2>




            </header>
            {/* Recharts BarChart */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                        tickFormatter={(value) => formatCurrency(value)}
                        tick={{ fontSize: 12 }} // Giảm kích thước chữ trục Y nếu cần thiết
                        width={140} // Tăng chiều rộng của trục Y để không bị cắt
                    />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="totalAmount" fill={tailwindConfig().theme.colors.violet[500]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

}

export default DashboardCard04;
