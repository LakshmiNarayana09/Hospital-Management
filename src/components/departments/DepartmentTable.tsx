
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
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
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

      <div className="space-y-4 md:hidden">
        {departments.map(
          (department) => (
            <div
              key={department.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >

              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {department.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {department.name}
                    </h3>

                    <p className="text-xs text-blue-600">
                      {department.departmentId}
                    </p>
                  </div>

                </div>
              </div>

              <div className="border-b py-4">
                <p className="text-xs text-gray-500">
                  Description
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {department.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Doctors
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {doctorCounts[
                      department.name
                    ] || 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Patients
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {patientCounts[
                      department.name
                    ] || 0}
                  </p>
                </div>

              </div>

              <div className="flex justify-end gap-2 border-t pt-4">

                <button
                  onClick={() =>
                    onView(department)
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() =>
                    onEdit(department)
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(department.id)
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          )
        )}
      </div>
    </>
  );
}

export default DepartmentTable;

