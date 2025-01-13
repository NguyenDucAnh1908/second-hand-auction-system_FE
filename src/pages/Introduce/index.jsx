import React from "react";
import Header2 from "../../components/Header2"; // Assuming Header2 is your custom header component
import { useNavigate } from "react-router-dom";

export default function AboutAuction() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };

  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-gradient-to-r from-blue-300 via-teal-400 to-sky-500 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <h1 className="text-5xl font-extrabold text-center text-white mb-12">
            Giới Thiệu Hệ Thống Đấu Giá
          </h1>

          {/* About Auction System Section - Updated for ASFSG */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Về Hệ Thống Đấu Giá ASFSG
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Chào mừng bạn đến với <strong>Đấu Giá Việt</strong> – hệ thống đấu
              giá trực tuyến chuyên về các sản phẩm <strong>secondhand</strong>{" "}
              (đã qua sử dụng) và các vật phẩm sưu tầm độc đáo. Sứ mệnh của
              chúng tôi là tạo ra một không gian đấu giá
              <em> minh bạch</em>, <em> an toàn</em> và <em>bền vững</em>, nơi
              mỗi món đồ cũ có thể tiếp tục được “tái sinh” và mang lại giá trị
              mới cho người sở hữu.
            </p>
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Thông qua nền tảng của Đấu Giá Việt, bạn có thể dễ dàng tìm kiếm,
              đấu giá và sở hữu những sản phẩm secondhand chất lượng – từ điện
              thoại, máy tính, thiết bị công nghệ, thời trang hay vật phẩm nghệ
              thuật phiên bản hiếm có. Tất cả đều được kiểm định cẩn thận nhằm
              đảm bảo người tham gia hoàn toàn yên tâm về nguồn gốc và tình
              trạng sản phẩm.
            </p>
          </div>

          {/* How It Works Section - Updated */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Cách Thức Hoạt Động
            </h2>

            {/* Mô tả ngắn gọn về ví thanh toán của hệ thống */}
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Hệ thống của chúng tôi sử dụng{" "}
              <strong>ví thanh toán nội bộ</strong> để đảm bảo quá trình nạp,
              rút và giao dịch đấu giá diễn ra nhanh chóng, minh bạch. Bạn có
              thể nạp tiền vào ví thông qua các phương thức được hỗ trợ, sau đó
              dùng số dư trong ví để đặt giá hoặc mua ngay sản phẩm.
            </p>

            {/* Phân loại hình thức đấu giá */}
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Chúng tôi cung cấp hai hình thức đấu giá chính:
            </p>
            <ul className="list-decimal pl-5 text-gray-800 text-lg mb-4 space-y-2">
              <li>
                <strong>Đấu giá truyền thống</strong>: Người tham gia quan sát
                mức giá theo thời gian thực và đặt mức giá cao hơn để giành
                chiến thắng khi kết thúc phiên đấu giá.
              </li>
              <li>
                <strong>Đấu giá kín</strong>: Người tham gia đưa ra mức giá của
                mình một cách bí mật. Tất cả mức giá sẽ được “mở” sau khi phiên
                đấu giá kết thúc. Ai sở hữu mức giá cao nhất sẽ chiến thắng.
              </li>
            </ul>

            {/* Chức năng Mua Ngay */}
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Với một số sản phẩm, chúng tôi còn hỗ trợ tính năng{" "}
              <strong>Mua Ngay</strong>, cho phép bạn có cơ hội sở hữu món hàng nhanh chóng, phiên đấu giá
              sẽ giảm xuống còn 10 phút ngay lập tức. Nếu trong vòng thời gian đó mà không có người nào
              bỏ ra mức giá cao hơn bạn thì món hàng đó sẽ chính thức thuộc về bạn. Mức giá “Mua Ngay”
              sẽ được người bán thiết lập, thường cao hơn giá khởi điểm để đảm
              bảo tính công bằng cho người đặt giá tham gia phiên đấu giá.
            </p>

            {/* Tóm tắt các bước tham gia */}
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Dưới đây là các bước đơn giản để bạn có thể bắt đầu:
            </p>
            <ul className="list-decimal pl-5 text-gray-800 text-lg mb-4 space-y-2">
              <li>Đăng ký tài khoản hoặc đăng nhập vào hệ thống.</li>
              <li>Nạp tiền vào ví nội bộ để có đủ ngân sách đặt giá.</li>
              <li>
                Chọn sản phẩm bạn muốn tham gia đấu giá và chọn hình thức đấu
                giá phù hợp.
              </li>
              <li>
                Đặt giá của bạn (truyền thống hoặc kín), hoặc sử dụng “Mua Ngay”
                nếu muốn.
              </li>
              <li>
                Khi kết thúc đấu giá, người có giá cao nhất sẽ nhận sản phẩm.
              </li>
              <li>
                Hoàn tất giao dịch qua ví nội bộ, nhận sản phẩm theo thỏa thuận.
              </li>
            </ul>
          </div>

          {/* Why Participate Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Lý Do Nên Tham Gia Đấu Giá Việt
            </h2>
            <ul className="list-disc pl-5 text-gray-800 text-lg mb-4 space-y-2">
              <li>
                <strong>Bảo vệ môi trường</strong>: Tái sử dụng đồ secondhand
                giúp giảm thiểu rác thải và tiết kiệm tài nguyên.
              </li>
              <li>
                <strong>Minh bạch & Công bằng</strong>: Hệ thống đấu giá trực
                quan, kiểm định sản phẩm rõ ràng, đảm bảo mọi giao dịch đều minh
                bạch.
              </li>
              <li>
                <strong>Trải nghiệm an toàn</strong>: Chính sách bảo mật cao,
                quy trình thanh toán an toàn cho cả người bán và người mua.
              </li>
              <li>
                <strong>Cơ hội săn đồ độc đáo</strong>: Từ điện thoại cũ, máy
                ảnh vintage đến vật phẩm cổ hiếm, bạn có thể tìm thấy nhiều món
                đồ “có một không hai”.
              </li>
            </ul>
          </div>

          {/* Auction Products Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">
              Sản Phẩm Đấu Giá
            </h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-4">
              Trên <strong>Đấu Giá Việt</strong>, chúng tôi tập trung vào các
              sản phẩm secondhand và vật phẩm sưu tầm độc đáo. Dưới đây là một
              vài ví dụ:
            </p>
            <ul className="list-disc pl-5 text-gray-800 text-lg mb-4 space-y-2">
              <li>
                Điện thoại thông minh, laptop, thiết bị công nghệ đã qua sử
                dụng.
              </li>
              <li>Đồng hồ cổ, trang sức secondhand có giá trị sưu tầm.</li>
              <li>
                Sản phẩm điện tử, đồ gia dụng và đồ cổ xưa với câu chuyện riêng.
              </li>
              <li>
                Đồ thời trang, phụ kiện vintage, và nhiều mặt hàng secondhand
                khác.
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Tham Gia Đấu Giá Ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
