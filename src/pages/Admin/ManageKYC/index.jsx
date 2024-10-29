import React from 'react';
import { Table, Button } from 'antd';
import { useGetKYCItemsQuery } from '../../../services/kyc.service';
import { useNavigate } from 'react-router-dom';

const getStatusStyle = (status) => {
    switch (status) {
        case 'APPROVED':
            return 'bg-green-200 text-green-800 p-2 rounded flex items-center justify-center w-auto h-10 font-semibold transition duration-300 ease-in-out transform hover:scale-105';
        case 'PENDING':
            return 'bg-yellow-200 text-yellow-800 p-2 rounded flex items-center justify-center min-w-[100px] h-10 font-semibold transition duration-300 ease-in-out transform hover:scale-105';
        case 'REJECTED':
            return 'bg-red-200 text-red-800 p-2 rounded flex items-center justify-center min-w-[100px] h-10 font-semibold transition duration-300 ease-in-out transform hover:scale-105';
        default:
            return 'bg-gray-200 text-gray-800 p-2 rounded flex items-center justify-center min-w-[100px] h-10 font-semibold transition duration-300 ease-in-out transform hover:scale-105';
    }
};

const ManageKYC = () => {
    const { data, error, isLoading } = useGetKYCItemsQuery({ page: 0, limit: 10 });
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading KYC items: {error.message}</div>;

    const items = data ? data.data : [];
    console.log(data);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'kycId',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'KYC Status',
            dataIndex: 'kycStatus',
            render: (text) => (
                <span className={`${getStatusStyle(text)}`}>{text}</span>
            ),
        },
        {
            title: 'Action',
            render: (record) => (
                <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => handleDetail(record)}>
                    Details
                </Button>
            ),
        },
    ];

    const handleDetail = (record) => {
        navigate(`/dashboard/KiemduyetStaffPage/${record.kycId}`);
    };
    

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage KYC</h2>
            <Table
                dataSource={items}
                rowKey="kycId"
                columns={columns}
            />
        </div>
    );
};

export default ManageKYC;
