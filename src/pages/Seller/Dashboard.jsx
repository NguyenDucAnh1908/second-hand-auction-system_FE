import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';
import Banner from '../../partials/Banner';
import FooterBK from '../../components/FooterBK';

const { Content, Sider } = Layout;

function DashboardSeller() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Content
        style={{
          padding: '0 48px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Breadcrumb Section */}
        <div style={{ margin: '16px 0' }}>
          {/* You can add breadcrumb here if needed */}
        </div>

        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={300}>
            <Sidebar />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
              flex: 1,
            }}
          >
            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50">
              <h1 className="text-2xl font-bold mb-6">Thống kê</h1>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-12 gap-6">
                <DashboardCard04 />
              </div>
            </div>

            {/* Banner Section */}
            <Banner />
          </Content>
        </Layout>
      </Content>

      <FooterBK />
    </Layout>
  );
}

export default DashboardSeller;
