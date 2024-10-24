import { useCreateAddressMutation } from "../../../services/address.service";

export const useAddress = () => {
    const [createAddress, { isLoading, isError }] = useCreateAddressMutation();

    const addAddress = async (addressData) => {
        try {
            const processedAddressData = {
                ...addressData,
                userId: 1, 
            };
            await createAddress(processedAddressData).unwrap();
            return { success: true };
        } catch (error) {
            console.error("Error creating address:", error);
            return { success: false, error: error.message };
        }
    };

    return {
        addAddress,
        isLoading,
        isError,
    };
};
