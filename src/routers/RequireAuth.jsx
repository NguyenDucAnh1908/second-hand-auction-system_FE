/* eslint-disable react/prop-types */

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentToken } from "../redux/auth/authSlice";
import {notification} from "antd";

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);
  const location = useLocation();

  // Ensure role is an array, or set it to an empty array if null
  const rolesArray = Array.isArray(role) ? role : role ? [role] : [];

  const openNotification = (pauseOnHover) => {
    notification.open({
      message: 'Không có quyền truy cập',
      description: 'Bạn không có quyền truy cập vào trang này.',
      duration: 3,
      pauseOnHover,
    });
  };
  // if (!token) {
  //   return <Outlet />;
  // }
  if (token && rolesArray.some((r) => allowedRoles?.includes(r))) {
    return <Outlet />;
  } else if (token) {
    // Người dùng có token nhưng không có quyền, hiển thị thông báo
    openNotification(true);
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    // Người dùng không có token, điều hướng tới trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
