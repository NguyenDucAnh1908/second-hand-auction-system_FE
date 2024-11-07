import { Helmet } from "react-helmet";
import { Text, Img, InputDH, Heading } from "../../components";
import Header2 from "../../components/Header2";
import ProductInfo from "../../components/ProductInfo"
import ProductInfo1 from "../../components/ProductInfo1";
import React, { Suspense } from "react";
import SellerDetailHeader from "../../components/SellerDetail";
import {Breadcrumb, Checkbox, Collapse, Layout, Menu, theme} from 'antd';
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import FooterBK from "@/components/FooterBK/index.jsx";
import Pagination from "@/components/Pagination/index.jsx";
import ProductDetails21 from "@/components/ProductDetails21/index.jsx";
import HorizontalTab from "../../components/HorizontalTabSeller";
const { Panel } = Collapse;
const {Content, Sider} = Layout;

const brands = [
    { name: "Apple", count: 87 },
    { name: "Asus", count: 92 },
    { name: "Acer", count: 123 },
    { name: "Dell", count: 49 },
    { name: "Lenovo", count: 12 },
];


export default function SellerDetailPage() {
   
    return (
        <>
            <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                <Header2/>
                <div
                    className="flex w-full flex-col items-center gap-[104px] overflow-auto bg-bg-white py-[66px] md:gap-[78px] md:py-5 sm:gap-[52px]">
                    <SellerDetailHeader/>
                </div>
                <HorizontalTab/>
              
                <FooterBK
                    className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto"/>
            </Layout>
        </>
    );
}



