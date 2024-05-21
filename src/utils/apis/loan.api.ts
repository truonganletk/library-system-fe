import * as api from "@/libs/axios";
import { notification } from "antd";

const API_ENDPOINT = "/loan";

export const getLoansByUser = async () => {
  try {
    const response = await api.get(`${API_ENDPOINT}/user`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getLoansByStatus = async (status: string) => {
  try {
    const response = await api.get(`${API_ENDPOINT}?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOverdueLoans = async () => {
  try {
    const response = await api.get(`${API_ENDPOINT}/overdue`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const acceptLoan = async (id: number) => {
  try {
    const response = await api.post(`${API_ENDPOINT}/accept`, {
      id,
    });
    notification.success({
      message: "Success",
      description: "Loan Accepted",
      duration: 3,
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: "Loan Accept Failed",
      description: (error as any).response.data.message,
      duration: 3,
    });
    console.error(error);
  }
};

export const returnLoan = async (id: number) => {
  try {
    const response = await api.post(`${API_ENDPOINT}/return/${id}`, {});
    notification.success({
      message: "Success",
      description: "Loan Returned",
      duration: 3,
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: "Loan Return Failed",
      description: (error as any).response.data.message,
      duration: 3,
    });
    console.error(error);
  }
};

export const createLoan = async (data: any) => {
  try {
    const response = await api.post(`${API_ENDPOINT}`, data);
    console.log(response);
    if (response.status === 201) {
      notification.success({
        message: "Success",
        description: "Loan Created",
        duration: 3,
      });
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    notification.error({
      message: "Loan Creation Failed",
      description: "Loan Creation Failed",
      duration: 3,
    });
    console.error(error);
  }
};
