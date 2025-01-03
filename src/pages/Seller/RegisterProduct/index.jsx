import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import {ButtonDH, Heading, TextArea,} from "../../../components";
import React, {useEffect, useRef, useState} from "react";
import {Option, Select} from "@material-tailwind/react";
import {PlusOutlined} from '@ant-design/icons';
import {
    Breadcrumb,
    Checkbox,
    Descriptions,
    Image,
    Input,
    Layout,
    message,
    Space,
    Spin,
    theme,
    Typography,
    Upload
} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import {useRegisterItemMutation} from "@/services/item.service.js";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import {useGetAuctionTypeQuery} from "@/services/auctionType.service.js";
import {useGetCategoriesQuery} from "@/services/category.service.js";
import TextEditor from "@/components/TextEditor/index.jsx";
import {useNavigate} from "react-router-dom";

const {Text, Link} = Typography;
const {Content, Sider} = Layout;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function RegisterProductPage() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [itemName, setItemName] = useState("");
    const [priceBuyNow, setPriceBuyNow] = useState(0);
    const [priceStepItem, setPriceStepItem] = useState(0);
    const [itemDescription, setItemDescription] = useState("");
    const [itemDocument,setItemDocument] = useState("");
    const [itemCondition, setItemCondition] = useState("NEW");
    const [imgItem, setImgItem] = useState([]);
    const [file, setFile] = useState(null);

    const [itemNameError, setItemNameError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [scId, setScId] = useState(0);
    const [auctionType, setAuctionType] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [FileUpload,setFileUpload] = useState(null);
    // const [spinning, setSpinning] = React.useState(false);
    // const [percent, setPercent] = React.useState(0);
    const [spinning, setSpinning] = React.useState(false);
    const [percent, setPercent] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);
    const [priceError, setPriceError] = useState("");
    const [priceStepError, setPriceStepError] = useState("");

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const {UploadImage} = useHookUploadImage();
    const {
        data: auctionTypes,
        error: errorAuctionType,
        isLoading: isloadingAuctionType,
    } = useGetAuctionTypeQuery()

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
    const handleChange = ({fileList: newFileList}) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined/>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const validateItemName = (name) => {
        if (!name) {
            return "Tên sản phẩm không được để trống.";
        }
        if (name.length < 3 || name.length > 50) {
            return "Tên sản phẩm phải có từ 3 đến 50 ký tự.";
        }
        return "";
    };

    const handleItemNameChange = (e) => {
        const name = e.target.value;
        setItemName(name);
        setItemNameError(validateItemName(name)); // Kiểm tra ngay khi nhập
    };



    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (!/^\d*\.?\d+$/.test(value) || parseFloat(value) <= 0) {
            setPriceError("Giá mua ngay phải là số dương hợp lệ.");
        }
        else if (parseFloat(value) > 10000000000) {
            setPriceError("Giá mua ngay không được vượt quá 2 tỷ.");
        }
        else {
            setPriceError("");
        }
        setPriceBuyNow(value);
    };

    const handlePriceStep = (e) => {
        const value = e.target.value;
        if (!/^\d*\.?\d+$/.test(value) || parseFloat(value) <= 0) {
            setPriceStepError("Giá mua ngay phải là số dương hợp lệ.");
        }
        else if (parseFloat(value) > 100000000) {
            setPriceStepError("Giá mua ngay không được vượt quá 100 triệu.");
        }
        else {
            setPriceStepError("");
        }
        setPriceStepItem(value);
    };




    const handleDescriptionChange = (value) => {
        setItemDescription(value);
        // Validate: Kiểm tra độ dài mô tả
        if (value.length < 20) {
            setDescriptionError("Mô tả sản phẩm phải ít nhất 20 ký tự.");
        } else if (value.length >= 10000) {
            setDescriptionError("Mô tả sản phẩm không được vượt quá 10000 ký tự.");
        } else {
            setDescriptionError("");
        }
    };

    const handleImgUpload = async () => {
        if (fileList.length === 0) {
            message.warning("No files uploaded.");
            return [];
        }

        const uploadedImages = [];
        for (const file of fileList) {
            if (file.originFileObj) {
                try {
                    const imageUrl = await UploadImage(file.originFileObj); // Upload and get URL
                    uploadedImages.push({image_url: imageUrl});
                } catch (err) {
                    console.error("Error uploading image:", err);
                    message.error("Error uploading an image.");
                }
            } else {
                console.error("File is missing originFileObj:", file);
                message.warning("File is missing originFileObj.");
            }
        }

        if (uploadedImages.length === 0) {
            message.error("No images were uploaded successfully.");
        }

        return uploadedImages;
    };

    const handleFileItemChange = (event) => {
        const file = event.target.files[0];
        console.log("File",file);
        if (file) {
            setItemDocument(file.name);
            setFileUpload(file)// Cập nhật tên file vào state
        }
    };
    const handleAuctionTypeChange = (value) => {
        console.log("Selected auction type:", value);
        setAuctionType(value);
    };


    const [registerItem, {isLoading, isSuccess, isError, error}] = useRegisterItemMutation();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Bật loader ngay từ đầu
        showLoader();

        const uploadedImages = await handleImgUpload(); // Bắt đầu upload hình
        if (uploadedImages.length === 0) {
            message.error("Please upload at least one image.");
            setSpinning(false); // Tắt loader nếu không có ảnh upload thành công
            return;
        }

        const fileUrl = await UploadImage(FileUpload);
        if(!fileUrl ){
            message.error("Lỗi upload file");
        }

        const payload = {
            item_name: itemName,
            item_description: itemDescription,
            item_condition: itemCondition,
            price_buy_now: priceBuyNow,
            price_step_item: priceStepItem,
            img_item: uploadedImages,
            item_document:fileUrl,
            sc_id: scId,
            auction_type: auctionType,
        };

        console.log(payload);
        try {
            const userData = await registerItem(payload).unwrap();
            message.success(userData.message);
            navigate("/Dashboard-seller/ListOfSellerProduct");
            // console.log("Kết quả:", userData.message);
        } catch (err) {
            const errorMessage = err?.data?.message || "Lỗi đăng ký sản phẩm";
            message.error(errorMessage);
            //console.log("Kết quả lỗi:", errorMessage);
        } finally {
            setSpinning(false); // Tắt loader sau khi hoàn tất
            setPercent(0);
        }
    };


    useEffect(() => {
        //console.log("Selected Category: ", selectedCategory);
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

    const showLoader = () => {
        setSpinning(true);
        let ptg = -10;
        const id = setInterval(() => {
            // Nếu cả hai process (upload và gọi API) đã hoàn tất, dừng loader
            if (!isLoading && percent >= 100) {
                clearInterval(id);
                setTimeout(() => {
                    setSpinning(false);
                    setPercent(0);
                }, 500);
                return;
            }
            // Tiến độ loading tăng dần
            ptg += 5;
            setPercent(ptg);
            if (ptg > 100) {
                ptg = 0;
            }
        }, 200);
        setIntervalId(id);
    };

    React.useEffect(() => {
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };


    const items = [
        {
            key: '1',
            label: <label className="font-bold">Tên sản phẩm</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        placeholder="Nhập tên sản phẩm"
                        value={itemName}
                        onChange={handleItemNameChange}
                        status={itemNameError ? 'error' : ''}
                        className={`rounded-md border p-3 w-full ${itemNameError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {itemNameError && (
                        <Text type="danger" className="text-red-500">{itemNameError}</Text>
                    )}
                </div>
            ),
        },
        {
            key: '2',
            label: <label className="font-bold">Giá mong muốn</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập giá mua ngay"
                        value={priceBuyNow}
                        onChange={handlePriceChange}
                        status={priceError ? 'error' : ''}
                        className={`rounded-md border p-3 w-full ${priceError ? 'border-red-500' : 'border-gray-300'}`}
                        suffix="VND"
                    />
                    {priceError && (
                        <Text type="danger" className="text-red-500">{priceError}</Text>
                    )}
                </div>
            ),
        },
        {
            key: '3',
            label: <label className="font-bold">Bước giá mong muốn</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập bước giá mong muốn"
                        value={priceStepItem}
                        onChange={handlePriceStep}
                        status={priceStepError ? 'error' : ''}
                        className={`rounded-md border p-3 w-full ${priceStepError ? 'border-red-500' : 'border-gray-300'}`}
                        suffix="VND"
                    />
                    {priceStepError && (
                        <Text type="danger" className="text-red-500">{priceStepError}</Text>
                    )}
                </div>
            ),
        },
        {
            key: '4',
            label: <label className="font-bold">Tình trạng</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={itemCondition}
                        onChange={(value) => setItemCondition(value)}
                        className="w-full"
                    >
                        <Option value="LIKE_NEW">Như mới</Option>
                        <Option value="USED_GOOD">Đã qua sử dụng - Tốt</Option>
                        <Option value="USED_FAIR">Đã qua sử dụng - Khá</Option>
                        <Option value="REFURBISHED">Tân trang</Option>
                    </Select>
                </div>
            ),
        },
        {
            key: '5',
            label: <label className="font-bold">Loại đấu giá</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={auctionType}
                        onChange={handleAuctionTypeChange}
                        className="w-full"
                    >
                        {isloadingAuctionType ? (
                            <Option disabled>
                                <Spin />
                            </Option>
                        ) : errorAuctionType ? (
                            <Option disabled>Error loading types</Option>
                        ) : (
                            auctionTypes?.map((type) => (
                                <Option key={type.act_id} value={type.act_id}>
                                    {type.auction_typeName === "TRADITIONAL"
                                        ? "Đấu giá truyền thống"
                                        : type.auction_typeName === "ANONYMOUS"
                                            ? "Đấu giá kín"
                                            : type.auction_typeName}
                                </Option>

                            ))
                        )}
                    </Select>
                </div>
            ),
        },
        {
            key: '6',
            label: <label className="font-bold">Danh mục</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={selectedCategory || undefined}
                        onChange={(value) => {
                            setSelectedCategory(value);
                            setSelectedSubCategory(null);
                        }}
                        placeholder="Chọn danh mục"
                        loading={isloadingCategories}
                        className="w-full"
                    >
                        {isloadingCategories ? (
                            <Option disabled>
                                <Spin />
                            </Option>
                        ) : errorCategories ? (
                            <Option disabled>Error loading categories</Option>
                        ) : (
                            categories?.map((category) => (
                                <Option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </Option>
                            ))
                        )}
                    </Select>
                </div>
            ),
        },
        {
            key: '7',
            label: <label className="font-bold">Danh mục phụ</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={selectedSubCategory || undefined}
                        onChange={(value) => setSelectedSubCategory(value)}
                        placeholder="Chọn danh mục phụ"
                        disabled={!selectedCategory}
                        className="w-full"
                    >
                        {filteredSubCategories.map((subCategory) => (
                            <Option key={subCategory.scId} value={subCategory.scId}>
                                {subCategory.sub_category}
                            </Option>
                        ))}
                    </Select>
                </div>
            ),
        },
        {
            key: '8',
            label: <label className="font-bold">Upload File</label>,
            children: (
                <div className="w-72 mt-4">
                    <input
                        type="file"
                        onChange={handleFileItemChange}
                        id="upload-file"
                        className="hidden"
                    />
                    {!itemDocument && (
                        <label htmlFor="upload-file" className="cursor-pointer bg-indigo-500 text-white py-2 px-6 rounded-[10px] hover:bg-indigo-600 transition duration-300">
                            Chọn file
                        </label>
                    )}
                    {itemDocument && (
                        <div className="mt-2 text-gray-800">
                            <strong>Tên file: </strong>{itemDocument}
                        </div>
                    )}
                </div>
            ),
            // span: 2,
        },
        {
            key: '9',
            label: <label className="font-bold">Hình ảnh</label>,
            children: (
                <div className="w-72 mt-4">
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
                </div>
            ),
            span: 4,
        },

        {
            key: '10',
            label: <label className="font-bold">Mô tả sản phẩm</label>,
            children: (
                <div className="w-full space-y-4">
                    <div className="flex w-full space-x-4">
                        <div className="w-4/5">
                            <TextEditor
                                value={itemDescription}
                                placeholder="Gợi ý: Xuất xứ, Màu sắc, Kích thước, Tình trạng sản phẩm..."
                                onChange={handleDescriptionChange}
                                className="h-48 border border-gray-300 rounded-lg p-3 text-base"
                            />
                            {descriptionError && (
                                <Text type="danger" className="text-red-500 mt-2">
                                    {descriptionError}
                                </Text>
                            )}
                        </div>
                        <div className="w-1/5 h-auto">
                            <TextArea
                                value={`✅ Xuất xứ\n✅ Màu sắc\n✅ Kích thước\n✅ Chất liệu \n✅ Thương hiệu...`}
                                disabled
                                rows={6}
                                className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500"
                            />
                        </div>
                    </div>
                </div>
            ),
        },
    ];



    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
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
                            <Sidebar/>
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
                                    {/*start is here*/}
                                    {/*<Spin spinning={spinning} tip="Loading..."/>*/}
                                    <Spin spinning={spinning} percent={percent} fullscreen/>
                                    <div
                                        className="mt-3.5 flex flex-1 flex-col gap-16 self-center md:self-stretch sm:gap-8">
                                        <Heading
                                            size="text2xl"
                                            as="h1"
                                            className="text-[30px] font-medium text-black-900 md:ml-0 md:text-[28px] sm:text-[26px]"
                                        >
                                            Đăng kí sản phẩm
                                        </Heading>
                                        <Descriptions  layout="vertical" bordered
                                                      items={items}/>

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

                                                    <div className="flex items-center gap-3 mt-2 max-w-4xl mx-auto">
                                                        <Checkbox onChange={onChange}/>
                                                        <span className="flex-1">
        Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả sản phẩm mà tôi cung cấp là chính xác, đầy đủ,
        và không gây hiểu nhầm cho người mua. Tôi đồng ý chịu trách nhiệm về tính chính xác của thông tin này.
        Vui lòng tham khảo thêm <a href="/Policy"
                                   className="text-blue-500 hover:underline">Điều khoản dịch vụ</a>.
    </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-2 max-w-4xl mx-auto">
                                                        <Checkbox onChange={onChange}/>
                                                        <span className="flex-1">
        Tôi đồng ý rằng mọi hành vi vi phạm quy định về thông tin sản phẩm hoặc quy trình giao dịch có thể dẫn đến
        các hình phạt do hệ thống áp dụng. Chi tiết có thể xem tại
        <a href="/Policy" className="text-blue-500 hover:underline"> Chính sách đăng bán sản phẩm</a>.
    </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-6 max-w-4xl mx-auto">
                                                        <Checkbox onChange={onChange}/>
                                                        <span className="flex-1">
        Tôi cam kết tuân thủ tất cả các quy định và điều khoản mà hệ thống đặt ra, bao gồm nhưng không giới hạn ở
        quy trình đăng bán, thẩm định sản phẩm, và quy trình giao dịch.
        Đọc thêm tại <a href="/Policy" className="text-blue-500 hover:underline">Hướng dẫn sử dụng hệ thống</a>.
    </span>
                                                    </div>

                                                </div>
                                                <div className="flex w-[38%] justify-between gap-5 md:w-full">
                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-green-500 text-white hover:bg-green-600"
                                                        onClick={() => handleSubmit()}
                                                        ///onClick={showLoader}
                                                    >
                                                        Gửi thẩm định
                                                    </ButtonDH>

                                                    {/* Hiển thị trạng thái */}
                                                    {/*{isLoading && <p>Creating item...</p>}*/}
                                                    {/*{isSuccess && <p>Item created successfully!</p>}*/}
                                                    {/*{isError && <p>Error: {error.message}</p>}*/}

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
                                    {/*end is here*/}
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <FooterBK/>
            </Layout>
        </>
    );
}

export default RegisterProductPage;


