import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PrescriptionForm from "../../components/prescriptions/PrescriptionForm";

import usePatients from "../../hooks/usePatients";
import useDoctors from "../../hooks/useDoctors";

import { createPrescription } from "../../apis/prescriptionApi";

import type { Prescription } from "../../types/Prescription";

function AddPrescription() {
  const navigate = useNavigate();

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

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    prescription: Omit<Prescription, "id">
  ) => {
    try {
      setLoading(true);
      setError("");

      await createPrescription(
        prescription
      );

      navigate("/prescriptions");
    } catch (error) {
      console.error(error);

      setError(
        "Failed to create prescription. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/prescriptions");
  };


  if (
    patientsLoading ||
    doctorsLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading form...
        </p>
      </div>
    );
  }


  if (patientsError || doctorsError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {patientsError ||
          doctorsError}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          title="Back"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add Prescription
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new prescription for a patient
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
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

    </div>
  );
}

export default AddPrescription;