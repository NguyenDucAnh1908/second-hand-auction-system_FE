import React, {useState, useEffect} from 'react';
import {Table, Image, Spin, Alert, Tag, Modal, Skeleton} from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import {useNavigate} from 'react-router-dom';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Button, Typography} from "@material-tailwind/react";
import {useGetItemPendingAuctionQuery} from "@/services/item.service.js";

export default function ManageListCreateAuctionProduct() {
    const [page, setPage] = useState(1);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const navigate = useNavigate('');
    // Fetching data with currentPage and pageSize
    const {data, error, isLoading, refetch} = useGetItemPendingAuctionQuery({page: page - 1, limit: 10});
    // Re-fetch data whenever currentPage changes
    useEffect(() => {
        refetch();
    }, [refetch]);
//console.log("DATA: ", data?.data.data)
//     if (isLoading) {
//         return <Spin size="large"/>;
//     }
//
    if (error) {
        return <Alert message="Error loading products." type="error"/>;
    }

    const pendingProducts = data?.data.data || [];
    const handleNavigateToCreateAuction = (itemId) => {
        navigate(`/dashboard/CreateAuction/${itemId}`);
    };
    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription); // Lưu thông tin đấu giá vào state handleOpenDescriptionModal
        setIsModalDescriptionVisible(true);
    };


    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false); // Đóng modal
        setSelectedDescription(null); // Reset thông tin đấu giá
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'itemId',
            key: 'itemId',
        },
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Description',
            dataIndex: 'itemDescription',
            key: 'itemDescription',
            render: (itemDescription, record) => (
                <Button
                    onClick={() => handleOpenDescriptionModal(record.itemDescription)}
                    className="ql-bg-blue-500 text-white hover:bg-yellow-600"
                >
                    Xem mô tả
                </Button>
            ),
        },
        {
            title: 'Brand',
            dataIndex: 'brandName',
            key: 'brand',
        },
        {
            title: 'Status',
            dataIndex: 'itemStatus',
            key: 'itemStatus',
            render: (status) => {
                let color;
                switch (status) {
                    case 'PENDING':
                        color = 'orange';
                        break;
                    case 'APPROVED':
                        color = 'green';
                        break;
                    case 'REJECTED':
                        color = 'red';
                        break;
                    default:
                        color = 'gray';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail, record) => (
                thumbnail ? (
                    <Image width={100} src={thumbnail} alt={record.itemName}/>
                ) : (
                    <span>No Image</span>
                )
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'create_at',
            key: 'createAt',
            render: (text) => text ? new Date(text).toLocaleDateString('vi-VN') : 'N/A',
        },
        {
            title: 'Created By',
            dataIndex: 'createBy',
            key: 'createBy',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button color="blue" onClick={() => handleNavigateToCreateAuction(record.itemId)}
                            className="bg-green-500 text-white hover:bg-green-700">Tạo Đấu Giá</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    // eslint-disable-next-line react/jsx-key
                    <Button color="blue" onClick={handleCloseDescriptionModal}
                            className="bg-red-500 text-white hover:bg-red-600">
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription}/>
            </Modal>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Product Pending</h1>
                <div className="flex items-center justify-center w-full h-full">
                    {isLoading ? (
                        <Skeleton active/>
                    ) : (
                        <Table
                            dataSource={pendingProducts}
                            columns={columns}
                            rowKey="itemId"
                            pagination={false}
                        />
                    )}
                </div>
                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={data?.data.totalPages || 1}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </>
    );
}
