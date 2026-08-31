import { useCallback, useEffect, useState } from "react";

import {
  getBills,
  deleteBill,
} from "../apis/billingApi";

import type { Bill } from "../types/Billing";

function useBills() {
  const [bills, setBills] = useState<Bill[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchBills = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBills();

        setBills(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to fetch bills."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const removeBill = async (
    id: string
  ) => {
    try {
      await deleteBill(id);

      setBills((prev) =>
        prev.filter(
          (bill) => bill.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      throw new Error(
        "Failed to delete bill."
      );
    }
  };

  return {
    bills,
    loading,
    error,
    fetchBills,
    removeBill,
  };
}

export default useBills;