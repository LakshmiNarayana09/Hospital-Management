import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import BillingForm from "../../components/bills/BillingForm";

import usePatients from "../../hooks/usePatients";

import {
  getBillById,
  updateBill,
} from "../../apis/billingApi";

import type { Bill } from "../../types/Billing";

function EditBill() {
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

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) {
        setError("Bill ID is missing.");
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

  const handleSubmit = async (
    updatedBill: Omit<Bill, "id">
  ) => {
    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateBill(
        id,
        updatedBill
      );

      navigate("/bills");
    } catch (error) {
      console.error(error);

      setError(
        "Failed to update bill. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/bills");
  };

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
          onClick={handleCancel}
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
          onClick={handleCancel}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          Back to Bills
        </button>

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
            Edit Bill
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update bill information
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
        initialData={bill}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />

    </div>
  );
}

export default EditBill;