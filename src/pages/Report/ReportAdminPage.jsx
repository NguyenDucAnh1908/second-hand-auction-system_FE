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
import apiGhn from "@/services/apiGhn.service.js";


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
    const [fileInfo, setFileInfo] = useState({name: "", status: ""});
    const [isUploading, setIsUploading] = useState(false);
    const [reportTypeGhn, setReportTypeGhn] = useState("");
    const [description, setDescription] = useState("");
    const [ticketDetail, setTicketDetail] = useState(null);

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

    console.log("selectedReport", selectedReport)
    console.log("dataReport", dataReport)

    const [updateReport, {
        isLoading: loadingUpdateReport,
        isSuccess: isSuccessUpdateReport,
        isError: isErrorUpdateReport,
        error: errorUpdateReport,
    }] = useUpdateReportMutation();

    const [open, setOpen] = useState(false);

    // const handleSubmit = async (status) => {
    //     if (!selectedReport) {
    //         message.error("Không có báo cáo nào được chọn!");
    //         return;
    //     }
    //
    //     const { reportId } = selectedReport; // Lấy ID của báo cáo được chọn
    //     if (!reportId) {
    //         message.error("Không tìm thấy ID của báo cáo!");
    //         return;
    //     }
    //
    //     try {
    //         const response = await updateReport({
    //             id: reportId, // Truyền ID vào payload
    //             responseMessage: processNote, // Thay bằng nội dung TextArea
    //             status: status, // Truyền trạng thái (RESOLVED hoặc REJECTED)
    //             ticketId: 28122040,
    //         }).unwrap();
    //
    //         message.success("Cập nhật báo cáo thành công!");
    //         setOpen(false); // Đóng modal
    //         refetchReport(); // Reload lại danh sách báo cáo
    //     } catch (error) {
    //         console.error("Error:", error);
    //         message.error("Cập nhật báo cáo thất bại! Vui lòng thử lại.");
    //     }
    // };

    const handleSubmit = async (status) => {
        if (!selectedReport) {
            message.error("Không có báo cáo nào được chọn!");
            return;
        }

        const {reportId} = selectedReport; // Lấy ID của báo cáo được chọn
        if (!reportId) {
            message.error("Không tìm thấy ID của báo cáo!");
            return;
        }

        try {
            // Tạo dữ liệu form-data
            const ticketData = {
                c_email: "cskh@ghn.vn",
                order_code: selectedReport?.orderCode,
                attachments: null,
                category: "Hối Giao/Lấy/Trả hàng",
                description: processNote,
            };

            const ticketResponse = await apiGhn.create_ticket_service(ticketData);

            if (ticketResponse.status === 200 && ticketResponse.data.code === 200) {
                const ticketId = ticketResponse.data.data.id; // Lấy ticketId từ response

                // Call API updateReport với ticketId
                const response = await updateReport({
                    id: reportId, // Truyền ID của báo cáo
                    responseMessage: processNote, // Nội dung TextArea
                    status: status, // Trạng thái (RESOLVED hoặc REJECTED)
                    ticketId: ticketId, // Truyền ticketId vào đây
                }).unwrap();

                message.success("Cập nhật báo cáo thành công!");
                setOpen(false); // Đóng modal
                refetchReport(); // Reload lại danh sách báo cáo
            } else {
                message.error("Tạo ticket thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error:", error);
            message.error("Cập nhật báo cáo thất bại! Vui lòng thử lại.");
        }
    };

    const handleViewDetail = async (record) => {
        setSelectedReport(record); // Lưu dữ liệu báo cáo được chọn
        console.log("record.ticketId", record.ticketId)
        try {
            const response = await apiGhn.detail_ticket_service({
                ticket_id: Number(record.ticketId), // Chuyển string sang number
            });
            if (response.status === 200 && response.data.code === 200) {
                setTicketDetail(response.data.data); // Lưu chi tiết ticket vào state
            } else {
                message.error("Không thể lấy thông tin chi tiết ticket!");
            }
        } catch (error) {
            console.error("Error fetching ticket details:", error);
            message.warning("Lỗi khi lấy thông tin chi tiết ticket!");
        }
        setOpen(true); // Mở modal
    };

    useEffect(() => {
        if (selectedReport && selectedReport.responseMessage) {
            setProcessNote(selectedReport.responseMessage);
        }
    }, [selectedReport]);

    useEffect(() => {
        if (selectedReport && selectedReport.evidence) {
            setFileInfo({name: "File hiện tại", status: "Uploaded successfully"});
            setUploadedFile(selectedReport.evidence);
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
                    DAMAGED_PRODUCT: {text: "Hàng lỗi", color: "volcano"},
                    MISSING_BALANCE: {text: "Không nhận được tiền", color: "orange"},
                    SERVICE_NOT_WORKING: {text: "Dịch vụ không hoạt động", color: "geekblue"},
                    TRANSACTION_ERROR: {text: "Lỗi giao dịch", color: "purple"},
                    ACCOUNT_LOCKED: {text: "Tài khoản bị khóa", color: "red"},
                    DISPLAY_ERROR: {text: "Lỗi hiển thị", color: "cyan"},
                    OTHER: {text: "Lỗi khác", color: "green"},
                };

                const typeInfo = typeMap[type] || {text: "Không xác định", color: "default"};

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
                        handleViewDetail(record)
                        setOpen(true);
                    }}
                >
                    Xem chi tiết
                </button>
            ),
        },
    ];
