import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  FileText,
  Pencil,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getAppointmentById } from "../../apis/appointmentApi";

import type { Appointment } from "../../types/Appointment";

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] =
    useState<Appointment | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!id) {
        setError("Appointment ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data =
          await getAppointmentById(id);

        setAppointment(data);
      } catch (error) {
        console.error(error);
        setError("Appointment not found");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading appointment...
        </p>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/appointments")
          }
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Appointments
        </button>

        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          {error || "Appointment not found"}
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <button
            onClick={() =>
              navigate("/appointments")
            }
            className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Appointments
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Appointment Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {appointment.appointmentId}
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              `/appointments/${appointment.id}/edit`
            )
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Pencil size={17} />
          Edit Appointment
        </button>

      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-gray-500">
              Appointment ID
            </p>

            <p className="mt-1 text-lg font-semibold text-blue-600">
              {appointment.appointmentId}
            </p>
          </div>

          <StatusBadge
            status={appointment.status}
          />

        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <User size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
                Patient
              </h2>

              <p className="text-xs text-gray-500">
                Patient information
              </p>
            </div>

          </div>

          <DetailRow
            label="Patient ID"
            value={appointment.patientId}
          />

          <DetailRow
            label="Patient Name"
            value={appointment.patientName}
          />

        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <Stethoscope size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
                Doctor
              </h2>

              <p className="text-xs text-gray-500">
                Doctor information
              </p>
            </div>

          </div>

          <DetailRow
            label="Doctor ID"
            value={appointment.doctorId}
          />

          <DetailRow
            label="Doctor Name"
            value={appointment.doctorName}
          />

        </div>

      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
            <CalendarDays size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              Appointment Information
            </h2>

            <p className="text-xs text-gray-500">
              Date and time details
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <DetailRow
            label="Date"
            value={appointment.date}
          />

          <div className="flex items-start gap-3">

            <Clock
              size={18}
              className="mt-0.5 text-gray-400"
            />

            <div>
              <p className="text-xs text-gray-500">
                Time
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {appointment.time}
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-3">

          <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
            <FileText size={22} />
          </div>

          <h2 className="font-semibold text-gray-800">
            Reason for Visit
          </h2>

        </div>

        <div className="rounded-lg bg-gray-50 p-4">

          <p className="text-sm leading-6 text-gray-700">
            {appointment.reason}
          </p>

        </div>

      </div>

    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

interface StatusBadgeProps {
  status: Appointment["status"];
}

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles = {
    Scheduled:
      "bg-blue-100 text-blue-700",
    Completed:
      "bg-green-100 text-green-700",
    Cancelled:
      "bg-red-100 text-red-700",
    "No-show":
      "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default AppointmentDetails;