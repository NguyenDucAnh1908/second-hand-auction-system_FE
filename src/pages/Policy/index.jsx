import React from 'react';
import Header2 from '../../components/Header2';

export default function Policy() {
  return (
    <>
      <Header2 />
      <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-blue-300 to-teal-200 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-white mb-12">
            Chính Sách & Quy Định
          </h1>

          {/*
            1. CHÍNH SÁCH BẢO MẬT
          */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              1. Chính Sách Bảo Mật
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn. Mọi thông tin thu thập
              từ người dùng sẽ chỉ được sử dụng cho mục đích phục vụ giao dịch và hỗ trợ
              dịch vụ. Hệ thống Đấu Giá Việt tuân thủ chặt chẽ các quy định về bảo mật dữ liệu
              và quyền riêng tư.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>Không chia sẻ thông tin cá nhân với bên thứ ba khi chưa được sự cho phép.</li>
              <li>Tất cả dữ liệu được lưu trữ an toàn trên hệ thống, có kiểm soát quyền truy cập.</li>
              <li>
                Người dùng nên đăng xuất sau mỗi phiên đăng nhập để bảo vệ tài khoản.
              </li>
            </ul>
          </div>

          {/*
            2. CHÍNH SÁCH ĐỔI TRẢ
          */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              2. Chính Sách Đổi Trả
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Để bảo vệ quyền lợi người mua, Đấu Giá Việt cho phép đổi trả trong những trường hợp
              đặc biệt. Nếu sản phẩm bị lỗi hoặc không đúng mô tả, bạn có thể yêu cầu đổi trả với bằng chứng đi kèm (
                hình ảnh hoặc video
              )
              khi nhận được hàng.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>Đảm bảo sản phẩm còn nguyên vẹn, chưa qua sử dụng quá mức.</li>
              <li>
                Nếu có vấn đề nghiêm trọng (ví dụ hư hỏng do vận chuyển), người mua cần
                cung cấp bằng chứng (hình ảnh, video).
              </li>
              <li>
                Chi phí vận chuyển đổi trả có thể được hỗ trợ tùy tình huống. Nếu sai sót
                thuộc về người bán, họ phải chịu phí (quy định về sai thông tin).
              </li>
            </ul>
          </div>

          {/*
            3. ĐIỀU KHOẢN DỊCH VỤ
          */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              3. Điều Khoản Dịch Vụ
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Việc sử dụng dịch vụ của Đấu Giá Việt đồng nghĩa với việc bạn đã đọc và đồng ý với
              các điều khoản và quy định sau đây. Chúng tôi cam kết cung cấp dịch vụ
              minh bạch, công bằng nhưng cũng có quyền từ chối hoặc hủy bỏ dịch vụ khi
              phát hiện hành vi vi phạm.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>
                <strong>Đăng ký tài khoản</strong>:
                <p>- Mỗi email chỉ được tạo một tài khoản duy nhất.</p>
                <p>- Người dùng mới phải xác thực
                qua email.</p>
                <p>- Thông tin đăng ký sai sự thật có thể dẫn đến khóa hoặc xóa
                tài khoản.</p>
              </li>
              <li>
                <strong>Vai trò và quyền hạn</strong>:
                <p>- Mặc định tài khoản mới là <em>“Bidder”</em>.</p>  
                <p>- Muốn bán hàng, cần hoàn tất KYC để chuyển thành <em>“Seller”</em>.  </p>
                <p>- Chỉ <em>Staff</em> hoặc <em>Administrator</em> mới được tạo phiên đấu giá.</p>
              </li>
              <li>
                <strong>Quy tắc sản phẩm & danh mục</strong>:
                <p>- Sản phẩm mới phải được duyệt trước khi public. </p> 
                <p>- Mỗi sản phẩm chỉ thuộc duy nhất một danh mục.  </p>
                <p>- Nhà quản trị được quyền từ chối sản phẩm vi phạm.</p>  
                <p>- Không tạo đấu giá trùng lặp cho cùng một sản phẩm.</p>
              </li>
              <li>
                <strong>Thời gian đấu giá & tham gia</strong>:
                <p>- Một phiên đấu giá chỉ mở khi đủ 2 người tham gia trở lên. </p> 
                <p>- Người đấu giá phải đăng ký trước khi phiên bắt đầu. </p> 
                <p>- Nếu đến giờ kết thúc mà chưa đủ số người, có thể hoãn. Nếu vẫn không đủ
                sẽ hủy.  </p>
                  <p>- Thời gian bắt đầu và kết thúc hiển thị rõ ràng, kèm đồng hồ đếm ngược.</p>
              </li>
              <li>
                <strong>Quy tắc đặt giá, mua ngay</strong> :
                <p>- Không đặt giá thấp hơn giá khởi điểm hoặc thấp hơn bước giá tối thiểu.  </p>
                <p>- Không được tự đặt giá cho sản phẩm của chính mình.  </p>
                <p>- Người đang giữ giá cao nhất không thể đặt giá chồng lên chính mình.  </p>
                <p>- Tính năng <em>“Mua Ngay”</em> sẽ giảm phiên đấu giá còn lại 10 phút
                , nếu phiên đấu còn dưới 10 phút nhưng số tiền đấu thầu cao nhất nhỏ hơn số tiền mua ngay,
                thì thời gian diễn ra vẫn tiếp tục chạy.   </p>
                <p></p>- Người tham gia chỉ được tham gia đấu giá trong những phiên đấu giá mà họ đã
                  đăng ký tham gia.
              </li>
              <li>
                <strong>Thanh toán, vận chuyển & hoàn tất</strong>:
                <p>- Người thắng phải thanh toán trong vòng 24h, nếu không quyền mua sẽ chuyển
                cho người trả giá kế tiếp.  </p>
                  <p>- Hệ thống giữ khoản cọc/tiền thắng cho đến khi người mua xác nhận nhận được
                  hàng.  </p>
                  <p>- Người dùng cần tạo yêu cầu rút tiền chứ không rút thẳng từ ví.  </p>
                  <p>- Sử dụng dịch vụ <em>“Giao Hàng Nhanh” (GHN)</em>, mã tracking được cung cấp, 
                  cập nhật trạng thái tự động. Người mua và người bán chịu
                  trách nhiệm theo dõi vận chuyển.  </p>
                  <p>- Người bán phải xác nhận gửi hàng trong 24h sau khi thanh toán. </p> 
                  <p>- Nếu giao hàng thất bại do lỗi người bán (sai thông tin), người bán chịu
                  chi phí.</p>
              </li>
              <li>
                <strong>Phản hồi, đánh giá & lịch sử</strong>:
                <p>- Chỉ được để lại feedback khi giao dịch đã hoàn tất.  </p>
                <p>- Feedback không thể chỉnh sửa sau khi gửi để đảm bảo minh bạch.</p>  
                <p>- Lịch sử đấu giá được lưu ít nhất 6 tháng.</p>
              </li>
              <li>
                <strong>Hủy hoặc vi phạm</strong> :
                <p>- Người bán không thể hủy hoặc rút sản phẩm khi đấu giá đã bắt đầu.  </p>
                <p>- Không thay đổi mô tả sản phẩm khi phiên đấu giá đang diễn ra.</p>  
                <p>- Người đặt giá không thể rút lại giá khi không có lý do chính đáng, trừ trường hợp kỹ thuật do admin phê duyệt.  </p>
                <p>- Vi phạm nghiêm trọng có thể bị khóa tài khoản hoặc tước quyền bán.</p>
              </li>
            </ul>
          </div>

          {/*
            4. CHÍNH SÁCH HOA HỒNG VÀ CỌC
          */}
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              4. Chính Sách Hoa Hồng và Cọc
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              <strong>Hoa hồng</strong> là khoản phí dịch vụ mà hệ thống thu trên giá trị
              đấu giá cuối cùng. Khoản <strong>cọc</strong> nhằm đảm bảo người mua
              nghiêm túc tham gia đấu giá, đồng thời hạn chế tình trạng “bùng” sau khi thắng.
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-lg mb-4 space-y-2">
              <li>
                <em>Hoa hồng</em> 10% trên mức giá cuối cùng.
              </li>
              <li>
                <em>Cọc</em> sẽ do người bán quyết định hoặc theo mức sàn do hệ thống 
                quy định, thường tính theo % của giá <em>“Mua ngay”</em>.
              </li>
              <li>
                Hệ thống sẽ thông báo chi tiết mức cọc và hoa hồng trước khi phiên đấu giá
                bắt đầu hoặc trước khi hoàn tất giao dịch.
              </li>
              <li>
                Tiền cọc của người thắng sẽ được hoàn trả cho đến khi sản phẩm được thanh toán 
                thành công.
              </li>
            </ul>
          </div>

          {/*
            KẾT LUẬN
          */}
          <div className="text-center">
            <p className="text-white text-lg mb-6">
              Cảm ơn bạn đã đọc và đồng ý với các Chính Sách & Quy Định của hệ thống đấu giá
              Đấu Giá Việt. Chúng tôi luôn nỗ lực xây dựng một nền tảng đấu giá secondhand và sưu tầm
              đáng tin cậy, minh bạch và an toàn.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
