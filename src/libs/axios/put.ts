import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

const apiPut = async (url: string, body: any, opts?: AxiosRequestConfig) => {
	try {
		const {
			data: { data },
		} = await axiosInstance.put(url, body, opts);

		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
export default apiPut;
