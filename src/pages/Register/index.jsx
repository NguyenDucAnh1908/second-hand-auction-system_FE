import { Helmet } from "react-helmet";
import FooterBK from "../../components/FooterBK";
import RegisterSection from "./RegisterSection";
import React from "react";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Create Your EZShop Account - Register Today</title>
        <meta
          name="description"
          content="Sign up for a new EZShop account to start shopping, save your wishlist, and manage your orders with ease. Join us for a seamless shopping experience!"
        />
      </Helmet>
      <div className="flex w-full flex-col gap-[82px] bg-indigo-100_01 md:gap-[61px] sm:gap-[41px]">
        {/* register section */}
        <RegisterSection />
        <div className="mt-[194px] self-stretch">
          <FooterBK className="mt-[34px] h-[388px] bg-[url(/public/images/img_group_19979.png)] bg-cover bg-no-repeat md:h-auto" />
        </div>
      </div>
    </>
  );
}
