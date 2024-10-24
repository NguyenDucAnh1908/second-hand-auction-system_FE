import { useGetUserAddressQuery } from "../../../services/address.service";

export const useFetchUserAddresses = () => {
    const userId = localStorage.getItem("userId") || 1; // Lấy userId từ localStorage, nếu không có thì mặc định là 1

    const { data: addresses = [], error, isLoading } = useGetUserAddressQuery(userId); 

    return {
        addresses,
        error,
        isLoading,
    };
};
