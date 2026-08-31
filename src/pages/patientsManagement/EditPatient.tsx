import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import PatientForm, {
  type PatientFormData,
} from "../../components/patients/PatientForm";

import {
  getPatientById,
  updatePatient,
} from "../../apis/patientApi";

import type { Patient } from "../../types/Patient";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      try {
        const data = await getPatientById(id);

        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleSubmit = async (
    formData: PatientFormData
  ) => {
    if (!id) return;

    try {
      setSaving(true);

      await updatePatient(id, {
        patientId: formData.patientId,
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender as
          | "Male"
          | "Female"
          | "Other",
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
        emergencyContact:
          formData.emergencyContact,
        medicalHistory:
          formData.medicalHistory,
        department: formData.department,
        registeredDate:
          formData.registeredDate,
      });

      navigate(`/patients/${id}`);
    } catch (error) {
      console.error("Failed to update patient:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading patient...
        </p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">
          Patient not found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">

      <div className="mb-6">
        <button
          onClick={() =>
            navigate(`/patients/${id}`)
          }
          className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Patient
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Edit Patient
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update patient information
        </p>
      </div>

      <PatientForm
        initialData={patient}
        onSubmit={handleSubmit}
        submitText={
          saving ? "Updating..." : "Update Patient"
        }
      />
    </div>
  );
}

export default EditPatient;