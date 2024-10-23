import useAxios from './useAxios';
import { ENDPOINTS } from './endpoints';

// for dummy data
export const useConfirmTransaction = () => {
    return useAxios({
        url: ENDPOINTS.CONFIRM_TRANSACTION,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }, false);
};

// Add other API calls here
export const useGetUserData = (userId) => {
    return useAxios({
        url: `${ENDPOINTS.GET_USER_DATA}/${userId}`,
        method: 'GET',
    });
};
