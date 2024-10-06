import React from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Text } from "../Text/index.jsx";
import "./index.css";

// Các tùy chọn trong dropdown
const dropDownOptions = [
  {
    label: "Option1",
    value: "option1",
    subItems: [
      { label: "SubOption 1-1", value: "subOption1-1" },
      { label: "SubOption 1-2", value: "subOption1-2" },
    ],
  },
  {
    label: "Option2",
    value: "option2",
    subItems: [
      { label: "SubOption 2-1", value: "subOption2-1" },
      { label: "SubOption 2-2", value: "subOption2-2" },
    ],
  },
  { label: "Option3", value: "option3" },
];

// Tạo menu từ các options và sub-options
const createMenu = (options) => {
  return (
    <Menu>
      {options.map((option) =>
        option.subItems ? (
          <Menu.SubMenu
            key={option.value}
            title={option.label}
            className="custom-submenu-title" // Áp dụng cho Option1, Option2
          >
            {option.subItems.map((subItem) => (
              <Menu.Item
                key={subItem.value}
                className="custom-menu-item" // Áp dụng cho SubOption1-1, SubOption1-2
              >
                {subItem.label}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={option.value}
            className="custom-menu-item" // Áp dụng cho các Option khác
          >
            {option.label}
          </Menu.Item>
        ),
      )}
    </Menu>
  );
};

const NavBar = () => {
  return (
    <div className="container-xs mt-1.5 flex flex-col items-start md:px-5">
      <div className="flex w-[62%] items-start justify-between gap-5 md:w-full md:flex-col">
        {/* Sử dụng Dropdown */}
        <Dropdown
          overlay={createMenu(dropDownOptions)}
          trigger={["hover"]} // Sử dụng hover để hiển thị
          overlayClassName="custom-dropdown" // Thêm lớp tùy chỉnh
        >
          <a className="w-[38%] bg-green-a700 py-[18px] pl-[22px] pr-8 text-[16px] font-semibold text-white flex items-center justify-between hover:bg-green-600 transition duration-200">
            Danh mục <DownOutlined />
          </a>
        </Dropdown>
        <ul className="!mt-3.5 flex flex-wrap gap-[66px] md:gap-5">
          <li>
            <a href="#">
              <Text className="text-[16px] font-medium text-blue_gray-900_01 hover:text-green-a700 transition duration-200">
                Trang chủ
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text className="text-[16px] font-medium text-blue_gray-900_01 hover:text-green-a700 transition duration-200">
                Sản phẩm
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text className="text-[16px] font-medium text-blue_gray-900_01 hover:text-green-a700 transition duration-200">
                Liên hệ
              </Text>
            </a>
          </li>
          <li>
            <a href="#">
              <Text className="text-[16px] font-medium text-blue_gray-900_01 hover:text-green-a700 transition duration-200">
                Bài viết
              </Text>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
