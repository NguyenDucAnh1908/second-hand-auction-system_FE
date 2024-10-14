import React, { useState } from 'react';

const ManagementWithdrawOfSeller = () => {
    const withdrawalRequests = [
        {
            id: 1,
            sellerName: 'Seller A',
            amount: '1,000,000 VND',
            status: 'Pending',
            requestDate: '2024-10-01',
            bankAccount: '1234567890',
            bankName: 'ABC Bank',
            reason: 'Product Sale'
        },
        {
            id: 2,
            sellerName: 'Seller B',
            amount: '2,500,000 VND',
            status: 'Completed',
            requestDate: '2024-10-05',
            bankAccount: '0987654321',
            bankName: 'XYZ Bank',
            reason: 'Service Fee'
        },
        {
            id: 3,
            sellerName: 'Seller C',
            amount: '3,200,000 VND',
            status: 'Rejected',
            requestDate: '2024-10-10',
            bankAccount: '5678901234',
            bankName: 'DEF Bank',
            reason: 'Product Return'
        },
        {
            id: 4,
            sellerName: 'Seller D',
            amount: '4,500,000 VND',
            status: 'Pending',
            requestDate: '2024-10-12',
            bankAccount: '1357924680',
            bankName: 'GHI Bank',
            reason: 'Product Sale'
        },
        {
            id: 5,
            sellerName: 'Seller E',
            amount: '5,000,000 VND',
            status: 'Completed',
            requestDate: '2024-10-14',
            bankAccount: '2468135790',
            bankName: 'JKL Bank',
            reason: 'Service Fee'
        },
        {
            id: 6,
            sellerName: 'Seller F',
            amount: '1,800,000 VND',
            status: 'Pending',
            requestDate: '2024-10-15',
            bankAccount: '9876543210',
            bankName: 'MNO Bank',
            reason: 'Product Sale'
        },
        {
            id: 7,
            sellerName: 'Seller G',
            amount: '3,600,000 VND',
            status: 'Rejected',
            requestDate: '2024-10-16',
            bankAccount: '1234567890',
            bankName: 'PQR Bank',
            reason: 'Fraudulent Activity'
        },
          ];

    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 3;
    const totalRequests = withdrawalRequests.length;

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = withdrawalRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRequests / requestsPerPage); i++) {
        pageNumbers.push(i);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleDetailClick = (request) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    const handleApprove = () => {
        // Handle the logic for approving the withdrawal request
        alert(`Approved withdrawal for ${selectedRequest.sellerName}`);
        handleCloseModal();
    };

    const handleReject = () => {
        // Handle the logic for rejecting the withdrawal request
        alert(`Rejected withdrawal for ${selectedRequest.sellerName}`);
        handleCloseModal();
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Withdrawal Requests Management</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border-b text-left text-lg">ID</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Seller Name</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Amount</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Status</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Request Date</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Bank Name</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Bank Account</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Reason</th>
                            <th className="px-4 py-2 border-b text-left text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRequests.map(request => (
                            <tr key={request.id} className="text-center border-b hover:bg-gray-100 transition-colors">
                                <td className="px-4 py-3 text-lg">{request.id}</td>
                                <td className="px-4 py-3 text-lg">{request.sellerName}</td>
                                <td className="px-4 py-3 text-lg">{request.amount}</td>
                                <td className={`px-4 py-3 text-lg font-bold ${request.status === 'Pending' ? 'text-yellow-600' : request.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                    {request.status}
                                </td>
                                <td className="px-4 py-3 text-lg">{request.requestDate}</td>
                                <td className="px-4 py-3 text-lg">{request.bankName}</td>
                                <td className="px-4 py-3 text-lg">{request.bankAccount}</td>
                                <td className="px-4 py-3 text-lg">{request.reason}</td>
                                <td className="px-4 py-3">
                                    <button 
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => handleDetailClick(request)}
                                    >
                                        Details
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

            {/* Modal for withdrawal request details */}
            {isModalOpen && selectedRequest && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-xl w-full max-w-xl transition-transform transform scale-100 duration-300 ease-in-out">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center border-b-2 border-blue-500 pb-2">Withdrawal Request Details</h2>
                        <div className="mb-4 space-y-2">
                            <p className="text-lg text-gray-700"><strong>ID:</strong> {selectedRequest.id}</p>
                            <p className="text-lg text-gray-700"><strong>Seller Name:</strong> {selectedRequest.sellerName}</p>
                            <p className="text-lg text-gray-700"><strong>Amount:</strong> {selectedRequest.amount}</p>
                            <p className="text-lg text-gray-700"><strong>Status:</strong>
                                <span className={`font-bold ${selectedRequest.status === 'Pending' ? 'text-yellow-600' : selectedRequest.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                    {selectedRequest.status}
                                </span>
                            </p>
                            <p className="text-lg text-gray-700"><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
                            <p className="text-lg text-gray-700"><strong>Bank Name:</strong> {selectedRequest.bankName}</p>
                            <p className="text-lg text-gray-700"><strong>Bank Account:</strong> {selectedRequest.bankAccount}</p>
                            <p className="text-lg text-gray-700"><strong>Reason:</strong> {selectedRequest.reason}</p>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-600"
                                onClick={handleApprove}
                            >
                                Chuyển Tiền
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-red-600"
                                onClick={handleReject}
                            >
                                Từ Chối
                            </button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-500"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagementWithdrawOfSeller;
