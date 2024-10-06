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
import { Table, Button } from "antd";
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
  // Thêm các hàng khác tương tự...
];

export default function CustomerTransactionHistoryPagePage() {
  const [searchBarValue8, setSearchBarValue8] = React.useState("");

  return (
    <>
      <Helmet>
        <title>User Profile Details - EZShop</title>
        <meta
          name="description"
          content="Access your EZShop profile to manage your account information, view your balance of 20,000,000 VND, and update your favorite products. Get assistance and find stores easily."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-10 bg-bg-white">
        <Header2 />



          <div className="mx-auto w-full max-w-[1328px] md:px-5">
            <div className="mr-[46px] flex items-start gap-5 md:mr-0 md:flex-col">

              {/* bên trái */}
              <div className="mt-12 flex w-[24%] flex-col gap-[20px] md:w-full -mt-[71px]">
                <div className="py-0">
                  {/*<AccountOptions />*/}
                  <SiderUserBK />
                </div>
              </div>



              {/* Phần bên phải chiếm phần còn lại */}
              <div className="flex flex-1 flex-col items-center gap-[38px] self-center md:self-stretch ">
                <div className="self-stretch">
                  <div className="flex flex-col gap-4">
                    <div className="mr-1 md:mr-0">
                      <div className="flex flex-col items-start gap-1.5 self-end py-7">

                      <Heading
                        size="headingmd"
                        as="h4"
                        className="text-[16px] font-semibold text-blue_gray-900_01 -mt-[335px]"
                      >
                        Lịch sử nạp tiền{" "}
                      </Heading>
                      <div className="h-[2px] w-[14%] bg-blue_gray-900_01" />

                        <Table columns={columns} dataSource={data} bordered />;
                        {/*<Pagination className="ml-[290px]" />*/}
                      </div>
                      {/* <NumberRow className="mx-[294px]" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        

        <div className="mt-[194px] self-stretch">
          <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </div>
      </div>
    </>
  );
}
