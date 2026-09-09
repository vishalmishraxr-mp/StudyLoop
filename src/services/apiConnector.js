import { axiosInstance } from '../config/api';

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData || null,
        headers: headers || undefined,
        params: params || undefined,
    });
};