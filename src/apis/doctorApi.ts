import axiosInstance from "./axiosInstance";
import type { Doctor } from "../types/Doctor";

export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await axiosInstance.get<Doctor[]>("/doctors");

  return response.data;
};

export const getDoctorById = async (
  id: string
): Promise<Doctor> => {
  const response = await axiosInstance.get<Doctor>(
    `/doctors/${id}`
  );

  return response.data;
};

export const createDoctor = async (
  doctor: Omit<Doctor, "id">
): Promise<Doctor> => {
  const response = await axiosInstance.post<Doctor>(
    "/doctors",
    doctor
  );

  return response.data;
};

export const updateDoctor = async (
  id: string,
  doctor: Omit<Doctor, "id">
): Promise<Doctor> => {
  const response = await axiosInstance.put<Doctor>(
    `/doctors/${id}`,
    doctor
  );

  return response.data;
};

export const deleteDoctor = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(`/doctors/${id}`);
};