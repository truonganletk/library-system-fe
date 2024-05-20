import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

const apiPatch = async (url: string, body: any, opts?: AxiosRequestConfig) => {
	try {
		const {
			data: { data },
		} = await axiosInstance.patch(url, body, opts);

		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
export default apiPatch;
