import { Helmet } from "react-helmet";
import { InputDH, Img, Heading, ButtonDH } from "../../components";
import { CloseSVG } from "../../components/InputDH/close.jsx";
import UserAddressProfile from "../../components/UserAddressProfile";
import Header2 from "../../components/Header2";
import React, { Suspense, useState } from "react";
import ProfileCard from "../../components/ProfileCard";
import AccountOptions from "../../components/AccountOption";
import { Button, Modal, message, Popconfirm, Radio  } from "antd";
import FooterBK from "../../components/FooterBK/index.jsx";
import {FormAddAddress} from "./FormAddAddress.jsx";
import {FormUpdateAddress} from "./FormUpdateAddress.jsx";
import {SiderUserBK} from "@/components/SiderUser/SiderUserBK.jsx";

const addressList = [
  {
    userImage: "images/img_contrast.svg",
    userTitle: "Home",
    userAddress: (
      <>
        {" "}
        90/2/2 đường 11
        <br /> Linh xuân
        <br /> Thành phố Thủ Đức
      </>
    ),
    editButtonLabel: "Sửa",
    deleteButtonLabel: "Xóa",
  },
  {
    userImage: "images/img_contrast.svg",
    userTitle: "Home",
    userAddress: (
      <>
        {" "}
        90/2/2 đường 11
        <br /> Linh xuân
        <br /> Thành phố Thủ Đức
      </>
    ),
    editButtonLabel: "Sửa",
    deleteButtonLabel: "Xóa",
  },
  {
    userImage: "images/img_contrast.svg",
    userTitle: "Home",
    userAddress: (
      <>
        {" "}
        90/2/2 đường 11
        <br /> Linh xuân
        <br /> Thành phố Thủ Đức
      </>
    ),
    editButtonLabel: "Sửa",
    deleteButtonLabel: "Xóa",
  },
];

export default function AddressPage() {
  const [searchBarValue1, setSearchBarValue1] = React.useState("");
  const [open, setOpen] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const showModal = () => {
    setOpen(true);
  };
  const showUpdateAddress = () => {
    setUpdateAddress(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleUpdateAddress = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setUpdateAddress(false);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancelUpdateAddress = () => {
    console.log("Clicked cancel button");
    setUpdateAddress(false);
  };
  const handleRadioChange = (index) => {
    setSelectedAddress(index);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      {/*New Address*/}
      <Modal
          title="New Address"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Lưu địa chỉ" // Tùy chỉnh chữ cho nút OK
          cancelText="Hủy" // Tùy chỉnh chữ cho nút Cancel
      >
        <FormAddAddress />
      </Modal>
      {/*Update Address*/}
      <Modal
        title="Update Address"
        open={updateAddress}
        onOk={handleUpdateAddress}
        confirmLoading={confirmLoading}
        onCancel={handleCancelUpdateAddress}
      >
        <FormUpdateAddress />
      </Modal>
      <Helmet>
        <title>Manage Your Address Book - Update Shipping Information</title>
        <meta
          name="description"
          content="Easily add, edit, or delete shipping addresses in your EZShop account. Ensure your delivery details are up-to-date for a seamless shopping experience."
        />
      </Helmet>
      <div className="flex w-full justify-center bg-bg-white p-6 sm:p-5">
        <div className="w-[94%] md:w-full">
          <div className="flex w-full flex-col gap-7 md:px-5">
            <Header2 />
            <div className="flex items-start gap-12 ">
              <div className="w-[24%] mt-[10]">
                {/*<ProfileCard />*/}

                {/*<AccountOptions />*/}
                <SiderUserBK/>
              </div>

              <div className="relative h-[904px] flex-1">
                <div className="absolute bottom-0 left-0 right-0 top-0 my-auto ml-1 mr-2 flex h-max flex-1 rounded-[16px] bg-gray-100 px-[22px] py-2.5 md:mx-0 sm:px-5">
                  <Heading
                    size="text3xl"
                    as="h1"
                    className="mb-[846px] text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
                  >
                    Quản Lý Địa Chỉ
                  </Heading>
                </div>
                <div className="absolute bottom-px left-0 right-0 m-auto flex flex-1 flex-col gap-10 rounded-[14px] bg-bg-white px-3.5 py-[26px] shadow-sm sm:py-5">
                  <div className="ml-3 flex items-center justify-between gap-5 md:ml-0 md:flex-col">
                    <InputDH
                      shape="round"
                      name="Search Field"
                      placeholder={`Tìm kiếm`}
                      value={searchBarValue1}
                      onChange={(e) => setSearchBarValue1(e.target.value)}
                      suffix={
                        searchBarValue1?.length > 0 ? (
                          <CloseSVG
                            onClick={() => setSearchBarValue1("")}
                            height={18}
                            width={26}
                            fillColor="#041e42ff"
                          />
                        ) : (
                          <Img
                            src="images/img_search.svg"
                            alt="Search 1"
                            className="h-[18px] w-[26px]"
                          />
                        )
                      }
                      className="w-[58%] gap-4 rounded-md border px-3.5 md:w-full"
                    />
                    {/*<button type="button"*/}
                    {/*        className="min-w-[172px] bg-red-300 rounded-md border border-solid border-green-a700 px-[33px] font-medium text-sm py-2.5 text-center me-2 mb-2 hover:bg-red-400 hover:border-green-500 focus:ring-4 focus:outline-none focus:ring-green-300">*/}
                    {/*    Thêm địa chỉ*/}
                    {/*</button>*/}
                    <Button
                      type="primary"
                      onClick={showModal}
                      className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Thêm Địa Chỉ
                    </Button>
                  </div>

                  <div className="mx-3 mb-[418px] md:mx-0">
                    <div className="relative z-[2] mr-5 flex flex-wrap gap-6 md:mr-0">
                      <Suspense fallback={<div>Loading feed...</div>}>
                        {addressList.map((d, index) => (
                          <div
                            className="bg-white hover:bg-green-400 transition-colors duration-300 rounded-lg shadow-md border border-gray-300 p-5 flex-1 min-w-[250px] max-w-[300px] flex flex-col" // Màu nền ban đầu là trắng, đổi sang xanh lá khi hover
                            key={"addressesList" + index}
                          >
                            <div className="flex items-center">
                              <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Radio
                                    value={index}
                                    checked={selectedAddress === index}
                                    onChange={() => handleRadioChange(index)}
                                />
                              </Popconfirm>
                              <label
                                htmlFor={`addressRadio${index}`}
                                className="font-semibold"
                              >
                                {d.userTitle}
                              </label>
                            </div>
                            <div className="text-gray-600">{d.userAddress}</div>
                            <div className="flex justify-between mt-2">
                              <Button
                                type="primary"
                                onClick={showUpdateAddress}
                                className="text-white-a700_4c-500"
                              >
                                Update
                              </Button>
                              <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button className="text-red-500">
                                  {d.deleteButtonLabel}
                                </button>
                              </Popconfirm>
                            </div>
                          </div>
                        ))}
                      </Suspense>
                    </div>
                    <div className="relative mt-[-2px] h-px bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[194px] self-stretch">
            <FooterBK className="mt-[34px] h-[388px] bg-[url(/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
