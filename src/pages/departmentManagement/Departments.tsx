


import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useDepartments from "../../hooks/useDepartments";
import usePatients from "../../hooks/usePatients";

import { getDoctors } from "../../apis/doctorApi";

import type { Doctor } from "../../types/Doctor";

import DepartmentTable from "../../components/departments/DepartmentTable";

function Departments() {
  const navigate = useNavigate();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    removeDepartment,
  } = useDepartments();

  const {
    patients,
    loading: patientsLoading,
  } = usePatients();

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [search, setSearch] =
    useState("");

  const [loadingDoctors, setLoadingDoctors] =
    useState(true);

  
  useMemo(() => {
    getDoctors()
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingDoctors(false);
      });
  }, []);

  
  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (department) =>
        department.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        department.departmentId
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [departments, search]);

  
  const doctorCounts = useMemo(() => {
    const counts: Record<
      string,
      number
    > = {};

    doctors.forEach((doctor) => {
      counts[doctor.department] =
        (counts[doctor.department] || 0) + 1;
    });

    return counts;
  }, [doctors]);

  
  const patientCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    patients.forEach((patient) => {
      counts[patient.department] =
        (counts[patient.department] || 0) + 1;
    });

    return counts;
  }, [patients]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmed) {
      return;
    }

    await removeDepartment(id);
  };

  const loading =
    departmentsLoading ||
    patientsLoading ||
    loadingDoctors;

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading departments...
        </p>
      </div>
    );
  }

  if (departmentsError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {departmentsError}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Departments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage hospital departments
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/departments/add")
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Department
        </button>

      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search department..."
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

      </div>

      {filteredDepartments.length > 0 ? (
        <DepartmentTable
          departments={
            filteredDepartments
          }
          doctorCounts={doctorCounts}
          patientCounts={patientCounts}
          onView={(department) =>
            navigate(
              `/departments/${department.id}`
            )
          }
          onEdit={(department) =>
            navigate(
              `/departments/${department.id}/edit`
            )
          }
          onDelete={handleDelete}
        />
      ) : (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            No departments found.
          </p>
        </div>
      )}

    </div>
  );
}

export default Departments;