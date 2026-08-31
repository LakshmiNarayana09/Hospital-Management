import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  User,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getBillById,
} from "../../apis/billingApi";

import usePatients from "../../hooks/usePatients";

import type { Bill } from "../../types/Billing";

function BillDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const [bill, setBill] =
    useState<Bill | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) {
        setError(
          "Bill ID is missing."
        );

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await getBillById(id);

        setBill(data);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load bill."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);


  const patient = patients.find(
    (patient) =>
      patient.id === bill?.patientId
  );

  if (
    loading ||
    patientsLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading bill...
        </p>
      </div>
    );
  }

  if (
    error ||
    patientsError
  ) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/bills")
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Bills
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error || patientsError}
        </div>

      </div>
    );
  }

  if (!bill) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">

        <p className="text-gray-500">
          Bill not found.
        </p>

        <button
          onClick={() =>
            navigate("/bills")
          }
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          Back to Bills
        </button>

      </div>
    );
  }

  const balance =
    bill.totalAmount -
    bill.paidAmount;

  const statusClass =
    bill.paymentStatus === "Paid"
      ? "bg-green-100 text-green-700"
      : bill.paymentStatus ===
        "Partially Paid"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              navigate("/bills")
            }
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bill Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {bill.billId}
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            navigate(
              `/bills/${bill.id}/edit`
            )
          }
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit Bill
        </button>

      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <FileText size={22} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Bill ID
              </p>

              <p className="font-semibold text-gray-800">
                {bill.billId}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <CalendarDays
              size={18}
              className="text-gray-400"
            />

            <div>
              <p className="text-xs text-gray-500">
                Bill Date
              </p>

              <p className="text-sm font-medium text-gray-800">
                {new Date(
                  bill.billDate
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <span
            className={`self-start rounded-full px-3 py-1 text-xs font-medium sm:self-auto ${statusClass}`}
          >
            {bill.paymentStatus}
          </span>

        </div>

      </div>


      <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5 flex items-center gap-2">

          <User
            size={20}
            className="text-blue-600"
          />

          <h2 className="text-lg font-semibold text-gray-800">
            Patient Information
          </h2>

        </div>

        {patient ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <div>
              <p className="text-xs text-gray-500">
                Patient ID
              </p>

              <p className="mt-1 font-medium text-blue-600">
                {patient.patientId}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Patient Name
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {patient.name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="mt-1 text-gray-700">
                {patient.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="mt-1 text-gray-700">
                {patient.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Gender
              </p>

              <p className="mt-1 text-gray-700">
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Blood Group
              </p>

              <p className="mt-1 text-gray-700">
                {patient.bloodGroup}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Patient information not found.
          </p>
        )}

      </div>


      <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">

        <h2 className="mb-5 text-lg font-semibold text-gray-800">
          Billing Details
        </h2>

        <div className="divide-y divide-gray-100">

          <div className="flex items-center justify-between py-4">

            <span className="text-sm text-gray-600">
              Consultation Charges
            </span>

            <span className="font-medium text-gray-800">
              ₹
              {bill.consultationCharges.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          <div className="flex items-center justify-between py-4">

            <span className="text-sm text-gray-600">
              Medicine Charges
            </span>

            <span className="font-medium text-gray-800">
              ₹
              {bill.medicineCharges.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          <div className="flex items-center justify-between py-4">

            <span className="text-sm text-gray-600">
              Lab / Test Charges
            </span>

            <span className="font-medium text-gray-800">
              ₹
              {bill.labCharges.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          <div className="flex items-center justify-between py-4">

            <span className="text-sm text-gray-600">
              Other Charges
            </span>

            <span className="font-medium text-gray-800">
              ₹
              {bill.otherCharges.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          <div className="flex items-center justify-between py-4">

            <span className="font-semibold text-gray-800">
              Total Amount
            </span>

            <span className="text-lg font-bold text-blue-600">
              ₹
              {bill.totalAmount.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Amount
          </p>

          <p className="mt-2 text-xl font-bold text-gray-800">
            ₹
            {bill.totalAmount.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Paid Amount
          </p>

          <p className="mt-2 text-xl font-bold text-green-600">
            ₹
            {bill.paidAmount.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Balance
          </p>

          <p className="mt-2 text-xl font-bold text-red-600">
            ₹
            {balance.toLocaleString(
              "en-IN"
            )}
          </p>

        </div>

      </div>

      {bill.description && (
        <div className="rounded-xl bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            Description
          </h2>

          <p className="text-sm leading-6 text-gray-600">
            {bill.description}
          </p>

        </div>
      )}

    </div>
  );
}

export default BillDetails;