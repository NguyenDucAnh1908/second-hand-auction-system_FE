import React from "react";
import { Button } from "antd";
import { Heading } from "./Heading/index.jsx";
import FooterBK from "./FooterBK/index.jsx";

const TestComponent = () => {
  return (
    <div className="mt-14 flex items-center gap-[33px]">
      {/*<Button*/}
      {/*    type="dashed"*/}
      {/*    className="min-w-[114px] rounded-md border border-solid border-red-700 bg-red-500 text-white*/}
      {/*        hover:bg-white hover:text-red-500 transition duration-200"*/}
      {/*>*/}
      {/*    Nạp tiền*/}
      {/*</Button>*/}
      {/*<button type="button"*/}
      {/*        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">*/}
      {/*    Nạp tiền*/}
      {/*</button>*/}
      {/*<button type="button"*/}
      {/*        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">*/}
      {/*    Hủy bỏ*/}
      {/*</button>*/}

      {/*<Heading as="p" className="text-[16px] font-normal text-blue_gray-600">*/}
      {/*    Hủy bỏ*/}
      {/*</Heading>*/}
      <div>
        <FooterBK />
      </div>
    </div>
  );
};

export default TestComponent;
