import axiosInstance from "./axiosInstance";

import type { Bill } from "../types/Billing";

export const getBills = async (): Promise<Bill[]> => {
  const response = await axiosInstance.get("/bills");

  return response.data;
};

export const getBillById = async (
  id: string
): Promise<Bill> => {
  const response = await axiosInstance.get(
    `/bills/${id}`
  );

  return response.data;
};

export const createBill = async (
  bill: Omit<Bill, "id">
): Promise<Bill> => {
  const response = await axiosInstance.post(
    "/bills",
    bill
  );

  return response.data;
};

export const updateBill = async (
  id: string,
  bill: Omit<Bill, "id">
): Promise<Bill> => {
  const response = await axiosInstance.put(
    `/bills/${id}`,
    bill
  );

  return response.data;
};

export const deleteBill = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(
    `/bills/${id}`
  );
};