import React, {useState} from 'react';
import Header2 from "@/components/Header2/index.jsx";
import {Breadcrumb, Button, Layout, theme, Space, Table, Tag} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import FooterBK from "@/components/FooterBK/index.jsx";
import {useGetReportQuery} from "@/services/report.service.js";

const {Content, Sider} = Layout;
const ReportPage = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Số item trên mỗi trang

    const {data: dataReport, isLoading: loadingReport, isError: isErrorReport, error: errorReport} = useGetReportQuery({
        page: page - 1, // API thường dùng chỉ số 0-based
        limit: 10
    });
    console.log("dataReport", dataReport?.items)


    const columns = [
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Purpose",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Create Date",
            dataIndex: "responseCreateTime",
            key: "responseCreateTime",
        },
        {
            title: "Process Note",
            dataIndex: "responseMessage",
            key: "responseMessage",
        },
        {
            title: "File",
            dataIndex: "evidence",
            key: "evidence",
            render: (text) => (text ? <a href={text}>Download File</a> : "No File"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = status === "APPROVED" ? "green" : status === "REJECTED" ? "volcano" : "geekblue";
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Ngày Approve",
            dataIndex: "responseUpdateTime",
            key: "responseUpdateTime",
        },
    ];

    const dataSource = dataReport?.items.map((report, index) => ({
        key: index, // Key cần duy nhất, có thể dùng index nếu không có giá trị đặc thù
        type: report.type,
        reason: report.reason,
        responseCreateTime: report.responseCreateTime,
        responseMessage: report.responseMessage,
        evidence: report.evidence,
        status: report.status,
        responseUpdateTime: report.responseUpdateTime,
    }));

    return (
        <>
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
                            )}
                        </Content>
                    </Layout>
                </Content>
                <FooterBK/>
            </Layout>
        </>
    );
};

export default ReportPage;