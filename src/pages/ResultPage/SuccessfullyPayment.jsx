// SuccessfullyPayment.jsx
import React, { useEffect } from "react";
import { Button, Result } from 'antd';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTransactionWalletByUserQuery } from "@/services/walletCustomerService";

const SuccessfullyPayment = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Lấy orderCode từ URL
    const orderCode = searchParams.get('orderCode');

    // Sử dụng hook để lấy thông tin giao dịch
    const { data, error, isLoading } = useGetTransactionWalletByUserQuery({ transactionCode: orderCode });

    useEffect(() => {
        if (data) {
            console.log("Transaction Data:", data);
            // Cập nhật trạng thái ở đây nếu cần
        }

        if (error) {
            console.error("Error fetching transaction:", error);
        }
    }, [data, error]);

    const navigateToTransaction = () => {
        navigate("/HistoryPage");
    };

    return (
        <div>
            <Result
                status="success"
                title="Nạp tiền thành công!"
                subTitle="Đang xử lý thông tin giao dịch..."
                extra={[
                    <Button onClick={navigateToTransaction} type="primary" key="console">
                        Go History transaction
                    </Button>
                ]}
            />
        </div>
    );
};

export default SuccessfullyPayment;