console.log("ticketDetail", ticketDetail)
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
        ticketId: report.ticketId,
        orderCode: report.orderCode,
    }));


    return (
        <>
            {/*<Modal*/}
            {/*    title="Chi tiết báo cáo"*/}
            {/*    centered*/}
            {/*    open={open}*/}
            {/*    onCancel={() => setOpen(false)}*/}
            {/*    width={1000}*/}
            {/*    footer={[*/}
            {/*        <button*/}
            {/*            key="resolved"*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#52c41a",*/}
            {/*                color: "white",*/}
            {/*                border: "none",*/}
            {/*                padding: "8px 16px",*/}
            {/*                borderRadius: "4px",*/}
            {/*                cursor: "pointer",*/}
            {/*            }}*/}
            {/*            onClick={() => handleSubmit("RESOLVED")} // Gửi status là RESOLVED*/}
            {/*        >*/}
            {/*            RESOLVED*/}
            {/*        </button>,*/}
            {/*        <button*/}
            {/*            key="rejected"*/}
            {/*            style={{*/}
            {/*                backgroundColor: "#ff4d4f",*/}
            {/*                color: "white",*/}
            {/*                border: "none",*/}
            {/*                padding: "8px 16px",*/}
            {/*                borderRadius: "4px",*/}
            {/*                cursor: "pointer",*/}
            {/*            }}*/}
            {/*            onClick={() => handleSubmit("REJECTED")} // Gửi status là REJECTED*/}
            {/*        >*/}
            {/*            REJECTED*/}
            {/*        </button>,*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    {selectedReport ? (*/}
            {/*        <div className="report-details">*/}
            {/*            <Row gutter={[16, 16]}>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Loại:</strong> {selectedReport.type}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Lý do:</strong> {selectedReport.reason}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Người tạo:</strong> {selectedReport.createBy}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Người xử lý:</strong> {selectedReport.processedBy || "Chưa xử lý"}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Ngày tạo:</strong> {selectedReport.responseCreateTime}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    <p><strong>Ngày cập nhật:</strong> {selectedReport.responseUpdateTime}</p>*/}
            {/*                </Col>*/}
            {/*                <Col span={12}>*/}
            {/*                    /!* Hiển thị file URL nếu có *!/*/}
            {/*                    {uploadedFile && (*/}
            {/*                        <p>*/}
            {/*                            <strong>Link file:</strong>{" "}*/}
            {/*                            <a href={uploadedFile} target="_blank" rel="noopener noreferrer">*/}
            {/*                                {uploadedFile}*/}
            {/*                            </a>*/}
            {/*                        </p>*/}
            {/*                    )}*/}
            {/*                </Col>*/}
            {/*                <Col span={24}>*/}
            {/*                    <strong>Ghi chú xử lý:</strong>{" "}*/}
            {/*                    <TextArea*/}
            {/*                        rows={4}*/}
            {/*                        placeholder="Nhập ghi chú xử lý"*/}
            {/*                        style={{ marginTop: "10px" }}*/}
            {/*                        value={processNote}*/}
            {/*                        //onChange={(e) => setProcessNote(e.target.value)} // Lưu ghi chú xử lý*/}
            {/*                        onChange={(e) => setProcessNote(e.target.value)}*/}
            {/*                    />*/}
            {/*                </Col>*/}
            {/*                <Col span={24}>*/}
            {/*                    <p>*/}
            {/*                        <strong>Trạng thái:</strong>{" "}*/}
            {/*                        <Tag*/}
            {/*                            color={*/}
            {/*                                selectedReport.status === "APPROVED" ? "green" :*/}
            {/*                                    selectedReport.status === "REJECTED" ? "volcano" :*/}
            {/*                                        "geekblue"*/}
            {/*                            }*/}
            {/*                        >*/}
            {/*                            {selectedReport.status}*/}
            {/*                        </Tag>*/}
            {/*                    </p>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <p>Không có dữ liệu chi tiết</p>*/}
            {/*    )}*/}
            {/*</Modal>*/}
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
                            <Col span={12}>
                                {uploadedFile && (
                                    <p>
                                        <strong>File đính kèm:</strong>{" "}
                                        <a href={uploadedFile} target="_blank" rel="noopener noreferrer">
                                            Xem file
                                        </a>
                                    </p>
                                )}
                            </Col>
                            <Col span={24}>
                                <strong>Ghi chú xử lý:</strong>{" "}
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập ghi chú xử lý"
                                    style={{marginTop: "10px"}}
                                    value={processNote}
                                    onChange={(e) => setProcessNote(e.target.value)} // Lưu ghi chú xử lý
                                />
                            </Col>
                            <Col span={24}>
                                <p>
                                    <strong>Trạng thái:</strong>{" "}
                                    <Tag
                                        color={
                                            selectedReport.status === "APPROVED"
                                                ? "green"
                                                : selectedReport.status === "REJECTED"
                                                    ? "volcano"
                                                    : "geekblue"
                                        }
                                    >
                                        {selectedReport.status}
                                    </Tag>
                                </p>
                            </Col>
                        </Row>


                        <Row style={{ marginTop: 14 }} gutter={[16, 16]}>
                            <Col span={12}>
                                <p><strong>Mã đơn hàng:</strong> {ticketDetail?.order_code}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Email khách hàng:</strong> {ticketDetail?.c_email}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Tên khách hàng:</strong> {ticketDetail?.c_name}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Số điện thoại khách hàng:</strong> {ticketDetail?.c_phone}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Loại khiếu nại:</strong> {ticketDetail?.type}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Trạng thái:</strong> {ticketDetail?.status}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Ngày tạo:</strong> {new Date(ticketDetail?.created_at).toLocaleString()}</p>
                            </Col>
                            <Col span={12}>
                                <p><strong>Ngày cập nhật:</strong> {new Date(ticketDetail?.updated_at).toLocaleString()}</p>
                            </Col>
                            <Col span={24}>
                                <p><strong>Mô tả:</strong> {ticketDetail?.description}</p>
                            </Col>
                            {/*<Col span={24}>*/}
                            {/*    <p><strong>File đính kèm:</strong>*/}
                            {/*        {ticketDetail?.attachments?.length > 0 ? (*/}
                            {/*            ticketDetail.attachments.map((file) => (*/}
                            {/*                <a*/}
                            {/*                    key={file.id}*/}
                            {/*                    href={file.attachment_url}*/}
                            {/*                    target="_blank"*/}
                            {/*                    rel="noopener noreferrer"*/}
                            {/*                    style={{ marginLeft: 8 }}*/}
                            {/*                >*/}
                            {/*                    {file.name}*/}
                            {/*                </a>*/}
                            {/*            ))*/}
                            {/*        ) : (*/}
                            {/*            "Không có file đính kèm"*/}
                            {/*        )}*/}
                            {/*    </p>*/}
                            {/*</Col>*/}
                        </Row>
                        <Col style={{
                            marginTop: 14
                        }} span={12}>
                            <p>
                                <strong>Loại:</strong>
                                <Select
                                    style={{ width: "100%", marginTop: "10px" }}
                                    placeholder="Chọn loại báo cáo"
                                    value={reportTypeGhn || ticketDetail?.type} // Sử dụng giá trị từ API nếu có
                                    onChange={(value) => setReportTypeGhn(value)} // Cập nhật giá trị khi thay đổi
                                    options={[
                                        { value: "Tư vấn", label: "Tư vấn" },
                                        { value: "Hối Giao/Lấy/Trả hàng", label: "Hối Giao/Lấy/Trả hàng" },
                                        { value: "Thay đổi thông tin", label: "Thay đổi thông tin" },
                                        { value: "Khiếu nại", label: "Khiếu nại" },
                                    ]}
                                />
                            </p>
                        </Col>
                        <Col style={{
                            marginTop: 14
                        }} span={24}>
                            <p>
                                <strong>Mô tả:</strong>
                                <TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả chi tiết"
                                    style={{ marginTop: "10px" }}
                                    value={description || ticketDetail?.description} // Sử dụng giá trị từ API nếu có
                                    onChange={(e) => setDescription(e.target.value)} // Lưu giá trị mô tả
                                />
                            </p>
                        </Col>
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
                            {/*<button*/}
                            {/*    style={{*/}
                            {/*        backgroundColor: '#1890ff',*/}
                            {/*        color: 'white',*/}
                            {/*        border: 'none',*/}
                            {/*        padding: '8px 16px',*/}
                            {/*        borderRadius: '4px',*/}
                            {/*        cursor: 'pointer',*/}
                            {/*    }}*/}
                            {/*    onClick={() => setOpen(true)}*/}
                            {/*>*/}
                            {/*    Tạo báo cáo*/}
                            {/*</button>*/}
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