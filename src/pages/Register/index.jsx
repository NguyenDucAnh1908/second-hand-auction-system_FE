import {Helmet} from "react-helmet";
import FooterBK from "../../components/FooterBK";
import RegisterSection from "./RegisterSection";
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useRegisterUserMutation} from "../../services/auth.service";
import {setCredentials} from "@/redux/auth/authSlice.js";
import {toast} from 'react-toastify'
import Toast from "@/components/Toast/index.jsx";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const dispatch = useDispatch();
    const [registerUser, {isLoading}] = useRegisterUserMutation();


    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    // useEffect(() => {
    //     setErrMsg("");
    // }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đăng ký và lấy dữ liệu trả về
            const userData = await registerUser({
                email, password, fullName, phoneNumber
            }).unwrap();
            console.log("Register dât: ",userData.message)
            toast.success(userData.message)
            //alert(userData.message || "User registered successfully");
        } catch (err) {
            // Kiểm tra nếu API trả về lỗi với trường 'message'
            const errorMessage = err?.data?.message || "Registration failed";
            toast.error(errorMessage);
            //alert(errorMessage);
            // Đưa focus vào element thông báo lỗi
            errRef.current.focus();
        }
    };

    return (

        <>
            <Toast/>
            <Helmet>
                <title>Create Your EZShop Account - Register Today</title>
                <meta
                    name="description"
                    content="Sign up for a new EZShop account to start shopping, save your wishlist, and manage your orders with ease. Join us for a seamless shopping experience!"
                />
            </Helmet>
            <div
                className="flex w-full flex-col gap-[100px] bg-gradient-to-b from-blue-gray-900 to-blue-black-900 text-white md:gap-[75px] sm:gap-[50px]"> {/* Gradient background */}
                {/* register section */}

                <RegisterSection
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    fullName={fullName}
                    setFullName={setFullName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />

            </div>
        </>
    );
}
