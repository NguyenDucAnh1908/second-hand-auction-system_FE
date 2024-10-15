import {Helmet} from "react-helmet";
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
import React, {useState} from "react";
import {Select, Option} from "@material-tailwind/react";
import {UploadOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Upload, InputNumber, Image, Breadcrumb, Layout, Menu, theme} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";

const {Content, Sider} = Layout;

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
        token: {colorBgContainer, borderRadiusLG},
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
                                                                as="h3"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Tiêu đề
                                                            </Heading>
                                                            <InputDH
                                                                shape="round"
                                                                name="Title Field"
                                                                placeholder={`Tiêu đề sản phẩm`}
                                                                className="w-[88%] rounded-md border px-3.5 font-jost"
                                                            />
                                                        </div>
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
                                                            <TextArea
                                                                shape="round"
                                                                name="Description Area"
                                                                placeholder={`Mô tả`}
                                                                className="w-[88%] rounded-md !border !border-gray-200 px-5 font-jost leading-[10px] text-blue_gray-600"
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
                                                                    <Button icon={<UploadOutlined/>}>Click to
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
                                                                <Heading
                                                                    as="p"
                                                                    className="font-jost text-[16px] font-medium "
                                                                >
                                                                    Danh mục
                                                                </Heading>
                                                                <div className="w-72 mt-4">
                                                                    <Select label="Danh mục">
                                                                        <Option>Material Tailwind HTML</Option>
                                                                        <Option>Material Tailwind React</Option>
                                                                        <Option>Material Tailwind Vue</Option>
                                                                        <Option>Material Tailwind Angular</Option>
                                                                        <Option>Material Tailwind Svelte</Option>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex flex-col items-start justify-center gap-1 w-[50%] bg-white">
                                                                <Heading
                                                                    as="p"
                                                                    className="font-jost text-[16px] font-medium "
                                                                >
                                                                    Danh mục phụ
                                                                </Heading>
                                                                <div className="w-72 mt-4">
                                                                    <Select label="Danh mục phụ">
                                                                        <Option>Material Tailwind HTML</Option>
                                                                        <Option>Material Tailwind React</Option>
                                                                        <Option>Material Tailwind Vue</Option>
                                                                        <Option>Material Tailwind Angular</Option>
                                                                        <Option>Material Tailwind Svelte</Option>
                                                                    </Select>
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
                                                                <div className="w-72 mt-4">
                                                                    <Select label="Trình trạng">
                                                                        <Option>Material Tailwind HTML</Option>
                                                                        <Option>Material Tailwind React</Option>
                                                                        <Option>Material Tailwind Vue</Option>
                                                                        <Option>Material Tailwind Angular</Option>
                                                                        <Option>Material Tailwind Svelte</Option>
                                                                    </Select>
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
                                                            />
                                                        </div>
                                                        <div
                                                            className="flex flex-col items-start justify-center gap-1.5">
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
                                                        </div>
                                                    </div>
                                                    <div className="flex w-full flex-col items-end gap-5">
                                                        <div
                                                            className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Nguồn gốc/Xuất xứ
                                                            </Heading>
                                                            <TextArea
                                                                placeholder="Nguồn gốc/Xuất xứ"
                                                                autoSize={{
                                                                    minRows: 2,
                                                                    maxRows: 4,
                                                                }}
                                                                className="w-full h-1/4 p-3 rounded-md border border-gray-300"
                                                            />

                                                        </div>
                                                        <div
                                                            className="flex w-[86%] flex-col items-start justify-center gap-1 md:w-full">
                                                            <Heading
                                                                as="p"
                                                                className="font-jost text-[16px] font-medium text-blue_gray-900"
                                                            >
                                                                Giá trị định giá
                                                            </Heading>
                                                            <InputNumber min={1} addonBefore="+" addonAfter="VND"
                                                                         defaultValue={100}/>
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
                                                                <DatePicker
                                                                    selected={manufactureDate} // Sử dụng state manufactureDate
                                                                    onChange={(date) => setManufactureDate(date)} // Cập nhật state khi chọn ngày
                                                                    placeholderText="Chọn ngày sản xuất" // Placeholder
                                                                    className="gap-4 self-stretch rounded-md border border-solid border-gray-200 px-3 font-jost w-full"
                                                                    dateFormat="dd/MM/yyyy" // Định dạng ngày
                                                                    popperPlacement="bottom" // Đặt vị trí của popper (lịch) nếu cần
                                                                    isClearable // Cho phép xóa ngày đã chọn
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
                                                        className="min-w-[152px] rounded-md bg-green-500 text-white hover:bg-green-600" // Thêm màu nền và màu chữ cho nút "Gửi thẩm định"
                                                    >
                                                        Gửi thẩm định
                                                    </ButtonDH>
                                                    <ButtonDH
                                                        size="md"
                                                        className="min-w-[152px] rounded-md bg-red-500 text-white hover:bg-red-600" // Thêm màu nền và màu chữ cho nút "Hủy bỏ"
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
                </Content>
                <FooterBK/>
            </Layout>
        </>
    );
}

export default RegisterProductPage;


