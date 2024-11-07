import React from "react";
import {Helmet} from "react-helmet";
import {
    Img,
    Text,
    ButtonDH,
    Heading,
    SelectBox,
    InputDH,
} from "../components";
import Header2 from "../components/Header2";
import FooterBK from "../components/FooterBK";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";
import {LaptopOutlined, NotificationOutlined, UserOutlined, HeartOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {
    IconButton,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

//const {Content, Sider} = Layout;
const { Content } = Layout;
import FaEthereum from "../assets/Ethereum.svg"

// const AuctionItem = ({item}) => {
//     return (
//         <Card className="w-96">
//             <CardHeader shadow={false} floated={false} className="h-96">
//                 <img
//                     src={item.image}
//                     alt="card-image"
//                     className="h-full w-full object-cover"
//                 />
//                 <div className="absolute top-2 right-2 bg-pink-500 text-white text-sm px-2 py-1 rounded">
//                     Auction ends in {item.auctionEndTime}
//                 </div>
//             </CardHeader>
//             <CardBody>
//                 <Typography color="blue-gray" className="font-medium text-sm">
//                     {item.category}
//                 </Typography>
//                 <div className="mb-2 flex items-center justify-between">
//                     <Typography color="blue-gray" className="font-bold">
//                         {item.title}
//                     </Typography>
//                     <IconButton>
//                         <HeartOutlined/>
//                     </IconButton>
//                     {/*<Typography color="blue-gray" className="font-medium">*/}
//                     {/*    $95.00*/}
//                     {/*</Typography>*/}
//                 </div>
//                 <div className="inline-flex items-center gap-1">
//                     <Typography
//                         variant="small"
//                         color="gray"
//                         className="font-normal opacity-75"
//                     >
//                         Giá thầu hiện tại:
//                     </Typography>
//                     <Typography
//                         variant="small"
//                         color="gray"
//                         className="font-bold opacity-75"
//                     >
//                         {item.currentBid} VND
//                     </Typography>
//                 </div>
//             </CardBody>
//             <CardFooter className="pt-0">
//                 <Button
//                     ripple={false}
//                     fullWidth={true}
//                     className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
//                 >
//                     Tham gia đấu giá
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// };
const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
export default function TestComponent() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // const items = [
    //     {
    //         id: 876,
    //         image: 'https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/Screenshot%202024-10-07%20092226.png?alt=media&token=e8c98fb0-f818-4e76-9c00-aa48f948cc8f',
    //         title: 'Picture #876',
    //         category: 'Cosmic creatures',
    //         currentBid: '1.6',
    //         auctionEndTime: '23h:03m:33s',
    //     },
    //     {
    //         id: 877,
    //         image: 'https://firebasestorage.googleapis.com/v0/b/traveldb-64f9c.appspot.com/o/banner1.png?alt=media&token=5a7847a1-cdca-41da-b0bb-919db1f66f1b',
    //         title: 'Picture #877',
    //         category: 'Cosmic creatures',
    //         currentBid: '0.9',
    //         auctionEndTime: '23h:03m:33s',
    //     },
    //     {
    //         id: 878,
    //         image: 'https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
    //         title: 'Picture #878',
    //         category: 'Cosmic creatures',
    //         currentBid: '1.3',
    //         auctionEndTime: '23h:03m:33s',
    //     },
    // ];
    return (
        // <div className="container mx-auto p-4">
        //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //         {items.map((item) => (
        //             <AuctionItem key={item.id} item={item}/>
        //         ))}
        //     </div>
        // </div>

        <Layout>
            <Header2 />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </div>
            </Content>
            <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </Layout>
        // lauout Both the top navigation and the sidebar, commonly used in documentation site.
        // <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        //     <Header2 />
        //     <Content
        //         style={{
        //             padding: '0 48px',
        //             flex: 1, // Cho phép Content chiếm không gian còn lại
        //             display: 'flex', // Đặt display là flex để chứa nội dung
        //             flexDirection: 'column', // Hướng theo chiều dọc
        //         }}
        //     >
        //         <Breadcrumb
        //             style={{
        //                 margin: '16px 0',
        //             }}
        //         >
        //             <Breadcrumb.Item>Home</Breadcrumb.Item>
        //             <Breadcrumb.Item>List</Breadcrumb.Item>
        //             <Breadcrumb.Item>App</Breadcrumb.Item>
        //         </Breadcrumb>
        //         <Layout
        //             style={{
        //                 padding: '24px 0',
        //                 background: colorBgContainer,
        //                 borderRadius: borderRadiusLG,
        //                 flex: 1, // Để Layout chiếm hết không gian còn lại
        //             }}
        //         >
        //             <Sider
        //                 style={{
        //                     background: colorBgContainer,
        //                 }}
        //                 width={300}
        //             >
        //                 <SiderUserBK/>
        //             </Sider>
        //             <Content
        //                 style={{
        //                     padding: '0 24px',
        //                     minHeight: 280,
        //                     flex: 1, // Để Content bên trong chiếm hết không gian còn lại
        //                 }}
        //             >
        //                 Content
        //             </Content>
        //         </Layout>
        //     </Content>
        //     <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        // </Layout>
    );
}