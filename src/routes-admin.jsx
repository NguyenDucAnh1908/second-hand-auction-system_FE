import {
    CheckBadgeIcon,
    CreditCardIcon,
    HomeIcon,
    PlusCircleIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {Home} from "./pages/Admin/Dashboard";
import AppraisalFormPage from "./pages/Admin/AppraisalForm/index.jsx";
import StaffProductListPage from "./pages/Admin/StaffProductList/index.jsx";
import CreateAuction from "./pages/Admin/CreateAuction/index.jsx";
import StoreOrders from "pages/Admin/StoreOrders/index.jsx";
import KiemduyetStaffPage from "./pages/Kyc/Kyc.jsx";
import ManagementTransactions from "./pages/Admin/ManagementTransactions/index.jsx";
import ManagementWindrawOfSeller from "./pages/Admin/ManageWithdraw/index.jsx";
import Payment from "./pages/Admin/Payment/index.jsx";
import ManageKYC from "./pages/Admin/ManageKYC/index.jsx";
import ProductPending from "./pages/Admin/ManageProduct/index.jsx";
import ManageUser from "./pages/Admin/ManageUser/index.jsx";
import ManageListCreateAuctionProduct from "pages/Admin/ManageListCreateAuctionProduct/index.jsx";
import {CreditCardOutlined, IdcardOutlined} from "@ant-design/icons";

const icon = {
    className: "w-5 h-5 text-inherit",
};



export const routesAdmin = [
    {
        title: "Tổng quan hệ thống",
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "Thống kê",
                path: "/home",
                element: <Home />,
                allowedRoles: ["ADMIN", "STAFF"],
            }
        ],
    },
    {
        title: "Quản lý ",
        layout: "dashboard",
        pages: [
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Người dùng",
                path: "/ManageUsers",
                element: <ManageUser/>,
                //element: <ManageUser />,
                allowedRoles: ["ADMIN"],
            },
            {
                icon: <ShoppingBagIcon  {...icon} />,
                name: "Phiên đấu giá",
                path: "/StaffProductList",
                element: <StaffProductListPage/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {
                icon: <CheckBadgeIcon {...icon} />,
                name: "Thẩm định",
                path: "/ProductPending",
                element: <ProductPending/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {
                icon: <PlusCircleIcon {...icon} />,
                name: "Tạo phiên đấu giá",
                path: "/auction-create-list",
                element: <ManageListCreateAuctionProduct/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
           
            // {
            //     icon: <UserCircleIcon {...icon} />,
            //     name: "Quản Lý FeedBack",
            //     path: "/ManageFeedback",
            //     element: <ManageFeedback/>,
            // },
            {
                icon: <ShoppingCartIcon {...icon} />,
                name: "Đơn hàng",
                path: "/StoreOrders",
                //element: <OrderManagementAdmin />,
                element: <StoreOrders/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {
                // icon: <UserCircleIcon {...icon} />,
                // name: "Thẩm định sản phẩm",
                path: "/AppraisalForm/:itemId",
                element: <AppraisalFormPage/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {

                path: "/KiemduyetStaffPage/:id",
                element: <KiemduyetStaffPage/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {
                // icon: <UserCircleIcon {...icon} />,
                // name: "Tạo phiên đấu giá",
                path: "/CreateAuction/:itemId",
                element: <CreateAuction/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
        ],
    },
    {
        title: "Giao dịch",
        layout: "dashboard",
        pages: [
            {
                icon: <CreditCardIcon  {...icon} />,
                name: "Tổng quan",
                path: "/managementTransactions",
                element: <ManagementTransactions/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            {
                icon: <CreditCardOutlined {...icon} />,
                name: "Đơn rút tiền sellers",
                path: "/managementWithdrawOfSeller",
                element: <ManagementWindrawOfSeller/>,
                allowedRoles: ["ADMIN", "STAFF"],
            }, {
                icon: <IdcardOutlined  {...icon} />,
                name: "Danh sach KYC",
                path: "/managementKYC",
                element: <ManageKYC/>,
                allowedRoles: ["ADMIN", "STAFF"],
            },
            // {
            //     icon: <InformationCircleIcon {...icon} />,
            //     name: "notifications",
            //     path: "/notifications",
            //     element: <Notifications/>,
            // },
            {
                // icon: <InformationCircleIcon {...icon} />,
                // name: "Payments",
                path: "/payments/:id",
                element: <Payment/>,
            },
        ],
    },
];

export default routesAdmin;
