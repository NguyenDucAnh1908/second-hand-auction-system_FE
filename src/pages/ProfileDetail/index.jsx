import {
    Heading
} from "../../components";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import React, {useEffect, useRef, useState} from "react";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { EditOutlined, UploadOutlined, LockOutlined } from "@ant-design/icons";
import {Breadcrumb, Button, Layout, Modal, Form, Input, Upload, theme, message, Spin} from "antd";
import { useGetUserByIdQuery, useChangePasswordMutation, useUpdateUserMutation } from "../../services/user.service";
import useHookUploadImage from "../../hooks/useHookUploadImage.js";
import { setUser, setLoading, setError } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";

const { Content, Sider } = Layout;

export default function ProfileDetailPage() {
    const [modal2Open, setModal2Open] = useState(false);
    const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const userRef = useRef();
    const errRef = useRef();
    const { UploadImage } = useHookUploadImage();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    // const [changePassword, { isLoading: isLoadingchangePassword }] = useChangePasswordMutation();
    const [changePassword, { isLoading: isLoadingChangePassword }] = useChangePasswordMutation();
    const [updateUser, { isLoading: isLoadingupdateUser }] = useUpdateUserMutation();

    const { data: user1, error, isLoading: isUserLoading, refetch  } = useGetUserByIdQuery();
    // console.log("DATA", user1)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
            });
        }
    }, [user, form]);
    // const handleUpdateUser = async (values) => {
    //     const { fullName, phoneNumber, avatar } = values; // Đảm bảo rằng avatar được lấy từ form
    //
    //     try {
    //         let avatarUrl = ""; // Khởi tạo biến avatarUrl
    //
    //         // Nếu có file avatar, upload và lấy URL
    //         if (avatar && avatar.length > 0) {
    //             const file = avatar[0].originFileObj;
    //             avatarUrl = await UploadImage(file);
    //         }
    //
    //         // Gọi API updateUser với body yêu cầu
    //         const response = await updateUser({
    //             fullName,
    //             phoneNumber,
    //             avatarUrl: avatarUrl || user1?.avatarUrl,
    //         }).unwrap();
    //
    //         // Hiển thị thông báo thành công
    //         message.success(response.message || "User updated successfully!");
    //         setModalPasswordOpen(false);
    //         form.resetFields();
    //     } catch (err) {
    //         console.error("Update user error:", err);
    //
    //         const errorMessage = err?.data?.message || "Failed to update user";
    //         message.error(errorMessage);
    //         errRef.current?.focus();
    //     }
    // };
    const handleUpdateUser = async (values) => {
        const { fullName, phoneNumber, avatar } = values; // Lấy thông tin từ form

        try {
            dispatch(setLoading(true));
            let avatarUrl = ""; // Khởi tạo biến avatarUrl

            // Nếu có file avatar, upload và lấy URL
            if (avatar && avatar.length > 0) {
                const file = avatar[0].originFileObj; // Lấy file từ avatar
                avatarUrl = await UploadImage(file); // Upload hình ảnh và lấy URL
            }

            // Gọi API updateUser với body yêu cầu
            const response = await updateUser({
                fullName,
                phoneNumber,
                avatarUrl: avatarUrl || user1?.avatarUrl, // Sử dụng avatarUrl vừa upload hoặc giữ nguyên avatar cũ
            }).unwrap();

            // Cập nhật Redux state với thông tin mới
            dispatch(setUser(response.data));

            // Hiển thị thông báo thành công
            message.success(response.message || "Cập nhật tài khoản thành công!");
            setModal2Open(false);
            refetch();
        } catch (error) {
            dispatch(setError(error));
            message.error("Cập nhật tài khoản thất bại.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // const handleUpdateUser = async (values) => {
    //     try {
    //         dispatch(setLoading(true));
    //         const response = await updateUser(values).unwrap();
    //         dispatch(setUser(response.data)); // Cập nhật Redux state với thông tin mới
    //         console.log("CHECK prodetail user: ", response.data)
    //         message.success("User updated successfully!");
    //         setModal2Open(false);
    //         refetch();
    //     } catch (error) {
    //         dispatch(setError(error));
    //         message.error("Failed to update user.");
    //     } finally {
    //         dispatch(setLoading(false));
    //     }
    // };

    const handleUpdatePassword = async (values) => {
        const { password, newPassword, confirmPassword } = values;
        if (newPassword !== confirmPassword) {
            message.error("Mật khẩu mới không khớp!");
            return;
        }

        try {
            // Gọi API changePassword
            const response = await changePassword({
                password,
                newPassword,
                confirmPassword,
            }).unwrap();

            // Hiển thị thông báo thành công
            message.success(response.message || "Mật khẩu mới đã được cập nhật!");
            setModalPasswordOpen(false);
            passwordForm.resetFields();
        } catch (err) {
            console.error("Lỗi khi đổi mật khẩu:", err);

            const errorMessage = err?.data?.message || "Đổi mật khẩu thất bại.";
            message.error(errorMessage);
            errRef.current?.focus();
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <>
            <Modal
                title="Cập nhật tài khoản"
                centered
                open={modal2Open}
                onOk={() => {
                    form.submit();
                }}
                okText="Cập nhật"
                onCancel={() => setModal2Open(false)}
            >
                {/* Sử dụng Spin để hiển thị loading cho toàn bộ form */}
                <Spin spinning={isLoadingupdateUser} tip="Đang cập nhật ...">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdateUser}
                        initialValues={{
                            fullName: user1?.fullName || '',
                            phoneNumber: user1?.phoneNumber || '',
                        }}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatar"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Chọn ảnh từ thiết bị để tải lên."
                        >
                            <Upload
                                name="avatar"
                                listType="picture"
                                beforeUpload={(file) => {
                                    const isImage = file.type.startsWith('image/');
                                    if (!isImage) {
                                        message.error('You can only upload image files!');
                                    }
                                    return isImage;
                                }}
                            >
                                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>

            <Modal
                title="Đổi mật khẩu"
                centered
                open={modalPasswordOpen}
                onOk={() => passwordForm.submit()} // Kích hoạt submit form
                onCancel={() => setModalPasswordOpen(false)}
                confirmLoading={isLoadingChangePassword} // Hiển thị loading khi đang gửi yêu cầu
            >
                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handleUpdatePassword} // Gọi API khi form submit thành công
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại của tài khoản!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới cho tài khoản!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu mới không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                </Form>
            </Modal>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header2 />
                <Content
                    style={{
                        padding: '0 48px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item>Hồ sơ</Breadcrumb.Item>
                        <Breadcrumb.Item>Thông tin</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        style={{
                            padding: '24px 0',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            flex: 1,
                        }}
                    >
                        <Sider style={{ background: colorBgContainer }} width={300}>
                            <SiderUserBK />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                                flex: 1,
                            }}
                        >
                            <div className="flex flex-col gap-4">
                                <Heading
                                    size="text3xl"
                                    as="h1"
                                    className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                                >
                                    Thông tin tài khoản
                                </Heading>
                                <div>
                                    <div className="bg-white overflow-hidden shadow rounded-lg border">
                                        <div style={{ display: "flex", justifyContent: "flex-end",gap: "16px", marginTop: "10px" }}>
                                            <Button
                                                icon={<EditOutlined style={{ fontSize: "30px" }}/>}
                                                type="text"
                                                onClick={() => setModal2Open(true)}
                                            ></Button>
                                            <Button
                                                icon={<LockOutlined style={{ fontSize: "30px", marginRight: "10px" }}/>}
                                                type="text"
                                                onClick={() => setModalPasswordOpen(true)}
                                            ></Button>
                                        </div>
                                        <div className="text-center my-4">
                                            <img
                                                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                                                src={user1?.avatar}
                                                alt={user1?.fullName}
                                            />
                                            <div className="py-2">
                                                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                                    {user1?.fullName}
                                                </h3>
                                                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                                    {user1?.location}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                            <dl className="sm:divide-y sm:divide-gray-200">
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">
                                                        Họ và tên:
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.fullName}
                                                    </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Email:</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.email}
                                                    </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Loại tài khoản:</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.role}
                                                    </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Số điện thoại:</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.phoneNumber}
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
                <FooterBK/>
            </Layout>
        </>
    );
}
