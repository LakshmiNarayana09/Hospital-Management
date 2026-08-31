import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Department } from "../../types/Department";

interface DepartmentTableProps {
  departments: Department[];
  doctorCounts: Record<string, number>;
  patientCounts: Record<string, number>;
  onView: (department: Department) => void;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}

function DepartmentTable({
  departments,
  doctorCounts,
  patientCounts,
  onView,
  onEdit,
  onDelete,
}: DepartmentTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <table className="w-full min-w-[850px] text-sm">

        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-5 py-4 text-left font-semibold">
              Department ID
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Department
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Doctors
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Patients
            </th>

            <th className="px-5 py-4 text-left font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.map(
            (department) => (
              <tr
                key={department.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >

                <td className="px-5 py-4 font-medium text-blue-600">
                  {department.departmentId}
                </td>

                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      {department.name}
                    </p>

                    <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                      {department.description}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  {doctorCounts[
                    department.name
                  ] || 0}
                </td>

                <td className="px-5 py-4">
                  {patientCounts[
                    department.name
                  ] || 0}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        onView(department)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onEdit(department)
                      }
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(department.id)
                      }
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            )
          )}
        </tbody>

      </table>
    </div>
  );
}

export default DepartmentTable;