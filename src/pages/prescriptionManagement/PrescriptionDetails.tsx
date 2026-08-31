import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  Pill,
  User,
  Stethoscope,
  CalendarDays,
  FileText,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPrescriptionById,
} from "../../apis/prescriptionApi";

import {
  getPatientById,
} from "../../apis/patientApi";

import {
  getDoctorById,
} from "../../apis/doctorApi";

import type { Prescription } from "../../types/Prescription";
import type { Patient } from "../../types/Patient";
import type { Doctor } from "../../types/Doctor";

function PrescriptionDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [prescription, setPrescription] =
    useState<Prescription | null>(null);

  const [patient, setPatient] =
    useState<Patient | null>(null);

  const [doctor, setDoctor] =
    useState<Doctor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchData = async () => {
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

        const prescriptionData =
          await getPrescriptionById(id);

        setPrescription(
          prescriptionData
        );

        const [
          patientData,
          doctorData,
        ] = await Promise.all([
          getPatientById(
            prescriptionData.patientId
          ),
          getDoctorById(
            prescriptionData.doctorId
          ),
        ]);

        setPatient(patientData);
        setDoctor(doctorData);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load prescription details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading prescription...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/prescriptions")
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Prescriptions
        </button>

        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error}
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
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              navigate("/prescriptions")
            }
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Prescription Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {prescription.prescriptionId}
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            navigate(
              `/prescriptions/${prescription.id}/edit`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Pencil size={17} />
          Edit Prescription
        </button>

      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <User size={22} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Patient
              </p>

              <p className="font-semibold text-gray-800">
                {patient?.name ||
                  "Unknown Patient"}
              </p>
            </div>

          </div>

          {patient && (
            <div className="mt-4 space-y-2 text-sm">

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Patient ID:
                </span>{" "}
                {patient.patientId}
              </p>

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Age:
                </span>{" "}
                {patient.age}
              </p>

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Gender:
                </span>{" "}
                {patient.gender}
              </p>

            </div>
          )}

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <Stethoscope size={22} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Doctor
              </p>

              <p className="font-semibold text-gray-800">
                {doctor?.name ||
                  "Unknown Doctor"}
              </p>
            </div>

          </div>

          {doctor && (
            <div className="mt-4 space-y-2 text-sm">

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Specialization:
                </span>{" "}
                {doctor.specialization}
              </p>

              <p className="text-gray-600">
                <span className="font-medium text-gray-800">
                  Department:
                </span>{" "}
                {doctor.department}
              </p>

            </div>
          )}

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <CalendarDays size={22} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Prescription Date
              </p>

              <p className="font-semibold text-gray-800">
                {new Date(
                  prescription.date
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Diagnosis
            </p>

            <p className="mt-1 font-medium text-gray-800">
              {prescription.diagnosis}
            </p>
          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow-sm">

        <div className="border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Pill size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Prescribed Medicines
              </h2>

              <p className="text-sm text-gray-500">
                {prescription.medicines.length}{" "}
                {prescription.medicines.length ===
                1
                  ? "medicine"
                  : "medicines"}
              </p>
            </div>

          </div>

        </div>

        <div className="space-y-4 p-5">

          {prescription.medicines.map(
            (medicine, index) => (
              <div
                key={medicine.id}
                className="rounded-xl border border-gray-200 p-4"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-xs font-medium text-purple-600">
                      Medicine {index + 1}
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-gray-800">
                      {medicine.name}
                    </h3>
                  </div>

                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Dosage
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {medicine.dosage}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {medicine.duration}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Instructions
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {medicine.instructions}
                    </p>
                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {prescription.notes && (
        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
                Additional Notes
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {prescription.notes}
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default PrescriptionDetails;