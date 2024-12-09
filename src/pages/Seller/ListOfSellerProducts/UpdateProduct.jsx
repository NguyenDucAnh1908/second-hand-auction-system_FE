import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import FooterBK from "@/components/FooterBK/index.jsx";
import {Layout} from 'antd';
import {useParams} from 'react-router-dom';
import {useGetItemDetailQuery} from "@/services/item.service.js";
import {useState} from "react";
import {Textarea} from "@material-tailwind/react";

const {Content, Sider} = Layout;

export default function UpdateProduct() {
    const {id} = useParams();
    const {data, isLoading, error} = useGetItemDetailQuery({id}); // Ensure `id` is a number

    const [showDescription, setShowDescription] = useState(false);
    const [description, setDescription] = useState(data?.itemDescription || '');

    const toggleDescription = () => {
        setShowDescription(prevState => !prevState);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File uploaded:", file);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error); // Log the error for debugging
        return <div>Error fetching auction data</div>;
    }
    if (!data) {
        return <div>No data available for this product</div>;
    }

    return (
        <>
            <Header/>
            <Layout className="min-h-screen bg-gray-50 p-10">
                <Sider width={250} className="bg-gray-200">
                    <Sidebar/>
                </Sider>

                <Layout className="flex-1 p-6 bg-gray-50">
                    <Content className="bg-white p-8 w-[800px] mx-auto shadow-lg border-4 border-gray-800 rounded-lg">
                        <h1 className="text-3xl font-semibold text-center text-gray-800 mt-12 mb-6">
                            Kết quả thẩm định sản phẩm
                        </h1>

                        {/* Display reason based on status */}
                        {data?.itemStatus === "PENDING" && (
                            <div className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ xử lý:</h2>
                                <p className="text-lg text-gray-600">Sản phẩm đang chờ xét duyệt.</p>
                            </div>
                        )}

                        {data?.itemStatus === "PENDING_AUCTION" && (
                            <div className="mb-6 bg-yellow-100 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do chờ đấu giá:</h2>
                                <p className="text-lg text-gray-600">Sản phẩm đang chờ phiên đấu giá bắt đầu.</p>
                            </div>
                        )}

                        {data?.itemStatus === "ACCEPTED" && (
                            <div className="mb-6 bg-green-100 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do đồng ý:</h2>
                                <p className="text-lg text-gray-600">Sản phẩm đã được chấp nhận để bán.</p>
                            </div>
                        )}

                        {data?.itemStatus === "REJECTED" && (
                            <div className="mb-6 bg-red-100 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Lý do từ chối:</h2>
                                <p className="text-lg text-gray-600">{data?.reason || "Không có lý do từ chối được cung cấp."}</p>
                            </div>
                        )}

                        {/* Product Information */}
                        <div className="mt-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông tin sản phẩm</h2>

                            {/* Flexbox for two-column layout */}
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left Column: itemName, Price, Description */}
                                <div className="flex-1 space-y-4">
                                    {/* Product Name Input */}
                                    <div>
                                        <label htmlFor="itemName" className="block text-lg font-semibold text-gray-600">Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            id="itemName"
                                            value={data.itemName}
                                            onChange={(e) => setData({...data, itemName: e.target.value})}
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Product Status Input */}
                                    <div>
                                        <label htmlFor="itemStatus" className="block text-lg font-semibold text-gray-600">Trạng thái</label>
                                        <input
                                            type="text"
                                            id="itemStatus"
                                            value={data.itemStatus}
                                            disabled
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Price Input */}
                                    <div>
                                        <label htmlFor="priceBuyNow" className="block text-lg font-semibold text-gray-600">Giá mong muốn</label>
                                        <input
                                            type="text"
                                            id="priceBuyNow"
                                            value={data.priceBuyNow || "Chưa có giá"}
                                            disabled
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Description Textarea */}
                                    <div className="space-y-4">
                                        <label htmlFor="itemDescription" className="block text-lg font-semibold text-gray-700 mb-2">Mô tả</label>
                                        <button
                                            onClick={toggleDescription}
                                            className="px-6 py-2 text-blue-600 font-semibold text-lg rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                                        >
                                            {showDescription ? 'Ẩn mô tả' : 'Hiển thị mô tả'}
                                        </button>

                                        {showDescription && (
                                            <div className="mt-4">
                                                <textarea
                                                    id="itemDescription"
                                                    value={data?.itemDescription}
                                                    onChange={handleDescriptionChange}
                                                    rows={5}
                                                    className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
                                                    placeholder="Nhập mô tả ở đây..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Product Images and Category */}
                                <div className="flex-1 space-y-4">
                                    {data.images && data.images.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hình ảnh sản phẩm</h3>
                                            <div className="flex flex-wrap gap-6 justify-start">
                                                {data.images.map((image, index) => (
                                                    <div key={index} className="relative flex flex-col items-center">
                                                        <img
                                                            src={image.image}
                                                            alt={`Product image ${index + 1}`}
                                                            className="w-40 h-40 object-cover rounded-lg shadow-lg mb-2 transition-transform transform hover:scale-105"
                                                        />
                                                    </div>
                                                ))}
                                                <div className="relative flex flex-col items-center w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg justify-center">
                                                    <input
                                                        type="file"
                                                        onChange={handleFileChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        accept="image/*"
                                                    />
                                                    <div className="flex flex-col items-center justify-center text-gray-600">
                                                        <i className="fas fa-upload text-2xl mb-2"></i>
                                                        <span>Chọn ảnh</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Input */}
                                    <div>
                                        <label htmlFor="subCategory" className="block text-lg font-semibold text-gray-600">Danh mục</label>
                                        <input
                                            type="text"
                                            id="subCategory"
                                            value={data.scId?.sub_category}
                                            disabled
                                            className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3 mt-8 w-full">
                            {/* Resubmit Button */}
                            <button
                                className="flex-1 px-6 py-3 bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD] text-gray-700 font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                                onClick={() => {/* handle resubmit logic */}}
                            >
                                Đăng lại sản phẩm
                            </button>
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <FooterBK/>
        </>
    );
}
