
import { ArrowLeft, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DepartmentForm, {
  type DepartmentFormData,
} from "../../components/departments/DepartmentForm";

import { createDepartment } from "../../apis/departmentApi";

function AddDepartment() {
  const navigate = useNavigate();

  const handleAddDepartment = async (
    formData: DepartmentFormData
  ) => {
    await createDepartment({
      departmentId: formData.departmentId,
      name: formData.name,
      description: formData.description,
    });

    navigate("/departments");
  };

  return (
    <div className="max-w-3xl">

      <div className="mb-6">

        <button
          onClick={() => navigate("/departments")}
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
              Add Department
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new hospital department
            </p>
          </div>

        </div>
      </div>

      <DepartmentForm
        onSubmit={handleAddDepartment}
        submitText="Add Department"
        onCancel={() => navigate("/departments")}
      />

    </div>
  );
}

export default AddDepartment;

