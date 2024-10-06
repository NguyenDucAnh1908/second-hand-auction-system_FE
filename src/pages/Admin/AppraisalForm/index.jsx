import { Helmet } from "react-helmet";
import { Heading, Img } from "../../../components";
import ProductReviewSection from "./ProductReviewSection";
import StaffAssessmentSection from "./StaffAssessmentSection";
import React from "react";

export default function ThmnhcaStaffPage() {
  return (
    <>
      <Helmet>
        <title>Staff Appraisal for Vintage Bed - VUA NỆM</title>
        <meta
          name="description"
          content="Explore the charm of a vintage bed appraised by our staff, featuring a classic design with a touch of nostalgia. Perfect for adding a timeless elegance to your space. Authenticity guaranteed by VUA NỆM."
        />
      </Helmet>
      <div className="w-full bg-white-a700 py-[88px] md:py-5">
        <div className="mt-2 flex flex-col items-center">
          {/* product review section */}
          <ProductReviewSection />
         

          {/* staff assessment section */}
          <StaffAssessmentSection />
        </div>
      </div>
    </>
  );
}

