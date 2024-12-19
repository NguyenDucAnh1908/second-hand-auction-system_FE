import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidenav from "../widgets/layout/sidenav";
import DashboardNavbar from "../widgets/layout/dashboard-navbar";
import Configurator from "../widgets/layout/configurator";
import Footer from "../widgets/layout/footer";
import routesAdmin from "../routes-admin";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import {Breadcrumb, Layout, theme} from "antd";
import {selectCurrentUserAPI} from "@/redux/auth/authSlice.js";
import {useSelector} from "react-redux";
const {Content, Sider} = Layout;

// Lọc các routes dựa trên vai trò người dùng
const getFilteredRoutes = (routes, userRole) => {
    return routes
        .map((route) => ({
            ...route,
            pages: route.pages.filter((page) => {
                // Hiển thị trang nếu không có allowedRoles hoặc userRole nằm trong allowedRoles
                return !page.allowedRoles || page.allowedRoles.includes(userRole);
            }),
        }))
        .filter((route) => route.pages.length > 0); // Loại bỏ route không có pages
};

export function Dashboard() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    const userAPI = useSelector(selectCurrentUserAPI); // Lấy thông tin người dùng từ Redux
    const userRole = userAPI?.role; // Lấy role (ví dụ: "ADMIN", "STAFF")

    // Lọc các routes phù hợp với vai trò người dùng
    const filteredRoutes = getFilteredRoutes(routesAdmin, userRole);

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Content
                    style={{
                        padding: '0 0px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider
                            style={{
                                background: colorBgContainer,
                            }}
                            width={300}
                        >
                            <Sidenav
                                routes={filteredRoutes} // Routes đã được lọc
                                brandImg={
                                    sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                                }
                            />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            <DashboardNavbar />
                            <Configurator />
                            <IconButton
                                size="lg"
                                color="white"
                                className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                                ripple={false}
                                onClick={() => setOpenConfigurator(dispatch, true)}
                            >
                                <Cog6ToothIcon className="h-5 w-5" />
                            </IconButton>
                            <Routes>
                                {filteredRoutes.map(
                                    ({ layout, pages }) =>
                                        layout === "dashboard" &&
                                        pages.map(({ path, element }) => (
                                            <Route exact path={path} element={element} key={path} />
                                        )),
                                )}
                            </Routes>
                        </Content>
                        <div className="text-blue-gray-600">
                            <Footer />
                        </div>
                    </Layout>
                </Content>
            </Layout>
        </div>
    );
}

export default Dashboard;



// export function Dashboard() {
//     const {
//         token: {colorBgContainer, borderRadiusLG},
//     } = theme.useToken();
//   const [controller, dispatch] = useMaterialTailwindController();
//   const { sidenavType } = controller;
//
//   return (
//     <div className="min-h-screen bg-blue-gray-50/50">
//         <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//               {/*<DashboardNavbar />*/}
//              <Content
//                 style={{
//                     padding: '0 0px',
//                     flex: 1, // Cho phép Content chiếm không gian còn lại
//                     display: 'flex', // Đặt display là flex để chứa nội dung
//                     flexDirection: 'column', // Hướng theo chiều dọc
//                 }}
//             >
//                 {/*<Breadcrumb*/}
//                 {/*    style={{*/}
//                 {/*        margin: '16px 0',*/}
//                 {/*    }}*/}
//                 {/*>*/}
//                 {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
//                 {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
//                 {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
//                 {/*</Breadcrumb>*/}
//                  <Layout
//                      style={{
//                          padding: '24px 0',
//                          background: colorBgContainer,
//                          borderRadius: borderRadiusLG,
//                          flex: 1, // Để Layout chiếm hết không gian còn lại
//                      }}
//                  >
//                      <Sider
//                          style={{
//                              background: colorBgContainer,
//                          }}
//                          width={300}
//                      >
//                          <Sidenav
//                              routes={routesAdmin}
//                              brandImg={
//                                  sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
//                              }
//                          />
//                      </Sider>
//                      <Content
//                          style={{
//                              padding: '0 24px',
//                              minHeight: 280,
//                              flex: 1, // Để Content bên trong chiếm hết không gian còn lại
//                          }}
//                      >
//                          <DashboardNavbar/>
//                          <Configurator/>
//                          <IconButton
//                              size="lg"
//                              color="white"
//                              className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
//                              ripple={false}
//                              onClick={() => setOpenConfigurator(dispatch, true)}
//                          >
//                              <Cog6ToothIcon className="h-5 w-5"/>
//                          </IconButton>
//                          <Routes>
//                              {routesAdmin.map(
//                                  ({layout, pages}) =>
//                                      layout === "dashboard" &&
//                                      pages.map(({path, element}) => (
//                                          <Route exact path={path} element={element}/>
//                                      )),
//                              )}
//                          </Routes>
//
//                      </Content>
//                      <div className="text-blue-gray-600">
//                          <Footer/>
//                      </div>
//                  </Layout>
//              </Content>
//         </Layout>
//     </div>
//   );
// }
//
// Dashboard.displayName = "/src/layout/dashboard.jsx";
//
// export default Dashboard;
