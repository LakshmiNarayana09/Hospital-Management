import { useEffect, useMemo, useState } from "react";

import type { Bill } from "../../types/Billing";
import type { Patient } from "../../types/Patient";

interface BillingFormProps {
  patients: Patient[];
  initialData?: Bill;
  onSubmit: (
    bill: Omit<Bill, "id">
  ) => void;
  onCancel: () => void;
  loading?: boolean;
}

function BillingForm({
  patients,
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: BillingFormProps) {
  const [patientId, setPatientId] =
    useState(initialData?.patientId || "");

  const [billDate, setBillDate] =
    useState(
      initialData?.billDate ||
        new Date().toISOString().split("T")[0]
    );

  const [consultationCharges, setConsultationCharges] =
    useState(
      initialData?.consultationCharges?.toString() || ""
    );

  const [medicineCharges, setMedicineCharges] =
    useState(
      initialData?.medicineCharges?.toString() || ""
    );

  const [labCharges, setLabCharges] =
    useState(
      initialData?.labCharges?.toString() || ""
    );

  const [otherCharges, setOtherCharges] =
    useState(
      initialData?.otherCharges?.toString() || ""
    );

  const [paidAmount, setPaidAmount] =
    useState(
      initialData?.paidAmount?.toString() || ""
    );

  const [description, setDescription] =
    useState(
      initialData?.description || ""
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const totalAmount = useMemo(() => {
    return (
      Number(consultationCharges) +
      Number(medicineCharges) +
      Number(labCharges) +
      Number(otherCharges)
    );
  }, [
    consultationCharges,
    medicineCharges,
    labCharges,
    otherCharges,
  ]);

  const paymentStatus = useMemo(() => {
    const paid = Number(paidAmount);

    if (paid <= 0) {
      return "Pending";
    }

    if (paid >= totalAmount) {
      return "Paid";
    }

    return "Partially Paid";
  }, [paidAmount, totalAmount]);

  useEffect(() => {
    const paid = Number(paidAmount);

    if (
      paid > totalAmount &&
      totalAmount > 0
    ) {
      setPaidAmount(
        totalAmount.toString()
      );
    }
  }, [totalAmount, paidAmount]);

  const validate = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!patientId) {
      newErrors.patientId =
        "Please select a patient.";
    }

    if (!billDate) {
      newErrors.billDate =
        "Bill date is required.";
    }

    if (
      Number(consultationCharges) < 0 ||
      Number(medicineCharges) < 0 ||
      Number(labCharges) < 0 ||
      Number(otherCharges) < 0
    ) {
      newErrors.charges =
        "Charges cannot be negative.";
    }

    if (totalAmount <= 0) {
      newErrors.charges =
        "At least one charge must be greater than 0.";
    }

    if (Number(paidAmount) < 0) {
      newErrors.paidAmount =
        "Paid amount cannot be negative.";
    }

    if (
      Number(paidAmount) > totalAmount
    ) {
      newErrors.paidAmount =
        "Paid amount cannot exceed total amount.";
    }

    if (new Date(billDate) > new Date()) {
      newErrors.billDate =
        "Bill date cannot be in the future.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const bill: Omit<Bill, "id"> = {
      billId:
        initialData?.billId ||
        `BILL${Date.now()}`,

      patientId,

      billDate,

      consultationCharges:
        Number(consultationCharges) || 0,

      medicineCharges:
        Number(medicineCharges) || 0,

      labCharges:
        Number(labCharges) || 0,

      otherCharges:
        Number(otherCharges) || 0,

      totalAmount,

      paidAmount:
        Number(paidAmount) || 0,

      paymentStatus,

      description:
        description.trim(),
    };

    onSubmit(bill);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-5 shadow-sm sm:p-6"
    >

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Patient
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <select
            value={patientId}
            onChange={(e) => {
              setPatientId(e.target.value);

              setErrors((prev) => ({
                ...prev,
                patientId: "",
              }));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              Select Patient
            </option>

            {patients.map((patient) => (
              <option
                key={patient.id}
                value={patient.id}
              >
                {patient.patientId} -{" "}
                {patient.name}
              </option>
            ))}
          </select>

          {errors.patientId && (
            <p className="mt-1 text-xs text-red-500">
              {errors.patientId}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Bill Date
            <span className="text-red-500">
              {" "}*
            </span>
          </label>

          <input
            type="date"
            value={billDate}
            max={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) => {
              setBillDate(e.target.value);

              setErrors((prev) => ({
                ...prev,
                billDate: "",
              }));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          {errors.billDate && (
            <p className="mt-1 text-xs text-red-500">
              {errors.billDate}
            </p>
          )}
        </div>

      </div>

      <div>
        <h2 className="mb-4 text-base font-semibold text-gray-800">
          Charges
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Consultation Charges
            </label>

            <input
              type="number"
              min="0"
              value={consultationCharges}
              onChange={(e) =>
                setConsultationCharges(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Medicine Charges
            </label>

            <input
              type="number"
              min="0"
              value={medicineCharges}
              onChange={(e) =>
                setMedicineCharges(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Lab / Test Charges
            </label>

            <input
              type="number"
              min="0"
              value={labCharges}
              onChange={(e) =>
                setLabCharges(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Other Charges
            </label>

            <input
              type="number"
              min="0"
              value={otherCharges}
              onChange={(e) =>
                setOtherCharges(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {errors.charges && (
          <p className="mt-2 text-xs text-red-500">
            {errors.charges}
          </p>
        )}
      </div>

      <div className="rounded-xl bg-blue-50 p-4">

        <div className="flex items-center justify-between">

          <span className="text-sm font-medium text-gray-700">
            Total Amount
          </span>

          <span className="text-xl font-bold text-blue-600">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Paid Amount
          </label>

          <input
            type="number"
            min="0"
            max={totalAmount}
            value={paidAmount}
            onChange={(e) => {
              setPaidAmount(
                e.target.value
              );

              setErrors((prev) => ({
                ...prev,
                paidAmount: "",
              }));
            }}
            placeholder="Enter paid amount"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          {errors.paidAmount && (
            <p className="mt-1 text-xs text-red-500">
              {errors.paidAmount}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment Status
          </label>

          <div className="flex h-[42px] items-center">

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : paymentStatus ===
                    "Partially Paid"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {paymentStatus}
            </span>

          </div>
        </div>

      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Enter bill description..."
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Bill"
            : "Create Bill"}
        </button>

      </div>
    </form>
  );
}

export default BillingForm;