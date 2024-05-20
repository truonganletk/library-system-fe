import { axiosInstance, Callback } from "./axios-instance";

interface ParamRequest {
	[k: string]: any;
}

const apiGet = async (url: string, params?: ParamRequest, cb?: Callback<any>) => {
	try {
		const data = await axiosInstance.get(url, { params: params });

		if (cb) {
			return cb(data);
		}

		return data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
export default apiGet;
