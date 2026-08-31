import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getPrescriptions,
  deletePrescription,
} from "../apis/prescriptionApi";

import type {
  Prescription,
} from "../types/Prescription";

function usePrescriptions() {
  const [prescriptions, setPrescriptions] =
    useState<Prescription[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchPrescriptions =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getPrescriptions();

        setPrescriptions(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to fetch prescriptions."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchPrescriptions();
  }, [fetchPrescriptions]);

  const removePrescription =
    async (id: string) => {
      try {
        await deletePrescription(id);

        setPrescriptions(
          (prevPrescriptions) =>
            prevPrescriptions.filter(
              (prescription) =>
                prescription.id !== id
            )
        );
      } catch (error) {
        console.error(error);

        setError(
          "Failed to delete prescription."
        );
      }
    };

  return {
    prescriptions,
    loading,
    error,
    fetchPrescriptions,
    removePrescription,
  };
}

export default usePrescriptions;