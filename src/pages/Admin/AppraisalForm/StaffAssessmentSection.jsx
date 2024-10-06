import {ButtonDH, TextArea, Heading, Img} from "../../../components";
import React from "react";
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';

const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default function StaffAssessmentSection() {
    return (
        <>
            {/* staff assessment section */}
            <div className="mt-[76px] flex justify-center w-full">
                <div className="container-xs flex justify-center md:px-5 w-full">
                    <div className="flex w-full max-w-4xl flex-col items-center">
                        {/* Kết quả thẩm định */}
                        <Heading
                            size="textxl"
                            as="h2"
                            className="bg-green-a700_01 px-[34px] pb-1 text-[25px] font-medium text-white-a700 md:text-[23px] sm:px-5 sm:text-[21px] rounded-md text-center w-full"
                        >
                            Kết quả thẩm định
                        </Heading>
                        <div className="mt-5 flex w-full items-center">
                            <div className="flex items-center gap-3">
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                                </Upload>

                                {/* Tiêu đề "Giấy thẩm định" */}
                                <Heading
                                    size="textxs"
                                    as="h5"
                                    className="text-[15px] font-medium text-black-900"
                                >
                                    Giấy thẩm định
                                </Heading>
                            </div>
                        </div>
                        <div className="mt-[18px] w-full">
                            <div className="flex flex-col items-center w-full">
                                <Heading
                                    size="texts"
                                    as="h6"
                                    className="self-start font-jost text-[16px] font-medium text-blue_gray-900"
                                >
                                    Ghi chú
                                </Heading>
                                <TextArea
                                    shape="round"
                                    name="Reason TextArea"
                                    placeholder={`Lý do`}
                                    className="mt-1 w-full rounded-md !border !border-gray-200 px-[18px] font-jost text-blue_gray-600 sm:pt-5"
                                />

                                {/* Buttons */}
                                <div className="mt-[66px] flex w-full justify-between gap-5 max-w-lg">
                                    <ButtonDH
                                        shape="round"
                                        className="w-full max-w-[200px] rounded-md px-[34px] bg-green-500 text-white hover:bg-green-600"
                                    >
                                        Phê duyệt
                                    </ButtonDH>
                                    <ButtonDH
                                        shape="round"
                                        className="w-full max-w-[200px] rounded-md px-[34px] bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Từ chối
                                    </ButtonDH>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
