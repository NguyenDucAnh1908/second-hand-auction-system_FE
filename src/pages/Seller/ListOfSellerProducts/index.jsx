import { Img, Heading, InputDH } from "../../../components";
import { CloseSVG } from "../../../components/InputDH/close.jsx";
import { useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import Pagination from "@/components/Pagination/index.jsx";
import { useGetItemByUserQuery, useGetDeleteItemMutation } from "../../../services/item.service.js";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    SyncOutlined,
    HourglassOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import {
    Tag, Breadcrumb, Layout, theme, Button,
    Empty, Skeleton, message, Tabs, Badge, Descriptions
    , Divider, Table, Spin
} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import { Modal } from 'antd';
import DescriptionItem from "@/components/DescriptionItem/index.jsx";
import { useGetAllBidsQuery } from "@/services/bid.service.js";
import { useGetListRegisterUserQuery } from "../../../services/auctionRegistrations.service.js";
import dayjs from "dayjs";


const { Content, Sider } = Layout;

const TABLE_HEAD = [
    "ID",
    "Sản phẩm",
    "Hình ảnh",
    "Mô tả",
    "Thông tin đấu giá",
    "Trạng thái",
    "Tùy chỉnh"
];

export default function ListOfSellerProductPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchBarValue1, setSearchBarValue1] = useState("");
    const [page, setPage] = useState(1);
    const [deleteItemMutation] = useGetDeleteItemMutation();
    const [itemName, setItemName] = useState(null);
    const [itemThumbnail, setItemThumbnail] = useState(null);

    //29/12
    const [batteryHealth, setBatteryHealth] = useState(null);
    const [osVersion, setOsVersion] = useState(null);
    const [icloudStatus, setIcloudStatus] = useState(null);
    const [bodyCondition, setBodyCondition] = useState(null);
    const [screenCondition, setScreenCondition] = useState(null);
    const [cameraCondition, setCameraCondition] = useState(null);
    const [portCondition, setPortCondition] = useState(null);
    const [buttonCondition, setButtonCondition] = useState(null);
    const [itemSpecification, setItemSpecification] = useState(null);



    const pageSize = 10;
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const { data, isError, isLoading } = useGetItemByUserQuery(
        { page: page - 1, limit: pageSize }
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOpenModal = (
        auction, itemName, thumbnail,
        batteryHealth, osVersion, icloudStatus, bodyCondition,
        screenCondition, cameraCondition, portCondition,
        buttonCondition, itemSpecification
    ) => {
        setSelectedAuction(auction);
        setIsModalVisible(true);
        setItemName(itemName);
        setItemThumbnail(thumbnail);
        setBatteryHealth(batteryHealth);
        setOsVersion(osVersion);
        setIcloudStatus(icloudStatus);
        setBodyCondition(bodyCondition);
        setScreenCondition(screenCondition);
        setCameraCondition(cameraCondition);
        setPortCondition(portCondition);
        setButtonCondition(buttonCondition);
        setItemSpecification(itemSpecification);
    };
    


    const handleOpenDescriptionModal = (itemDescription) => {
        setSelectedDescription(itemDescription);
        setIsModalDescriptionVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedAuction(null);
    };

    const handleCloseDescriptionModal = () => {
        setIsModalDescriptionVisible(false);
        setSelectedDescription(null);
    };

    const handleUpdateItem = (itemId, itemStatus) => {
        // Kiểm tra nếu itemStatus là "ACCEPTED"
        if (itemStatus === "ACCEPTED") {
            message.error("Không thể cập nhật sản phẩm vì sản phẩm đã được chấp thuận.");
            return;  // Nếu trạng thái là ACCEPTED, dừng việc điều hướng
        }

        // Nếu không phải trạng thái ACCEPTED, tiếp tục điều hướng tới trang cập nhật sản phẩm
        console.log("Navigating to item with ID:", itemId);
        navigate(`/dashboard-seller/UpdateProduct/${itemId}`);
    };


    const handleDeleteItem = async (itemId) => {
        // Kiểm tra nếu itemId không hợp lệ
        if (!itemId) {
            console.error("ID sản phẩm không hợp lệ");
            message.error("ID sản phẩm không hợp lệ. Vui lòng thử lại.");
            return;
        }

        // Hiển thị Modal xác nhận thay vì window.confirm
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
            content: "Hành động này không thể hoàn tác.",
            okText: "Xóa",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const response = await deleteItemMutation({ id: itemId }).unwrap();
                    console.log("Sản phẩm đã được xóa thành công:", response);
                    message.success("Sản phẩm đã được xóa thành công!");
                } catch (error) {
                    console.error("Xóa sản phẩm thất bại:", error);
                    const errorMessage =
                        error?.data?.message || error?.message || "Đã xảy ra lỗi không xác định.";

                    message.error(`Xóa sản phẩm thất bại. Lý do: ${errorMessage}`);
                }
            },
            onCancel: () => {
                console.log("Hủy xóa sản phẩm.");
            }
        });
    };


    //api gọi lịch sử bid

    const [bidData, setBidData] = useState([]); // State riêng biệt lưu bid data


    const { data: historyBid } = useGetAllBidsQuery({
        auctionId: parseInt(selectedAuction?.auction_id, 10) || 0,
        page: 0,
    });

    useEffect(() => {
        if (historyBid?.data) {
            setBidData(historyBid.data);
        } else {
            setBidData([]);
        }
    }, [historyBid?.data]);

    useEffect(() => {
        if (isModalVisible && historyBid?.data) {
            setBidData(historyBid.data);
        } else if (isModalVisible) {
            setBidData([]);
        }
    }, [historyBid?.data, isModalVisible]);
    //end


    //api lấy danh sách đăng ký auction, có cọc...
    const [paging, setPaging] = useState({ page: 0, limit: 10 });


    const {
        data: registeredUsers,
        isLoading: isLoadingRegisteredUsers,
        isError: isErrorRegisteredUsers,
        error: errorRegisteredUsers,
    } = useGetListRegisterUserQuery({ auctionId: selectedAuction?.auction_id, paging });

    const validRegisteredUsers = Array.isArray(registeredUsers?.list) ? registeredUsers.list : [];

    const totalPages = registeredUsers?.totalPages || 0;

    const [isRegisteredUsersModalOpen, setIsRegisteredUsersModalOpen] = useState(false); // Sử dụng biến riêng cho modal này
    const showRegisteredUsersModal = () => {

        setIsRegisteredUsersModalOpen(true); // Mở modal

    };

    // Hàm đóng modal
    const handleCloseRegisteredUsersModal = () => {
        setIsRegisteredUsersModalOpen(false); // Đóng modal
    };


    // Hàm xử lý chuyển trang
    const handlePageChangeRegister = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) { // Đảm bảo trang hợp lệ
            setPaging((prev) => ({ ...prev, page: newPage }));
        }
    };


    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };



    //end 





    const items = selectedAuction && itemName && itemThumbnail && batteryHealth && osVersion &&
        icloudStatus && bodyCondition && screenCondition && cameraCondition && portCondition &&
        buttonCondition && itemSpecification ? [
        {
            key: '1',
            label: 'Tên sản phẩm',
            children: itemName,
            span: 2,
        },
        {
            key: '2',
            label: 'Hình Ảnh',
            children: (
                <img
                    src={itemThumbnail}
                    alt="Product"
                    className="w-[30%] h-48 object-cover rounded"
                />
            ),
            span: 3,
        },
        {
            key: '3',
            label: 'ID Phiên đấu giá',
            children: `${selectedAuction?.auction_id}`,
        },
        {
            key: '4',
            label: 'Thời Gian Đấu Giá',
            children: `${selectedAuction?.start_time || ''} - ${selectedAuction?.startDate || ''} đến ${selectedAuction?.end_time || ''} - ${selectedAuction?.endDate || ''}`,
            span: 2,
        },
        {
            key: '5',
            label: 'Trạng Thái',
            children: (
                <Badge
                    status={
                        selectedAuction?.status === 'CANCELLED' ? 'error' :
                            selectedAuction?.status === 'CLOSED' ? 'default' :
                                selectedAuction?.status === 'COMPLETED' ? 'success' :
                                    selectedAuction?.status === 'OPEN' ? 'processing' :
                                        selectedAuction?.status === 'PENDING' ? 'warning' :
                                            'default'
                    }
                    text={
                        selectedAuction?.status === 'CANCELLED' ? 'Đã hủy' :
                            selectedAuction?.status === 'CLOSED' ? 'Đã đóng' :
                                selectedAuction?.status === 'COMPLETED' ? 'Hoàn thành' :
                                    selectedAuction?.status === 'OPEN' ? 'Đang mở' :
                                        selectedAuction?.status === 'PENDING' ? 'Đang chờ' :
                                            'Không xác định'
                    }
                />
            ),
            span: 3,
        },

        {
            key: '6',
            label: 'Người Bán',
            children: selectedAuction?.created_by,
        },
        {
            key: '7',
            label: 'Tiền Cọc',
            children: `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format((selectedAuction?.buy_now_price) * (selectedAuction?.percent_deposit) / 100)}`,
        },


        {
            key: '8',
            label: 'Tình trạng Pin',
            children: batteryHealth,
        },
        {
            key: '9',
            label: 'Phiên bản hệ điều hành',
            children: osVersion,
        },
        {
            key: '10',
            label: 'Trạng thái iCloud',
            children: icloudStatus,
        },
        {
            key: '11',
            label: 'Tình trạng vỏ máy',
            children: bodyCondition,
        },
        {
            key: '12',
            label: 'Tình trạng màn hình',
            children: screenCondition,
        },
        {
            key: '13',
            label: 'Tình trạng camera',
            children: cameraCondition,
        },
        {
            key: '14',
            label: 'Tình trạng cổng',
            children: portCondition,
        },
        {
            key: '15',
            label: 'Tình trạng nút bấm',
            children: buttonCondition,
        },
        // Item specification
        {
            key: '16',
            label: 'Chíp xử lý',
            children: itemSpecification?.cpu,
        },
        {
            key: '17',
            label: 'RAM',
            children: itemSpecification?.ram,
        },
        {
            key: '18',
            label: 'Kích thước màn hình',
            children: itemSpecification?.screenSize,
        },
        {
            key: '19',
            label: 'Camera',
            children: itemSpecification?.cameraSpecs,
        },
        {
            key: '20',
            label: 'Kết nối',
            children: itemSpecification?.connectivity,
        },
        {
            key: '21',
            label: 'Cảm biến',
            children: itemSpecification?.sensors,
        }

    ] : [];




    const renderTableRows = () => {

        return data?.items?.items.map(({ itemId, itemName, thumbnail,
            itemDescription, auction, itemStatus,
            batteryHealth, osVersion, icloudStatus, bodyCondition, screenCondition, cameraCondition,
            portCondition, buttonCondition, itemSpecification, 
        }, index) => (
            <tr key={itemId}>
                <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold">
                        {itemId}
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        {itemName}
                    </Typography>
                </td>
                <td className="p-4">
                    <img src={thumbnail} alt={itemName} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        {/*{itemDescription}*/}
                        <Button onClick={() => handleOpenDescriptionModal(itemDescription)}>Xem mô tả</Button>
                    </Typography>
                </td>
                <td className="p-4">
                    <Typography variant="small" className="font-normal text-gray-600">
                        <Button onClick={() => handleOpenModal(auction, itemName, thumbnail,
                            batteryHealth, osVersion, icloudStatus, bodyCondition,
                            screenCondition, cameraCondition, portCondition, buttonCondition, itemSpecification
                        )}>Thông tin đấu giá</Button>
                    </Typography>
                </td>
                <td className="p-4 mt-5 flex items-center justify-center w-[180px]">
                    {itemStatus === "ACCEPTED" && (
                        <Tag icon={<CheckCircleOutlined />} color="success" className="w-full text-center">Hợp lệ</Tag>
                    )}
                    {itemStatus === "PENDING" && (
                        <Tag icon={<SyncOutlined spin />} color="processing" className="w-full text-center">Đang
                            chờ</Tag>
                    )}
                    {itemStatus === "REJECTED" && (
                        <Tag icon={<CloseCircleOutlined />} color="error" className="w-full text-center">Từ chối</Tag>
                    )}
                    {itemStatus === "INACTIVE" && (
                        <Tag icon={<DeleteOutlined />} color="error" className="w-full text-center">Hủy bỏ</Tag>
                    )}
                    {itemStatus === "PENDING_AUCTION" && (
                        <Tag icon={<HourglassOutlined />} color="warning" className="w-full text-center">Đang tạo
                            phiên</Tag>
                    )}
                </td>


                <td className="p-4">
                    <div className="flex items-center gap-2">
                        <IconButton variant="text" size="sm">
                            <DocumentIcon onClick={() => handleUpdateItem(itemId, itemStatus)} className="h-4 w-4 text-gray-900" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteItem(itemId)} variant="text" size="sm">
                            <TrashIcon strokeWidth={3} className="h-4 w-4 text-gray-900" />
                        </IconButton>


                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG, flex: 1 }}>
                    <Sider style={{ background: colorBgContainer }} width={300}>
                        <Sidebar />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280, flex: 1 }}>
                        <div className="w-full bg-gray-50_01">
                            <div className="mt-4 flex flex-col items-end">
                                <div className="w-[100%] md:w-full md:px-5">
                                    <div className="flex items-start">
                                        <div
                                            className="flex-1 self-center rounded-[16px] bg-[url(/images/img_group_46876.png)] bg-cover bg-no-repeat pt-[84px] md:h-auto md:py-5">
                                            <div className="flex flex-col gap-2">
                                                <div className="ml-1 flex md:ml-0">
                                                    <Heading size="headingxl" as="h1"
                                                        className="text-[30px] font-semibold uppercase text-gray-900_01 md:text-[44px] sm:text-[38px] -mt-[80px] ml-[20px]">
                                                        Danh sách sản phẩm
                                                    </Heading>
                                                </div>
                                                <div
                                                    className="mr-[38px] flex justify-between gap-5 md:mx-0 sm:flex-col -mt-[50px] ml-[15px]">
                                                    <InputDH
                                                        name="Search Field"
                                                        placeholder={`Tìm kiếm theo ID`}
                                                        value={searchBarValue1}
                                                        onChange={(e) => setSearchBarValue1(e.target.value)}
                                                        suffix={searchBarValue1?.length > 0 ? (
                                                            <CloseSVG onClick={() => setSearchBarValue1("")} height={18}
                                                                width={18} fillColor="#626974ff" />
                                                        ) : (
                                                            <Img src="/images/img_search.svg" alt="Search"
                                                                className="h-[18px] w-[18px]" />
                                                        )}
                                                        className="flex h-[40px] w-[24%] items-center justify-center gap-4 rounded bg-bg-white px-4 text-[16px] text-blue_gray-600 shadow-xs sm:w-full "
                                                    />
                                                    <Link to="/Dashboard-seller/registerproduct"
                                                        className="flex h-[40px] min-w-[152px] flex-row items-center justify-center gap-0.5 rounded-md"
                                                        style={{ backgroundColor: '#28a745' }}>
                                                        Tạo sản phẩm
                                                    </Link>
                                                </div>
                                                {isError ? (
                                                    <Empty />
                                                ) : (
                                                    <Skeleton loading={isLoading} active>
                                                        <Card className="h-full w-full overflow-scroll">
                                                            <table className="w-full min-w-max table-auto text-left">
                                                                <thead>
                                                                    <tr>
                                                                        {TABLE_HEAD.map((head) => (
                                                                            <th key={head} className="p-4 pt-10">
                                                                                <Typography variant="small"
                                                                                    color="blue-gray"
                                                                                    className="font-bold leading-none">
                                                                                    {head}
                                                                                </Typography>
                                                                            </th>
                                                                        ))}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {renderTableRows()}
                                                                </tbody>
                                                            </table>
                                                        </Card>
                                                    </Skeleton>
                                                )}
                                                <div className="flex justify-center items-center mt-4">
                                                    {/*<Pagination*/}
                                                    {/*    current={currentPage}*/}
                                                    {/*    total={data?.total || 0} // Tổng số mục*/}
                                                    {/*    pageSize={pageSize}*/}
                                                    {/*    onChange={handlePageChange}*/}
                                                    {/*/>*/}
                                                    <Pagination
                                                        currentPage={page}
                                                        totalPages={data?.totalPages || 1}
                                                        onPageChange={setPage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <FooterBK />
            <Modal
                title="Thông tin chi tiết đấu giá"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                // footer={[
                //     <Button key="close" onClick={handleCloseModal} className="bg-red-500 text-white hover:bg-red-600">
                //         Đóng
                //     </Button>,
                // ]}
                className="rounded-lg shadow-lg"
                maskClosable={true}
                footer={null}
                width="100vw"
                style={{
                    top: 0,
                    left: 0,
                    margin: 0,
                }}
            >
                <Tabs defaultActiveKey="1">
                    {/* Thông tin chi tiết của phiên đấu giá */}



                    <Tabs.TabPane tab="Thông tin chi tiết" key="1">
                        {items.length > 0 ? (
                            <Descriptions bordered column={1}>
                                {items.map((item) => (
                                    <Descriptions.Item key={item.key} label={item.label} span={item.span || 1}>
                                        {item.children}
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                        ) : (
                            <Empty description="Không có dữ liệu" />
                        )}

                        <Divider />

                        {/* Bảng lịch sử bid */}
                        <Table
                            columns={[
                                {
                                    title: 'Họ và Tên',
                                    dataIndex: 'username',
                                    key: 'username',
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'email',
                                    key: 'email',
                                },
                                {
                                    title: 'Thời gian',
                                    dataIndex: 'bidTime',
                                    key: 'bidTime',
                                    render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
                                },
                                {
                                    title: 'Số Tiền',
                                    dataIndex: 'bidAmount',
                                    key: 'bidAmount',
                                    render: (amount) =>
                                        new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(amount),
                                },
                                {
                                    title: 'Trạng Thái',
                                    dataIndex: 'winBid',
                                    key: 'status',
                                    render: (status) => (
                                        <span
                                            style={{
                                                height: 24,
                                                width: 100,
                                                backgroundColor: status ? '#38A169' : '#E53E3E',
                                                color: 'white',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                display: 'inline-block',
                                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                                                transform: 'scale(1)',
                                            }}
                                        >
                                            {status ? 'Thắng' : 'Thua'}
                                        </span>
                                    ),
                                },
                            ]}
                            dataSource={bidData}
                            pagination={false}
                            rowKey="userId"
                        />

                        <Divider />

                        {/* Thêm phần hiển thị lịch sử bid của user */}
                        {/* <Descriptions title="Lịch sử đấu giá của người dùng" bordered column={1}>
                            {bidData.length > 0 ? (
                                <Table
                                    columns={[
                                        {
                                            title: 'Họ và Tên',
                                            dataIndex: 'username',
                                            key: 'username',
                                        },
                                        {
                                            title: 'Email',
                                            dataIndex: 'email',
                                            key: 'email',
                                        },
                                        {
                                            title: 'Thời gian',
                                            dataIndex: 'bidTime',
                                            key: 'bidTime',
                                            render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
                                        },
                                        {
                                            title: 'Số Tiền',
                                            dataIndex: 'bidAmount',
                                            key: 'bidAmount',
                                            render: (amount) =>
                                                new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(amount),
                                        },
                                    ]}
                                    dataSource={bidData}
                                    pagination={false}
                                    rowKey="userId"
                                />
                            ) : (
                                <Empty description="Không có lịch sử đấu giá" />
                            )}
                        </Descriptions> */}
                    </Tabs.TabPane>



                    {/* Tab Danh sách người dùng đã đăng ký */}
                    <Tabs.TabPane tab="Danh sách người dùng đã đăng ký" key="2">
                        <Spin spinning={isLoadingRegisteredUsers}>
                            {validRegisteredUsers?.length > 0 ? (
                                <div className="space-y-4">
                                    {validRegisteredUsers.map((user, index) => (
                                        <div key={user.ar_id} className="p-3 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
                                            <span className="font-semibold text-sm text-gray-800">
                                                {index + 1}. {user.user_name}
                                            </span>
                                            <div className="text-xs text-gray-600">
                                                <p>{formatDate(user.created_date)}</p>
                                                <p className="font-semibold text-blue-600">{formatCurrency(user.deposite_amount)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">Không có người dùng nào được đăng ký.</p>
                            )}
                        </Spin>
                        {isErrorRegisteredUsers && (
                            <p className="text-red-500 text-center mt-4">Có lỗi xảy ra khi tải danh sách người dùng!</p>
                        )}
                        <Pagination
                            currentPage={paging.page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
            <Modal
                title="Mô tả"
                visible={isModalDescriptionVisible}
                onCancel={handleCloseDescriptionModal}
                footer={[
                    <Button key="close" onClick={handleCloseDescriptionModal}
                        className="bg-red-500 text-white hover:bg-red-600">
                        Đóng
                    </Button>,
                ]}
                className="rounded-lg shadow-lg"
                width={1000}
            >
                <DescriptionItem selectedDescription={selectedDescription} />
            </Modal>
        </Layout>
    );
}