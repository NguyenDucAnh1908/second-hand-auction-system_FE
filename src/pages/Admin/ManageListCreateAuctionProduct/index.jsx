import {useState, useEffect} from 'react';
import {Table, Image, Alert, Tag, Modal, Skeleton} from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import {useNavigate} from 'react-router-dom';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Button, } from "@material-tailwind/react";
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
            title: 'Tên sản phẩm',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Mô tả',
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
        // {
        //     title: 'Thương hiệu',
        //     dataIndex: 'brandName',
        //     key: 'brand',
        // },
        {
            title: 'Trạng thái',
            dataIndex: 'itemStatus',
            key: 'itemStatus',
            render: (status) => {
                let color;
                let statusText;
        
                switch (status) {
                    case 'PENDING_AUCTION':
                        color = 'orange';
                        statusText = 'Đang chờ';
                        break;
                    case 'APPROVED':
                        color = 'green';
                        statusText = 'Đã phê duyệt';
                        break;
                    case 'REJECTED':
                        color = 'red';
                        statusText = 'Đã từ chối';
                        break;
                    default:
                        color = 'gray';
                        statusText = 'Không xác định';
                }
        
                return <Tag color={color}>{statusText}</Tag>;
            },
        },        
        {
            title: 'Ảnh thu nhỏ',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail, record) => (
                thumbnail ? (
                    <Image width={100} src={thumbnail} alt={record.itemName} />
                ) : (
                    <span>Không có ảnh</span>
                )
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create_at',
            key: 'createAt',
            render: (text) => {
                const date = text ? new Date(text) : new Date(); // Sử dụng ngày hiện tại nếu không có giá trị
                return date.toLocaleDateString('vi-VN');
            },
        },

        {
            title: 'Người tạo',
            dataIndex: 'createBy',
            key: 'createBy',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        color="blue"
                        onClick={() => handleNavigateToCreateAuction(record.itemId)}
                        className="bg-green-500 text-white hover:bg-green-700"
                    >
                        Tạo Đấu Giá
                    </Button>
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
                className="rounded-lg "
            >
                <DescriptionItem selectedDescription={selectedDescription}/>
            </Modal>

            <div className="container mx-auto px-0">
                <div className="flex justify-center w-full">
                    {isLoading ? (
                        <Skeleton active />
                    ) : (
                        <Table
                            dataSource={pendingProducts}
                            columns={columns}
                            rowKey="itemId"
                            pagination={false}
                            className="w-full table-fixed border border-gray-300"
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
