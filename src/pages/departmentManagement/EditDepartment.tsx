
import { useEffect, useState } from "react";
import { ArrowLeft, Building2 } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import DepartmentForm, {
  type DepartmentFormData,
} from "../../components/departments/DepartmentForm";

import {
  getDepartmentById,
  updateDepartment,
} from "../../apis/departmentApi";

import type { Department } from "../../types/Department";

function EditDepartment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [department, setDepartment] =
    useState<Department | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      if (!id) {
        setError("Department ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data =
          await getDepartmentById(id);

        setDepartment(data);
      } catch (error) {
        console.error(
          "Error fetching department:",
          error
        );

        setError(
          "Failed to load department."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleUpdate = async (
    formData: DepartmentFormData
  ) => {
    if (!id) {
      return;
    }

    await updateDepartment(id, {
      departmentId:
        formData.departmentId,

      name: formData.name,

      description:
        formData.description,
    });

    navigate("/departments");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading department...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/departments")
          }
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Departments
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </div>

      </div>
    );
  }

  if (!department) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/departments")
          }
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Departments
        </button>

        <div className="rounded-xl bg-gray-50 p-4 text-gray-600">
          Department not found.
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <div className="mb-6">

        <button
          onClick={() =>
            navigate("/departments")
          }
          className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Departments
        </button>

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <Building2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Department
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update department information
            </p>
          </div>

        </div>
      </div>

      <DepartmentForm
        initialData={department}
        onSubmit={handleUpdate}
        submitText="Update Department"
        onCancel={() =>
          navigate("/departments")
        }
      />

    </div>
  );
}

export default EditDepartment;

