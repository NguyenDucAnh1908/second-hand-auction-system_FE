import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import { ButtonDH, Heading, Img, TextArea, } from "../../../components";
import React, { useEffect, useRef, useState } from "react";
import { Option, Select } from "@material-tailwind/react";
import { PlusOutlined } from '@ant-design/icons';
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
    Upload,
    Modal
} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
import { useRegisterItemMutation } from "@/services/item.service.js";
import useHookUploadImage from "@/hooks/useHookUploadImage.js";
import { useGetAuctionTypeQuery } from "@/services/auctionType.service.js";
import { useGetCategoriesQuery } from "@/services/category.service.js";
import TextEditor from "@/components/TextEditor/index.jsx";
import { useNavigate } from "react-router-dom";
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;
const { Content, Sider } = Layout;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function RegisterProductPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [itemName, setItemName] = useState("");
    const [priceBuyNow, setPriceBuyNow] = useState(0);
    const [priceStepItem, setPriceStepItem] = useState(0);
    const [itemDescription, setItemDescription] = useState("");
    const [itemDocument, setItemDocument] = useState("");
    const [imei, setImei] = useState("");
    const [storage, setStorage] = useState("");
    const [color, setColor] = useState("");
    const [batteryHealth, setBatteryHealth] = useState(null);
    const [osVersion, setOsVersion] = useState("");
    const [icloudStatus, setIcloudStatus] = useState("");
    const [bodyCondition, setBodyCondition] = useState("");
    const [screenCondition, setScreenCondition] = useState("");
    const [cameraCondition, setCameraCondition] = useState("");
    const [portCondition, setPortCondition] = useState("");
    const [buttonCondition, setButtonCondition] = useState("");
    const [ram, setRam] = useState("");
    const [screenSize, setScreenSize] = useState("");
    const [cameraSpecs, setCameraSpecs] = useState("");
    const [connectivity, setConnectivity] = useState("");
    const [sensors, setSensors] = useState("");
    const [serial, setSerial] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [imgItem, setImgItem] = useState([]);
    const [file, setFile] = useState(null);

    const [imeiData, setImeiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState("");
    const [device_image, setDevice_image] = useState("");
    const [sim, setSim] = useState("");
    const [sim_slots, setSim_slots] = useState("");
    const [os, setOs] = useState("");
    const [os_family, setOs_family] = useState("");
    const [bluetooth, setBluetooth] = useState("");
    const [usb, setUsb] = useState("");
    const [wlan, setWlan] = useState("");
    const [nfc, setNfc] = useState("");
    const [speed, setSpeed] = useState("");
    const [nettech, setNettech] = useState("");
    const [model, setModel] = useState("")
    const [type, setType] = useState("")

    const [itemNameError, setItemNameError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [scId, setScId] = useState(0);
    const [auctionType, setAuctionType] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [FileUpload, setFileUpload] = useState(null);
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
    const { UploadImage } = useHookUploadImage();
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
                    uploadedImages.push({ image_url: imageUrl });
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
        console.log("File", file);
        if (file) {
            setItemDocument(file.name);
            setFileUpload(file)// Cập nhật tên file vào state
        }
    };
    const handleAuctionTypeChange = (value) => {
        console.log("Selected auction type:", value);
        setAuctionType(value);
    };


    const [registerItem, { isLoading, isSuccess, isError, error }] = useRegisterItemMutation();

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
        if (!fileUrl) {
            message.error("Lỗi upload file");
        }
        const payload = {
            item_name: itemName,
            item_description: itemDescription,
            price_buy_now: priceBuyNow,
            price_step_item: priceStepItem,
            img_item: uploadedImages,
            item_document: fileUrl,
            sc_id: os_family === "Android" ? 1 : os_family === "iOS" ? 2 : null,
            auction_type: auctionType,
            imei: imei, // Thêm trường IMEI
            storage: storage, // Thêm dung lượng
            color: color, // Màu sắc
            battery_health: batteryHealth, // Tình trạng pin
            os_version: osVersion, // Phiên bản hệ điều hành
            icloud_status: icloudStatus, // Tình trạng iCloud
            body_condition: bodyCondition, // Tình trạng thân máy
            screen_condition: screenCondition, // Tình trạng màn hình
            camera_condition: cameraCondition, // Tình trạng camera
            port_condition: portCondition, // Tình trạng cổng kết nối
            button_condition: buttonCondition, // Tình trạng nút
            ram: ram, // RAM
            screen_size: screenSize, // Kích thước màn hình
            camera_specs: cameraSpecs, // Thông số camera
            connectivity: connectivity, // Kết nối
            sensors: sensors, // Cảm biến
            brand: brand,
            device_image: device_image,
            model: model,
            serial: serial,
            type: type,
            network_technology: nettech.join(', '),
            nfc: nfc,
            os: os,
            os_family: os_family,
            sim: sim,
            sim_slots: sim_slots,
            bluetooth: bluetooth.join(', '),
            speed: speed.join(', '),
            usb: usb.join(', '),
            wlan: wlan.join(', ')
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
            setSelectedSubCategory(1); // Reset subcategory khi thay đổi category
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




    const handleModalOpen = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };



    // Function to fetch IMEI info
    const fetchImeiInfo = async () => {
        if (imei.length !== 15) {
            alert("Mã IMEI phải có 15 chữ số.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`https://kist-imei-decoding-v1.p.rapidapi.com/api/imei/${imei}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'f9db9f1526mshb53b86400745cd4p1a6763jsn2b9b90d98931',
                    'x-rapidapi-host': 'kist-imei-decoding-v1.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch IMEI data');
            }

            const data = await response.json();
            console.log('IMEI Data:', data);
            setImeiData(data);

            // Map response data to form fields
            setItemName(`${data.data.brand} ${data.data.name}`);
            setBrand(data.data.brand)
            setDevice_image(data.data.device_image);
            setSim(data.data.device_spec.sim)
            setSim_slots(data.data.device_spec.sim_slots)
            setOs(data.data.device_spec.os)
            setOs_family(data.data.device_spec.os_family)
            setBluetooth(data.data.device_spec.bluetooth)
            setUsb(data.data.device_spec.usb)
            setWlan(data.data.device_spec.wlan)
            setNfc(data.data.device_spec.nfc)
            setSpeed(data.data.device_spec.speed)
            setNettech(data.data.device_spec.nettech)
            setSerial(data.data.serial)
            setImei(data.query);
            setModel(data.data.model)
            setType(data.data.device_spec.type)
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const imeiCheck = [
        {
            key: '1',
            label: (
                <div className="flex items-center space-x-2">
                    <label className="font-bold">Mã IMEI</label>
                    <InfoCircleOutlined
                        onClick={handleModalOpen}
                        className="text-blue-500 cursor-pointer"
                        style={{ fontSize: '16px' }}
                    />
                </div>
            ),
            children: (
                <div className="w-full space-y-4">
                    <div className="flex items-center space-x-4">
                        <Input
                            placeholder="Nhập mã IMEI"
                            maxLength={15}  // Giới hạn 15 ký tự
                            onChange={(e) => {
                                const value = e.target.value;
                                // Chỉ cho phép số
                                if (/^\d*$/.test(value)) {
                                    setImei(value);  // Cập nhật giá trị
                                }
                            }}
                            value={imei}  // Giá trị của input được gắn với state
                            className="rounded-md border p-3 w-full"
                            style={{ maxWidth: '250px' }} // Giới hạn chiều rộng input
                        />
                        <button
                            onClick={fetchImeiInfo}
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Kiểm tra IMEI
                        </button>
                    </div>
                </div>
            ),
        },

        {
            key: '2',
            label: <label className="font-bold"></label>,
            children: (
                <div className="w-[30%] space-y-4">
                    <Img
                        src={device_image || '/images/Mobile-Smartphone-icon.png'}
                        className="w-full h-auto rounded-md shadow-md"
                    />
                </div>
            ),
        }


    ];


    const fieldReponse = [
        {
            key: '1',
            label: <label className="font-bold">Tên Sản Phẩm</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {itemName}
                </div>
            ),
        },
        {
            key: '2',
            label: <label className="font-bold">Serial</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {serial}
                </div>
            ),
        },
        {
            key: '3',
            label: <label className="font-bold">Hỗ trợ Sim</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {sim}
                </div>
            ),
        },
        {
            key: '4',
            label: <label className="font-bold">Số khe cắm sim</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {sim_slots}
                </div>
            ),
        },
        {
            key: '5',
            label: <label className="font-bold">Phiên bản</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {os}
                </div>
            ),
        },
        {
            key: '6',
            label: <label className="font-bold">Hệ điều hành</label>,
            children: (
                <div className="rounded-md border p-3 w-full bg-gray-100">
                    {os_family}
                </div>
            ),
        },
        {
            key: '7',
            label: <label className="font-bold">Bluetooth</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {bluetooth?.length ? (
                        bluetooth.map((item, index) => (
                            <li key={index} className="text-gray-800">{item}</li>
                        ))
                    ) : (
                        <p className="text-gray-500">No Bluetooth data available</p>
                    )}
                </ul>
            ),
        }
        ,
        {
            key: '8',
            label: <label className="font-bold">Cổng USB</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {Array.isArray(usb) && usb.length > 0 ? (
                        usb.map((item, index) => (
                            <li key={index} className="text-gray-800">{item}</li>
                        ))
                    ) : (
                        <p className="text-gray-500">No USB data available</p>
                    )}
                </ul>
            ),
        },
        {
            key: '9',
            label: <label className="font-bold">Wi-Fi</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {Array.isArray(wlan) && wlan.length > 0 ? (
                        wlan.map((item, index) => (
                            <li key={index} className="text-gray-800">{item}</li>
                        ))
                    ) : (
                        <p className="text-gray-500">No Wi-Fi data available</p>
                    )}
                </ul>
            ),
        },
        {
            key: '10',
            label: <label className="font-bold text-black">Tốc độ kết nối mạng</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {Array.isArray(speed) && speed.length > 0 ? (
                        speed.map((item, index) => (
                            <li key={index} className="text-black">{item}</li>
                        ))
                    ) : (
                        <p className="text-gray-500">No speed data available</p>
                    )}
                </ul>
            ),
        },
        {
            key: '11',
            label: <label className="font-bold">Công nghệ mạng hỗ trợ</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {Array.isArray(nettech) && nettech.length > 0 ? (
                        nettech.map((item, index) => (
                            <li key={index} className="text-gray-800">{item}</li>
                        ))
                    ) : (
                        <p className="text-gray-500">No network technology data available</p>
                    )}
                </ul>
            ),
        },
        {
            key: '11',
            label: <label className="font-bold">Mã model</label>,
            children: (
                <ul className="list-disc list-inside space-y-2 bg-gray-100 p-3 rounded-md border">
                    {model}
                </ul>
            ),
        },


    ];







    const items = [



        {
            key: '4',
            label: <label className="font-bold">Giá mong muốn</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập giá mua ngay"
                        value={priceBuyNow ? priceBuyNow.toLocaleString('vi-VN') : ''} // Hiển thị dấu phẩy
                        onChange={(e) => {
                            const input = e.target.value.replace(/\./g, ''); // Loại bỏ dấu "."
                            if (/^\d*$/.test(input)) {
                                setPriceBuyNow(Number(input)); // Lưu giá trị số nguyên
                                setPriceError('');
                            } else {
                                setPriceError('Giá trị không hợp lệ, vui lòng nhập số.');
                            }
                        }}
                        status={priceError ? 'error' : ''}
                        className={`rounded-md border p-3 w-full ${priceError ? 'border-red-500' : 'border-gray-300'}`}
                        suffix="VND"
                    />
                    {priceError && (
                        <Text type="danger" className="text-red-500">{priceError}</Text>
                    )}
                </div>
            ),
        }
        ,
        {
            key: '5',
            label: <label className="font-bold">Bước giá mong muốn</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        placeholder="Nhập bước giá mong muốn"
                        value={priceStepItem ? priceStepItem.toLocaleString('vi-VN') : ''} // Hiển thị dấu phẩy
                        onChange={(e) => {
                            const input = e.target.value.replace(/\./g, ''); // Loại bỏ dấu chấm
                            if (/^\d*$/.test(input)) {
                                setPriceStepItem(Number(input)); // Lưu giá trị thô (không dấu phẩy)
                                setPriceStepError(''); // Xóa lỗi nếu hợp lệ
                            } else {
                                setPriceStepError('Bước giá không hợp lệ, vui lòng nhập số.');
                            }
                        }}
                        status={priceStepError ? 'error' : ''}
                        className={`rounded-md border p-3 w-full ${priceStepError ? 'border-red-500' : 'border-gray-300'}`}
                        suffix="VND"
                    />
                    {priceStepError && (
                        <Text type="danger" className="text-red-500">{priceStepError}</Text>
                    )}
                </div>
            ),
        }
        ,
        {
            key: '16',
            label: <label className="font-bold">RAM</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={ram} // Giá trị của RAM
                        onChange={(e) => setRam(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập RAM"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full" // Cách kiểu cho input
                        suffix="GB"  // Thêm 'GB' vào cuối input
                    />
                </div>
            ),
        },

        {
            key: '7',
            label: <label className="font-bold">Dung lượng</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập dung lượng"  // Placeholder hiển thị khi chưa nhập
                        className={`rounded-md border p-3 w-full`} // Cách kiểu cho input
                        suffix="GB"  // Thêm 'GB' vào cuối input
                    />
                </div>
            ),
        },




        {
            key: '21',
            label: <label className="font-bold">Kích thước màn hình</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={screenSize} // Giá trị của kích thước màn hình
                        onChange={(e) => setScreenSize(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập kích thước màn hình"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full" // Cách kiểu cho input
                        suffix="inch"  // Thêm "inch" vào cuối input
                    />
                </div>
            ),
        },

        
        {
            key: '19',
            label: <label className="font-bold">Thông số camera</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={cameraSpecs} // Giá trị của thông số camera
                        onChange={(e) => setCameraSpecs(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập thông số camera"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full" // Cách kiểu cho input
                        suffix="MP"  // Thêm "MP" vào cuối input
                    />
                </div>
            ),
        },
        
        {
            key: '20',
            label: <label className="font-bold">Cảm biến</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={sensors} // Giá trị của cảm biến
                        onChange={(e) => setSensors(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập cảm biến"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full" // Cách kiểu cho input
                        suffix="MP"  // Thêm "MP" vào cuối input
                    />
                </div>
            ),
        },


        {
            key: '9',
            label: <label className="font-bold">Tình trạng pin</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="number"
                        value={batteryHealth}  // Giá trị của tình trạng pin
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);  // Chuyển đổi giá trị sang số
                            if (!isNaN(value) && value >= 0 && value <= 100) {
                                setBatteryHealth(value);  // Cập nhật giá trị tình trạng pin
                            }
                        }}
                        placeholder="Nhập tình trạng pin (%)"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full"
                        suffix="%"
                    />

                </div>
            ),
        },

        {
            key: '8',
            label: <label className="font-bold">Màu sắc</label>,
            children: (
                <div className="w-full space-y-4">
                    <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}  // Cập nhật giá trị nhập vào state
                        placeholder="Nhập màu sắc"  // Placeholder hiển thị khi chưa nhập
                        className="rounded-md border p-3 w-full"
                    />
                </div>
            ),
        },

        {
            key: os_family === 'iOS' ? '11' : '', // Nếu không phải iOS, key sẽ bị bỏ qua
            label: <label className="font-bold">Tình trạng đám mây</label>,
            children: os_family === 'iOS' ? (
                <div className="w-72 mt-4">
                    <Select
                        value={icloudStatus}
                        onChange={(value) => setIcloudStatus(value)}
                        className="w-full"
                    >
                        <Option value="ACTIVATED">Đã kích hoạt</Option>
                        <Option value="DEACTIVATED">Chưa kích hoạt</Option>
                        <Option value="LOCKED">Bị khóa</Option>
                    </Select>
                </div>
            ) : (
                <p className="text-gray-500">Không áp dụng cho thiết bị Android</p>
            ),
        },

        
        {
            key: '12',
            label: <label className="font-bold">Tình trạng thân điện thoại</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={bodyCondition}
                        onChange={(value) => setBodyCondition(value)}
                        className="w-full"
                    >
                        <Option value="Good">Tốt</Option>
                        <Option value="Fair">Vừa phải</Option>
                        <Option value="Damaged">Hư hỏng</Option>
                        <Option value="Like New">Như mới</Option>
                    </Select>
                </div>
            ),
        },
        {
            key: '13',
            label: <label className="font-bold">Tình trạng nút điện thoại</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={buttonCondition}
                        onChange={(value) => setButtonCondition(value)}
                        className="w-full"
                    >
                        <Option value="Like New">Các nút hoạt động hoàn hảo, không mòn, không kẹt.</Option>
                        <Option value="Good">Nút nhấn dễ dàng, không kẹt.</Option>
                        <Option value="Fair">Nút có thể mòn nhẹ, nhấn vẫn được.</Option>
                        <Option value="Damaged"> Nút khó nhấn hoặc không phản hồi.</Option>
                    </Select>
                </div>
            ),
        },
        {
            key: '14',
            label: <label className="font-bold">Tình trạng màn hình điện thoại</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={screenCondition}
                        onChange={(value) => setScreenCondition(value)}
                        className="w-full"
                    >
                        <Option value="Like New">Màn hình không xước, không vỡ, cảm ứng mượt.</Option>
                        <Option value="Good">Một vài vết xước nhỏ, không ảnh hưởng.</Option>
                        <Option value="Fair">Màn hình có xước rõ, có thể nứt nhẹ.</Option>
                        <Option value="Damaged">Màn hình vỡ, xước sâu, cảm ứng không hoạt động tốt.</Option>
                    </Select>
                </div>
            ),
        },
        {
            key: '15',
            label: <label className="font-bold">Tình trạng camera điện thoại</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={cameraCondition}
                        onChange={(value) => setCameraCondition(value)}
                        className="w-full"
                    >
                        <Option value="Like New">Camera rõ nét, lens không xước.</Option>
                        <Option value="Good">Camera hoạt động tốt, lens không xước lớn.</Option>
                        <Option value="Fair">Camera có xước nhẹ, ảnh có thể mờ.</Option>
                        <Option value="Damaged">Camera không rõ nét, lens xước lớn.</Option>
                    </Select>
                </div>
            ),
        },



      
        {
            key: '18',
            label: <label className="font-bold">Tình trạng cổng kết nối</label>,
            children: (
                <div className="w-72 mt-4">
                    <Select
                        value={portCondition}
                        onChange={(value) => setPortCondition(value)}
                        className="w-full"
                    >
                        <Option value="USB-C">USB-C</Option>
                        <Option value="Lightning">Lightning</Option>
                        <Option value="Micro-USB">Micro-USB</Option>
                    </Select>
                </div>
            ),
        },
        
     

     

        {
            key: '24',
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
                                        : type.auction_typeName === "SEALED_BID"
                                            ? "Đấu giá kín"
                                            : type.auction_typeName === "BUY_NOW"
                                                ? null
                                                : "Loại đấu giá khác"
                                    }
                                </Option>
                            ))

                        )}
                    </Select>
                </div>
            ),
        },

        {
            key: '25',
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
            key: '26',
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
            key: '27',
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
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                        <Breadcrumb.Item>Đăng kí</Breadcrumb.Item>
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
                                    {/*start is here*/}
                                    {/*<Spin spinning={spinning} tip="Loading..."/>*/}
                                    <Spin spinning={spinning} percent={percent} fullscreen />
                                    <div
                                        className="mt-3.5 flex flex-1 flex-col gap-16 self-center md:self-stretch sm:gap-8">
                                        <Heading
                                            size="text2xl"
                                            as="h1"
                                            className="text-[30px] font-medium text-black-900 md:ml-0 md:text-[28px] sm:text-[26px]"
                                        >
                                            Đăng kí sản phẩm
                                        </Heading>


                                        <Descriptions layout="vertical" bordered
                                            items={imeiCheck} />

                                        <Descriptions layout="vertical" bordered
                                            items={fieldReponse} />


                                        <Descriptions layout="vertical" bordered
                                            items={items} />

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
                                                        <Checkbox onChange={onChange} />
                                                        <span className="flex-1">
                                                            Tôi xác nhận rằng tất cả thông tin, hình ảnh và mô tả sản phẩm mà tôi cung cấp là chính xác, đầy đủ,
                                                            và không gây hiểu nhầm cho người mua. Tôi đồng ý chịu trách nhiệm về tính chính xác của thông tin này.
                                                            Vui lòng tham khảo thêm <a href="/Policy"
                                                                className="text-blue-500 hover:underline">Điều khoản dịch vụ</a>.
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-2 max-w-4xl mx-auto">
                                                        <Checkbox onChange={onChange} />
                                                        <span className="flex-1">
                                                            Tôi đồng ý rằng mọi hành vi vi phạm quy định về thông tin sản phẩm hoặc quy trình giao dịch có thể dẫn đến
                                                            các hình phạt do hệ thống áp dụng. Chi tiết có thể xem tại
                                                            <a href="/Policy" className="text-blue-500 hover:underline"> Chính sách đăng bán sản phẩm</a>.
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-6 max-w-4xl mx-auto">
                                                        <Checkbox onChange={onChange} />
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
                <FooterBK />
                <Modal
                    title="Thông tin về IMEI"
                    visible={isModalVisible}
                    onOk={handleModalClose}
                    onCancel={handleModalClose}
                >
                    <h3 className="text-lg font-bold mb-2">IMEI là gì?</h3>
                    <p>
                        IMEI (International Mobile Equipment Identity) là một mã số nhận dạng duy nhất được gán cho mỗi điện thoại di động hoặc thiết bị hỗ trợ SIM.
                        Mã này giúp xác định chính xác thiết bị của bạn trên mạng di động.
                    </p>

                    <h3 className="text-lg font-bold mt-4 mb-2">Cách lấy IMEI từ điện thoại:</h3>
                    <ul className="list-disc ml-5">
                        <li>Nhấn <strong>*#06#</strong> trên bàn phím cuộc gọi và mã IMEI sẽ hiển thị trên màn hình.</li>
                        <li>Vào <strong>Cài đặt</strong> (Settings) &rarr; <strong>Giới thiệu về điện thoại</strong> (About phone) &rarr; <strong>Trạng thái</strong> (Status) để tìm mã IMEI.</li>
                        <li>Mã IMEI cũng thường được in trên hộp đựng sản phẩm hoặc mặt sau của điện thoại (nếu có thể tháo rời pin).</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-4 mb-2">Lưu ý:</h3>
                    <p>
                        - IMEI chỉ chứa các ký tự số (15 chữ số). <br />
                        - Không chia sẻ IMEI công khai để tránh bị lạm dụng.
                    </p>


                </Modal>

            </Layout>
        </>
    );
}

export default RegisterProductPage;


