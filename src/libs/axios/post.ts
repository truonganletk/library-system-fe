import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

const apiPost = async (url: string, body: any, opts?: AxiosRequestConfig) => {
	try {
		const response = await axiosInstance.post(url, body, opts);
		return response;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export default apiPost;
