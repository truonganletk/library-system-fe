import * as api from "@/libs/axios";

const API_ENDPOINT = "/books";

export const getBooks = async () => {
  try {
    const response = await api.get(`${API_ENDPOINT}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBook = async (data: any) => {
  try {
    const response = await api.post(`${API_ENDPOINT}`, data);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
