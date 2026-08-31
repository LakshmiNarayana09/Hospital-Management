import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAppointmentById,
  updateAppointment,
} from "../../apis/appointmentApi";

import { getPatients } from "../../apis/patientApi";
import { getDoctors } from "../../apis/doctorApi";

import type { Appointment } from "../../types/Appointment";
import type { Patient } from "../../types/Patient";
import type { Doctor } from "../../types/Doctor";

interface AppointmentFormData {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  status: Appointment["status"];
}

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [formData, setFormData] =
    useState<AppointmentFormData>({
      appointmentId: "",
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
      status: "Scheduled",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setErrors({
          submit:
            "Appointment ID is missing",
        });

        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [
          appointment,
          patientData,
          doctorData,
        ] = await Promise.all([
          getAppointmentById(id),
          getPatients(),
          getDoctors(),
        ]);

        setPatients(patientData);
        setDoctors(doctorData);

        setFormData({
          appointmentId:
            appointment.appointmentId,

          patientId:
            appointment.patientId,

          doctorId:
            appointment.doctorId,

          date:
            appointment.date,

          time:
            appointment.time,

          reason:
            appointment.reason,

          status:
            appointment.status,
        });
      } catch (error) {
        console.error(error);

        setErrors({
          submit:
            "Failed to load appointment.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> =
      {};

    if (!formData.appointmentId.trim()) {
      newErrors.appointmentId =
        "Appointment ID is required";
    }

    if (!formData.patientId) {
      newErrors.patientId =
        "Please select a patient";
    }

    if (!formData.doctorId) {
      newErrors.doctorId =
        "Please select a doctor";
    }

    if (!formData.date) {
      newErrors.date =
        "Appointment date is required";
    }

    if (!formData.time) {
      newErrors.time =
        "Appointment time is required";
    }

    if (!formData.reason.trim()) {
      newErrors.reason =
        "Reason for visit is required";
    }

    if (!formData.status) {
      newErrors.status =
        "Appointment status is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!id) {
      return;
    }

    const selectedPatient =
      patients.find(
        (patient) =>
          patient.id ===
          formData.patientId
      );

    const selectedDoctor =
      doctors.find(
        (doctor) =>
          doctor.id ===
          formData.doctorId
      );

    if (!selectedPatient || !selectedDoctor) {
      setErrors({
        submit:
          "Selected patient or doctor was not found.",
      });

      return;
    }

    try {
      setSaving(true);

      await updateAppointment(id, {
        appointmentId:
          formData.appointmentId,

        patientId:
          selectedPatient.id,

        patientName:
          selectedPatient.name,

        doctorId:
          selectedDoctor.id,

        doctorName:
          selectedDoctor.name,

        date:
          formData.date,

        time:
          formData.time,

        reason:
          formData.reason,

        status:
          formData.status,
      });

      navigate("/appointments");
    } catch (error) {
      console.error(error);

      setErrors({
        submit:
          "Failed to update appointment.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading appointment...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">

      <div className="mb-6">

        <button
          onClick={() =>
            navigate("/appointments")
          }
          className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Appointments
        </button>

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Appointment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update appointment information
            </p>
          </div>

        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow-sm"
      >

        {errors.submit && (
          <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Appointment ID
            </label>

            <input
              type="text"
              name="appointmentId"
              value={formData.appointmentId}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            {errors.appointmentId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.appointmentId}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Patient
            </label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Doctor
            </label>

            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
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
                  {doctor.doctorId} -{" "}
                  {doctor.name} (
                  {doctor.specialization})
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
              Appointment Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
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
              Appointment Time
            </label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            {errors.time && (
              <p className="mt-1 text-xs text-red-500">
                {errors.time}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="Scheduled">
                Scheduled
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

              <option value="No-show">
                No-show
              </option>
            </select>

            {errors.status && (
              <p className="mt-1 text-xs text-red-500">
                {errors.status}
              </p>
            )}
          </div>

          <div className="md:col-span-2">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Reason for Visit
            </label>

            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            {errors.reason && (
              <p className="mt-1 text-xs text-red-500">
                {errors.reason}
              </p>
            )}

          </div>

        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() =>
              navigate("/appointments")
            }
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : "Update Appointment"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditAppointment;