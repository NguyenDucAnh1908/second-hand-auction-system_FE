import React from 'react';
import { useCreateAddressMutation } from "../services/address.service";

const AddressForm = () => {
  const [createAddress, { isLoading, error, data }] = useCreateAddressMutation();

  // Dữ liệu địa chỉ cố định
  const addressData = {
    district_code: 'DC123',
    district_name: 'District A',
    address_name: 'My Address',
    default_address: 'Yes',
    last_name: 'Nguyen',
    phone_number: '0123456789',
    province: 'Province A',
    province_name: 'Province A',
    status: true,
    street_address: '123 Street',
    ward_code: 'WC123',
    ward_name: 'Ward A',
    userId: 2,
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAddress(addressData).unwrap();
      console.log('Address created successfully:', result);
      // Nếu cần, bạn có thể reset lại form hoặc thông báo thành công
    } catch (err) {
      console.error('Failed to create address: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Address'}
      </button>
      {error && <p>Error: {error}</p>}
      {data && <p>Address created successfully: {JSON.stringify(data)}</p>}
    </form>
  );
};

export default AddressForm;
