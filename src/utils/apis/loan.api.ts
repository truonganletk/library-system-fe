import * as api from "@/libs/axios";

const API_ENDPOINT = "/loan";

export const getLoansByUser = async () => {
  try {
    const response = await api.get(`${API_ENDPOINT}/user`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

