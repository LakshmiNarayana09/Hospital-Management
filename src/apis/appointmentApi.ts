import axiosInstance from "./axiosInstance";
import type { Appointment } from "../types/Appointment";

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await axiosInstance.get<Appointment[]>("/appointments");

  return response.data;
};

export const getAppointmentById = async (
  id: string
): Promise<Appointment> => {
  const response = await axiosInstance.get<Appointment>(
    `/appointments/${id}`
  );

  return response.data;
};

export const createAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const response = await axiosInstance.post<Appointment>(
    "/appointments",
    appointment
  );

  return response.data;
};

export const updateAppointment = async (
  id: string,
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const response = await axiosInstance.put<Appointment>(
    `/appointments/${id}`,
    appointment
  );

  return response.data;
};

export const deleteAppointment = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(`/appointments/${id}`);
};