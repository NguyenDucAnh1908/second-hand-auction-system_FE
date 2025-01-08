import React, {useState} from 'react';
import Header2 from "@/components/Header2/index.jsx";
import {Breadcrumb, Button, Layout, theme, Space, Table, Tag, Modal, Select, Input, message} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import FooterBK from "@/components/FooterBK/index.jsx";
import {useCreateReportMutation, useGetReportQuery} from "@/services/report.service.js";

const {TextArea} = Input;
const {Content, Sider} = Layout;
const statusMapping = {
    DAMAGED_PRODUCT: {label: "Hàng lỗi", color: "red"},
    MISSING_BALANCE: {label: "Không nhận được tiền", color: "orange"},
    SERVICE_NOT_WORKING: {label: "Dịch vụ không hoạt động", color: "blue"},
    TRANSACTION_ERROR: {label: "Lỗi giao dịch", color: "volcano"},
    ACCOUNT_LOCKED: {label: "Tài khoản bị khóa", color: "purple"},
    DISPLAY_ERROR: {label: "Lỗi hiển thị", color: "geekblue"},
    OTHER: {label: "Lỗi khác", color: "gray"},
};
const ReportPage = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số item trên mỗi trang
    const [reportType, setReportType] = useState("DAMAGED_PRODUCT"); // Loại report
    const [reason, setReason] = useState(""); // Lý do
    const {data: dataReport, isLoading: loadingReport, isError: isErrorReport, error: errorReport, refetch: refetchReport,} = useGetReportQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });

    const [createReport, {
        isLoading: loadingCreateReport,
        isSuccess: isSuccessCreateReport,
        isError: isErrorCreateReport,
        error: errorCreateReport,
    }] = useCreateReportMutation();

    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        if (!reason.trim()) {
            message.error("Vui lòng nhập lý do!");
            return;
        }

        try {
            const response = await createReport({
                type: reportType,
                reason: reason.trim(),
            }).unwrap();

            message.success("Gửi báo cáo thành công!");
            //console.log("Response:", response);
            setOpen(false);
            setReason("");
            setReportType("DAMAGED_PRODUCT");
            refetchReport();
        } catch (error) {
            console.error("Error:", error);
            message.error("Gửi báo cáo thất bại! Vui lòng thử lại.");
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setReportType(value);
    };
    const columns = [
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
            render: (type) => {
                const typeMap = {
                    DAMAGED_PRODUCT: { text: "Hàng lỗi", color: "volcano" },
                    MISSING_BALANCE: { text: "Không nhận được tiền", color: "orange" },
                    SERVICE_NOT_WORKING: { text: "Dịch vụ không hoạt động", color: "geekblue" },
                    TRANSACTION_ERROR: { text: "Lỗi giao dịch", color: "purple" },
                    ACCOUNT_LOCKED: { text: "Tài khoản bị khóa", color: "red" },
                    DISPLAY_ERROR: { text: "Lỗi hiển thị", color: "cyan" },
                    OTHER: { text: "Lỗi khác", color: "green" },
                };

                const typeInfo = typeMap[type] || { text: "Không xác định", color: "default" };

                return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
            },
        },
        {
            title: "Lý do",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Ngày tạo",
            dataIndex: "responseCreateTime",
            key: "responseCreateTime",
        },
        {
            title: "Ghi chú quy trình",
            dataIndex: "responseMessage",
            key: "responseMessage",
        },
        {
            title: "File",
            dataIndex: "evidence",
            key: "evidence",
            render: (text) =>
                text ? (
                    <a href={text} target="_blank" rel="noopener noreferrer">
                        Xem file
                    </a>
                ) : (
                    "No File"
                ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                // Map trạng thái tiếng Việt và màu sắc
                const statusMap = {
                    PENDING: {text: "Đang chờ xử lý", color: "geekblue"},
                    IN_PROGRESS: {text: "Đang trong quá trình xử lý", color: "orange"},
                    RESOLVED: {text: "Đã giải quyết", color: "green"},
                    REJECTED: {text: "Từ chối", color: "volcano"},
                };
                const statusInfo = statusMap[status] || {text: "Không xác định", color: "default"};
                return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            },
        },
        {
            title: "Ngày phê duyệt",
            dataIndex: "responseUpdateTime",
            key: "responseUpdateTime",
        },
    ];

    const dataSource = dataReport?.items.map((report, index) => ({
        key: index, // Key cần duy nhất, có thể dùng index nếu không có giá trị đặc thù
        type: report.type,
        reason: report.reason,
        responseCreateTime: report.created_at,
        responseMessage: report.responseMessage,
        evidence: report.evidence,
        status: report.status,
        responseUpdateTime: report.responseUpdateTime,
    }));

    return (
        <>
            <Modal
                title="Gửi báo cáo"
                centered
                open={open}
                onOk={handleSubmit}
                confirmLoading={loadingCreateReport}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Gửi"
                cancelText="Hủy"
            >
                <Select
                    defaultValue="DAMAGED_PRODUCT"
                    style={{
                        width: 240, // Tăng chiều rộng để hiển thị rõ hơn
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'DAMAGED_PRODUCT',
                            label: 'Hàng lỗi',
                        },
                        {
                            value: 'MISSING_BALANCE',
                            label: 'Không nhận được tiền',
                        },
                        {
                            value: 'SERVICE_NOT_WORKING',
                            label: 'Dịch vụ không hoạt động',
                        },
                        {
                            value: 'TRANSACTION_ERROR',
                            label: 'Lỗi giao dịch',
                        },
                        {
                            value: 'ACCOUNT_LOCKED',
                            label: 'Tài khoản bị khóa',
                        },
                        {
                            value: 'DISPLAY_ERROR',
                            label: 'Lỗi hiển thị',
                        },
                        {
                            value: 'OTHER',
                            label: 'Lỗi khác',
                        },
                    ]}
                />
                <TextArea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{
                        marginTop: '16px'
                    }} rows={4}/>
            </Modal>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Thông tin</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider style={{background: colorBgContainer}} width={300}>
                            <SiderUserBK/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            {loadingReport ? (
                                <p>Loading...</p>
                            ) : isErrorReport ? (
                                <p>Error: {errorReport.message}</p>
                            ) : (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginBottom: '16px'
                                    }}>
                                        <button
                                            style={{
                                                backgroundColor: '#1890ff',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => setOpen(true)}
                                        >
                                            Tạo báo cáo
                                        </button>
                                    </div>
                                    <Table columns={columns} dataSource={dataSource}
                                           pagination={{
                                               current: page, // Trang hiện tại
                                               pageSize: pageSize, // Số item mỗi trang
                                               total: dataReport?.data?.totalElements, // Tổng số phần tử
                                               showSizeChanger: true, // Hiển thị tùy chọn số item mỗi trang
                                               onChange: (page, pageSize) => {
                                                   setPage(page);
                                                   setPageSize(pageSize);
                                               },
                                           }}
                                    />
                                </>
                            )}
                        </Content>
                    </Layout>
                </Content>
                <FooterBK/>
            </Layout>
        </>
    )
        ;
};

export default ReportPage;