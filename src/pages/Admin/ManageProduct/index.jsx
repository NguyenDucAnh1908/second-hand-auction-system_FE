import  {useState, useEffect} from 'react';
import {useGetItemAdminQuery} from '@/services/item.service.js';
import {Table, Image, Alert, Tag, Modal, Skeleton} from 'antd';
import Pagination from "@/components/Pagination/index.jsx";
import {useNavigate} from 'react-router-dom';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import {Button} from "@material-tailwind/react";

export default function ProductPending() {
    const [page, setPage] = useState(1);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const navigate = useNavigate('');
    const {data, error, isLoading, refetch} = useGetItemAdminQuery({page: page - 1, limit: 10});
    useEffect(() => {
        refetch();
    }, [refetch]);



    if (error) {
        return <Alert message="Error loading products." type="error"/>;
    }

    const pendingProducts = data?.data.items || [];
    const handleAppraisal = (itemId) => {
        navigate(`/dashboard/AppraisalForm/${itemId}`);
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
            title: "ID",
            dataIndex: "itemId",
            key: "itemId",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "itemName",
            key: "itemName",
        },
        {
            title: "Mô tả",
            dataIndex: "itemDescription",
            key: "itemDescription",
            render: (itemDescription, record) => (
                <Button
                    onClick={() => handleOpenDescriptionModal(record.itemDescription)}
                    className="text-blue-500 hover:underline"
                >
                    Xem mô tả
                </Button>
            ),
        },
        {
            title: "Giá mua ngay",
            dataIndex: "priceBuyNow",
            key: "priceBuyNow",
            render: (priceBuyNow) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(priceBuyNow),
        },
        {
            title: "Trạng thái",
            dataIndex: "itemStatus",
            key: "itemStatus",
            render: (status) => {
                let color;
                let statusText;
        
                switch (status) {
                    case "PENDING":
                        color = "orange";
                        statusText = "Đang chờ";
                        break;
                    case "APPROVED":
                        color = "green";
                        statusText = "Đã phê duyệt";
                        break;
                    case "REJECTED":
                        color = "red";
                        statusText = "Đã từ chối";
                        break;
                    default:
                        color = "gray";
                        statusText = "Không xác định";
                }
        
                return <Tag color={color}>{statusText}</Tag>;
            },
        },        
        {
            title: "Hình ảnh",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (thumbnail, record) =>
                thumbnail ? (
                    <Image width={100} src={thumbnail} alt={record.itemName} />
                ) : (
                    <span>No Image</span>
                ),
        },
        {
            title: "Ngày đăng kí",
            dataIndex: "create_at",
            key: "createAt",
            render: (text) => (text ? new Date(text).toLocaleDateString("vi-VN") : "N/A"),
        },
        {
            title: "Người đăng kí",
            dataIndex: "createBy",
            key: "createBy",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button
                    onClick={() => handleAppraisal(record.itemId)}
                    className="bg-green-500 text-white hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                    Thẩm định
                </Button>
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
                    <Button
                        key="close"
                        onClick={handleCloseDescriptionModal}
                        className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription} />
            </Modal>

            <div className="container mx-auto px-0">
                <div className="flex justify-center">
                    {isLoading ? (
                        <div className="w-full">
                            <Skeleton active title={false} paragraph={{ rows: 6 }} />
                        </div>
                    ) : (
                        <Table
                            dataSource={pendingProducts}
                            columns={columns}
                            className="w-full table-fixed text-sm border border-gray-300"
                            rowKey="itemId"
                            pagination={false}
                        />
                    )}
                </div>
                <div className="flex justify-center items-center mt-4">
                    <Pagination
                        current={page}
                        total={(data?.data.totalPages || 1) * 10} // Tổng số mục (not tổng số trang)
                        onChange={setPage}
                        pageSize={10} // Số lượng mục trên mỗi trang
                    />
                </div>
            </div>
        </>
    );

}
