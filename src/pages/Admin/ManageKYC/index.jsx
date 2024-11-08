import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useGetKYCItemsQuery } from '../../../services/kyc.service';
import { useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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
    const { data, error, isLoading, refetch } = useGetKYCItemsQuery({ page: 0, limit: 10 });
    const navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    const [items, setItems] = useState([]);

    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws', // WebSocket server URL
        webSocketFactory: () => new SockJS('http://localhost:8080/api/v1/ws'), // WebSocket client using SockJS
    });

    // Khi kết nối thành công
    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        setConnected(true);

        // Subscribe vào topic KYC để nhận dữ liệu cập nhật
        stompClient.subscribe('/topic/kyc', (message) => {
            const updatedKYC = JSON.parse(message.body);
            console.log('Received updated KYC: ', updatedKYC);

            // Cập nhật danh sách KYC sau khi nhận dữ liệu mới
            setItems((prevItems) => {
                return prevItems.map(item =>
                    item.kycId === updatedKYC.kycId ? updatedKYC : item
                );
            });
        });
    };

    // Nếu có lỗi WebSocket
    stompClient.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
    };

    // Khi WebSocket đóng kết nối
    stompClient.onWebSocketClose = () => {
        console.log('WebSocket closed');
        setConnected(false);
    };

    // Kết nối WebSocket khi component được mount
    useEffect(() => {
        stompClient.activate();

        // Chỉ cập nhật `items` khi dữ liệu từ server đã được tải
        if (data) {
            setItems(data.data); // Lưu dữ liệu ban đầu vào state
        }

        // Dọn dẹp WebSocket khi component bị hủy
        return () => {
            if (stompClient) {
                stompClient.deactivate(); // Ngắt kết nối WebSocket
                console.log('WebSocket disconnected');
            }
        };
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading KYC items: {error.message}</div>;

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
        console.log(record.kycId);
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
