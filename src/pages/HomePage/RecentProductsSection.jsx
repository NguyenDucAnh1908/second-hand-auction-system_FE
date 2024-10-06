import { ButtonDH, Img, Slider, Heading } from "../../components";
import ProductDetails4 from "../../components/ProductDetails4";
import React from "react";
import ProductDetails31 from "../../components/ProductDetails31/index.jsx";
import {IconButton} from "@material-tailwind/react";

export default function RecentProductsSection() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);

  return (
    <>
      {/* recent products section */}
      <div className="mt-[180px] flex flex-col items-center self-stretch">
        <div className="container-xs flex flex-col items-start gap-[30px] px-1 md:px-5">
          <Heading
            size="text7xl"
            as="h2"
            className="text-[28px] font-medium text-blue_gray-900_01 md:text-[26px] sm:text-[24px]"
          >
            Sản phẩm gần đây
          </Heading>
          <div className="relative ml-2 mr-1 h-[454px] content-center self-stretch md:mx-0 md:h-auto">
            <div className="mx-auto flex w-full gap-8 md:flex-col">
              <Slider
                autoPlay
                autoPlayInterval={2000}
                responsive={{
                  0: { items: 1 },
                  551: { items: 1 },
                  1051: { items: 4 },
                }}
                disableDotsControls
                activeIndex={sliderState}
                onSlideChanged={(e) => {
                  setSliderState(e?.item);
                }}
                ref={sliderRef}
                items={[...Array(12)].map(() => (
                  <React.Fragment key={Math.random()}>
                    <div className="px-4">
                      <ProductDetails31
                        // productDescription="Áo hoodie Nike thấm hút mồ hôi cho ngày đông lạnh "
                        // originalPrice="128.000đ"
                        className="border border-solid border-gray-200 bg-bg-white"
                      />
                    </div>
                  </React.Fragment>
                ))}
              />
            </div>
            <div className="absolute left-0 right-0 top-[37%] m-auto flex flex-1 justify-between gap-5">
                <IconButton variant="outlined" className="rounded-full"
                            onClick={() => {
                                sliderRef?.current?.slidePrev();
                            }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </IconButton>
                <IconButton variant="outlined" className="rounded-full"
                            onClick={() => {
                                sliderRef?.current?.slideNext();
                            }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
