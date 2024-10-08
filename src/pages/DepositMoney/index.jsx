import {
  Heading,
} from "../../components";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import React from "react";
import { TabPanel, Tabs } from "react-tabs";
import {Select, Input, InputNumber, theme, Layout, Breadcrumb} from "antd";
import { BankOutlined } from "@ant-design/icons";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const {Content, Sider} = Layout;
export default function DepositMoneyPage() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (value) => {
    console.log("changed", value);
  };
  const { TextArea } = Input;
  const onChangeTextArea = (e) => {
    console.log("Change:", e.target.value);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
              <Tabs
                  className="flex flex-1 flex-col items-start gap-9 md:self-stretch md:px-5"
                  selectedTabClassName="!text-gray-900"
                  selectedTabPanelClassName="mx-1.5 md:mx-0 !relative tab-panel--selected"
              >
                <Heading
                    size="heading2xl"
                    as="h3"
                    className="text-[30px] font-semibold uppercase text-blue_gray-900_01 md:text-[28px] sm:text-[26px]"
                >
                  Nạp Tiền
                </Heading>
                {[...Array(3)].map((_, index) => (
                    <TabPanel
                        key={`tab-panel${index}`}
                        className="absolute mx-1.5 self-stretch md:mx-0"
                    >
                      <div className="w-full self-stretch">
                        <div>
                          <div className="flex flex-col items-start justify-center gap-1.5">
                            <Heading
                                as="h4"
                                className="text-[16px] font-medium text-gray-900_02"
                            >
                              Phương thức nạp tiền
                            </Heading>
                            <Select
                                defaultValue="Chọn ngân hàng"
                                style={{
                                  width: "48%",
                                }}
                                allowClear
                                options={dropDownOptions}
                                placeholder="Chọn ngân hàng"
                                onChange={handleChange}
                            />
                          </div>
                          <div className="mt-[30px] flex flex-col items-start justify-center gap-1.5">
                            <Heading
                                as="h5"
                                className="mt-1 text-[16px] font-medium text-blue_gray-900_01"
                            >
                              Tên ngân hàng
                            </Heading>
                            <Input
                                size="large"
                                placeholder="large size"
                                prefix={<BankOutlined />}
                                className="w-[48%] rounded-md border border-gray-200 px-4"
                            />
                          </div>
                          <div className="mt-[30px] flex flex-col items-start justify-center gap-1.5">
                            <Heading
                                as="h6"
                                className="text-[16px] font-medium text-blue_gray-900_01"
                            >
                              Số tiền nạp
                            </Heading>
                            <InputNumber
                                defaultValue={1000}
                                formatter={(value) =>
                                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                                onChange={onChange}
                                className="w-[48%] rounded-md border border-gray-200 "
                            />
                          </div>
                          <div className="mt-6 flex flex-col items-start justify-center gap-2">
                            <Heading
                                as="p"
                                className="text-[16px] font-medium text-blue_gray-900_01"
                            >
                              Ghi chú
                            </Heading>
                            <TextArea
                                showCount
                                maxLength={100}
                                onChange={onChangeTextArea}
                                placeholder="disable resize"
                                style={{
                                  height: 120,
                                  resize: "none",
                                }}
                                className="w-[48%] rounded-md border border-gray-200 px-3.5"
                            />
                          </div>
                          <div className="mt-14 flex items-center gap-[33px]">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              Nạp tiền
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              Hủy bỏ
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                ))}
              </Tabs>
            </Content>
          </Layout>
        </Content>
        <FooterBK
            className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
      </Layout>

    </>
  );
}
