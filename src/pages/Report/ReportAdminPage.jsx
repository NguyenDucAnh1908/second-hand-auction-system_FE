import React, {useEffect, useState} from 'react';
import Header2 from "@/components/Header2/index.jsx";
import {
    Breadcrumb,
    Button,
    Layout,
    theme,
    Space,
    Table,
    Tag,
    Modal,
    Select,
    Input,
    message,
    Col,
    Row,
    Upload, Spin
} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import FooterBK from "@/components/FooterBK/index.jsx";
import {useCreateReportMutation, useGetAllReportQuery, useUpdateReportMutation} from "@/services/report.service.js";
import Header from "@/partials/Header.jsx";
import Sidebar from "@/partials/Sidebar.jsx";
import {UploadOutlined} from "@ant-design/icons";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";


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
const ReportAdminPage = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số item trên mỗi trang
    const [reportType, setReportType] = useState("IN_PROGRESS"); // Loại report
    const [reason, setReason] = useState(""); // Lý do
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [processNote, setProcessNote] = useState("");
    const [uploadedFile, setUploadedFile] = useState("");
    const [fileInfo, setFileInfo] = useState({ name: "", status: "" });
    const [isUploading, setIsUploading] = useState(false);
    const {
        data: dataReport,
        isLoading: loadingReport,
        isError: isErrorReport,
        error: errorReport,
        refetch: refetchReport,
    } = useGetAllReportQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });
    const [updateReport, {
        isLoading: loadingUpdateReport,
        isSuccess: isSuccessUpdateReport,
        isError: isErrorUpdateReport,
        error: errorUpdateReport,
    }] = useUpdateReportMutation();

    const [open, setOpen] = useState(false);

    const handleSubmit = async (status) => {
        if (!selectedReport) {
            message.error("Không có báo cáo nào được chọn!");
            return;
        }

        const { reportId } = selectedReport; // Lấy ID của báo cáo được chọn
        if (!reportId) {
            message.error("Không tìm thấy ID của báo cáo!");
            return;
        }

        try {
            const response = await updateReport({
                id: reportId, // Truyền ID vào payload
                responseMessage: processNote, // Thay bằng nội dung TextArea
                status: status, // Truyền trạng thái (RESOLVED hoặc REJECTED)
                evidence: uploadedFile, // Thay bằng link thực tế từ Upload component
            }).unwrap();

            message.success("Cập nhật báo cáo thành công!");
            setOpen(false); // Đóng modal
            refetchReport(); // Reload lại danh sách báo cáo
        } catch (error) {
            console.error("Error:", error);
            message.error("Cập nhật báo cáo thất bại! Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        if (selectedReport && selectedReport.responseMessage) {
            setProcessNote(selectedReport.responseMessage);
        }
    }, [selectedReport]);

    useEffect(() => {
        if (selectedReport && selectedReport.evidence) {
            setFileInfo({ name: "File hiện tại", status: "Uploaded successfully" });
            setUploadedFile(selectedReport.evidence); // URL file hiện tại
        }
    }, [selectedReport]);


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
            render: (text) => (text ? <a target="_blank" href={text}>Download File</a> : "No File"),
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
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <button
                    style={{
                        backgroundColor: "#1890ff",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setSelectedReport(record); // Lưu dữ liệu báo cáo được chọn
                        setOpen(true); // Mở modal
                    }}
                >
                    Xem chi tiết
                </button>
            ),
        },
    ];

    const dataSource = dataReport?.items.map((report, index) => ({
        key: index,
        reportId: report.reportId,
        type: report.type,
        reason: report.reason,
        createBy: report.createBy,
        processedBy: report.processedBy,
        responseCreateTime: report.responseCreateTime,
        responseMessage: report.responseMessage,
        evidence: report.evidence,
        status: report.status,
        responseUpdateTime: report.responseUpdateTime,
    }));


    return (
        <>
            <Modal
                title="Chi tiết báo cáo"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={[
                    <button
                        key="resolved"
                        style={{
                            backgroundColor: "#52c41a",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleSubmit("RESOLVED")} // Gửi status là RESOLVED
                    >
                        RESOLVED
                    </button>,
                    <button
                        key="rejected"
                        style={{
                            backgroundColor: "#ff4d4f",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleSubmit("REJECTED")} // Gửi status là REJECTED
                    >
                        REJECTED
                    </button>,
                ]}
            >
                {selectedReport ? (
                    <div className="report-details">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <p><strong>Loại:</strong> {selectedReport.type}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Lý do:</strong> {selectedReport.reason}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Người tạo:</strong> {selectedReport.createBy}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Người xử lý:</strong> {selectedReport.processedBy || "Chưa xử lý"}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Ngày tạo:</strong> {selectedReport.responseCreateTime}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Ngày cập nhật:</strong> {selectedReport.responseUpdateTime}</p>
                            </Col>
                            {/*<Col span={12}>*/}
                            {/*    <p>*/}
                            {/*        <strong>File:</strong>{" "}*/}
                            {/*        <Upload*/}
                            {/*            name="file"*/}
                            {/*            beforeUpload={async (file) => {*/}
                            {/*                const { UploadImage } = useHookUploadImage();*/}
                            {/*                try {*/}
                            {/*                    const url = await UploadImage(file); // Gọi hàm upload từ custom hook*/}
                            {/*                    message.success(`${file.name} đã tải lên thành công`);*/}
                            {/*                    setUploadedFile(url); // Lưu URL file vào state*/}
                            {/*                    return false; // Ngăn Ant Design tự xử lý upload*/}
                            {/*                } catch (error) {*/}
                            {/*                    console.error("Lỗi khi upload file:", error);*/}
                            {/*                    message.error(`${file.name} tải lên thất bại`);*/}
                            {/*                    return false;*/}
                            {/*                }*/}
                            {/*            }}*/}
                            {/*            showUploadList={false} // Ẩn danh sách file*/}
                            {/*        >*/}
                            {/*            <Button icon={<UploadOutlined />}>Tải lên</Button>*/}
                            {/*        </Upload>*/}
                            {/*    </p>*/}
                            {/*</Col>*/}
                            <Col span={12}>
                                <p>
                                    <strong>File:</strong>{" "}
                                    <Upload
                                        name="file"
                                        beforeUpload={async (file) => {
                                            const { UploadImage } = useHookUploadImage();
                                            setFileInfo({ name: file.name, status: "Uploading..." }); // Hiển thị trạng thái upload
                                            setIsUploading(true); // Đang upload

                                            try {
                                                const url = await UploadImage(file); // Gọi hàm upload từ custom hook
                                                message.success(`${file.name} đã tải lên thành công`);
                                                setUploadedFile(url); // Lưu URL file vào state
                                                setFileInfo({ name: file.name, status: "Uploaded successfully" }); // Cập nhật trạng thái
                                                setIsUploading(false); // Hoàn thành upload
                                                return false; // Ngăn Ant Design tự xử lý upload
                                            } catch (error) {
                                                console.error("Lỗi khi upload file:", error);
                                                message.error(`${file.name} tải lên thất bại`);
                                                setFileInfo({ name: file.name, status: "Upload failed" }); // Cập nhật trạng thái lỗi
                                                setIsUploading(false);
                                                return false;
                                            }
                                        }}
                                        showUploadList={false} // Ẩn danh sách file của Ant Design
                                    >
                                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                                    </Upload>
                                </p>

                                {/* Hiển thị thông tin file */}
                                {fileInfo.name && (
                                    <p>
                                        <strong>Tên file:</strong> {fileInfo.name}
                                        <br />
                                        <strong>Trạng thái:</strong>{" "}
                                        {isUploading ? (
                                            <Spin size="small" /> // Hiển thị spinner khi đang upload
                                        ) : (
                                            fileInfo.status
                                        )}
                                    </p>
                                )}

                                {/* Hiển thị file URL nếu có */}
                                {uploadedFile && (
                                    <p>
                                        <strong>Link file:</strong>{" "}
                                        <a href={uploadedFile} target="_blank" rel="noopener noreferrer">
                                            {uploadedFile}
                                        </a>
                                    </p>
                                )}
                            </Col>
                            <Col span={24}>
                                <strong>Ghi chú xử lý:</strong>{" "}
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập ghi chú xử lý"
                                    style={{ marginTop: "10px" }}
                                    value={processNote}
                                    //onChange={(e) => setProcessNote(e.target.value)} // Lưu ghi chú xử lý
                                    onChange={(e) => setProcessNote(e.target.value)}
                                />
                            </Col>
                            <Col span={24}>
                                <p>
                                    <strong>Trạng thái:</strong>{" "}
                                    <Tag
                                        color={
                                            selectedReport.status === "APPROVED" ? "green" :
                                                selectedReport.status === "REJECTED" ? "volcano" :
                                                    "geekblue"
                                        }
                                    >
                                        {selectedReport.status}
                                    </Tag>
                                </p>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <p>Không có dữ liệu chi tiết</p>
                )}
            </Modal>

            <>
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
                                   current: page,
                                   pageSize: pageSize,
                                   total: dataReport?.data?.totalElements,
                                   showSizeChanger: true,
                                   onChange: (page, pageSize) => {
                                       setPage(page);
                                       setPageSize(pageSize);
                                   },
                               }}
                        />
                    </>
                )}
            </>
        </>
    )
        ;
};

export default ReportAdminPage;