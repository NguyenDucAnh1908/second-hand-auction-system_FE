import { Helmet } from "react-helmet";
import { Img, Text, Heading, SelectBox, InputDH } from "../../components";
import StoreProfile from "../../components/StoreProfile";
import React, { Suspense } from "react";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK/index.jsx";




const storeDetailsGrid = [
    {
        storeImage: "images/img_beautiful_young.png",
        storeName: "Apple Store",
        sellerReviews: "965 seller reviews",
        storeDescription: (
            <>
                1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                <br />
                sale@zenmart.com
                <br />
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
                <br />
                sale@zenmart.com
                <br />
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
                <br />
                sale@zenmart.com
                <br />
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
                <br />
                sale@zenmart.com
                <br />
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
                <br />
                sale@zenmart.com
                <br />
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
                <br />
                sale@zenmart.com
                <br />
                +3 8493 92 932 021
            </>
        ),
        viewStoreButtonText: "Xem cửa hàng",
    },
];
const dropDownOptions = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
    { label: "Option3", value: "option3" },
];


export default function ListOfSellerPage() {
    return (
        <>
            <Helmet>
                <title>Comprehensive Seller List - Find Top-Rated Sellers on EZShop</title>
                <meta
                    name="description"
                    content="Explore our extensive list of sellers and find the best deals across categories like electronics, home & kitchen, and fashion. Filter by location and category for tailored results."
                />
            </Helmet>
            <Header2/>
            <div className="flex w-full flex-col items-center gap-[142px] bg-bg-white md:gap-[106px] sm:gap-[71px]">
                <div className="mx-auto mt-[188px] w-full max-w-[1290px] self-stretch md:px-5">
                    <div className="flex flex-wrap">
                        <Text as="p" className="text-[14px] font-normal text-blue_gray-900_01">
                            Trang chủ
                        </Text>
                        <Text as="p" className="ml-1.5 text-[14px] font-normal text-blue_gray-900_01">
                            /{" "}
                        </Text>
                        <Text as="p" className="ml-1.5 text-[14px] font-normal text-blue_gray-600">
                            Danh sách seller
                        </Text>
                    </div>
                    <div className="flex flex-col items-end gap-3.5">
                        <Heading
                            size="text5xl"
                            as="h1"
                            className="mr-[414px] text-[28px] font-medium text-blue_gray-900_01 md:mr-0 md:text-[26px] sm:text-[24px]"
                        >
                            Danh sách seller đấu giá
                        </Heading>
                        <div className="flex items-start justify-end gap-2.5 self-stretch md:flex-col">
                            <div className="flex w-[22%] flex-col gap-5 md:w-full">
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center justify-between gap-5">
                                        <Heading as="h2" className="text-[18px] font-medium text-blue_gray-900_01">
                                            Lọc theo danh mục
                                        </Heading>
                                        <div className="h-px w-[20px] bg-blue_gray-900_01" />
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <div className="flex rounded-md border border-solid border-gray-200 bg-bg-white px-5 py-3">
                                                <Text size="textlg" as="p" className="text-[15px] font-normal text-blue_gray-900_01">
                                                    Tìm kiếm
                                                </Text>
                                            </div>
                                            <div className="mt-5">
                                                <div className="flex items-center justify-center">
                                                    <div className="flex w-[8%] flex-col gap-3.5">
                                                        <div className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01" />
                                                        <Img src="images/img_checkmark_green_a700.svg" alt="Checkmark Image" className="h-[16px]" />
                                                        <div className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01" />
                                                        <div className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01" />
                                                        <div className="h-[16px] w-[22px] rounded border border-solid border-blue_gray-900_01" />
                                                    </div>
                                                    <Text
                                                        size="textlg"
                                                        as="p"
                                                        className="ml-3 font-bevietnampro text-[15px] font-normal leading-[30px] text-blue_gray-900_01"
                                                    >
                                                        <span className="text-blue_gray-900_01">
                                                            <>
                                                                Đang giảm giá
                                                                <br />
                                                            </>
                                                        </span>
                                                        <span className="text-green-a700">
                                                            <>
                                                                Nhà & Bếp
                                                                <br />
                                                            </>
                                                        </span>
                                                        <span className="text-blue_gray-900_01">
                                                            <>
                                                                Nhà & Nội thất
                                                                <br />
                                                            </>
                                                        </span>
                                                        <span className="text-blue_gray-900_01">
                                                            <>
                                                                Điện tử
                                                                <br />
                                                            </>
                                                        </span>
                                                        <span className="text-blue_gray-900_01">Quần áo & Phụ kiện</span>
                                                    </Text>
                                                    <Text
                                                        size="texts"
                                                        as="p"
                                                        className="ml-[26px] w-[12%] text-right text-[13px] font-normal leading-[30px] text-blue_gray-900_01"
                                                    >
                                                        <>
                                                            87
                                                            <br />
                                                            92
                                                            <br />
                                                            123
                                                            <br />
                                                            49
                                                            <br />
                                                            12
                                                        </>
                                                    </Text>
                                                </div>
                                            </div>
                                            <div className="mt-2.5 flex flex-col items-start justify-center gap-1">
                                                <Text size="textlg" as="p" className="text-[15px] font-normal text-blue_gray-900_01">
                                                    Xem thêm
                                                </Text>
                                                <div className="h-[2px] w-[32px] bg-blue_gray-900_01" />
                                            </div>
                                        </div>
                                        <div className="h-px bg-gray-200" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center justify-between gap-5">
                                        <Heading as="h3" className="text-[18px] font-medium text-blue_gray-900_01">
                                            Lọc theo vị trí
                                        </Heading>
                                        <div className="h-px w-[20px] bg-blue_gray-900_01" />
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <InputDH
                                            shape="round"
                                            name="Country Field"
                                            placeholder={`Quốc gia`}
                                            suffix={
                                                <div className="flex h-[4px] w-[10px] items-center justify-center">
                                                    <Img src="images/img_vector.svg" alt="Vector" className="my-1 h-[8px] w-[10px]" />
                                                </div>
                                            }
                                            className="gap-4 rounded-md border px-[18px]"
                                        />
                                        <InputDH
                                            shape="round"
                                            name="City Field"
                                            placeholder={`Tỉnh/ Thành phố`}
                                            suffix={
                                                <div className="flex h-[4px] w-[10px] items-center justify-center">
                                                    <Img src="images/img_vector.svg" alt="Vector" className="my-1 h-[8px] w-[10px]" />
                                                </div>
                                            }
                                            className="gap-4 rounded-md border px-[18px]"
                                        />
                                        <InputDH
                                            shape="round"
                                            name="District Field"
                                            placeholder={`Quận/ Huyện`}
                                            suffix={
                                                <div className="flex h-[4px] w-[10px] items-center justify-center">
                                                    <Img src="images/img_vector.svg" alt="Vector" className="my-1 h-[8px] w-[10px]" />
                                                </div>
                                            }
                                            className="gap-4 rounded-md border px-[18px]"
                                        />
                                        <InputDH
                                            shape="round"
                                            name="Zip Code Field"
                                            placeholder={`Mã vùng`}
                                            className="rounded-md border px-5"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-[26px] self-center md:self-stretch">
                                <div className="flex">
                                    <div className="flex flex-1">
                                        <Text size="textlg" as="p" className="text-[15px] font-normal text-blue_gray-900_01">
                                            Hiển thị 1–20 của 175 kết quả
                                        </Text>
                                    </div>
                                    <SelectBox
                                        shape="square"
                                        indicator={<Img src="images/img_vector.svg" alt="Vector" className="h-[6px] w-[8px]" />}
                                        name="Default Dropdown"
                                        placeholder={`Lọc mặc định`}
                                        options={dropDownOptions}
                                        className="w-[12%] gap-2 font-medium text-blue_gray-900_01"
                                    />
                                </div>
                                <div className="grid grid-cols-3 justify-center gap-7 md:grid-cols-2 sm:grid-cols-1">
                                    <Suspense fallback={<div>Loading feed...</div>}>
                                        {storeDetailsGrid.map((d, index) => (
                                            <StoreProfile {...d} key={"itemsGrid" + index} />
                                        ))}
                                    </Suspense>
                                </div>
                           
                            </div>
                        </div>
                    </div>
                   
                </div>
             
            </div>
            <div className="mt-[19px] self-stretch">
            <FooterBK />
          </div>
        </>
    );
}































