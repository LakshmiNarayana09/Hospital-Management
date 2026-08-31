import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BillingForm from "../../components/bills/BillingForm";

import usePatients from "../../hooks/usePatients";

import { createBill } from "../../apis/billingApi";

import type { Bill } from "../../types/Billing";

function AddBill() {
  const navigate = useNavigate();

  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    bill: Omit<Bill, "id">
  ) => {
    try {
      setLoading(true);
      setError("");

      await createBill(bill);

      navigate("/bills");
    } catch (error) {
      console.error(error);

      setError(
        "Failed to create bill. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/bills");
  };


  if (patientsLoading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading patients...
        </p>
      </div>
    );
  }


  if (patientsError) {
    return (
      <div className="space-y-4">

        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Bills
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {patientsError}
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <button
          onClick={handleCancel}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          title="Back"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add Bill
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new patient bill
          </p>
        </div>

      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <BillingForm
        patients={patients}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

    </div>
  );
}

export default AddBill;