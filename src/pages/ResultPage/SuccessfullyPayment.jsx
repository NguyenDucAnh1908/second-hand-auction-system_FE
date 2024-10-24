import React from "react";
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";

const SuccessfullyPayment = () => {
    const navigate = useNavigate();
    const navigateToTransaction = () => {
        navigate("/HistoryPage");
    };
    return (
        <div>
            <Result
                status="success"
                title="Nạp tiền thành công!"
                subTitle="please wait. them data o day nhe"
                extra={[
                    <Button onClick={navigateToTransaction} type="primary" key="console">
                        Go History transaction
                    </Button>
                    // <Button key="buy">Buy Again</Button>,
                ]}
            />
        </div>
    );
};

export default SuccessfullyPayment;
