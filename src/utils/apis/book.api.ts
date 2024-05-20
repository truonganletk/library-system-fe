import * as api from "@/libs/axios"

const API_ENDPOINT = '/books';

export const getBooks = async () => {
    try {
        const response = await api.get(`${API_ENDPOINT}`); 
        return response.data;
    } catch (error) {
        console.error(error);
    }
}