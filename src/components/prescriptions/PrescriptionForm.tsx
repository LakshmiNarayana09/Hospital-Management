import { useState } from "react";
import {
  Plus,
  Trash2,
} from "lucide-react";

import type { Patient } from "../../types/Patient";
import type { Doctor } from "../../types/Doctor";
import type {
  Prescription,
  Medicine,
} from "../../types/Prescription";

interface PrescriptionFormProps {
  patients: Patient[];
  doctors: Doctor[];
  initialData?: Prescription;
  onSubmit: (
    prescription: Omit<Prescription, "id">
  ) => void;
  onCancel: () => void;
  loading?: boolean;
}

interface FormErrors {
  patientId?: string;
  doctorId?: string;
  date?: string;
  diagnosis?: string;
  medicines?: string;
}

function PrescriptionForm({
  patients,
  doctors,
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: PrescriptionFormProps) {
  const [patientId, setPatientId] = useState(
    initialData?.patientId || ""
  );

  const [doctorId, setDoctorId] = useState(
    initialData?.doctorId || ""
  );

  const [date, setDate] = useState(
    initialData?.date ||
      new Date().toISOString().split("T")[0]
  );

  const [diagnosis, setDiagnosis] = useState(
    initialData?.diagnosis || ""
  );

  const [medicines, setMedicines] =
    useState<Medicine[]>(
      initialData?.medicines || [
        {
          id: crypto.randomUUID(),
          name: "",
          dosage: "",
          duration: "",
          instructions: "",
        },
      ]
    );

  const [notes, setNotes] = useState(
    initialData?.notes || ""
  );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        dosage: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (id: string) => {
    if (medicines.length === 1) {
      return;
    }

    setMedicines((prev) =>
      prev.filter(
        (medicine) => medicine.id !== id
      )
    );
  };

  const updateMedicine = (
    id: string,
    field: keyof Medicine,
    value: string
  ) => {
    setMedicines((prev) =>
      prev.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              [field]: value,
            }
          : medicine
      )
    );
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!patientId) {
      newErrors.patientId =
        "Please select a patient.";
    }

    if (!doctorId) {
      newErrors.doctorId =
        "Please select a doctor.";
    }

    if (!date) {
      newErrors.date =
        "Please select a date.";
    }

    if (!diagnosis.trim()) {
      newErrors.diagnosis =
        "Diagnosis is required.";
    }

    const invalidMedicine =
      medicines.some(
        (medicine) =>
          !medicine.name.trim() ||
          !medicine.dosage.trim() ||
          !medicine.duration.trim() ||
          !medicine.instructions.trim()
      );

    if (invalidMedicine) {
      newErrors.medicines =
        "Please complete all medicine fields.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const prescription: Omit<
      Prescription,
      "id"
    > = {
      prescriptionId:
        initialData?.prescriptionId ||
        `PRE${Date.now()}`,

      patientId,

      doctorId,

      date,

      diagnosis: diagnosis.trim(),

      medicines,

      notes: notes.trim(),
    };

    onSubmit(prescription);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="rounded-xl bg-white p-5 shadow-sm">

        <h2 className="text-lg font-semibold text-gray-800">
          Prescription Details
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
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
                  {patient.name} (
                  {patient.patientId})
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Doctor
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <select
              value={doctorId}
              onChange={(e) => {
                setDoctorId(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  doctorId: "",
                }));
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">
                Select Doctor
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {doctor.name} -{" "}
                  {doctor.specialization}
                </option>
              ))}
            </select>

            {errors.doctorId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.doctorId}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Prescription Date
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  date: "",
                }));
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            {errors.date && (
              <p className="mt-1 text-xs text-red-500">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Diagnosis
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="text"
              value={diagnosis}
              onChange={(e) => {
                setDiagnosis(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  diagnosis: "",
                }));
              }}
              placeholder="Enter diagnosis"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            {errors.diagnosis && (
              <p className="mt-1 text-xs text-red-500">
                {errors.diagnosis}
              </p>
            )}
          </div>

        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Medicines
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add medicines prescribed to the patient.
            </p>
          </div>

          <button
            type="button"
            onClick={addMedicine}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={17} />

            Add Medicine
          </button>

        </div>

        {errors.medicines && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.medicines}
          </p>
        )}

        <div className="mt-5 space-y-5">

          {medicines.map(
            (medicine, index) => (
              <div
                key={medicine.id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">

                  <h3 className="font-medium text-gray-800">
                    Medicine {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeMedicine(
                        medicine.id
                      )
                    }
                    disabled={
                      medicines.length === 1
                    }
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Remove medicine"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Medicine Name
                    </label>

                    <input
                      type="text"
                      value={medicine.name}
                      onChange={(e) =>
                        updateMedicine(
                          medicine.id,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Amlodipine"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Dosage
                    </label>

                    <input
                      type="text"
                      value={medicine.dosage}
                      onChange={(e) =>
                        updateMedicine(
                          medicine.id,
                          "dosage",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 5 mg"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Duration
                    </label>

                    <input
                      type="text"
                      value={medicine.duration}
                      onChange={(e) =>
                        updateMedicine(
                          medicine.id,
                          "duration",
                          e.target.value
                        )
                      }
                      placeholder="e.g. 30 days"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Instructions
                    </label>

                    <input
                      type="text"
                      value={
                        medicine.instructions
                      }
                      onChange={(e) =>
                        updateMedicine(
                          medicine.id,
                          "instructions",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Take after breakfast"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                </div>

              </div>
            )
          )}

        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Notes
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows={4}
          placeholder="Additional instructions or notes..."
          className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        />

      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
              ? "Update Prescription"
              : "Create Prescription"}
        </button>

      </div>
    </form>
  );
}

export default PrescriptionForm;