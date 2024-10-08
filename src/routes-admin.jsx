import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "./pages/Admin/Dashboard";
import { SignIn, SignUp } from "./pages/Admin/auth";
import AppraisalFormPage from "./pages/Admin/AppraisalForm/index.jsx";
import StaffProductListPage from "./pages/Admin/StaffProductList/index.jsx";
import CreateAuction from "./pages/Admin/CreateAuction/index.jsx";
import ManageFeedback from "./pages/Admin/ManageFeedback/index.jsx";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routesAdmin = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard của admin",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Danh sách sản phẩm",
        path: "/StaffProductList",
        element: <StaffProductListPage />,
      },
      

      {
        icon: <UserCircleIcon {...icon} />,
        name: "Thẩm định sản phẩm",
        path: "/AppraisalForm",
        element: <AppraisalFormPage />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Tạo phiên đấu giá",
        path: "/CreateAuction",
        element: <CreateAuction />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Quản Lý FeedBack",
        path: "/ManageFeedback",
        element: <ManageFeedback />,
      },
      
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routesAdmin;
