import { useEffect } from "react";
import { Button, Result, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { useLazyGetResultVNPayQuery } from "@/services/withdrawRequest.Service.js";

const SuccessfullyPayment = () => {
    const navigate = useNavigate();
    const transactionId = localStorage.getItem("transactionId");

    // Using lazy hook to fetch transaction information when needed
    const [getResultVNPay, { data, error, isLoading }] = useLazyGetResultVNPayQuery();

    useEffect(() => {
        if (transactionId) {
            // Call getResultVNPay with transactionId when component mounts
            getResultVNPay({ transactionId });
        }
    }, [transactionId, getResultVNPay]);

    useEffect(() => {
        if (data) {
            console.log("Transaction Data:", data);
            // Clear transactionId from localStorage if necessary
            localStorage.removeItem("transactionId");
        }

        if (error) {
            console.error("Error fetching transaction:", error);
            // Optional: You might want to show a notification to the user about the error
        }
    }, [data, error]);

    const navigateToTransaction = () => {
        navigate("/HistoryPage");
    };

    return (
        <div>
            {isLoading ? (
                <Spin size="large" tip="Đang xử lý thông tin giao dịch..." />
            ) : (
                <Result
                    status="success"
                    title="Nạp tiền thành công!"
                    subTitle={data ? "Thông tin giao dịch đã được xử lý." : "Có lỗi xảy ra. Vui lòng thử lại."}
                    extra={[
                        <Button onClick={navigateToTransaction} type="primary" key="console">
                            Go to Transaction History
                        </Button>
                    ]}
                />
            )}
        </div>
    );
};

export default SuccessfullyPayment;
