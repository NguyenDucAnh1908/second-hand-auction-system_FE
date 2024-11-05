import { Helmet } from "react-helmet";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Banner from '../../../partials/Banner';
import {
    ButtonDH,
    Img,
    Text,
    Heading,
    SelectBox,
    InputDH,
    TextArea,
} from "../../../components";
import React, { useEffect, useRef, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload, InputNumber, Image, Breadcrumb, Layout, Menu, theme, Spin } from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import { useRegisterItemMutation } from "@/services/item.service.js";
import { toast } from "react-toastify";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import { useGetAuctionTypeQuery } from "@/services/auctionType.service.js";
import { useGetCategoriesQuery } from "@/services/category.service.js";

const { Content, Sider } = Layout;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

function RegisterProductPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [manufactureDate, setManufactureDate] = useState(null);
    const [value, setValue] = React.useState(0);
    const [valueInput, setValueInput] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f',
        }
    ]);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCondition, setItemCondition] = useState("NEW");
    const [brandName, setBrandName] = useState("");
    const [imgItem, setImgItem] = useState([]);
    const [itemSpecific, setItemSpecific] = useState({
        color: '',
        weight: 0,
        percent: 0,
        original: '',
        dimension: '',
        manufacture_date: null,
        material: '',
        price_buy_now: 0,
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [scId, setScId] = useState(0);
    const [auctionType, setAuctionType] = useState(null);
    const userRef = useRef();
    const errRef = useRef();
    const { UploadImage } = useHookUploadImage();
    const {
        data: auctionTypes,
        error: errorAuctionType,
        isLoading: isloadingAuctionType,
    } = useGetAuctionTypeQuery()
    // console.log("DATA AUCTION TYPE: ", auctionTypes)
    const {
        data: categories,
        error: errorCategories,
        isLoading: isloadingCategories,
    } = useGetCategoriesQuery();
    // console.log("DATA CATEGORIES: ", categories)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const handleImgUpload = () => {
        console.log("File List:", fileList); // Kiểm tra giá trị của fileList
    
        if (fileList.length === 0) {
            console.log("No files uploaded.");
            return;
        }
        const images = fileList.map(file => ({ image_url: file.url })); 
        setImgItem(images);
    };
    
    
    
    const handleAuctionTypeChange = (value) => {
        console.log("Selected auction type:", value); 
        setAuctionType(value);
    };
    const handleItemSpecificChange = (field, value) => {
        setItemSpecific((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [registerItem, { isLoading, isSuccess, isError, error }] = useRegisterItemMutation();

    const handleSubmit = async (e) => {
        handleImgUpload();  // Ensure images are prepared

        const payload = {

            item_name: itemName,
            item_description: itemDescription,
            item_condition: itemCondition,
            brand_name: brandName,
            img_item: imgItem,
            item_specific: { ...itemSpecific, manufacture_date: manufactureDate },
            sc_id: scId,
            auction_type: auctionType,
        };
        console.log("loi", {
            itemName,
            itemDescription,
            itemCondition,
            brandName,
            imgItem,
            itemSpecific,
            scId,
            auctionType
        });
        try {
            const userData = await registerItem(payload).unwrap();
            toast.success(userData.message);
            console.log("ketquar",userData.message);
        } catch (err) {
            const errorMessage = err?.data?.message || 'Error registering item';
            toast.error(errorMessage);
            console.log("ketquar",errorMessage);

        }
    };


    useEffect(() => {
        console.log("Selected Category: ", selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            setSelectedSubCategory(null); // Reset subcategory khi thay đổi category
            setScId(1); // Reset scId khi thay đổi category
        }
    }, [selectedCategory]);


    // Lọc subcategories dựa trên selectedCategory
    const filteredSubCategories = categories?.find(
        (category) => category.categoryId === selectedCategory
    )?.subCategory || [];

    return (
        <>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
                            <Sidebar />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                            }}
                        >
                            <div className="">
                                <div className="flex items-start md:flex-col">
                                    <div
                                        className="mt-3.5 flex flex-1 flex-col gap-16 self-center md:self-stretch sm:gap-8">
                                        <div className="ml-10 md:ml-0">
                                            <div className="flex flex-col items-start gap-4">
                                                <Heading
                                                    size="text2xl"
                                                    as="h1"
                                                    className="text-[30px] font-medium text-black-900 md:ml-0 md:text-[28px] sm:text-[26px]"
                                                >
                                                    Đăng kí sản phẩm
                                                </Heading>

                                                <div className="flex gap-[30px] self-stretch md:flex-col">
                                                    <div className="flex flex-1 flex-col gap-[34px] md:self-stretch">
                                                        <div
                                                            className=" flex flex-col items-start justify-center gap-1.5 md:mx-0">
                                                            <Heading
                                                                as="h4"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Tên sản phẩm
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Product Name Field"
                                                                placeholder={`Tên sản phẩm sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                type="text"
                                                                value={itemName}
                                                                onChange={(e) => setItemName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1 md:mx-0">
                                                            <Heading
                                                                as="h5"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Tên thương hiệu
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Brand Name Field"
                                                                placeholder={`Tiêu đề thương hiệu`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                type="text"
                                                                value={brandName}
                                                                onChange={(e) => setBrandName(e.target.value)}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-[18px]">
                                                            <Heading
                                                                as="h6"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Mô tả
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"

                                                                name="Description Area"
                                                                placeholder={`Mô tả`}
                                                                className="w-[88%] rounded-md !border !border-gray-200 px-5 font-jost leading-[10px] text-blue_gray-600"
                                                                value={itemDescription}
                                                                onChange={(e) => setItemDescription(e.target.value)}
                                                            />

                                                        </div>
                                                    </div>

                                                    <div className="flex w-[47.1%] flex-col items-start md:w-full">
                                                        <Heading
                                                            as="p"
                                                            className="ml-3 font-jost text-[16px] font-medium text-black-900 md:ml-0"
                                                        >
                                                            Hình ảnh sản phẩm
                                                        </Heading>
                                                        <div
                                                            className="mr-1.5 mt-2 flex flex-col items-start gap-5 self-stretch rounded-[20px] bg-blue-200 px-[52px] py-[30px] md:mr-0 md:px-5 sm:p-5">
                                                            <>
                                                                <Upload
                                                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                                                    listType="picture-card"
                                                                    fileList={fileList}
                                                                    onPreview={handlePreview}
                                                                    onChange={handleChange}
                                                                >
                                                                    {fileList.length >= 8 ? null : uploadButton}
                                                                </Upload>
                                                                {previewImage && (
                                                                    <Image
                                                                        wrapperStyle={{
                                                                            display: 'none',
                                                                        }}
                                                                        preview={{
                                                                            visible: previewOpen,
                                                                            onVisibleChange: (visible) => setPreviewOpen(visible),
                                                                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                                        }}
                                                                        src={previewImage}
                                                                    />
                                                                )}
                                                            </>
                                                        </div>
                                                        <div
                                                            className="mt-11 flex flex-col items-start gap-1.5 self-stretch">
                                                            <Heading
                                                                as="p"
                                                                className="ml-3 font-jost text-[16px] font-medium text-black-900 md:ml-0"
                                                            >
                                                                Import file
                                                            </Heading>
                                                            <div
                                                                className="flex items-center gap-[21px] self-stretch rounded-[20px] bg-blue-200_01 px-7 py-1.5 sm:px-5">
                                                                <Upload {...props}>
                                                                    <Button icon={<UploadOutlined />}>Click to
                                                                        Upload</Button>
                                                                </Upload>
                                                                <Heading
                                                                    as="p"
                                                                    className="font-jost text-[16px] font-medium text-black-900"
                                                                >
                                                                    Giấy tờ liên quan đến sản phẩm
                                                                </Heading>
                                                            </div>
                                                        </div>
                                                        <div className="mt-[2px] flex flex-col gap-3 self-stretch ">
                                                            <div
                                                                className="flex flex-col items-start justify-center gap-1 w-[50%] bg-white">
                                                                <Heading as="p"
                                                                    className="font-jost text-[16px] font-medium">
                                                                    Auction type
                                                                </Heading>
                                                                <div className="w-72 mt-4">
                                                                    <Select
                                                                        label="Auction type"
                                                                        value={auctionType}
                                                                        onChange={handleAuctionTypeChange}
                                                                    >
                                                                        {isloadingAuctionType ? (
                                                                            <Option disabled>
                                                                                <Spin /> {/* Spinner shown while loading */}
                                                                            </Option>
                                                                        ) : errorAuctionType ? (
                                                                            <Option disabled>Error loading types</Option>
                                                                        ) : (
                                                                            auctionTypes?.map((type) => (
                                                                                <Option key={type.auction_type_id} value={type.auction_type_id}>
                                                                                    {type.auction_type_name}
                                                                                </Option>
                                                                            ))
                                                                        )}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-6">
                                                                {/* Danh mục chọn */}
                                                                <div
                                                                    className="flex flex-col items-start justify-center gap-1 w-[50%] bg-white">
                                                                    <Heading as="p" className="font-jost text-[16px] font-medium">
                                                                        Danh mục
                                                                    </Heading>
                                                                    <div className="w-72 mt-4 text-black">
                                                                        <Select
                                                                            value={selectedCategory || undefined}
                                                                            onChange={(value) => {
                                                                                console.log("Selected Category ID:", value); // Kiểm tra giá trị đã chọn
                                                                                setSelectedCategory(value);
                                                                                setSelectedSubCategory(null);
                                                                            }}
                                                                            placeholder="Chọn danh mục"
                                                                            loading={isloadingCategories}
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            {isloadingCategories ? (
                                                                                <Select.Option disabled>
                                                                                    <Spin />
                                                                                </Select.Option>
                                                                            ) : errorCategories ? (
                                                                                <Select.Option disabled>Error loading categories</Select.Option>
                                                                            ) : (
                                                                                categories?.map((category) => (
                                                                                    <Select.Option key={category.categoryId} value={category.categoryId}>
                                                                                        {category.categoryName}
                                                                                    </Select.Option>
                                                                                ))
                                                                            )}
                                                                        </Select>
                                                                    </div>
                                                                </div>


                                                                <div
                                                                    className="flex flex-col items-start justify-center gap-1 w-[50%] bg-white">
                                                                    <Heading as="p"
                                                                        className="font-jost text-[16px] font-medium">
                                                                        Danh mục phụ
                                                                    </Heading>
                                                                    <div className="w-72 mt-4">
                                                                        <Select
                                                                            value={selectedSubCategory || undefined} // Gán giá trị mặc định nếu có
                                                                            onChange={(value) => {
                                                                                setSelectedSubCategory(value);
                                                                            }}
                                                                            placeholder="Chọn danh mục phụ"
                                                                            disabled={!selectedCategory} // Vô hiệu hóa nếu không có danh mục nào được chọn
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            {filteredSubCategories.map((subCategory) => (
                                                                                <Option key={subCategory.scId}
                                                                                    value={subCategory.scId}>
                                                                                    {subCategory.sub_category}
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex flex-col items-start justify-center gap-1 w-[50%]">
                                                                <Heading
                                                                    as="p"
                                                                    className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                                >
                                                                    Trình trạng
                                                                </Heading>
                                                                <div className="flex flex-col items-start justify-center gap-1 w-[50%]">
                                                                    <Heading
                                                                        as="p"
                                                                        className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                                    >
                                                                    </Heading>
                                                                    <div className="w-72 mt-4">
                                                                        <Select
                                                                            label="Trình trạng"
                                                                            value={itemCondition} // Truyền giá trị mặc định từ state
                                                                            onChange={(value) => setItemCondition(value)} // Cập nhật state khi thay đổi
                                                                        >
                                                                            <Option value="AVAILABLE">AVAILABLE</Option>
                                                                            <Option value="DAMAGED">DAMAGED</Option>
                                                                            <Option value="NEW">NEW</Option>
                                                                            <Option value="USED_GOOD">USED_GOOD</Option>
                                                                            <Option value="USED_FAIR">USED_FAIR</Option>
                                                                            <Option value="REFURBISHED">REFURBISHED</Option>
                                                                        </Select>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className=" md:ml-0">
                                            <div className="flex flex-col  gap-12">
                                                <Heading
                                                    size="textxl"
                                                    as="p"
                                                    className="bg-green-a700_01 px-[34px] pb-1.5 pt-0.5 text-[25px] font-medium text-bg-white md:text-[23px] sm:px-5 sm:text-[21px]"
                                                >
                                                    Thông tin chi tiết của sản phẩm
                                                </Heading>
                                                <div
                                                    className="ml-7 flex items-center self-stretch md:ml-0 md:flex-col">
                                                    <div className="flex w-full flex-col gap-[26px]">
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Màu sắc
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Color Field"
                                                                placeholder={`Màu sắc sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.color}
                                                                onChange={(e) => handleItemSpecificChange('color', e.target.value)}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Kích thước
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Color Field"
                                                                placeholder={`Kích thước sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.dimension}
                                                                onChange={(e) => handleItemSpecificChange('dimension', e.target.value)}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Loại
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Color Field"
                                                                placeholder={`type sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.type}
                                                                onChange={(e) => handleItemSpecificChange('type', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col items-start justify-center gap-1">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Khối lượng
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Weight Field"
                                                                placeholder={`Khối lượng sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.weight}
                                                                onChange={(e) => handleItemSpecificChange('weight', parseFloat(e.target.value))}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Original
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Color Field"
                                                                placeholder={`original sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.original}
                                                                onChange={(e) => handleItemSpecificChange('original', e.target.value)}
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Chất liệu
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Color Field"
                                                                placeholder={`material sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.material}
                                                                onChange={(e) => handleItemSpecificChange('material', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col items-start justify-center gap-1.5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Giá mua ngay
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Price Field"
                                                                placeholder="Giá mua ngay"
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                                value={itemSpecific.price_buy_now}
                                                                onChange={(e) => handleItemSpecificChange('price', e.target.value)}

                                                            />
                                                        </div>

                                                        <div>
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Phần trăm
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Percentage Field"
                                                                placeholder={`Phần trăm giá trị sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                            />
                                                            <div>
                                                            </div>
                                                        </div>

                                                        {/*<div*/}
                                                        {/*    className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">*/}
                                                        {/*    <Heading*/}
                                                        {/*        as="p"*/}
                                                        {/*        className="font-jost text-[16px] font-medium text-blue_gray-900"*/}
                                                        {/*    >*/}
                                                        {/*        Giá trị định giá*/}
                                                        {/*    </Heading>*/}
                                                        {/*    <InputNumber min={1} addonBefore="+" addonAfter="VND"*/}
                                                        {/*                 defaultValue={100}/>*/}
                                                        {/*</div>*/}
                                                        <div
                                                            className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Giá trị định giá
                                                            </Heading>
                                                            <InputNumber
                                                                min={1}
                                                                addonBefore="+"
                                                                addonAfter="%"
                                                                value={itemSpecific.percent} // Bind value to percent
                                                                onChange={(value) => handleItemSpecificChange('percent', value)} // Handle change
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div
                                                            className="flex flex-col w-[88%] items-start justify-center gap-1 md:w-full mt-5">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Ngày sản xuất
                                                            </Heading>
                                                            <div className="w-full">
                                                                {/*<DatePicker*/}
                                                                {/*    selected={manufactureDate} // Sử dụng state manufactureDate*/}
                                                                {/*    onChange={(date) => setManufactureDate(date)} // Cập nhật state khi chọn ngày*/}
                                                                {/*    placeholderText="Chọn ngày sản xuất" // Placeholder*/}
                                                                {/*    className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost w-full"*/}
                                                                {/*    dateFormat="dd/MM/yyyy" // Định dạng ngày*/}
                                                                {/*    popperPlacement="bottom" // Đặt vị trí của popper (lịch) nếu cần*/}
                                                                {/*    isClearable // Cho phép xóa ngày đã chọn*/}
                                                                {/*/>*/}
                                                                <DatePicker
                                                                    selected={itemSpecific.manufacture_date}
                                                                    onChange={(date) => handleItemSpecificChange('manufacture_date', date)}
                                                                    placeholderText="Chọn ngày sản xuất"
                                                                    className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost w-full"
                                                                    dateFormat="dd/MM/yyyy"
                                                                    popperPlacement="bottom"
                                                                    isClearable
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" md:ml-0">
                                            <div className="flex flex-col items-center gap-[62px] sm:gap-[31px]">
                                                <div className="flex flex-col items-center self-stretch">
                                                    <Heading
                                                        size="textxl"
                                                        as="p"
                                                        className="bg-green-a700_01 px-[34px] pt-2 text-[25px] font-medium text-bg-white md:text-[23px] sm:px-5 sm:text-[21px]"
                                                    >
                                                        Chính sách của hệ thống
                                                    </Heading>

                                                    <div
                                                        className="mt-9 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <input
                                                            type="checkbox"
                                                            id="policyOne"
                                                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                                                        />
                                                        <label
                                                            htmlFor="policyOne"
                                                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                                                        >
                                                            Tôi cam kết rằng mọi thông tin cá nhân và dữ liệu liên quan
                                                            đến sản phẩm của tôi sẽ được bảo mật và không bị tiết lộ cho
                                                            bên thứ ba mà không có sự đồng ý của tôi.
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="mt-2 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <input
                                                            type="checkbox"
                                                            id="policyTwo"
                                                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                                                        />
                                                        <label
                                                            htmlFor="policyTwo"
                                                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                                                        >
                                                            Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả sản
                                                            phẩm mà tôi cung cấp là chính xác, đầy đủ và không gây hiểu
                                                            nhầm cho người mua. Tôi sẽ chịu trách nhiệm về tính chính
                                                            xác của thông tin này.
                                                        </label>
                                                    </div>

                                                    <div
                                                        className="mt-6 flex items-center justify-center gap-3 self-stretch md:flex-col">
                                                        <input
                                                            type="checkbox"
                                                            id="policyThree"
                                                            className="h-[15px] w-[15px] md:w-full" // Kích thước checkbox
                                                        />
                                                        <label
                                                            htmlFor="policyThree"
                                                            className="w-[96%] text-[14px] font-normal leading-[150%] text-black-900 md:w-full"
                                                        >
                                                            Tôi cam kết tuân thủ tất cả các quy định và điều khoản mà hệ
                                                            thống đặt ra, bao gồm nhưng không giới hạn ở quy trình đăng
                                                            bán, thẩm định sản phẩm và quy trình giao dịch.
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="flex w-[38%] justify-between gap-5 md:w-full">
                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-green-500 text-white hover:bg-green-600"
                                                        onClick={() => handleSubmit()}
                                                    >
                                                        Gửi thẩm định
                                                    </ButtonDH>

                                                    {/* Hiển thị trạng thái */}
                                                    {isLoading && <p>Creating item...</p>}
                                                    {isSuccess && <p>Item created successfully!</p>}
                                                    {isError && <p>Error: {error.message}</p>}

                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-red-500 text-white hover:bg-red-600"
                                                        onClick={() => {
                                                            // Hàm hủy bỏ hoặc reset dữ liệu nếu cần
                                                        }}
                                                    >
                                                        Hủy bỏ
                                                    </ButtonDH>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Content >
                <FooterBK />
            </Layout >
        </>
    );
}

export default RegisterProductPage;


