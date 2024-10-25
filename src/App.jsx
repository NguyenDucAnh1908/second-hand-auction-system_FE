import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import HomePage from "pages/HomePage";
import Product from "pages/Product";
import Auction from "pages/Auction";
import Login from "pages/Login";
import Register from "pages/Register";
import Layout from "./components/layout";
import CustomerTransactionHistoryPagePage from "pages/CustomerTransactionHistoryPage";
import TestAPI from "pages/TestAPI.jsx";
import ProfileDetailPage from "pages/ProfileDetail";
import DepositMoneyPage from "pages/DepositMoney";
import TestComponent from "./components/TestComponent.jsx";
import AddressPage from "pages/Address";
import ListOfSellerProductPage from "./pages/Seller/ListOfSellerProducts/index.jsx";
import RegisterProductPage from "./pages/Seller/RegisterProduct/index.jsx";
import Dashboard from "./layouts-admin/dashboard.jsx";
import Auth from "./layouts-admin/auth.jsx";
import DashboardSeller from "./pages/Seller/Dashboard.jsx";
import ListOfBuyerBids from "./pages/ListOfBuyerBids/index.jsx";
import KNCPage from "./pages/Kyc/RegisterKYC.jsx";
import OrderManagementBuyer from "./pages/OrderBuyer/index.jsx";
import OrderManagementSeller from "./pages/Seller/OrderSeller/index.jsx";
import ListOfSellerPage from "./pages/ListOfSeller/index.jsx";
import RegisterAuction from "./pages/RegisterAuction-Buyer/RegisterAuction.jsx";
import ForgotPassword from "./pages/ForgotPassword/index.jsx";
import VerifyAccount from "./pages/Register/VerifyAccount.jsx";
import WithdrawMoney from "./pages/Seller/WithdrawMoney/index.jsx";
import ListTransaction from "./pages/Seller/ListTransactions/index.jsx";
import SellerDetailPage from "./pages/SellerDetail/index.jsx";
import ListRegisterAuction from "./pages/ListRegisterAuction/index.jsx";
import AuctionListProcess from "./pages/AuctionListProcess/index.jsx";
import RequireAuth from "@/routers/RequireAuth.jsx";
import Unauthorized from "pages/Unauthorized.jsx";
import PaymentSuccess from "./pages/Payment/PaymentSuccess.jsx";

import SuccessfullyPayment from "pages/ResultPage/SuccessfullyPayment.jsx";
import FailPayment from "pages/ResultPage/FailPayment.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="HomePage" index element={<HomePage/>}/>
                <Route path="Product" index element={<Product/>}/>
                <Route path="Auction/:id" element={<Auction />} />
                <Route path="Login" index element={<Login/>}/>
                <Route path="Register" index element={<Register/>}/>
                <Route path="ForgotPassword" index element={<ForgotPassword/>}/>
                <Route path="VerifyAccount" index element={<VerifyAccount/>}/>
                <Route path="PaymentSuccess" index element={<PaymentSuccess/>}/>

                {/* Test */}
                <Route path="TestComponent" index element={<TestComponent/>}/>
                <Route path="Test" index element={<TestAPI/>}/>
                <Route path="NotFound" index element={<NotFound/>}/>
                <Route path="Unauthorized" index element={<Unauthorized/>}/>
                <Route path="SuccessfullyPayment" index element={<SuccessfullyPayment/>}/>
                <Route path="FailPayment" index element={<FailPayment/>}/>


                {/*ADMIN*/}
                <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                    <Route path="/dashboard/*" element={<Dashboard/>}/>
                    <Route path="/auth/*" element={<Auth/>}/>
                    <Route path="/dashboard/*" element={<Navigate to="/dashboard/home" replace/>}/>
                </Route>

                {/* seller */}
                <Route element={<RequireAuth allowedRoles={["SELLER"]}/>}>
                    <Route path="/dashboard-seller/*" element={<DashboardSeller/>}/>
                    <Route path="/dashboard-seller/RegisterProduct" index element={<RegisterProductPage/>}/>
                    <Route path="/dashboard-seller/WithdrawMoney" index element={<WithdrawMoney/>}/>
                    <Route path="/dashboard-seller/ListOfSellerProduct" index element={<ListOfSellerProductPage/>}/>
                    <Route path="/dashboard-seller/OrderManagementSeller" index element={<OrderManagementSeller/>}/>
                    <Route path="/dashboard-seller/ListTransaction" index element={<ListTransaction/>}/>
                </Route>

                {/*BUYER*/}
                <Route element={<RequireAuth allowedRoles={["BUYER"]} />}>
                    <Route path="HistoryPage" index element={<CustomerTransactionHistoryPagePage/>}/>
                    <Route path="ProfileDetail" index element={<ProfileDetailPage/>}/>
                    <Route path="DepositMoney" index element={<DepositMoneyPage/>}/>
                    <Route path="Address" index element={<AddressPage/>}/>
                    <Route path="ListOfBuyerBids" index element={<ListOfBuyerBids/>}/>
                    <Route path="RegisterKYC" index element={<KNCPage/>}/>
                    <Route path="OrderManagementBuyer" index element={<OrderManagementBuyer/>}/>
                    <Route path="ListOfSellerPage" index element={<ListOfSellerPage/>}/>
                    <Route path="SellerDetailPage" index element={<SellerDetailPage/>}/>
                    <Route path="ListRegisterAuction" index element={<ListRegisterAuction/>}/>
                    <Route path="AuctionListProcess" index element={<AuctionListProcess/>}/>
                </Route>
                {/*<Route element={<RequireAuth allowedRoles={["STAFF", "ADMIN"]}/>}>*/}

                {/*</Route>*/}
            </Route>
            <Route path="RegisterAuction" index element={<RegisterAuction/>}/>

        </Routes>
    );
}

export default App;

