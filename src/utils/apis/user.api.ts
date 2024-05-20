import * as api from "@/libs/axios"

const API_ENDPOINT = '/user';

export const getUsers = async () => {
    try {
        const response = await api.get(`${API_ENDPOINT}`); 
        return response.data;
    } catch (error) {
        console.error(error);
    }
}