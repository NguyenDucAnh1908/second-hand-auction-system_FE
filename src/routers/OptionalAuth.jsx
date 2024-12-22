import {useSelector} from "react-redux";
import {selectCurrentRole, selectCurrentToken} from "@/redux/auth/authSlice.js";
import {notification} from "antd";
import {Outlet} from "react-router-dom";

const OptionalAuth = () => {
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentRole);

    const openNotification = () => {
        notification.open({
            message: 'Thông báo',
            description: 'Bạn đang truy cập vào trang không yêu cầu đăng nhập.',
            duration: 2,
        });
    };

    // Nếu có token và role không phù hợp, chỉ hiển thị thông báo
    if (token && role !== "BUYER") {
        openNotification();
    }

    return <Outlet />;
};

export default OptionalAuth;
