import React from 'react';
import Header2 from '../../../components/Header2';
import FooterBK from '../../../components/FooterBK';
import { SiderUserBK } from "@/components/SiderUser/SiderUserBK.jsx";

export default function WithdrawMoney() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header2 />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64">
          <SiderUserBK />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Yêu Cầu Rút Tiền</h1>

          {/* Withdrawal Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Số Tiền</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Nhập số tiền muốn rút"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Phương Thức Thanh Toán</label>
                <select
                  id="payment-method"
                  name="payment-method"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn phương thức</option>
                  <option value="bank-transfer">Chuyển Khoản Ngân Hàng</option>
                  <option value="paypal">PayPal</option>
                  <option value="credit-card">Thẻ Tín Dụng</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">Số Tài Khoản</label>
                <input
                  type="text"
                  id="account-number"
                  name="account-number"
                  placeholder="Nhập số tài khoản"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">Ghi Chú (Tuỳ Chọn)</label>
                <textarea
                  id="note"
                  name="note"
                  placeholder="Nhập ghi chú nếu cần"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Gửi Yêu Cầu Rút Tiền
              </button>
            </form>
          </div>

          {/* Additional Information Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Thông Tin Hỗ Trợ</h2>
            <p className="text-gray-600">
              Nếu bạn có bất kỳ câu hỏi nào về quá trình rút tiền, vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      <FooterBK />
    </div>
  );
}
