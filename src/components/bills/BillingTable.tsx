import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Bill } from "../../types/Billing";
import type { Patient } from "../../types/Patient";
import DownloadBill from "./DownloadBill";

interface BillingTableProps {
  bills: Bill[];
  patients: Patient[];
  onView: (bill: Bill) => void;
  onEdit: (bill: Bill) => void;
  onDelete: (id: string) => void;
}

function BillingTable({
  bills,
  patients,
  onView,
  onEdit,
  onDelete,
}: BillingTableProps) {
  const getPatientName = (
    patientId: string
  ) => {
    const patient = patients.find(
      (patient) =>
        patient.id === patientId
    );

    return patient?.name || "Unknown Patient";
  };

  const getPatient = (
    patientId: string
  ) => {
    return patients.find(
      (patient) =>
        patient.id === patientId
    );
  };

  const getStatusClass = (
    status: Bill["paymentStatus"]
  ) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Partially Paid":
        return "bg-yellow-100 text-yellow-700";

      case "Pending":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full min-w-[950px] text-sm">

          <thead className="border-b bg-gray-50">
            <tr>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Bill ID
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Patient
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Date
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Total Amount
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Paid Amount
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Status
              </th>

              <th className="px-5 py-4 text-left font-semibold text-gray-700">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {bills.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-gray-500"
                >
                  No bills found.
                </td>
              </tr>
            ) : (
              bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-blue-600">
                    {bill.billId}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-800">
                    {getPatientName(
                      bill.patientId
                    )}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {new Date(
                      bill.billDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 font-medium text-gray-800">
                    ₹
                    {bill.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="px-5 py-4 text-gray-700">
                    ₹
                    {bill.paidAmount.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        bill.paymentStatus
                      )}`}
                    >
                      {bill.paymentStatus}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          onView(bill)
                        }
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onEdit(bill)
                        }
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <DownloadBill
                        bill={bill}
                        patient={getPatient(bill.patientId)}
                      />

                      <button
                        onClick={() =>
                          onDelete(bill.id)
                        }
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>

      <div className="space-y-4 md:hidden">

        {bills.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
            No bills found.
          </div>
        ) : (
          bills.map((bill) => (
            <div
              key={bill.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs text-gray-500">
                    Bill ID
                  </p>

                  <p className="mt-1 font-semibold text-blue-600">
                    {bill.billId}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                    bill.paymentStatus
                  )}`}
                >
                  {bill.paymentStatus}
                </span>

              </div>

              <div className="mt-4">

                <p className="text-xs text-gray-500">
                  Patient
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {getPatientName(
                    bill.patientId
                  )}
                </p>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Bill Date
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {new Date(
                      bill.billDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    ₹
                    {bill.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Paid Amount
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    ₹
                    {bill.paidAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Balance
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    ₹
                    {(
                      bill.totalAmount -
                      bill.paidAmount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

              </div>

              <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">

                <button
                  onClick={() =>
                    onView(bill)
                  }
                  className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                  title="View"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() =>
                    onEdit(bill)
                  }
                  className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>

                <DownloadBill
                  bill={bill}
                  patient={getPatient(bill.patientId)}
                />

                <button
                  onClick={() =>
                    onDelete(bill.id)
                  }
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </>
  );
}

export default BillingTable;