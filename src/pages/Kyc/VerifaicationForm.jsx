import { Input } from "@material-tailwind/react";
import { Heading, Radio, RadioGroup } from "../../components";
import React from "react";

export default function StaffVerificationSection() {
  return (
    <>
      {/* staff verification section */}
      <div>
        <div className="flex flex-col gap-14 sm:gap-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Heading size="textmd" as="h3" className="text-[16px] font-medium text-blue_gray-900">
                Họ tên đầy đủ
              </Heading>
              <Input
                shape="round"
                name="Full Name Input"
                placeholder={`Nguyễn Văn A`}
                className="self-stretch rounded-md border px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <Heading size="textmd" as="h4" className="text-[16px] font-medium text-blue_gray-900">
                Giới tính
              </Heading>
              <RadioGroup name="gendergroup" className="flex flex-wrap gap-3">
                <Radio value="nam" label="Nam" className="text-[15px] text-blue_gray-600" />
                <Radio value="n" label="Nữ" className="text-[15px] text-blue_gray-600" />
                <Radio value="khc" label="Khác" className="text-[15px] text-blue_gray-600" />
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Heading size="textmd" as="h5" className="text-[16px] font-medium text-blue_gray-900">
                Email
              </Heading>
              <Input
                shape="round"
                type="email"
                name="Email Input"
                placeholder={`Nhập email`}
                className="self-stretch rounded-md border px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Heading size="textmd" as="h6" className="text-[16px] font-medium text-blue_gray-900">
                Số điện thoại
              </Heading>
              <Input
                shape="round"
                type="tel" // Corrected input type to 'tel' for phone number
                name="Số điện thoại"
                placeholder={`Nhập số điện thoại`}
                className="self-stretch rounded-md border px-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Heading size="textmd" as="p" className="text-[16px] font-medium text-blue_gray-900">
                Nghề nghiệp
              </Heading>
              <Input
                shape="round"
                name="Occupation Input"
                placeholder={`Giáo viên`}
                className="self-stretch rounded-md border px-4"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-1.5">
              <Heading size="textmd" as="p" className="text-[16px] font-medium text-blue_gray-900">
                Độ tuổi
              </Heading>
              <Input
                shape="round"
                name="Age Input"
                placeholder={`26 tuổi`}
                className="self-stretch rounded-md border px-4"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
