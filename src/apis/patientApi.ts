
import axiosInstance from "./axiosInstance";
import type { Patient } from "../types/Patient";

export const getPatients = async (): Promise<Patient[]> => {
  const response = await axiosInstance.get<Patient[]>("/patients");

  return response.data;
};

export const getPatientById = async (
  id: string
): Promise<Patient> => {
  const response = await axiosInstance.get<Patient>(
    `/patients/${id}`
  );

  return response.data;
};

export const createPatient = async (
  patient: Omit<Patient, "id">
): Promise<Patient> => {
  const response = await axiosInstance.post<Patient>(
    "/patients",
    patient
  );

  return response.data;
};

export const updatePatient = async (
  id: string,
  patient: Omit<Patient, "id">
): Promise<Patient> => {
  const response = await axiosInstance.put<Patient>(
    `/patients/${id}`,
    patient
  );

  return response.data;
};

export const deletePatient = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(`/patients/${id}`);
};