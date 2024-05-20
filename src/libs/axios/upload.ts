import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

const apiUpload = async (url: string, formData: FormData, opts?: AxiosRequestConfig) => {
	try {
		const response = await axiosInstance.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			...opts,
		});
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export default apiUpload;
