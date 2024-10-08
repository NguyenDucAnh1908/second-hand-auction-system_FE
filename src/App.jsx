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
import StaffProductListPage from "./pages/Admin/StaffProductList/index.jsx";
import ListOfBuyerBids from "./pages/ListOfBuyerBids/index.jsx";

import KYCOnePage from "./pages/Seller/Kyc1/index.jsx";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="HomePage" index element={<HomePage/>}/>
                <Route path="Product" index element={<Product/>}/>
                <Route path="Auction" index element={<Auction/>}/>
                <Route path="Login" index element={<Login/>}/>
                <Route path="Register" index element={<Register/>}/>

                {/* buyer */}
                <Route path="HistoryPage" index element={<CustomerTransactionHistoryPagePage/>}/>
                <Route path="ProfileDetail" index element={<ProfileDetailPage/>}/>
                <Route path="DepositMoney" index element={<DepositMoneyPage/>}/>
                <Route path="Address" index element={<AddressPage/>}/>
                <Route path="ListOfBuyerBids" index element={<ListOfBuyerBids/>}/>
                <Route path="KYCOnePage" index element={<KYCOnePage/>}/>
                <Route path="TestComponent" index element={<TestComponent/>}/>
                <Route path="Test" index element={<TestAPI/>}/>
                <Route path="NotFound" index element={<NotFound/>}/>
            </Route>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/auth/*" element={<Auth/>}/>
            <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>

            {/* seller */}
            <Route path="/dashboard-seller/*" element={<DashboardSeller />} /> 
            <Route path="RegisterProduct" index element={<RegisterProductPage/>}/>
            <Route path="ListOfSellerProduct" index element={<ListOfSellerProductPage/>}/>
        </Routes>
    );
}

export default App;

