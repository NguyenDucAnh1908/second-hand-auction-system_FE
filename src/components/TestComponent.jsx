import React from "react";
import { Helmet } from "react-helmet";
import {
    Img,
    Text,
    ButtonDH,
    Heading,
    SelectBox,
    InputDH,
} from "../components";
import Header2 from "../components/Header2";
import FooterBK from "../components/FooterBK";
import ProfileCard from "../components/ProfileCard";
import AccountOptions from "../components/AccountOption";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {EditOutlined, LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

export default function TestComponent() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
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
                        <SiderUserBK/>
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                            flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="mr-1 md:mr-0">
                                <div className="flex flex-col items-start gap-1.5 self-end py-7">
                                    <Heading
                                        size="headingmd"
                                        as="h4"
                                        className="text-[16px] font-semibold text-blue_gray-900_01"
                                    >
                                        Thông tin tài khoản{" "}
                                    </Heading>
                                    <div className="h-[2px] w-[14%] bg-blue_gray-900_01" />
                                </div>
                            </div>
                            <div>

                                <div className="bg-white overflow-hidden shadow rounded-lg border">
                                    <div
                                        style={{ display: "flex", justifyContent: "flex-end" }}
                                    >
                                        <Button
                                            type="text"
                                        ></Button>
                                    </div>
                                    <div className="text-center my-4">
                                        <img
                                            className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                            src="https://randomuser.me/api/portraits/men/29.jpg"
                                            alt=""
                                        />
                                        <div className="py-2">
                                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                                Ronald Potter
                                            </h3>
                                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                                <svg
                                                    className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                >
                                                    <path
                                                        className=""
                                                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                                    />
                                                </svg>
                                                Glendale, BF
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Full name
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    John Doe
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Email address
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    johndoe@example.com
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Phone number
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    (123) 456-7890
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Address
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    123 Main St
                                                    <br />
                                                    Anytown, USA 12345
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </Layout>
    );
}
