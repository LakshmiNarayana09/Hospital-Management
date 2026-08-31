import axiosInstance from "./axiosInstance";

import type {
  Prescription,
} from "../types/Prescription";

export const getPrescriptions =
  async (): Promise<Prescription[]> => {
    const response =
      await axiosInstance.get<Prescription[]>(
        "/prescriptions"
      );

    return response.data;
  };

export const getPrescriptionById =
  async (
    id: string
  ): Promise<Prescription> => {
    const response =
      await axiosInstance.get<Prescription>(
        `/prescriptions/${id}`
      );

    return response.data;
  };

export const createPrescription =
  async (
    prescription: Omit<Prescription, "id">
  ): Promise<Prescription> => {
    const response =
      await axiosInstance.post<Prescription>(
        "/prescriptions",
        prescription
      );

    return response.data;
  };

export const updatePrescription =
  async (
    id: string,
    prescription: Omit<Prescription, "id">
  ): Promise<Prescription> => {
    const response =
      await axiosInstance.put<Prescription>(
        `/prescriptions/${id}`,
        prescription
      );

    return response.data;
  };

export const deletePrescription =
  async (
    id: string
  ): Promise<void> => {
    await axiosInstance.delete(
      `/prescriptions/${id}`
    );
  };