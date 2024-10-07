import { Helmet } from "react-helmet";
import {
  Heading,
  ButtonDH,
  InputDH,
  SelectBox,
  Img,
  Text,
} from "../../components";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";
import ProfileCard from "../../components/ProfileCard";
import AccountOptions from "../../components/AccountOption";
import { Select, Input, InputNumber } from "antd";
import { BankOutlined } from "@ant-design/icons";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

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
  return (
    <>
      <Helmet>
        <title>Deposit Funds into Account - EZShop</title>
        <meta
          name="description"
          content="Easily deposit funds into your EZShop account using your preferred bank. Secure and convenient way to manage your balance and enhance your shopping experience."
        />
      </Helmet>
      <Header2 />
      <div className="w-full bg-bg-white">
        
        <div className="  md:mx-0">
          <div className="flex items-baseline gap-1 md:flex-col">
            <div className="mb-[22px] flex w-[24%] flex-col gap-[46px] md:w-full md:px-5">
              <div>
                <div className="flex flex-col gap-[38px]">
                 
                  <SiderUserBK/>
                </div>
              </div>
            </div>
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
              {/*<TabList className="mx-1.5 flex flex-wrap gap-[68px] self-stretch px-5 md:mx-0 md:gap-5">*/}
              {/*    <Tab className="bg-yellow-300 text-[16px] font-medium text-blue_gray-900_01">*/}
              {/*        Nạp tiền*/}
              {/*    </Tab>*/}

              {/*    <Tab className="text-[16px] font-medium text-blue_gray-900_01">Rút tiền</Tab>*/}
              {/*    <Tab className="text-[16px] font-medium text-blue_gray-900_01">Lịch sử giao dịch</Tab>*/}
              {/*</TabList>*/}
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
                        {/*<SelectBox*/}
                        {/*    size="sm"*/}
                        {/*    shape="round"*/}
                        {/*    indicator={*/}
                        {/*        <Img*/}
                        {/*            src="images/img_vector_bg_black_.svg"*/}
                        {/*            alt="Arrow Down"*/}
                        {/*            className="h-[14px] w-[14px]"*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    name="Bank Dropdown"*/}
                        {/*    placeholder={`Ngân hàng`}*/}
                        {/*    options={dropDownOptions}*/}
                        {/*    className="w-[48%] gap-4 rounded-md border border-solid border-gray-200 px-4 bg-transparent"*/}
                        {/*/>*/}
                        {/* Thay SelectBox bằng Select của antd */}
                        {/*<Space wrap>*/}
                        <Select
                          defaultValue="Chọn ngân hàng"
                          style={{
                            width: "48%",
                          }}
                          allowClear
                          options={dropDownOptions}
                          placeholder="Chọn ngân hàng"
                          onChange={handleChange}
                          // className="rounded-md border border-solid border-gray-200 px-4"
                        />
                        {/*</Space>*/}
                      </div>
                      <div className="mt-[30px] flex flex-col items-start justify-center gap-1.5">
                        <Heading
                          as="h5"
                          className="mt-1 text-[16px] font-medium text-blue_gray-900_01"
                        >
                          Tên ngân hàng
                        </Heading>
                        {/*<InputDH*/}
                        {/*    shape="round"*/}
                        {/*    name="Bank Name InputDH"*/}
                        {/*    placeholder={`Bank`}*/}
                        {/*    className="w-[48%] rounded-md border border-gray-200 px-4"*/}
                        {/*/>*/}
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
                        {/*<InputDH*/}
                        {/*    shape="round"*/}
                        {/*    name="Amount InputDH"*/}
                        {/*    placeholder={`VNĐ`}*/}
                        {/*    className="w-[48%] rounded-md border border-gray-200 px-4"*/}
                        {/*/>*/}
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
                        {/*<InputDH*/}
                        {/*    shape="round"*/}
                        {/*    name="Note InputDH"*/}
                        {/*    placeholder={`ghi chú`}*/}
                        {/*    className="w-[48%] rounded-md border border-gray-200 px-3.5"*/}
                        {/*/>*/}
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
          </div>
        </div>
        <div className="mt-[194px] self-stretch">
          <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </div>
      </div>
    </>
  );
}
