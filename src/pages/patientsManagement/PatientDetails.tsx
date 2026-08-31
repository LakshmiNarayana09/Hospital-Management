import { useEffect, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getPatientById } from "../../apis/patientApi";
import type { Patient } from "../../types/Patient";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError("Patient ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await getPatientById(id);
        setPatient(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch patient details");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading patient details...
        </p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate("/patients")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Patients
        </button>

        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-500">
            {error || "Patient not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate("/patients")}
            className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Patients
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Patient Details
          </h1>
        </div>

        <button
          onClick={() =>
            navigate(`/patients/${patient.id}/edit`)
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit Patient
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm">

        <div className="flex items-center gap-4 border-b p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
            {patient.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {patient.name}
            </h2>

            <p className="text-sm text-gray-500">
              Patient ID: {patient.patientId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <p className="text-sm text-gray-500">
              Age
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.age}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Gender
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Blood Group
            </p>
            <p className="mt-1 font-medium text-red-600">
              {patient.bloodGroup}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>
            <p className="mt-1 break-all font-medium text-gray-800">
              {patient.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Emergency Contact
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.emergencyContact}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">
              Address
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.address}
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-sm text-gray-500">
              Medical History
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.medicalHistory || "No medical history"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Registered Date
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {patient.registeredDate}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PatientDetails;