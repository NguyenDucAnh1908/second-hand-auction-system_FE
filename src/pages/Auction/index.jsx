import { Helmet } from "react-helmet";
import {
  ButtonDH,
  Img,
  Slider,
  Heading,
  InputDH,
  TextArea,
  RatingBar,
  Text,
} from "../../components";
import Header2 from "../../components/Header2";
import ProductDetails4 from "../../components/ProductDetails4";
import UserProfile from "../../components/UserProfile";
import UserStatistics from "../../components/UserStatistics";
import AuctionSection from "./AuctionSection";
import RecommendedProductsSection from "./RecommendedProductsSection";
import React, { Suspense, useState } from "react";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";
import { Flex, Rate, Typography, Tabs } from "antd";
import FooterBK from "../../components/FooterBK/index.jsx";

// const accordionData = [
//   {
//     detailsTitle: "Thông Tin Chi Tiết",
//   },
//   {
//     detailsTitle: "Về Người Bán",
//   },
//   {
//     detailsTitle: "Chính Sách Mua Hàng",
//   },
//   {
//     detailsTitle: "Câu Hỏi Và Trả Lời",
//   },
// ];

const accordionData = [
  {
    detailsTitle: "Thông tin sản phẩm",
    content: (
      <>
        <Heading
          as="h6"
          className="text-[16px] font-medium text-blue_gray-900_01"
        >
          Đặc điểm
        </Heading>
        <div className="flex items-start self-stretch md:flex-col">
          <div className="mt-[18px] h-[4px] w-[4px] rounded-sm bg-blue_gray-900_01" />
          <Heading
            as="p"
            className="ml-2.5 w-[62%] self-center text-[16px] font-normal leading-10 text-blue_gray-600_01 md:ml-0 md:w-full"
          >
            <>
              Thiết kế dáng rộng có phần vai trễ xuống mang lại vẻ ngoài và cảm
              giác thoải mái.
              <br />
              Chất liệu cotton dày dặn có độ rủ cứng giúp outfits của bạn trông
              bắt mắt và đặc biệt hơn.
              <br />
              Logo thêu phía trước tạo điểm nhấn tinh tế.
              <br />
              Kiểu dáng loose fit.
              <br />
              Sản phẩm có thể giặt máy.
              <br />
              Chất liệu: 100% cotton.
            </>
          </Heading>
        </div>
      </>
    ),
  },
  {
    detailsTitle: "Chính sách đổi trả",
    content: (
      <p>
        Chính sách đổi trả trong vòng 30 ngày với điều kiện sản phẩm chưa qua sử
        dụng và còn nguyên tem mác.
      </p>
    ),
  },
  {
    detailsTitle: "Hướng dẫn bảo quản",
    content: (
      <p>
        Giặt máy ở nhiệt độ thấp, không dùng chất tẩy, phơi ở nơi thoáng mát,
        tránh ánh nắng trực tiếp.
      </p>
    ),
  },
];

