import React, { useState } from 'react';
import FooterBK from '../../../components/FooterBK';

const Modal = ({ isOpen, onClose, transaction }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-2xl transition-transform transform scale-95 duration-300 ease-in-out">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center border-b-2 border-blue-500 pb-2">
                    Transaction Details
                </h2>
                <div className="mb-6 space-y-4">
                    <p className="text-lg text-gray-700"><strong>ID:</strong> {transaction.id}</p>
                    <p className="text-lg text-gray-700"><strong>Shop Name:</strong> {transaction.shopName}</p>
                    <p className="text-lg text-gray-700"><strong>Amount:</strong> {transaction.amount}</p>
                    <p className="text-lg text-gray-700">
                        <strong>Status:</strong>
                        <span className={`font-bold ${transaction.status === 'Pending' ? 'text-yellow-600' : transaction.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.status}
                        </span>
                    </p>
                    <p className="text-lg text-gray-700"><strong>Request Date:</strong> {transaction.requestDate}</p>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-blue-500 hover:scale-105"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ManagementTransactions() {
    const transactions = [
        { id: 1, shopName: 'Shop A', amount: '1,000,000 VND', status: 'Pending', requestDate: '2024-10-01' },
        { id: 2, shopName: 'Shop B', amount: '2,500,000 VND', status: 'Completed', requestDate: '2024-10-05' },
        { id: 3, shopName: 'Shop C', amount: '3,200,000 VND', status: 'Rejected', requestDate: '2024-10-10' },
        { id: 4, shopName: 'Shop D', amount: '4,500,000 VND', status: 'Pending', requestDate: '2024-10-12' },
        { id: 5, shopName: 'Shop E', amount: '5,000,000 VND', status: 'Completed', requestDate: '2024-10-14' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 3;

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleDetailClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Management Transactions</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-4 border-b text-left text-lg">ID</th>
                            <th className="px-6 py-4 border-b text-left text-lg">Shop Name</th>
                            <th className="px-6 py-4 border-b text-left text-lg">Amount</th>
                            <th className="px-6 py-4 border-b text-left text-lg">Status</th>
                            <th className="px-6 py-4 border-b text-left text-lg">Request Date</th>
                            <th className="px-6 py-4 border-b text-left text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map(transaction => (
                            <tr key={transaction.id} className="text-center border-b hover:bg-gray-100 transition-colors">
                                <td className="px-6 py-5 text-lg">{transaction.id}</td>
                                <td className="px-6 py-5 text-lg">{transaction.shopName}</td>
                                <td className="px-6 py-5 text-lg">{transaction.amount}</td>
                                <td className={`px-6 py-5 text-lg font-bold ${transaction.status === 'Pending' ? 'text-yellow-600' : transaction.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                    {transaction.status}
                                </td>
                                <td className="px-6 py-5 text-lg">{transaction.requestDate}</td>
                                <td className="px-6 py-5">
                                    <button 
                                        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => handleDetailClick(transaction)}
                                    >
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {pageNumbers.map(number => (
                    <button 
                        key={number} 
                        className={`mx-2 px-4 py-2 border rounded text-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-blue-500 hover:text-white transition-colors`}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>

            {/* Modal for Transaction Details */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} transaction={selectedTransaction} />
           
        </div>
    );
}
