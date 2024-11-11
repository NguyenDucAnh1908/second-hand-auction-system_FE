import {Text, Heading, RatingBar, Img} from "./..";
import React, {useState} from "react";
import {Button, Input} from "@material-tailwind/react";
import {Image, Statistic, Col, Row, Checkbox, Modal, message, Card, Badge, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import {useAuctionRegisterMutation, useGetCheckAuctionRegisterQuery} from "@/services/auctionRegistrations.service.js";
import {selectIsLoggedIn} from "../../redux/auth/authSlice";
import {setCredentials} from "@/redux/auth/authSlice.js";
import {setError, setLoading} from "@/redux/user/userSlice.js";
import {useSelector} from "react-redux";
import { PlusSquareFilled, CheckCircleFilled} from '@ant-design/icons';
import CountUp from 'react-countup';
import "./indext.css"

const {Meta, Grid} = Card;
export default function CartItem({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuctionId, setSelectedAuctionId] = useState(product.itemId);
    const navigate = useNavigate();
    const formatter = (value) => <CountUp end={value} separator="."/>;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const auctionEndDate = product.auction?.endDate || null;
    const auctionEndTime = product.auction?.end_time || null;
    const handleNavigateToAuction = (itemId, auctionId) => {

        //localStorage.setItem('auctionItemId', auctionId);
        navigate(`/Auction/${itemId}`);
    };

    let deadline = null;
    if (auctionEndDate && auctionEndTime) {
        try {
            const dateTimeString = `${auctionEndDate}T${auctionEndTime}`;
            deadline = new Date(dateTimeString).getTime();

            if (isNaN(deadline)) {
                console.error("Invalid Date Format!");
            }
        } catch (error) {
            console.error("Error parsing date:", error);
        }
    }
    const {
        data: checkRegister,
        isLoading: isLoadingCheckRegister,
        isError: isErrorCheckRegister,
        error: errorCheckRegister
    } = useGetCheckAuctionRegisterQuery(selectedAuctionId ? {auctionId: selectedAuctionId} : null, {
        skip: !selectedAuctionId,
    });

    const isRegistered = checkRegister?.auctionId === selectedAuctionId && checkRegister?.registration_status === "CONFIRMED"
    // console.log("checkRegister", checkRegister)
    const [AuctionRegister, {isLoading: isLoadingAuctionRegister, error}] = useAuctionRegisterMutation();
    const handleSubmitAuctionRegister = async (e) => {
        e.preventDefault();

        try {
            const auctionData = {
                auction_id: product.itemId, // Giả sử product.itemId là auction_id
            };
            const response = await AuctionRegister(auctionData).unwrap();

            navigate(`/Auction/${product.itemId}`);
            message.success(response.message || "Register auction successfully!");
        } catch (error) {
            message.error("Failed to register auction.");
        }
    };
    const {Countdown} = Statistic;
    const showModal = () => {
        if (!isLoggedIn) {
            message.warning("Bạn cần đăng nhập để tham gia đấu giá!");
            navigate("/login");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <form>
                    <div className="mt-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="agreement"
                                className="h-5 w-5"
                            />
                            <span className="text-sm leading-5 text-gray-700">
                                Tôi đã đọc và nghiên cứu đầy đủ các thông tin của hồ sơ tham dự đấu giá. Tôi cam kết thực hiện đúng các quy định trong hồ sơ và quy định pháp luật liên quan.
                            </span>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-indigo-200 focus:shadow-outline-indigo active:bg-indigo-200 transition duration-150 ease-in-out"
                            onClick={handleSubmitAuctionRegister}
                        >
                            ĐĂNG KÝ THAM GIA ĐẤU GIÁ
                        </button>
                        <Button
                            onClick={handleCancel}
                            className="mt-4 w-full text-gray-600 hover:text-gray-800"
                        >
                            Đóng
                        </Button>
                    </div>
                </form>
            </Modal>
            <div className="m-4">
                <Badge.Ribbon text={
                    <Countdown
                        title="Auction ends in"
                        value={deadline}
                        format="D Ngày H giờ m phút s giây"
                        valueStyle={{fontWeight: 'small', fontSize: '15px'}}
                    />
                } color="rgba(255, 182, 193, 0.6)">
                    <Card
                        hoverable
                        style={{
                            width: 270,
                        }}
                        cover={
                            <div style={{width: '100%', paddingTop: '100%', position: 'relative'}}>
                                <img alt="example" src={product.thumbnail} style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}/>
                            </div>
                        }

                        actions={[
                                isRegistered ? (
                                        <CheckCircleFilled key="regisAuctioned"/>
                                ) : (
                                    <PlusSquareFilled onClick={showModal}
                                                      key="regisAuction"/>
                                )
                        ]}

                    >
                        <Meta
                            description={
                                <span className="description-hover">{product.scId.sub_category}</span>
                            }
                        />
                        <Meta
                            style={{
                                marginTop: 5,
                                textAlign: 'center',
                            }}
                            title={
                                <Typography.Text italic className="title-hover">
                                    {product.itemName}
                                </Typography.Text>
                            }
                            onClick={() => handleNavigateToAuction(product.itemId, product.auction.auction_id)}
                        />
                        <Meta
                            style={{
                                marginTop: 5,
                            }}
                            title={
                                <Statistic
                                    title="Giá khởi điểm"
                                    value={100000000}
                                    formatter={(value) => value.toLocaleString()}
                                    suffix={<span style={{fontSize: '12px'}}>VND</span>}
                                />
                            }
                            onClick={() => handleNavigateToAuction(product.itemId, product.auction.auction_id)}
                        />
                    </Card>
                </Badge.Ribbon>
            </div>
        </>
    );
}