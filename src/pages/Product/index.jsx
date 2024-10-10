import { Helmet } from "react-helmet";
import {
  Img,
  Text,
  Heading,
  ButtonDH,
  CheckBox,
  SeekBar,
  InputDH,
} from "../../components";
import HeaderComponent from "../../components/HeaderComponent";
import ProductDetails4 from "../../components/ProductDetails4";
import ProductDetails5 from "../../components/ProductDetails5";
import FooterBK from "../../components/FooterBK";
import Header2 from "../../components/Header2";
import ProductSection from "./ProductSection";
import React, { useState } from "react";
import {Collapse, Checkbox, Slider, InputNumber, Breadcrumb, Layout, theme} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
const { Panel } = Collapse;
const {Content, Sider} = Layout;


const brands = [
  { name: "Apple", count: 87 },
  { name: "Asus", count: 92 },
  { name: "Acer", count: 123 },
  { name: "Dell", count: 49 },
  { name: "Lenovo", count: 12 },
];

export default function ProductPage() {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 750]);
  const [percentageRange, setPercentageRange] = useState([0, 100]);

  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  const onLowPriceChange = (value) => {
    setPriceRange([value, priceRange[1]]);
  };

  const onHighPriceChange = (value) => {
    setPriceRange([priceRange[0], value]);
  };

  const onPercentageSliderChange = (value) => {
    setPercentageRange(value);
  };

  const onLowPercentageChange = (value) => {
    setPercentageRange([value, percentageRange[1]]);
  };

  const onHighPercentageChange = (value) => {
    setPercentageRange([percentageRange[0], value]);
  };

  // const handleBrandChange = (brandName, checked) => {
  //   if (checked) {
  //     // Nếu được chọn, thêm vào danh sách
  //     setSelectedBrands([...selectedBrands, brandName]);
  //   } else {
  //     // Nếu bỏ chọn, loại bỏ khỏi danh sách
  //     setSelectedBrands(selectedBrands.filter(name => name !== brandName));
  //   }
  // };
  const handleBrandChange = (brandName, checked) => {
    if (checked) {
      // Nếu được chọn, thêm vào danh sách
      setSelectedBrands([...selectedBrands, brandName]);
    } else {
      // Nếu bỏ chọn, loại bỏ khỏi danh sách
      setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
    }
  };

  const handleTagClose = (brandName) => {
    // Khi đóng tag, loại bỏ brand khỏi danh sách và bỏ chọn checkbox
    setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
  };

  return (
    <>
      {/*<Helmet>*/}
      {/*  <title>*/}
      {/*    Product Catalog - Shop the Latest in Electronics and Fashion*/}
      {/*  </title>*/}
      {/*  <meta*/}
      {/*    name="description"*/}
      {/*    content="Browse our Product Catalog to find the best deals on electronics, fashion, and home goods. Filter by brand, size, and color to find your perfect match."*/}
      {/*  />*/}
      {/*</Helmet>*/}

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
              <div className="flex flex-col items-start gap-6 ml-5">
                <div
                    className="flex items-center justify-between gap-5 self-stretch sticky top-0 bg-white z-10 h-[60px]">

                  <Heading
                      size="text2xl"
                      as="h1"
                      className="text-[18px] font-medium text-blue_gray-900_01"
                  >
                    Bộ lọc tìm kiếm
                  </Heading>
                </div>

                {/* Collapse Component cho thương hiệu */}
                <div className="w-full overflow-y-auto max-h-[400px]">
                  <Collapse defaultActiveKey={["1"]} ghost>
                    <Panel
                        key="1"
                        header={
                          <h2 className="text-lg font-semibold">
                            Brand Filters
                          </h2>
                        }
                    >
                      <div className="flex">
                        <div className="flex w-[78%] items-center gap-[13px]">
                          <Text
                              size="textlg"
                              as="p"
                              className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                          >
                            {brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="flex items-center gap-2"
                                >
                                  <Checkbox
                                      checked={selectedBrands.includes(
                                          brand.name,
                                      )}
                                      onChange={(e) =>
                                          handleBrandChange(
                                              brand.name,
                                              e.target.checked,
                                          )
                                      }
                                  />
                                  {brand.name}
                                </div>
                            ))}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className="h-px w-[72%] bg-gray-200"/>
                {/* Thêm nhiều Brand Filters khác nếu cần */}
                <div className="w-full">
                  <Collapse defaultActiveKey={["1"]} ghost>
                    <Panel
                        key="2"
                        header={
                          <h2 className="text-lg font-semibold">
                            Brand Filters
                          </h2>
                        }
                    >
                      <div className="flex">
                        <div className="flex w-[78%] items-center gap-[13px]">
                          <Text
                              size="textlg"
                              as="p"
                              className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                          >
                            {brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="flex items-center gap-2"
                                >
                                  <Checkbox/>
                                  {brand.name}
                                </div>
                            ))}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className="h-px w-[72%] bg-gray-200"/>
                {/* Thêm Brand Filters khác nếu cần */}
                <div className="w-full">
                  <Collapse defaultActiveKey={["1"]} ghost>
                    <Panel
                        key="3"
                        header={
                          <h2 className="text-lg font-semibold">
                            Brand Filters
                          </h2>
                        }
                    >
                      <div className="flex">
                        <div className="flex w-[78%] items-center gap-[13px]">
                          <Text
                              size="textlg"
                              as="p"
                              className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                          >
                            {brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="flex items-center gap-2"
                                >
                                  <Checkbox/>
                                  {brand.name}
                                </div>
                            ))}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>

                <div className="h-px w-[72%] bg-gray-200"/>
                {/* Thêm nhiều Brand Filters khác nếu cần */}
                <div className="w-full">
                  <Collapse defaultActiveKey={["1"]} ghost>
                    <Panel
                        key="2"
                        header={
                          <h2 className="text-lg font-semibold">
                            Brand Filters
                          </h2>
                        }
                    >
                      <div className="flex">
                        <div className="flex w-[78%] items-center gap-[13px]">
                          <Text
                              size="textlg"
                              as="p"
                              className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                          >
                            {brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="flex items-center gap-2"
                                >
                                  <Checkbox/>
                                  {brand.name}
                                </div>
                            ))}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
                <div className="h-px w-[72%] bg-gray-200"/>
                {/* Thêm Brand Filters khác nếu cần */}
                <div className="w-full">
                  <Collapse defaultActiveKey={["1"]} ghost>
                    <Panel
                        key="3"
                        header={
                          <h2 className="text-lg font-semibold">
                            Brand Filters
                          </h2>
                        }
                    >
                      <div className="flex">
                        <div className="flex w-[78%] items-center gap-[13px]">
                          <Text
                              size="textlg"
                              as="p"
                              className="text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                          >
                            {brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="flex items-center gap-2"
                                >
                                  <Checkbox/>
                                  {brand.name}
                                </div>
                            ))}
                          </Text>
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>

                <InputDH
                    size="sm"
                    shape="round"
                    name="Brand Search"
                    placeholder={`Tìm thương hiệu`}
                    className="w-[88%] rounded-md border border-solid border-gray-200 px-3.5 !text-blue_gray-900_01"
                />

                <div className="flex flex-col items-start gap-6">
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <h2 className="text-[18px] font-medium text-blue_gray-900_01">
                      Giá
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 self-stretch">
                    <div className="flex items-center gap-6">
                      <div className="flex w-[46%] flex-col items-start gap-1">
                        <p className="text-[15px] font-normal text-blue_gray-900_01">
                          Thấp
                        </p>
                        <InputNumber
                            min={1}
                            max={750}
                            value={priceRange[0]}
                            onChange={onLowPriceChange}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-start gap-1.5">
                        <p className="text-[15px] font-normal text-blue_gray-900_01">
                          Cao
                        </p>
                        <InputNumber
                            min={1}
                            max={1000}
                            value={priceRange[1]}
                            onChange={onHighPriceChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <Slider
                          range
                          min={1}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onChange={onSliderChange}
                          className="mr-5 flex self-stretch"
                      />
                      <p className="flex text-[14px] font-normal text-blue_gray-900_01">
                        <span>{priceRange[0]?.toLocaleString() || "0"}</span>
                        <a href="#" className="inline underline">
                          đ
                        </a>
                        <span>
                            &nbsp;- {priceRange[1]?.toLocaleString() || "0"}
                          </span>
                        <a href="#" className="inline underline">
                          đ
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-[72%] bg-gray-200"/>
                </div>

                <div className="flex flex-col items-start gap-6">
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <h2 className="text-[18px] font-medium text-blue_gray-900_01">
                      Tình trạng sản phẩm
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 self-stretch">
                    <div className="flex items-center gap-3">
                      <Checkbox>New</Checkbox>
                      <Checkbox>Used</Checkbox>
                    </div>
                  </div>
                  <div className="h-px w-[72%] bg-gray-200"/>
                </div>

                <div className="flex flex-col items-start gap-6">
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <h2 className="text-[18px] font-medium text-blue_gray-900_01">
                      Giảm giá (%)
                    </h2>
                  </div>
                  <div className="flex flex-col gap-3 self-stretch">
                    <div className="flex items-center gap-3">
                      <div className="flex w-[46%] flex-col items-start gap-1">
                        <InputNumber
                            min={0}
                            max={100}
                            value={percentageRange[0]}
                            onChange={onLowPercentageChange}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-start gap-1.5">
                        <InputNumber
                            min={0}
                            max={100}
                            value={percentageRange[1]}
                            onChange={onHighPercentageChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                      <Slider
                          range
                          min={0}
                          max={100}
                          value={percentageRange}
                          onChange={onPercentageSliderChange}
                          className="mr-5 flex self-stretch"
                      />
                      <p className="flex text-[14px] font-normal text-blue_gray-900_01">
                          <span>
                            {percentageRange[0]?.toLocaleString() || "0"}
                          </span>
                        <span>
                            &nbsp;-{" "}
                          {percentageRange[1]?.toLocaleString() || "0"}
                          </span>
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-[72%] bg-gray-200"/>
                </div>
              </div>
            </Sider>
            <Content
                style={{
                  padding: '0 24px',
                  minHeight: 280,
                  flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                }}
            >
              <div className="flex w-[100%] flex-col gap-4 md:w-full">
                <ProductSection
                    selectedBrands={selectedBrands}
                    onTagClose={handleTagClose}
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
