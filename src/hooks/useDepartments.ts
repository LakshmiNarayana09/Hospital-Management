import { useEffect, useState } from "react";

import {
  getDepartments,
  deleteDepartment,
} from "../apis/departmentApi";

import type { Department } from "../types/Department";

function useDepartments() {
  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to fetch departments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const removeDepartment = async (
    id: string
  ) => {
    try {
      await deleteDepartment(id);

      setDepartments((prev) =>
        prev.filter(
          (department) =>
            department.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        "Failed to delete department."
      );
    }
  };

  return {
    departments,
    loading,
    error,
    removeDepartment,
    refetch: fetchDepartments,
  };
}

export default useDepartments;