import React, { useState } from 'react';
import { FaUser, FaBacon, FaMoneyBillWave, FaCommentDots, FaExchangeAlt, FaTimes } from 'react-icons/fa';

export default function Payment() {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('transfer'); // Default type

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic chuyển tiền ở đây
        console.log('Chuyển tiền', { amount, recipient, accountNumber, description, transactionType });
    };

    const handleCancel = () => {
        // Reset các trường nhập liệu khi hủy
        setAmount('');
        setRecipient('');
        setAccountNumber('');
        setDescription('');
        setTransactionType('transfer');
    };

    return (
        <div className="container mx-auto p-6">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4 flex items-center">
                    <FaUser className="mr-3 text-gray-600 text-xl" />
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="recipient">
                            Người nhận
                        </label>
                        <input
                            type="text"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập tên người nhận"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <FaBacon className="mr-3 text-gray-600 text-xl" />
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="accountNumber">
                            Số tài khoản ngân hàng
                        </label>
                        <input
                            type="text"
                            id="accountNumber"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập số tài khoản ngân hàng"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <FaMoneyBillWave className="mr-3 text-gray-600 text-xl" />
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="amount">
                            Số tiền (VND)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập số tiền"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <FaExchangeAlt className="mr-3 text-gray-600 text-xl" />
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="transactionType">
                            Loại giao dịch
                        </label>
                        <select
                            id="transactionType"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="transfer">Chuyển tiền</option>
                            <option value="payment">Thanh toán</option>
                            <option value="withdraw">Rút tiền</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <FaCommentDots className="mr-3 text-gray-600 text-xl" />
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="description">
                            Mô tả
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập mô tả (tùy chọn)"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center py-2 px-4 text-sm bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                    >
                        <FaTimes className="mr-1" /> Hủy
                    </button>
                    <button
                        type="submit"
                        className="py-2 px-4 text-lg bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Xác Nhận Chuyển Tiền
                    </button>
                </div>
            </form>
        </div>
    );
}
