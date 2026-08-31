import { useCallback, useEffect, useState } from "react";

import {
  deletePatient,
  getPatients,
} from "../apis/patientApi";

import type { Patient } from "../types/Patient";

function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPatients();

      setPatients(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const removePatient = async (id: string) => {
    try {
      await deletePatient(id);

      setPatients((prev) =>
        prev.filter((patient) => patient.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete patient");
    }
  };

  return {
    patients,
    loading,
    error,
    fetchPatients,
    removePatient,
  };
}

export default usePatients;