export default function AuctionPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };
  const onChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <>
      <Helmet>
        <title>Auction Deals - Bid on Exclusive Nike Apparel and More</title>
        <meta
          name="description"
          content="Join our Auction Deals for a chance to win Nike apparel and other fashion items. Start bidding from as low as 250.000đ and enjoy the thrill of the auction."
        />
      </Helmet>
      <div className="flex w-full flex-col items-center bg-bg-white">
        <Header2 />

        {/* auction section */}
        <AuctionSection />
        <div className="container-xs mt-[70px] flex flex-col gap-[10px] md:gap-[85px] md:px-5 sm:gap-[57px]">
          <div className="ml-1 mr-2.5 flex flex-col items-start md:mx-0">
            <div className="flex flex-col gap-4 self-stretch px-2.5">
              <div className="flex flex-col items-start gap-3.5">
                <Heading
                  size="text3xl"
                  as="h2"
                  className="text-[20px] font-medium text-blue_gray-900_01"
                >
                  Tổng Quan
                </Heading>
                <div className="flex flex-col gap-4 self-stretch">
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 2, // Số dòng giới hạn trước khi hiển thị "Xem Thêm"
                      //expandable: true,
                      expanded,
                      onExpand: (_, info) => setExpanded(info.expanded),
                    }}
                    className="w-[72%] text-[16px] font-normal leading-7 text-blue_gray-600_01 md:w-full"
                  >
                    Cho dù bạn mặc nó sau khi tập gym hay chuẩn bị bắt đầu ngày
                    mới, chiếc áo phông này đang gọi tên bạn. Được thiết kế cho
                    phong cách thoải mái và dễ dàng, thể hiện trọn vẹn niềm tự
                    hào của bạn. Kết hợp với mọi món đồ trong tủ quần áo của bạn
                    - cảm giác thể thao cổ điển phù hợp với mọi kiểu dáng.
                  </Typography.Paragraph>

                  <div className="mb-2 flex items-center">
                    {!expanded ? (
                      <Heading
                        as="h4"
                        className="text-[16px] font-normal text-green-a700 cursor-pointer"
                        onClick={() => setExpanded(true)}
                      >
                        Xem Thêm
                      </Heading>
                    ) : (
                      <Heading
                        as="h4"
                        className="text-[16px] font-normal text-green-a700 cursor-pointer"
                        onClick={() => setExpanded(false)}
                      >
                        Thu Gọn
                      </Heading>
                    )}

                    <img
                      src="images/img_vector_19b269_1.svg"
                      alt="Vector Image"
                      className="mb-1 h-[5px] self-end"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-6">
                <div className="h-px w-[72%] bg-gray-200" />
                <Tabs onChange={onChange} type="card" activeKey={activeTabKey}>
                  {accordionData.map((d, i) => (
                    <Tabs.TabPane
                      tab={
                        <span
                          className={`text-[20px] font-medium ${
                            activeTabKey === String(i + 1)
                              ? "text-green-500"
                              : "text-blue_gray-900_01"
                          }`}
                        >
                          {d.detailsTitle}
                        </span>
                      }
                      key={String(i + 1)}
                    >
                      <div className="mb-4 flex flex-col items-start gap-3">
                        {d.content}
                      </div>
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </div>

              {/*AHIHIHIHIHIHI*/}
            </div>

            <Text
              size="text5xl"
              as="p"
              className="mt-[186px] text-[25px] font-normal text-black-900 md:text-[23px] sm:text-[21px]"
            >
              Tổng quan đánh giá
            </Text>

            {/*<div className="flex items-center my-8 gap-6">*/}
            {/*    <Avatar*/}
            {/*        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}*/}
            {/*        // icon={<AntDesignOutlined />}*/}
            {/*         src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/459935214_566819402437595_6740881433351511181_n.jpg?alt=media&token=18035951-3053-46e8-b754-7936dc90e266"*/}
            {/*    />*/}
            {/*    <div className="font-semibold text-2xl dark:text-white">*/}
            {/*        <div>Jese Leos</div>*/}
            {/*        <div className="text-base text-gray-500 dark:text-gray-400">Joined in August 2014</div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="flex items-center my-8 gap-6">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src="https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/459935214_566819402437595_6740881433351511181_n.jpg?alt=media&token=18035951-3053-46e8-b754-7936dc90e266"
              />
              <div className="font-semibold text-2xl dark:text-white">
                <div>Jese Leos</div>
                <div className="text-base text-gray-500 dark:text-gray-400">
                  Joined in August 2014
                </div>
              </div>
            </div>

            <div
              className="inline-flex flex items-center space-x-10 rounded-md shadow-sm"
              role="group"
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                Visit store
              </button>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                  />
                </svg>
                Contract
              </button>

              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <svg
                  className="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                  <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                </svg>
                Save seller
              </button>
            </div>

            <div className="mb-5  flex items-start gap-[30px] self-stretch md:flex-col">
              <div className="flex w-[40%] flex-col items-start gap-[110px] md:w-full md:gap-[82px] sm:gap-[55px]">
                <div className="flex flex-col gap-2 self-stretch">
                  <div className="flex items-center justify-between gap-5">
                    <Heading
                      size="text8xl"
                      as="p"
                      className="font-jost text-[60px] font-medium text-blue_gray-900_01 md:text-[52px] sm:text-[46px]"
                    >
                      4.9
                    </Heading>
                    <div className="flex w-[64%] flex-col items-start gap-3.5">
                      {/*<RatingBar*/}
                      {/*  value={5}*/}
                      {/*  isEditable={true}*/}
                      {/*  color="#f5c34b"*/}
                      {/*  activeColor="#f5c34b"*/}
                      {/*  size={18}*/}
                      {/*  className="flex gap-2.5"*/}
                      {/*/>*/}
                      <Flex gap="middle">
                        <Rate disabled defaultValue={2} />
                        {/*<span>allowClear: true</span>*/}
                      </Flex>
                      <Text
                        size="textlg"
                        as="p"
                        className="text-[15px] font-normal text-blue_gray-900_01"
                      >
                        2 đánh giá
                      </Text>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[46px]">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      1,745 global ratings
                    </p>
                    <div className="flex items-center mt-0">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                      >
                        5 star
                      </a>
                      <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                        {" "}
                        {/* Giảm khoảng cách ngang */}
                        <div
                          className="h-5 bg-yellow-300 rounded"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                        70%
                      </span>
                    </div>
                    <div className="flex items-center mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                      >
                        4 star
                      </a>
                      <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                        {" "}
                        {/* Giảm khoảng cách ngang */}
                        <div
                          className="h-5 bg-yellow-300 rounded"
                          style={{ width: "17%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                        17%
                      </span>
                    </div>

                    <div className="flex items-center mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                      >
                        3 star
                      </a>
                      <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                        <div
                          className="h-5 bg-yellow-300 rounded"
                          style={{ width: "8%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                        8%
                      </span>
                    </div>

                    <div className="flex items-center mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                      >
                        2 star
                      </a>
                      <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                        <div
                          className="h-5 bg-yellow-300 rounded"
                          style={{ width: "4%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                        4%
                      </span>
                    </div>

                    <div className="flex items-center mt-4">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline flex-shrink-0"
                      >
                        1 star
                      </a>
                      <div className="w-full h-5 mx-2 bg-gray-200 rounded dark:bg-gray-700">
                        <div
                          className="h-5 bg-yellow-300 rounded"
                          style={{ width: "1%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                        1%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[18px] flex flex-1 flex-col gap-9 self-center md:self-stretch">
                <div className="ml-1 flex flex-col items-start gap-[50px] md:ml-0">
                  <div className="flex flex-col gap-1.5 self-stretch">
                    {/*<Heading*/}
                    {/*    size="text2xl"*/}
                    {/*    as="p"*/}
                    {/*    className="w-[32%] text-[18px] font-medium leading-[22px] text-blue_gray-900_01 md:w-full"*/}
                    {/*>*/}
                    {/*    39 Đánh giá sản phẩm người bán*/}
                    {/*</Heading>*/}
                    <Heading
                      size="text2xl"
                      as="p"
                      className="text-[18px] font-medium leading-[22px] text-blue_gray-900_01"
                      style={{ margin: 0, padding: 0 }}
                    >
                      39 Đánh giá sản phẩm người bán
                    </Heading>

                    <article>
                      <div className="flex items-center my-6">
                        <img
                          className="w-10 h-10 me-4 rounded-full"
                          src="/docs/images/people/profile-picture-5.jpg"
                          alt=""
                        />
                        <div className="font-medium dark:text-white">
                          <p>
                            Jese Leos{" "}
                            <time
                              dateTime="2014-08-16 19:00"
                              className="block text-sm text-gray-500 dark:text-gray-400"
                            >
                              Joined on August 2014
                            </time>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-300 dark:text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                          Thinking to buy another one!
                        </h3>
                      </div>
                      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Reviewed in the United Kingdom on{" "}
                          <time dateTime="2017-03-03 19:00">March 3, 2017</time>
                        </p>
                      </footer>
                      <div className="flex flex-col gap-4 self-stretch">
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 2, // Số dòng giới hạn trước khi hiển thị "Xem Thêm"
                            //expandable: true,
                            expanded,
                            onExpand: (_, info) => setExpanded(info.expanded),
                          }}
                          className="w-[72%] text-[16px] font-normal leading-7 text-blue_gray-600_01 md:w-full"
                        >
                          Cho dù bạn mặc nó sau khi tập gym hay chuẩn bị bắt đầu
                          ngày mới, chiếc áo phông này đang gọi tên bạn. Được
                          thiết kế cho phong cách thoải mái và dễ dàng, thể hiện
                          trọn vẹn niềm tự hào của bạn. Kết hợp với mọi món đồ
                          trong tủ quần áo của bạn - cảm giác thể thao cổ điển
                          phù hợp với mọi kiểu dáng.
                        </Typography.Paragraph>
                        <div className="mb-2 flex items-center">
                          {!expanded ? (
                            <a
                              //href="#"
                              className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                              onClick={() => setExpanded(true)}
                            >
                              Xem thêm
                            </a>
                          ) : (
                            <a
                              //href="#"
                              className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                              onClick={() => setExpanded(false)}
                            >
                              Thu gọn
                            </a>
                          )}
                        </div>
                      </div>
                      <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          19 people found this helpful
                        </p>
                        <div className="flex items-center mt-3">
                          <a
                            href="#"
                            className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Helpful
                          </a>
                          <a
                            href="#"
                            className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                          >
                            Report abuse
                          </a>
                        </div>
                      </aside>
                    </article>
                  </div>
                  <ButtonDH
                    color="green_A700"
                    size="xl"
                    variant="outline"
                    shape="round"
                    className="ml-[218px] min-w-[298px] rounded-md !border-2 px-8 font-medium md:ml-0 sm:px-5"
                  >
                    Xem Tất Cả
                  </ButtonDH>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RecommendedProductsSection />
        {/* recommended products section */}
        <RecommendedProductsSection />
        <div className="mt-[50px] self-stretch">
          <FooterBK />
        </div>
      </div>
    </>
  );
}
