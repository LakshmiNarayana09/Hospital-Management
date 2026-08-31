import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Patient } from "../../types/Patient";

interface PatientTableProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientTableProps) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Patient ID
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Name
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Age
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Gender
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Blood Group
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium text-blue-600">
                  {patient.patientId}
                </td>

                <td className="px-5 py-4 text-gray-800">
                  {patient.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.age}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.gender}
                </td>

                <td className="px-5 py-4 font-medium text-gray-700">
                  {patient.bloodGroup}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.phone}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(patient)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(patient)}
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(patient.id)}
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
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {patient.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {patient.name}
                  </h3>

                  <p className="text-xs text-blue-600">
                    {patient.patientId}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 py-4">

              <div>
                <p className="text-xs text-gray-500">
                  Age
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.age}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Gender
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.gender}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.phone}
                </p>
              </div>

            </div>

            <div className="flex justify-end gap-2 border-t pt-4">

              <button
                onClick={() => onView(patient)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
              >
                <Eye size={16} />
                View
              </button>

              <button
                onClick={() => onEdit(patient)}
                className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => onDelete(patient.id)}
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

export default PatientTable;