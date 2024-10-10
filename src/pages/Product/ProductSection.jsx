import React, { useState, Suspense } from "react";
import { Text, SelectBox, Img, Heading } from "../../components";
import Pagination from "../../components/Pagination";
import ProductDetails21 from "../../components/ProductDetails21";
import { Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import RegisterAuction from "../RegisterAuction-Buyer/RegisterAuction";

const fashionItemsGrid = [
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  {
    productImage: "images/img_image_30_4.png",
    productTitle: "Thời trang",
    productDescription: "Áo Hoodie Nike dành cho mùa đông lạnh",
    reviewCount: "3,014 đánh giá",
    originalPrice: "328.000đ",
  },
  
  // ... (other items remain unchanged)
];

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function ProductSection({ selectedBrands, onTagClose }) {
  const [isOpen, setIsOpen] = useState(false); // State cho modal

  const handleClose = (brandName) => {
    onTagClose(brandName);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="mt-10 flex flex-col items-center self-stretch">
        <div className="flex items-center justify-between w-full">
          <span className="text-blue_gray-900_01">Filter:</span>

          <div className="flex items-center gap-2 ml-4">
            {selectedBrands.map((brand) => (
              <Tag
                key={brand}
                closeIcon={<CloseCircleOutlined />}
                onClose={() => handleClose(brand)}
              >
                {brand}
              </Tag>
            ))}
          </div>
          
          <select
            className="rounded-md border border-solid border-gray-200 text-blue_gray-900_01"
            defaultValue=""
          >
            <option value="" disabled hidden>
              Sắp xếp
            </option>
            <option value="low-to-high">Giá thấp đến cao</option>
            <option value="high-to-low">Giá cao đến thấp</option>
          </select>
        </div>

        <div className="mx-7 mt-5 grid grid-cols-4 justify-center gap-3.5 self-stretch px-1 md:mx-0 md:grid-cols-2 sm:grid-cols-1 ml-auto">
          <Suspense fallback={<div>Loading feed...</div>}>
            {fashionItemsGrid.map((item, index) => (
              <div key={"itemsGrid" + index} className="flex flex-col items-center border border-gray-300 rounded p-4">
                <a href="/Auction" target="_blank" rel="noopener noreferrer">
                  <ProductDetails21 {...item} />
                </a>
                <button
                  className="mt-2 bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600"
                  onClick={openModal} // Gọi hàm mở modal
                >
                  Tham gia đấu giá
                </button>
              </div>
            ))}
          </Suspense>
        </div>

        <div className="my-10">
          <Pagination />
        </div>
      </div>

      {/* Gọi component RegisterAuction và truyền isOpen và closeModal */}
      <RegisterAuction isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
