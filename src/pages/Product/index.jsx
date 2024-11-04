import {Helmet} from "react-helmet";
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
import React, {useState} from "react";
import {
    Collapse,
    Checkbox,
    Slider,
    InputNumber,
    Breadcrumb,
    Layout,
    theme,
    Modal,
    Button,
    Tag,
    Spin,
    Empty
} from "antd";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {Input} from "@material-tailwind/react";
import {CloseCircleOutlined} from "@ant-design/icons";
import Pagination from "@/components/Pagination/index.jsx";
import ProductDetails21 from "@/components/ProductDetails21/index.jsx";
import {useGetCategoriesQuery} from "@/services/category.service.js";
import {useDispatch, useSelector} from "react-redux";
import {useGetItemsFilterQuery} from "@/services/item.service.js";
import {setFilters} from "@/redux/item/itemSlice.js";

const {Panel} = Collapse;
const {Content, Sider} = Layout;

export default function ProductPage() {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([1, 1600000000]);
    const [percentageRange, setPercentageRange] = useState([0, 100]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const dispatch = useDispatch();
    const filters = useSelector(
        (state) =>
            state.item || {keyword: "", min: 0, max: 16000000, scIds: []}
    );
    const {
        data, error: errorItem,
        isLoading: loadingItem,
        isSuccess: isSuccessItem
    } = useGetItemsFilterQuery(filters);

    const handleFilterChange = (newFilters) => {
        const updatedFilters = {...filters, ...newFilters};
        if (newFilters.page !== undefined) {
            updatedFilters.page = newFilters.page - 1;
        }

        dispatch(setFilters(updatedFilters));
    };
    const {
        data: categories = [],
        error,
        isLoading,
        isFetching,
        isSuccess,
    } = useGetCategoriesQuery();
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const onSliderChange = (value) => {
        setPriceRange(value);
        handleFilterChange({min: value[0], max: value[1]});
    };

    // Hàm thay đổi giá trị đầu vào cho giá thấp
    const onLowPriceChange = (value) => {
        const newRange = [value, priceRange[1]];
        setPriceRange(newRange);
        handleFilterChange({min: value});
    };

    // Hàm thay đổi giá trị đầu vào cho giá cao
    const onHighPriceChange = (value) => {
        const newRange = [priceRange[0], value];
        setPriceRange(newRange);
        handleFilterChange({max: value});
    };

    // const onSliderChange = (value) => {
    //     setPriceRange(value);
    // };
    //
    // const onLowPriceChange = (value) => {
    //     setPriceRange([value, priceRange[1]]);
    // };
    //
    // const onHighPriceChange = (value) => {
    //     setPriceRange([priceRange[0], value]);
    // };

    const onPercentageSliderChange = (value) => {
        setPercentageRange(value);
    };

    const onLowPercentageChange = (value) => {
        setPercentageRange([value, percentageRange[1]]);
    };

    const onHighPercentageChange = (value) => {
        setPercentageRange([percentageRange[0], value]);
    };

    const handleBrandChange = (subCategoryId, checked) => {
        if (checked) {
            // If checked, add to the list of selected IDs
            setSelectedSubCategoryIds([...selectedSubCategoryIds, subCategoryId]);
            handleFilterChange({scIds: [...selectedSubCategoryIds, subCategoryId]});
        } else {
            // If unchecked, remove from the list of selected IDs
            const updatedIds = selectedSubCategoryIds.filter((id) => id !== subCategoryId);
            setSelectedSubCategoryIds(updatedIds);
            handleFilterChange({scIds: updatedIds});
        }
    };

    const handleTagClose = (brandName) => {
        // Khi đóng tag, loại bỏ brand khỏi danh sách và bỏ chọn checkbox
        setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
    };


    const handleClose = (brandName) => {
        onTagClose(brandName);
    };
    // console.log("DATA ITEM: ", data)


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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

                                <div className="w-full overflow-y-auto max-h-[400px]">
                                    {error ? (
                                        <Empty description={`Error: ${error.message || "Failed to load categories."}`}/>
                                    ) : (
                                        <Spin spinning={isLoading} tip="Loading...">
                                            <Collapse defaultActiveKey={["1"]} ghost>
                                                {categories.map((category) => (
                                                    <Panel
                                                        key={category.categoryId}
                                                        header={
                                                            <h2 className="text-lg font-semibold">
                                                                {category.categoryName}
                                                            </h2>
                                                        }
                                                    >
                                                        <div className="flex flex-col">
                                                            {category.subCategory.map((sub) => (
                                                                <div
                                                                    key={sub.sc_id}
                                                                    className="flex items-center gap-2 w-[50%]"
                                                                >
                                                                    <Checkbox
                                                                        checked={selectedSubCategoryIds.includes(sub.sc_id)}
                                                                        onChange={(e) =>
                                                                            handleBrandChange(sub.sc_id, e.target.checked)
                                                                        }
                                                                    />
                                                                    <span>{sub.sub_category}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Spin>
                                    )}
                                </div>
                                <div className="h-px w-[72%] bg-gray-200"/>

                                <InputDH
                                    size="sm"
                                    shape="round"
                                    name="Tim kiếm sản phẩm"
                                    placeholder={`Tim kiếm sản phẩm`}
                                    className="w-[88%] rounded-md border border-solid border-gray-200 px-3.5 !text-blue_gray-900_01"
                                />
                                <div className="flex flex-col items-start gap-6">
                                    <div className="flex items-center justify-between gap-5 self-stretch">
                                        <h2 className="text-[18px] font-medium text-blue_gray-900_01">Giá</h2>
                                    </div>
                                    <div className="flex flex-col gap-3 self-stretch">
                                        <div className="flex items-center gap-6">
                                            <div className="flex w-[46%] flex-col items-start gap-1">
                                                <p className="text-[15px] font-normal text-blue_gray-900_01">Thấp</p>
                                                <InputNumber
                                                    min={filters.min}
                                                    max={filters.max}
                                                    value={priceRange[0]}
                                                    onChange={onLowPriceChange}
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col items-start gap-1.5">
                                                <p className="text-[15px] font-normal text-blue_gray-900_01">Cao</p>
                                                <InputNumber
                                                    min={filters.min}
                                                    max={filters.max}
                                                    value={priceRange[1]}
                                                    onChange={onHighPriceChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start gap-3">
                                            <Slider
                                                range
                                                min={filters.min}
                                                max={filters.max}
                                                step={10}
                                                value={priceRange}
                                                onChange={onSliderChange}
                                                className="mr-5 flex self-stretch"
                                            />
                                            <p className="flex text-[14px] font-normal text-blue_gray-900_01">
                                                <span>{priceRange[0]?.toLocaleString() || "0"}</span>
                                                <a href="#" className="inline underline">đ</a>
                                                <span>&nbsp;- {priceRange[1]?.toLocaleString() || "0"}</span>
                                                <a href="#" className="inline underline">đ</a>
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
                                {/*<ProductSection*/}
                                {/*    selectedBrands={selectedBrands}*/}
                                {/*    onTagClose={handleTagClose}*/}
                                {/*/>*/}
                                <>
                                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                                        <form>
                                            <div className="mb-4">
                                                <Heading
                                                    size="headinglg"
                                                    as="h1"
                                                    className="text-xl font-semibold text-gray-900 text-center"
                                                >
                                                    Đăng ký tham gia đấu giá
                                                </Heading>
                                            </div>
                                            <div>
                                                <label htmlFor="deposit"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Tiền cọc
                                                </label>
                                                <div className="mt-1">
                                                    <Input
                                                        id="deposit"
                                                        name="deposit"
                                                        type="text"
                                                        placeholder="Nhập số tiền cọc"
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="content"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Nội dung
                                                </label>
                                                <div className="mt-1">
                                                    <Input
                                                        id="content"
                                                        name="content"
                                                        type="text"
                                                        placeholder="Nội dung đấu giá"
                                                        // value={formData.content}
                                                        // onChange={handleChange}
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Total Amount Field */}
                                            <div className="mt-4">
                                                <label htmlFor="total"
                                                       className="block text-sm font-medium text-gray-700">
                                                    Tổng tiền
                                                </label>
                                                <div className="mt-1">
                                                    <Input
                                                        id="total"
                                                        name="total"
                                                        type="text"
                                                        placeholder="Nhập tổng tiền"
                                                        // value={formData.total}
                                                        // onChange={handleChange}
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Agreement Checkbox */}
                                            <div className="mt-4">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        id="agreement"
                                                        className="h-5 w-5"
                                                    />
                                                    <span className="text-sm leading-5 text-gray-700">
                                Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                            </span>
                                                </div>
                                            </div>
                                            {/* Submit Button */}
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-200 focus:shadow-outline-indigo active:bg-indigo-200 transition duration-150 ease-in-out"
                                                >
                                                    ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                                                </button>
                                                <Button
                                                    onClick={handleCancel}
                                                    className="mt-4 w-full text-gray-600 hover:text-gray-800"
                                                >
                                                    Đóng
                                                </Button>
                                            </div>
                                        </form>
                                    </Modal>
                                    <div className="mt-10 flex flex-col items-center self-stretch">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-blue_gray-900_01">Filter:</span>

                                            {/*<div className="flex items-center gap-2 ml-4">*/}
                                            {/*  {selectedBrands.map((brand) => (*/}
                                            {/*      <Tag*/}
                                            {/*          key={brand}*/}
                                            {/*          closeIcon={<CloseCircleOutlined/>}*/}
                                            {/*          onClose={() => handleClose(brand)}*/}
                                            {/*      >*/}
                                            {/*        {brand}*/}
                                            {/*      </Tag>*/}
                                            {/*  ))}*/}
                                            {/*</div>*/}


                                            {/*<select*/}
                                            {/*    className="rounded-md border border-solid border-gray-200 text-blue_gray-900_01"*/}
                                            {/*    defaultValue=""*/}
                                            {/*>*/}
                                            {/*    <option value="" disabled hidden>*/}
                                            {/*        Sắp xếp*/}
                                            {/*    </option>*/}
                                            {/*    <option value="low-to-high">Giá thấp đến cao</option>*/}
                                            {/*    <option value="high-to-low">Giá cao đến thấp</option>*/}
                                            {/*</select>*/}
                                        </div>
                                        {errorItem ? (
                                            <Empty
                                                description={`Error: ${errorItem.message || "Failed to load categories."}`}/>
                                        ) : (
                                            <Spin spinning={loadingItem} tip="Loading...">
                                                <div
                                                    className="mx-7 mt-5 grid grid-cols-4 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">
                                                    {data?.item && data.item.length > 0 ? (
                                                        data.item.map((item, index) => (
                                                            <div key={`itemsGrid-${index}`}>
                                                                <ProductDetails21 product={item}
                                                                                  onBidClick={showModal}/>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Empty description="items" />
                                                    )}
                                                </div>
                                            </Spin>
                                        )}
                                        <div className="my-10">
                                            <Pagination
                                                currentPage={filters.page + 1}
                                                totalPages={data ? data.totalPages : 1}
                                                onPageChange={(page) => handleFilterChange({page})}
                                            />
                                        </div>
                                    </div>
                                </>
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
