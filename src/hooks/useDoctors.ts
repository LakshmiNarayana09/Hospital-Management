import { useEffect, useState } from "react";

import {
  getDoctors,
  deleteDoctor,
} from "../apis/doctorApi";

import type { Doctor } from "../types/Doctor";

function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctors();

      setDoctors(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const removeDoctor = async (id: string) => {
    try {
      await deleteDoctor(id);

      setDoctors((prev) =>
        prev.filter((doctor) => doctor.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete doctor");
    }
  };

  return {
    doctors,
    loading,
    error,
    removeDoctor,
    fetchDoctors,
  };
}

export default useDoctors;