import useAxios from './useAxios';
import { ENDPOINTS } from './endpoints';

// for dummy data dummy json data 

export const useGetProducts = () => {
    return useAxios({
        url: ENDPOINTS.GET_PRODUCTS,
        method: 'GET',
    }, false);
};

export const usePostProducts = () => {
    return useAxios({
        url: ENDPOINTS.POST_PRODUCTS,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    }, false);
};



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
