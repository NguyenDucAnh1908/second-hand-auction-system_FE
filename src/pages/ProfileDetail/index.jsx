import {
    Heading
} from "../../components";
import Header2 from "../../components/Header2";
import FooterBK from "../../components/FooterBK";
import React, {useRef, useState} from "react";
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";
import { EditOutlined, UploadOutlined, LockOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Modal, Form, Input, Upload, theme, message } from "antd";
import { useGetUserByIdQuery, useChangePasswordMutation } from "../../services/user.service";
import {toast} from "react-toastify";

const { Content, Sider } = Layout;

export default function ProfileDetailPage() {
    const [modal2Open, setModal2Open] = useState(false);
    const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();
    const userRef = useRef();
    const errRef = useRef();
    // const [changePassword, { isLoading: isLoadingchangePassword }] = useChangePasswordMutation();
    const [changePassword, { isLoading: isLoadingChangePassword }] = useChangePasswordMutation();

    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user);
    const { data: user1, error, isLoading: isUserLoading } = useGetUserByIdQuery(userObject.id);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleUpdateUser = async (values) => {
        console.log(values);
    };

    const handleUpdatePassword = async (values) => {
        const { password, newPassword, confirmPassword } = values;

        // Kiểm tra nếu mật khẩu mới không khớp
        if (newPassword !== confirmPassword) {
            message.error("New passwords do not match!");
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
            message.success(response.message || "Password changed successfully!");
            setModalPasswordOpen(false);
            passwordForm.resetFields();
        } catch (err) {
            console.error("Change password error:", err);

            const errorMessage = err?.data?.message || "Failed to change password";
            message.error(errorMessage);
            errRef.current?.focus();
        }
    };
    // const handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const updatePassword = await changePassword({
    //             currentPassword, newPassword, confirmPassword
    //         }).unwrap();
    //         //console.log("Register data: ", userData.message)
    //         toast.success(updatePassword.message)
    //     } catch (err) {
    //         const errorMessage = err?.data?.message;
    //         toast.error(errorMessage);
    //         errRef.current.focus();
    //     }
    // };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <>
            <Modal
                title="Update Profile"
                centered
                open={modal2Open}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => setModal2Open(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdateUser}
                    initialValues={{
                        fullName: user1?.fullName || '',
                        email: user1?.email || '',
                    }}
                >
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Avatar"
                        name="avatar"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Select an image file to upload."
                    >
                        <Upload
                            name="avatar"
                            action="/upload.do"
                            listType="picture"
                            beforeUpload={(file) => {
                                return true; // Allow the upload to proceed
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Update Password"
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
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your new password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                </Form>
            </Modal>

            {/*<Modal*/}
            {/*    title="Update Password"*/}
            {/*    centered*/}
            {/*    open={modalPasswordOpen}*/}
            {/*    onOk={() => {*/}
            {/*        passwordForm.submit();*/}
            {/*    }}*/}
            {/*    onCancel={() => setModalPasswordOpen(false)}*/}
            {/*    confirmLoading={isLoading} // Show loading indicator*/}
            {/*>*/}
            {/*    <Form*/}
            {/*        form={passwordForm}*/}
            {/*        layout="vertical"*/}
            {/*        onFinish={handleUpdatePassword}*/}
            {/*    >*/}
            {/*        <Form.Item*/}
            {/*            label="Current Password"*/}
            {/*            name="currentPassword"*/}
            {/*            rules={[{ required: true, message: 'Please input your current password!' }]}*/}
            {/*        >*/}
            {/*            <Input.Password prefix={<LockOutlined />} />*/}
            {/*        </Form.Item>*/}
            {/*        <Form.Item*/}
            {/*            label="New Password"*/}
            {/*            name="newPassword"*/}
            {/*            rules={[{ required: true, message: 'Please input your new password!' }]}*/}
            {/*        >*/}
            {/*            <Input.Password prefix={<LockOutlined />} />*/}
            {/*        </Form.Item>*/}
            {/*        <Form.Item*/}
            {/*            label="Confirm New Password"*/}
            {/*            name="confirmPassword"*/}
            {/*            dependencies={['newPassword']}*/}
            {/*            rules={[*/}
            {/*                { required: true, message: 'Please confirm your new password!' },*/}
            {/*                ({ getFieldValue }) => ({*/}
            {/*                    validator(_, value) {*/}
            {/*                        if (!value || getFieldValue('newPassword') === value) {*/}
            {/*                            return Promise.resolve();*/}
            {/*                        }*/}
            {/*                        return Promise.reject(new Error('The two passwords that you entered do not match!'));*/}
            {/*                    },*/}
            {/*                }),*/}
            {/*            ]}*/}
            {/*        >*/}
            {/*            <Input.Password prefix={<LockOutlined />} />*/}
            {/*        </Form.Item>*/}
            {/*    </Form>*/}
            {/*</Modal>*/}

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
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
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
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button
                                                icon={<EditOutlined />}
                                                type="text"
                                                onClick={() => setModal2Open(true)}
                                            ></Button>
                                            <Button
                                                icon={<LockOutlined />}
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
                                                        Full name
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.fullName}
                                                    </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.email}
                                                    </dd>
                                                </div>
                                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                        {user1?.role}
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
                <FooterBK />
            </Layout>
        </>
    );
}
