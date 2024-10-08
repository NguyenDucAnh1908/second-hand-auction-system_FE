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
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import { LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';

const {  Content, Sider } = Layout;

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
                        Content
                    </Content>
                </Layout>
            </Content>
            <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </Layout>
    );
}