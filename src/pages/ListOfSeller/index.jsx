import {Helmet} from "react-helmet";
import {Img, Text, Heading, SelectBox, InputDH} from "../../components";
import StoreProfile from "../../components/StoreProfile";
import React, {Suspense} from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK/index.jsx";
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {Radio, Typography, Rating, Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

const {Content, Sider} = Layout;


const storeDetailsGrid = [
    {
        storeImage: "images/img_beautiful_young.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
    {
        storeImage: "images/img_beautiful_young_210x254.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
    {
        storeImage: "images/img_beautiful_young_210x254.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
    {
        storeImage: "images/img_beautiful_young_210x254.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
    {
        storeImage: "images/img_beautiful_young_210x254.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
    {
        storeImage: "images/img_beautiful_young_210x254.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br/>
                sale@zenmart.com
                <br/>
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
];
const dropDownOptions = [
    {label: "Option1", value: "option1"},
    {label: "Option2", value: "option2"},
    {label: "Option3", value: "option3"},
];


export default function ListOfSellerPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <>
            {/*<Helmet>*/}
            {/*    <title>Comprehensive Seller List - Find Top-Rated Sellers on EZShop</title>*/}
            {/*    <meta*/}
            {/*        name="description"*/}
            {/*        content="Explore our extensive list of sellers and find the best deals across categories like electronics, home & kitchen, and fashion. Filter by location and category for tailored results."*/}
            {/*    />*/}
            {/*</Helmet>*/}
            {/*<Header2/>*/}
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
                            <div className="flex flex-col gap-5 md:w-full">
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center justify-between gap-5">
                                        <Heading as="h2" className="text-[18px] font-medium text-blue_gray-900_01">
                                            Lọc theo danh mục
                                        </Heading>
                                        <div className="h-px w-[20px] bg-blue_gray-900_01"/>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            {/*<div*/}
                                            {/*    className="flex rounded-md border border-solid border-gray-200 bg-bg-white px-5 py-3">*/}
                                            {/*    <Text size="textlg" as="p"*/}
                                            {/*          className="text-[15px] font-normal text-blue_gray-900_01">*/}
                                            {/*        Tìm kiếm*/}
                                            {/*    </Text>*/}
                                            {/*</div>*/}
                                            <div className="w-full md:w-65">
                                                <Input
                                                    size="lg"
                                                    label="Search"
                                                    icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                                                />
                                            </div>
                                            {/*<div className="mt-5">*/}
                                            {/*        <div className="flex items-center justify-between gap-5">*/}
                                            {/*            <Heading as="h3" className="text-[18px] font-medium text-blue_gray-900_01">*/}
                                            {/*                Lọc theo vị trí*/}
                                            {/*            </Heading>*/}
                                            {/*            <div className="h-px w-[20px] bg-blue_gray-900_01"/>*/}
                                            {/*        </div>*/}
                                            {/*    <div className="flex items-center justify-center">*/}
                                            {/*        <div className="flex w-[8%] flex-col gap-3.5">*/}
                                            {/*            <div*/}
                                            {/*                className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01"/>*/}
                                            {/*            <Img src="images/img_checkmark_green_a700.svg"*/}
                                            {/*                 alt="Checkmark Image" className="h-[16px]"/>*/}
                                            {/*            <div*/}
                                            {/*                className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01"/>*/}
                                            {/*            <div*/}
                                            {/*                className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01"/>*/}
                                            {/*            <div*/}
                                            {/*                className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01"/>*/}
                                            {/*        </div>*/}
                                            {/*        <Text*/}
                                            {/*            size="textlg"*/}
                                            {/*            as="p"*/}
                                            {/*            className="ml-3 font-bevietnampro text-[15px] font-normal leading-[30px] text-blue_gray-900_01"*/}
                                            {/*        >*/}
                                            {/*            <span className="text-blue_gray-900_01">*/}
                                            {/*                <>*/}
                                            {/*                    Đang giảm giá*/}
                                            {/*                    <br/>*/}
                                            {/*                </>*/}
                                            {/*            </span>*/}
                                            {/*            <span className="text-green-a700">*/}
                                            {/*                <>*/}
                                            {/*                    Nhà & Bếp*/}
                                            {/*                    <br/>*/}
                                            {/*                </>*/}
                                            {/*            </span>*/}
                                            {/*            <span className="text-blue_gray-900_01">*/}
                                            {/*                <>*/}
                                            {/*                    Nhà & Nội thất*/}
                                            {/*                    <br/>*/}
                                            {/*                </>*/}
                                            {/*            </span>*/}
                                            {/*            <span className="text-blue_gray-900_01">*/}
                                            {/*                <>*/}
                                            {/*                    Điện tử*/}
                                            {/*                    <br/>*/}
                                            {/*                </>*/}
                                            {/*            </span>*/}
                                            {/*            <span*/}
                                            {/*                className="text-blue_gray-900_01">Quần áo & Phụ kiện</span>*/}
                                            {/*        </Text>*/}
                                            {/*        <Text*/}
                                            {/*            size="texts"*/}
                                            {/*            as="p"*/}
                                            {/*            className="ml-[26px] w-[12%] text-right text-[13px] font-normal leading-[30px] text-blue_gray-900_01"*/}
                                            {/*        >*/}
                                            {/*            <>*/}
                                            {/*                87*/}
                                            {/*                <br/>*/}
                                            {/*                92*/}
                                            {/*                <br/>*/}
                                            {/*                123*/}
                                            {/*                <br/>*/}
                                            {/*                49*/}
                                            {/*                <br/>*/}
                                            {/*                12*/}
                                            {/*            </>*/}
                                            {/*        </Text>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            <div className="flex flex-col gap-8 mt-12">
                                                <Radio
                                                    name="description"
                                                    label={
                                                        <div>
                                                            <Rating value={5} readonly/>
                                                        </div>
                                                    }
                                                    containerProps={{
                                                        className: "",
                                                    }}
                                                />
                                                <Radio
                                                    name="description"
                                                    color="blue"
                                                    label={
                                                        <div>
                                                            <div>
                                                                <Rating value={4} readonly/>
                                                            </div>
                                                        </div>
                                                    }
                                                    containerProps={{
                                                        className: "",
                                                    }}
                                                />
                                                <Radio
                                                    name="description"
                                                    color="green"
                                                    label={
                                                        <div>
                                                            <div>
                                                                <Rating value={3} readonly/>
                                                            </div>
                                                        </div>
                                                    }
                                                    containerProps={{
                                                        className: "",
                                                    }}
                                                />
                                                <Radio
                                                    name="description"
                                                    color="red"
                                                    label={
                                                        <div>
                                                            <div>
                                                                <Rating value={2} readonly/>
                                                            </div>
                                                        </div>
                                                    }
                                                    containerProps={{
                                                        className: "",
                                                    }}
                                                />
                                                <Radio
                                                    name="description"
                                                    color="amber"
                                                    label={
                                                        <div>
                                                            <div>
                                                                <Rating value={1} readonly/>
                                                            </div>
                                                        </div>
                                                    }
                                                    containerProps={{
                                                        className: "",
                                                    }}
                                                />
                                            </div>
                                            {/*<div className="mt-2.5 flex flex-col items-start justify-center gap-1">*/}
                                            {/*    <Text size="textlg" as="p"*/}
                                            {/*          className="text-[15px] font-normal text-blue_gray-900_01">*/}
                                            {/*        Xem thêm*/}
                                            {/*    </Text>*/}
                                            {/*    <div className="h-[2px] w-[32px] bg-blue_gray-900_01"/>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="h-px bg-gray-200"/>
                                    </div>
                                </div>
                                {/*<div className="flex flex-col gap-5">*/}
                                {/*    <div className="flex items-center justify-between gap-5">*/}
                                {/*        <Heading as="h3" className="text-[18px] font-medium text-blue_gray-900_01">*/}
                                {/*            Lọc theo vị trí*/}
                                {/*        </Heading>*/}
                                {/*        <div className="h-px w-[20px] bg-blue_gray-900_01"/>*/}
                                {/*    </div>*/}
                                {/*    <div className="flex flex-col gap-2.5">*/}
                                {/*        <InputDH*/}
                                {/*            shape="round"*/}
                                {/*            name="Country Field"*/}
                                {/*            placeholder={`Quốc gia`}*/}
                                {/*            suffix={*/}
                                {/*                <div className="flex h-[4px] w-[10px] items-center justify-center">*/}
                                {/*                    <Img src="images/img_vector.svg" alt="Vector"*/}
                                {/*                         className="my-1 h-[8px] w-[10px]"/>*/}
                                {/*                </div>*/}
                                {/*            }*/}
                                {/*            className="gap-4 rounded-md border px-[18px]"*/}
                                {/*        />*/}
                                {/*        <InputDH*/}
                                {/*            shape="round"*/}
                                {/*            name="City Field"*/}
                                {/*            placeholder={`Tỉnh/ Thành phố`}*/}
                                {/*            suffix={*/}
                                {/*                <div className="flex h-[4px] w-[10px] items-center justify-center">*/}
                                {/*                    <Img src="images/img_vector.svg" alt="Vector"*/}
                                {/*                         className="my-1 h-[8px] w-[10px]"/>*/}
                                {/*                </div>*/}
                                {/*            }*/}
                                {/*            className="gap-4 rounded-md border px-[18px]"*/}
                                {/*        />*/}
                                {/*        <InputDH*/}
                                {/*            shape="round"*/}
                                {/*            name="District Field"*/}
                                {/*            placeholder={`Quận/ Huyện`}*/}
                                {/*            suffix={*/}
                                {/*                <div className="flex h-[4px] w-[10px] items-center justify-center">*/}
                                {/*                    <Img src="images/img_vector.svg" alt="Vector"*/}
                                {/*                         className="my-1 h-[8px] w-[10px]"/>*/}
                                {/*                </div>*/}
                                {/*            }*/}
                                {/*            className="gap-4 rounded-md border px-[18px]"*/}
                                {/*        />*/}
                                {/*        <InputDH*/}
                                {/*            shape="round"*/}
                                {/*            name="Zip Code Field"*/}
                                {/*            placeholder={`Mã vùng`}*/}
                                {/*            className="rounded-md border px-5"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >

                            <div className="flex flex-1 flex-col gap-[26px] self-center md:self-stretch">
                                <Heading
                                    size="text5xl"
                                    as="h1"
                                    className="mr-[414px] text-[28px] font-medium text-blue_gray-900_01 md:mr-0 md:text-[26px] sm:text-[24px]"
                                >
                                    Danh sách seller đấu giá
                                </Heading>
                                <div className="flex">
                                    <div className="flex flex-1">
                                        <Text size="textlg" as="p"
                                              className="text-[15px] font-normal text-blue_gray-900_01">
                                            Hiển thị 1–20 của 175 kết quả
                                        </Text>
                                    </div>
                                    <SelectBox
                                        shape="square"
                                        indicator={<Img src="images/img_vector.svg" alt="Vector"
                                                        className="h-[6px] w-[8px]"/>}
                                        name="Default Dropdown"
                                        placeholder={`Lọc mặc định`}
                                        options={dropDownOptions}
                                        className="w-[12%] gap-2 font-medium text-blue_gray-900_01"
                                    />
                                </div>
                                <div className="grid grid-cols-3 justify-center gap-7 md:grid-cols-2 sm:grid-cols-1">
                                    <Suspense fallback={<div>Loading feed...</div>}>
                                        {storeDetailsGrid.map((d, index) => (
                                            <StoreProfile {...d} key={"itemsGrid" + index}/>
                                        ))}
                                    </Suspense>
                                </div>

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































