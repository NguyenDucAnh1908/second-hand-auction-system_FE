import StatusOrderSeller from "./StatusOrderSeller";
import OrderManagementSectionSeller from "./OrderManagementSectionSeller";
import { Tabs } from "react-tabs";
import React, {useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import Banner from '../../../partials/Banner';
import { Breadcrumb, Layout, Menu, theme} from 'antd';
import FooterBK from "@/components/FooterBK/index.jsx";
const {Content, Sider} = Layout;
export default function OrderManagementSeller() {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <div className="w-full ">
                <Tabs
                    className="mb-1 flex flex-col gap-12"
                    selectedTabClassName=""
                    selectedTabPanelClassName="tab-panel--selected"
                >
                  <StatusOrderSeller/>
                  <OrderManagementSectionSeller/>
                </Tabs>
              </div>
            </Content>
          </Layout>
        </Content>
        <FooterBK/>
      </Layout>
    </>
  );
}



