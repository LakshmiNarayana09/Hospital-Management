import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Doctor } from "../../types/Doctor";

interface DoctorTableProps {
  doctors: Doctor[];
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
}

function DoctorTable({
  doctors,
  onView,
  onEdit,
  onDelete,
}: DoctorTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Doctor ID
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Name
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Specialization
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Department
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Experience
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Availability
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium text-blue-600">
                  {doctor.doctorId}
                </td>

                <td className="px-5 py-4 font-medium text-gray-800">
                  {doctor.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {doctor.specialization}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {doctor.department}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {doctor.experience} years
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      doctor.availability === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doctor.availability}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(doctor)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(doctor)}
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(doctor.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 md:hidden">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {doctor.name
                    .replace("Dr. ", "")
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {doctor.name}
                  </h3>

                  <p className="text-xs text-blue-600">
                    {doctor.doctorId}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  doctor.availability === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doctor.availability}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-xs text-gray-500">
                  Specialization
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {doctor.specialization}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Department
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {doctor.department}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Experience
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {doctor.experience} years
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {doctor.phone}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t pt-4">
              <button
                onClick={() => onView(doctor)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
              >
                <Eye size={16} />
                View
              </button>

              <button
                onClick={() => onEdit(doctor)}
                className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => onDelete(doctor.id)}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DoctorTable;