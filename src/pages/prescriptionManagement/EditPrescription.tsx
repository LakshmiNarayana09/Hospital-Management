import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PrescriptionForm from "../../components/prescriptions/PrescriptionForm";

import usePatients from "../../hooks/usePatients";
import useDoctors from "../../hooks/useDoctors";

import {
  getPrescriptionById,
  updatePrescription,
} from "../../apis/prescriptionApi";

import type { Prescription } from "../../types/Prescription";

function EditPrescription() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    patients,
    loading: patientsLoading,
    error: patientsError,
  } = usePatients();

  const {
    doctors,
    loading: doctorsLoading,
    error: doctorsError,
  } = useDoctors();

  const [prescription, setPrescription] =
    useState<Prescription | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");


  useEffect(() => {
    const fetchPrescription =
      async () => {
        if (!id) {
          setError(
            "Prescription ID is missing."
          );
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError("");

          const data =
            await getPrescriptionById(id);

          setPrescription(data);
        } catch (error) {
          console.error(error);

          setError(
            "Failed to load prescription."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchPrescription();
  }, [id]);


  const handleSubmit = async (
    updatedPrescription: Omit<
      Prescription,
      "id"
    >
  ) => {
    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updatePrescription(
        id,
        updatedPrescription
      );

      navigate("/prescriptions");
    } catch (error) {
      console.error(error);

      setError(
        "Failed to update prescription. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };


  const handleCancel = () => {
    navigate("/prescriptions");
  };


  if (
    loading ||
    patientsLoading ||
    doctorsLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading prescription...
        </p>
      </div>
    );
  }


  if (
    error ||
    patientsError ||
    doctorsError
  ) {
    return (
      <div className="space-y-4">

        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Prescriptions
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error ||
            patientsError ||
            doctorsError}
        </div>

      </div>
    );
  }


  if (!prescription) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">

        <p className="text-gray-500">
          Prescription not found.
        </p>

        <button
          onClick={handleCancel}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          Back to Prescriptions
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
            Edit Prescription
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update {prescription.prescriptionId}
          </p>
        </div>

      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}


      <PrescriptionForm
        patients={patients}
        doctors={doctors}
        initialData={prescription}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />

    </div>
  );
}

export default EditPrescription;