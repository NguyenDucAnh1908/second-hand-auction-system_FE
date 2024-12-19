import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import FooterBK from "@/components/FooterBK/index.jsx";
import {Button, Image, Layout, message, Skeleton, Upload} from 'antd';
import {useNavigate, useParams} from 'react-router-dom';
import {
    useGetImageItemsQuery,
    useGetItemDetailQuery,
    useGetUpdateImageItemMutation,
    useGetUpdateItemMutation
} from "@/services/item.service.js";
import React, {useState, useEffect} from "react";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import {Textarea} from "@material-tailwind/react";
import {PlusOutlined} from "@ant-design/icons";
import {Flex, Splitter, Typography, Descriptions} from 'antd';
import {useGetCategoriesQuery} from "@/services/category.service.js";

const Desc = (props) => (
    <Flex
        justify="center"
        align="center"
        style={{
            height: '100%',
        }}
    >
        <Typography.Title
            type="secondary"
            level={5}
            style={{
                whiteSpace: 'nowrap',
            }}
        >
            {props.text}
        </Typography.Title>
    </Flex>
);

const {Content, Sider} = Layout;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function UpdateProduct() {
    const {id} = useParams();
    const {data, error, loading} = useGetItemDetailQuery({id}); // Ensure `id` is a number
    const [updateItem] = useGetUpdateItemMutation();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [spinning, setSpinning] = React.useState(false);
    const [intervalId, setIntervalId] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = useState(""); // Lưu categoryId
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [percent, setPercent] = React.useState(0);
    const [updatedData, setUpdatedData] = useState({
        itemName: "",
        itemDescription: "",
        priceBuyNow: "",
        priceStepItem:"",
        itemCondition: "",
        itemStatus: data?.itemStatus,
        //images: [],
        sc_id: data?.scId?.sub_category_id || 1,
        auction_type: data?.auctionType?.act_id || "",
    });

//console.log("updatedData", updatedData)
    //console.log("data", data)
    const {
        data: categories,
        error: categoriesError,
        isLoading: categoriesLoading,
        isFetching,
        isSuccess,
    } = useGetCategoriesQuery();
//console.log("category", categories)
    const [updateImageItem, {isLoading: updateLoading, error: updateError}] = useGetUpdateImageItemMutation();
    const {
        data: itemImage,
        isError: itemImageError,
        isLoading: itemImageLoading,
        isSuccess: isSuccessImage,
        refetch: refetchImage
    } = useGetImageItemsQuery({id});

    React.useEffect(() => {
        if (itemImage) {
            const initialFileList = convertImagesToFileList(itemImage);
            setFileList(initialFileList);
        }
    }, [itemImage]);

    useEffect(() => {
        if (data) {
            setUpdatedData({
                itemName: data?.itemName || "",
                itemDescription: data?.itemDescription || "",
                priceBuyNow: data?.priceBuyNow || "",
                itemCondition: data?.itemCondition || "",
                priceStepItem: data?.priceStepItem || "",
                //itemStatus: data?.itemStatus || "",
                sub_category: data?.scId?.sub_category_id || 0,
                auction_type: data?.auctionType?.act_id || "",
            });

        }
    }, [data]);
    const {UploadImage} = useHookUploadImage();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUpdatedData((prevData) => {
            // Handle special cases for scId and auctionType
            if (name === "sub_category") {
                return {
                    ...prevData,
                    scId: parseInt(value), // Update scId as a plain integer
                };
            }

            if (name === "auction_type") {
                return {
                    ...prevData,
                    auctionType: parseInt(value), // Update auctionType as a plain integer
                };
            }

            // Default case for other fields
            return {
                ...prevData,
                [name]: value,
            };
        });
    };


    const handleUpdate = async (e) => {
        if (e) e.preventDefault();

        const {
            itemName,
            itemDescription,
            itemCondition,
            priceBuyNow,
            priceStepItem,
            sc_id,
            auctionType,
        } = updatedData;

        const parsedPrice = parseFloat(priceBuyNow);

        const payload = {
            //item_id: id,
            item_name: itemName,
            item_description: itemDescription,
            item_condition: itemCondition,
            price_buy_now: parsedPrice,
            price_step_item: priceStepItem,
            sc_id: sc_id || 0, // Đảm bảo sc_id luôn có giá trị mặc định
            auction_type: auctionType,
        };


        //console.log("payload",payload); // Ensure this matches the backend structure

        try {
            // Make the API call to update the item
            const response = await updateItem({id, body: payload}).unwrap();
            message.success(response.message);
            navigate("/Dashboard-seller/ListOfSellerProduct");
        } catch (err) {
            const errorMessage = err?.data?.message || "An error occurred during the update.";
            message.error(errorMessage);
        } finally {
            setSpinning(false);
            setPercent(0);
        }
    };
    const [showDescription, setShowDescription] = useState(false);

    const toggleDescription = () => {
        setShowDescription(prevState => !prevState);
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        setUpdatedData((prev) => ({
            ...prev,
            sc_id: "",
        }));
    };

    const handleSubCategoryChange = (e) => {
        const subCategoryId = parseInt(e.target.value); // Đảm bảo subCategoryId là số nguyên
        setSelectedSubCategory(subCategoryId); // Cập nhật giá trị state của subCategory (tuỳ nhu cầu)

        setUpdatedData((prev) => ({
            ...prev,
            sc_id: subCategoryId || 0, // Cập nhật sc_id với id của subCategory hoặc mặc định là 0
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error fetching auction data</div>;
    }

    if (!data) {
        return <div>No data available for this product</div>;
    }

    const items = [
        {
            key: '1',
            label: 'Tên sản phẩm',
            children: <input
                type="text"
                id="itemName"
                name="itemName" // Thêm thuộc tính `name`
                value={updatedData.itemName}
                onChange={handleChange} // Gọi hàm `handleChange`
                className="mt-2 p-3 w-5/5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />,
            span: 4,
        },
        {
            key: '2',
            label: 'Tình trạng sản phẩm',
            children: <select
                id="itemCondition"
                name="itemCondition"
                value={updatedData?.itemCondition}
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="LIKE_NEW">Như mới</option>
                <option value="USED_GOOD">Đã qua sử dụng-Tốt</option>
                <option value="USED_FAIR">Đã qua sử dụng-Chấp nhận</option>
                <option value="REFURBISHED">Hàng tân trang</option>
            </select>,
            span: 1,
        },
        {
            key: '6',
            label: 'Danh mục',
            children: (
                <select
                    id="category"
                    name="category"
                    value={selectedCategory || data?.scId?.sub_category_id || ""}
                    onChange={handleCategoryChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn danh mục</option>
                    {isSuccess &&
                        categories?.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                </select>
            ),
            span: 1,
        },
        {
            key: '7',
            label: 'Loại danh mục',
            children: (
                <select
                    id="sub_category"
                    name="sub_category"
                    value={updatedData.sc_id || data?.scId?.sub_category_id || ""}
                    onChange={handleSubCategoryChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!selectedCategory && !data?.scId?.sub_category_id}
                >
                    <option value="">Chọn loại danh mục</option>
                    {isSuccess &&
                        (selectedCategory || data?.scId?.sub_category_id) &&
                        categories
                            ?.find(
                                (category) =>
                                    category.categoryId ===
                                    parseInt(selectedCategory || data?.scId?.sub_category_id)
                            )
                            ?.subCategory.map((sub) => (
                            <option key={sub.sc_id} value={sub.sc_id}>
                                {sub.sub_category}
                            </option>
                        ))}
                </select>
            ),
            span: 1,
        },
        {
            key: '8',
            label: 'Loại đấu giá',
            children: (
                <select
                    id="auction_type"
                    name="auction_type"
                    value={updatedData.auctionType || data?.auctionType?.act_id || ""}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn kiểu đấu giá</option>
                    <option value="1">Đấu giá truyền thống</option>
                    <option value="2">Đấu giá kín</option>
                </select>
            ),
            span: 1,
        },
        {
            key: '3',
            label: 'Giá mong muốn',
            children: <input
                type="text"
                id="priceBuyNow"
                name="priceBuyNow"
                value={updatedData.priceBuyNow || ""} // Giá trị định dạng
                onChange={handleChange}  // Gọi hàm xử lý
                className="mt-2 p-3 w-5/5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá tiền"
            />,
            span: 1,
        },
        {
            key: '4',
            label: 'Bước giá mong muốn',
            children: <input
                type="text"
                id="priceStepItem"
                name="priceStepItem"
                value={updatedData.priceStepItem || ""} // Giá trị định dạng
                onChange={handleChange}  // Gọi hàm xử lý
                className="mt-2 p-3 w-5/5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá tiền"
            />,
            span: 2,
        },
        {
            key: '5',
            label: 'Mô tả',
            span: 2,
            children: <div className="space-y-4 w-full">
                <button
                    onClick={toggleDescription}
                    className="px-6 py-2 text-blue-600 font-semibold text-lg rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                >
                    {showDescription ? 'Ẩn mô tả' : 'Hiển thị mô tả'}
                </button>

                {showDescription && (
                    <div className="mt-4">
                        <Textarea
                            id="itemDescription"
                            name="itemDescription"
                            value={updatedData.itemDescription}
                            onChange={handleChange}
                            rows={5}
                            className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out h-[500px]"
                            placeholder="Nhập mô tả ở đây..."
                        />
                    </div>
                )}
            </div>,
        },
    ];

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChangeImg = ({fileList: newFileList}) => setFileList(newFileList);
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

    const uploadImagesToFirebase = async (fileList) => {
        const uploadedUrls = [];
        for (const file of fileList) {
            if (!file.url) { // Chỉ upload ảnh mới
                const downloadURL = await UploadImage(file.originFileObj); // Hàm upload ảnh lên Firebase
                uploadedUrls.push(downloadURL);
            } else {
                uploadedUrls.push(file.url); // Giữ nguyên URL của ảnh cũ
            }
        }
        return uploadedUrls;
    };

    const formatImageDataForApi = (uploadedUrls, itemImageData) => {
        const maxImages = 5; // Số lượng ảnh tối đa
        const updatedImages = [];

        for (let i = 0; i < maxImages; i++) {
            updatedImages.push({
                id: itemImageData[i]?.idImage || 0, // Nếu có ID thì giữ, nếu không thì id = 0
                image_url: uploadedUrls[i] || "", // URL ảnh hoặc chuỗi rỗng nếu chưa có
            });
        }

        return updatedImages;
    };


    const handleUpdateImages = async () => {
        try {
            const uploadedUrls = await uploadImagesToFirebase(fileList);
            const formattedData = formatImageDataForApi(uploadedUrls, itemImage); // Định dạng dữ liệu
            await updateImageItem({id, body: formattedData}).unwrap(); // Gửi API
            message.success("Cập nhật ảnh thành công!")
            refetchImage();
        } catch (error) {
            message.error("Lỗi cập nhật ảnh!")
        }
    };

    const convertImagesToFileList = (images) =>
        images.map((img) => ({
            uid: img.idImage,
            name: `Image-${img.idImage}`,
            status: 'done',
            url: img.image,
        }));

    const handleBeforeUpload = (file) => {
        if (fileList.length >= 5) {
            message.warning("Bạn chỉ được tải lên tối đa 5 ảnh!");
            return Upload.LIST_IGNORE;
        }
        return true;
    };


    return (
        <>
            <Header/>
            <Layout className="min-h-screen bg-gray-50 p-10">
                <Sider width={250} className="bg-gray-200">
                    <Sidebar/>
                </Sider>

                <Layout className="flex-1 p-6 bg-gray-50">

                    <Splitter
                        style={{
                            height: 700,
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Splitter.Panel defaultSize="60%" min="20%" max="70%">
                            {/*<Desc text="First" />*/}
                            <Content
                                style={{
                                    padding: '0 48px',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >

                                <Descriptions title="Kết quả thẩm định sản phẩm" layout="vertical" items={items}/>
                                {data?.itemStatus === "PENDING" && (
                                    <div
                                        className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ xử lý:</h2>
                                        <p className="text-lg text-gray-600">{data?.reason}</p>
                                    </div>
                                )}

                                {data?.itemStatus === "PENDING_AUCTION" && (
                                    <div
                                        className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ đấu giá:</h2>
                                        <p className="text-lg text-gray-600">{data?.reason}</p>
                                    </div>
                                )}

                                {data?.itemStatus === "ACCEPTED" && (
                                    <div
                                        className="mb-6 bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do đồng ý:</h2>
                                        <p className="text-lg text-gray-600">{data?.reason}</p>
                                    </div>
                                )}

                                {data?.itemStatus === "REJECTED" && (
                                    <div className="mb-6 bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do từ chối:</h2>
                                        <p className="text-lg text-gray-600">{data?.reason || "Không có lý do từ chối được cung cấp."}</p>
                                    </div>
                                )}
                                <div className="flex justify-center space-x-3 mt-8 w-full">
                                    {/* Resubmit Button */}
                                    <Button
                                        className="flex-1 px-6 py-3 bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD] text-gray-700 font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                                        onClick={handleUpdate} // Gọi hàm update khi nhấn nút
                                    >
                                        Đăng lại sản phẩm
                                    </Button>
                                </div>
                            </Content>
                        </Splitter.Panel>
                        <Splitter.Panel>
                            <>
                                <Skeleton loading={updateLoading} active>
                                    {itemImageLoading && <p>Đang tải ảnh...</p>}
                                    {itemImageError && <p>Không thể tải ảnh!</p>}
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={({fileList: newFileList}) => setFileList(newFileList)}
                                        beforeUpload={(file) => {
                                            if (fileList.length >= 5) {
                                                message.warning("Bạn chỉ được tải lên tối đa 5 ảnh!");
                                                return Upload.LIST_IGNORE;
                                            }
                                            return true;
                                        }}
                                    >
                                        {fileList.length >= 5 ? null : uploadButton}
                                    </Upload>


                                    <Button onClick={handleUpdateImages}>Cập nhật ảnh</Button>

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
                                </Skeleton>
                            </>
                        </Splitter.Panel>
                        {/*<Splitter.Panel>*/}
                        {/*    <>*/}
                        {/*        <Skeleton loading={updateLoading} active>*/}
                        {/*            /!*{itemImageLoading && <p>Đang tải ảnh...</p>}*!/*/}
                        {/*            /!*{itemImageError && <p>Không thể tải ảnh!</p>}*!/*/}
                        {/*            <input*/}
                        {/*                type="file"*/}
                        {/*                onChange={handleFileItemChange}*/}
                        {/*                id="upload-file"*/}
                        {/*                className="hidden"*/}
                        {/*            />*/}


                        {/*            <Button onClick={handleUpdateImages}>Upload file</Button>*/}

                        {/*            {previewImage && (*/}
                        {/*                <Image*/}
                        {/*                    wrapperStyle={{*/}
                        {/*                        display: 'none',*/}
                        {/*                    }}*/}
                        {/*                    preview={{*/}
                        {/*                        visible: previewOpen,*/}
                        {/*                        onVisibleChange: (visible) => setPreviewOpen(visible),*/}
                        {/*                        afterOpenChange: (visible) => !visible && setPreviewImage(''),*/}
                        {/*                    }}*/}
                        {/*                    src={previewImage}*/}
                        {/*                />*/}
                        {/*            )}*/}
                        {/*        </Skeleton>*/}
                        {/*    </>*/}
                        {/*</Splitter.Panel>*/}
                    </Splitter>

                </Layout>
            </Layout>
            <FooterBK/>
        </>
    )
        ;
}
