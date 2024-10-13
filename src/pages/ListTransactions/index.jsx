import React, { useState } from 'react';
import Header2 from '../../components/Header2';
import FooterBK from '../../components/FooterBK';
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";

export default function ListTransaction() {
    // Sample transaction data (replace with your actual data)
    const transactions = [
        { id: 1, date: '2024-10-01', amount: 100, type: 'Deposit', status: 'Completed' },
        { id: 2, date: '2024-10-05', amount: 50, type: 'Withdrawal', status: 'Pending' },
        { id: 3, date: '2024-10-10', amount: 200, type: 'Deposit', status: 'Completed' },
        // Add more transactions as needed
        { id: 4, date: '2024-10-12', amount: 300, type: 'Deposit', status: 'Completed' },
        { id: 5, date: '2024-10-14', amount: 150, type: 'Withdrawal', status: 'Completed' },
        { id: 6, date: '2024-10-15', amount: 120, type: 'Deposit', status: 'Pending' },
        { id: 7, date: '2024-10-18', amount: 250, type: 'Withdrawal', status: 'Completed' },
        { id: 8, date: '2024-10-20', amount: 300, type: 'Deposit', status: 'Pending' },
        { id: 9, date: '2024-10-22', amount: 180, type: 'Withdrawal', status: 'Completed' },
        { id: 10, date: '2024-10-25', amount: 400, type: 'Deposit', status: 'Completed' },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5; // Adjust as needed

    // Calculate the index of the first and last transaction on the current page
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Calculate total pages
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    // Change page function
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Header2 />
            <div className="flex container mx-auto p-6 bg-gray-50">
                <SiderUserBK />
                <div className="flex-1 ml-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lịch sử giao dịch</h1>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">ID</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Ngày</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Số tiền</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Loại giao dịch</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{transaction.id}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{transaction.date}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{transaction.amount.toLocaleString()} VNĐ</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{transaction.type}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${transaction.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <FooterBK />
        </>
    );
}
