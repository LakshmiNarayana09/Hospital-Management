import {
  Eye,
  Pencil,
  Trash2,
  Pill,
} from "lucide-react";

import type { Prescription } from "../../types/Prescription";
import type { Patient } from "../../types/Patient";
import type { Doctor } from "../../types/Doctor";

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  patients: Patient[];
  doctors: Doctor[];
  onView: (prescription: Prescription) => void;
  onEdit: (prescription: Prescription) => void;
  onDelete: (id: string) => void;
}

function PrescriptionTable({
  prescriptions,
  patients,
  doctors,
  onView,
  onEdit,
  onDelete,
}: PrescriptionTableProps) {
  const getPatientName = (patientId: string) => {
    const patient = patients.find(
      (patient) => patient.id === patientId
    );

    return patient?.name || "Unknown Patient";
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(
      (doctor) => doctor.id === doctorId
    );

    return doctor?.name || "Unknown Doctor";
  };

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full min-w-[1000px] text-sm">

          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Prescription ID
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Patient
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Doctor
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Date
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Diagnosis
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Medicines
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.map((prescription) => (
              <tr
                key={prescription.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >

                <td className="px-5 py-4 font-medium text-blue-600">
                  {prescription.prescriptionId}
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">
                    {getPatientName(
                      prescription.patientId
                    )}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">
                    {getDoctorName(
                      prescription.doctorId
                    )}
                  </p>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {new Date(
                    prescription.date
                  ).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {prescription.diagnosis}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-purple-700">

                    <Pill size={15} />

                    <span className="font-medium">
                      {prescription.medicines.length}
                    </span>

                    <span className="text-xs">
                      {prescription.medicines.length === 1
                        ? "Medicine"
                        : "Medicines"}
                    </span>

                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        onView(prescription)
                      }
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onEdit(prescription)
                      }
                      className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(prescription.id)
                      }
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

        {prescriptions.map((prescription) => {

          const patientName =
            getPatientName(
              prescription.patientId
            );

          const doctorName =
            getDoctorName(
              prescription.doctorId
            );

          return (
            <div
              key={prescription.id}
              className="rounded-xl bg-white p-5 shadow-sm"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-blue-600">
                    {prescription.prescriptionId}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-gray-800">
                    {patientName}
                  </h3>
                </div>

                <div className="rounded-full bg-purple-50 p-2 text-purple-600">
                  <Pill size={18} />
                </div>

              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  Doctor
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {doctorName}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">
                  Date
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {new Date(
                    prescription.date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">
                  Diagnosis
                </p>

                <span className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {prescription.diagnosis}
                </span>
              </div>

              <div className="mt-4 rounded-lg bg-purple-50 p-3">

                <div className="flex items-center gap-2 text-purple-600">
                  <Pill size={17} />

                  <span className="text-xs font-medium">
                    Medicines
                  </span>
                </div>

                <p className="mt-1 text-xl font-bold text-purple-700">
                  {prescription.medicines.length}
                </p>

              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end gap-2 border-t pt-4">

                <button
                  onClick={() =>
                    onView(prescription)
                  }
                  className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                  title="View"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() =>
                    onEdit(prescription)
                  }
                  className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    onDelete(prescription.id)
                  }
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          );
        })}

      </div>
    </>
  );
}

export default PrescriptionTable;