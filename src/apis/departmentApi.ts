import axiosInstance from "./axiosInstance";

import type { Department } from "../types/Department";

export const getDepartments = async (): Promise<
  Department[]
> => {
  const response =
    await axiosInstance.get<Department[]>(
      "/departments"
    );

  return response.data;
};

export const getDepartmentById = async (
  id: string
): Promise<Department> => {
  const response =
    await axiosInstance.get<Department>(
      `/departments/${id}`
    );

  return response.data;
};

export const createDepartment = async (
  department: Omit<Department, "id">
): Promise<Department> => {
  const response =
    await axiosInstance.post<Department>(
      "/departments",
      department
    );

  return response.data;
};

export const updateDepartment = async (
  id: string,
  department: Omit<Department, "id">
): Promise<Department> => {
  const response =
    await axiosInstance.put<Department>(
      `/departments/${id}`,
      department
    );

  return response.data;
};

export const deleteDepartment = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(
    `/departments/${id}`
  );
};