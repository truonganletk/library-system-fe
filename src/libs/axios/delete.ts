import { axiosInstance } from "./axios-instance";

const apiDelete = async (url: string) => {
	try {
		const result = await axiosInstance.delete(url);

		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
export default apiDelete;
