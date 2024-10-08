import { Helmet } from "react-helmet";
import {
  Img,
  Text,
  ButtonDH,
  Heading,
  SelectBox,
  InputDH,
} from "../../components";
import { CloseSVG } from "../../components/InputDH/close.jsx";
import NumberRow from "../../components/NumberRow";
import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK/index.jsx";
import {Table, Button, theme, Layout, Breadcrumb, Menu} from "antd";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
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
    title: "Phương thức",
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
      <span style={{ color: record.amount > 0 ? "green" : "red" }}>
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

// Data của bảng
const data = [
  {
    key: "1",
    id: "#1920",
    time: "12/9/2024 21:29",
    transactionType: "Nạp tiền",
    method: "Tp Bank",
    status: "Hoàn thành",
    amount: 250000,
  },
  {
    key: "2",
    id: "#1918",
    time: "12/9/2024 21:29",
    transactionType: "Nạp tiền",
    method: "Pay OS",
    status: "Hoàn thành",
    amount: +250000,
  },
];
const {  Content, Sider } = Layout;
export default function CustomerTransactionHistoryPagePage() {
  const [searchBarValue8, setSearchBarValue8] = React.useState("");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header2 />
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
                Quản Lý Địa Chỉ
              </Heading>
              <Table columns={columns} dataSource={data} bordered />
              {/*<Pagination className="ml-[290px]" />*/}
            </Content>
          </Layout>
        </Content>
        <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
      </Layout>
    </>
  );
}
