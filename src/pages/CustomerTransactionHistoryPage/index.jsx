import {Helmet} from "react-helmet";
import {
    Img,
    Text,
    ButtonDH,
    Heading,
    SelectBox,
    InputDH,
} from "../../components";
import {CloseSVG} from "../../components/InputDH/close.jsx";
import NumberRow from "../../components/NumberRow";
import React, {useState} from "react";
import {TabPanel, TabList, Tab, Tabs} from "react-tabs";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK/index.jsx";
import {Table, Button, theme, Layout, Breadcrumb, Menu} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {useGetTransactionWalletQuery} from "@/services/transactionWallet.service.js";
import Pagination from "@/components/Pagination/index.jsx";


const dropDownOptions = [
    {label: "Option1", value: "option1"},
    {label: "Option2", value: "option2"},
    {label: "Option3", value: "option3"},
];

const {Content, Sider} = Layout;
export default function CustomerTransactionHistoryPagePage() {
    const [searchBarValue8, setSearchBarValue8] = React.useState("");
    const [page, setPage] = useState(1);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const {
        data: dataTransactionWallet,
        isLoading: isLoadingTransactionWallet,
        isError: isErrorTransactionWallet,
        error: errorTransactionWallet
    } = useGetTransactionWalletQuery({
        page: page - 1,
        limit: 8
    });
    console.log("dataTransactionWallet test: ", dataTransactionWallet);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 150,
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            width: 200,
        },
        {
            title: "Loại giao dịch",
            dataIndex: "transactionType",
            key: "transactionType",
            width: 200,
        },
        {
            title: "Hình ảnh",
            dataIndex: "method",
            key: "method",
            width: 200,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 150,
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (text, record) => (
                <span style={{color: record.amount > 0 ? "green" : "red"}}>
        {record.amount > 0 ? `+${text}` : text} đ
      </span>
            ),
            width: 150,
        },
        {
            title: "Thêm",
            dataIndex: "more",
            key: "action",
            render: (_, record) => (
                <Button type="primary" shape="round">
                    {record.status === "Hoàn thành" ? "Xem chi tiết" : "Hoàn thành"}
                </Button>
            ),
            // key: 'more',
            // width: 150,
        },
    ];
    const data = dataTransactionWallet?.items?.map((item, index) => ({
        key: index + 1, // Dùng `index` làm key (có thể thay đổi theo nhu cầu)
        id: `#${item.transactionWalletCode}`, // Mã giao dịch
        time: item.createAt, // Thời gian tạo giao dịch
        transactionType: item.transactionType === "DEPOSIT" ? "Nạp tiền" : "Rút tiền", // Định dạng loại giao dịch
        method: item.image || "Không xác định", // Phương thức (giả sử nếu `image` có URL là phương thức, nếu không thì để mặc định)
        status: item.transactionStatus === "COMPLETED" ? "Hoàn thành" : "Đang xử lý", // Trạng thái giao dịch
        amount: item.amount, // Số tiền giao dịch
    }));

    // Xử lý khi dữ liệu đang tải hoặc lỗi
    if (isLoadingTransactionWallet) return <div>Loading...</div>;
    if (isErrorTransactionWallet) return <div>Error: {errorTransactionWallet.message}</div>;
// Data của bảng
//     const data = [
//         {
//             key: "1",
//             id: "#1920",
//             time: "12/9/2024 21:29",
//             transactionType: "Nạp tiền",
//             method: "Tp Bank",
//             status: "Hoàn thành",
//             amount: 250000,
//         },
//         {
//             key: "2",
//             id: "#1918",
//             time: "12/9/2024 21:29",
//             transactionType: "Nạp tiền",
//             method: "Pay OS",
//             status: "Hoàn thành",
//             amount: +250000,
//         },
//     ];
    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1, // Cho phép Content chiếm không gian còn lại
                        display: 'flex', // Đặt display là flex để chứa nội dung
                        flexDirection: 'column', // Hướng theo chiều dọc
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1, // Để Layout chiếm hết không gian còn lại
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <SiderUserBK/>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <Heading
                                size="text3xl"
                                as="h1"
                                className="mb-[20px] text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                            >
                                Lịch sử nạp tiền
                            </Heading>
                            <Table columns={columns} dataSource={data} bordered pagination={false}/>
                            {/*<Pagination className="ml-[290px]" />*/}
                            <div className="flex justify-center items-center mt-4">
                                <Pagination
                                    currentPage={page}
                                    totalPages={dataTransactionWallet?.totalPages || 1}
                                    onPageChange={setPage}
                                />
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}
