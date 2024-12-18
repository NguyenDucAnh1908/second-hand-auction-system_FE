import React, { useEffect } from "react";
import { Modal, Form, DatePicker, Button } from "antd";
import dayjs from "dayjs";

// Component: AuctionFormModal
const AuctionFormModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialValues 
}) => {

    const [form] = Form.useForm();

    // Load initial values into the form when the modal opens
    useEffect(() => {
        if (isOpen && initialValues) {
            form.setFieldsValue({
                startTime: dayjs(`${initialValues.startDate} ${initialValues.start_time}`),
                endTime: dayjs(`${initialValues.endDate} ${initialValues.end_time}`)
            });
        }
    }, [isOpen, initialValues, form]);

    return (
        <Modal
            title="Chỉnh sửa thông tin đấu giá"
            open={isOpen}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSubmit(values);
                        onClose();
                    })
                    .catch(error => console.error(error));
            }}
            onCancel={onClose}
        >
            <Form 
                form={form} 
                layout="vertical"
                initialValues={initialValues}
            >
                <Form.Item 
                    label="Thời gian bắt đầu" 
                    name="startTime" 
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian bắt đầu' }]}
                >
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                </Form.Item>

                <Form.Item 
                    label="Thời gian kết thúc" 
                    name="endTime" 
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian kết thúc' }]}
                >
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AuctionFormModal;
