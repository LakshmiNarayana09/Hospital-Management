

import { useEffect, useMemo, useState } from "react";
import {
  CalendarPlus,
  Search,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  deleteAppointment,
  getAppointments,
} from "../../apis/appointmentApi";

import type { Appointment } from "../../types/Appointment";

function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [date, setDate] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const data = await getAppointments();

        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        appointment.appointmentId
          .toLowerCase()
          .includes(searchText) ||
        appointment.patientName
          .toLowerCase()
          .includes(searchText) ||
        appointment.doctorName
          .toLowerCase()
          .includes(searchText);

      const statusMatch =
        !status ||
        appointment.status === status;

      const dateMatch =
        !date ||
        appointment.date === date;

      return (
        searchMatch &&
        statusMatch &&
        dateMatch
      );
    });
  }, [
    appointments,
    search,
    status,
    date,
  ]);

  const totalPages = Math.ceil(
    filteredAppointments.length /
      itemsPerPage
  );

  const paginatedAppointments =
    filteredAppointments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAppointment(id);

      setAppointments((prev) =>
        prev.filter(
          (appointment) =>
            appointment.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to delete appointment"
      );
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, date]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage patient appointments
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/appointments/add")
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <CalendarPlus size={18} />
          Book Appointment
        </button>

      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search appointment, patient or doctor..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              All Statuses
            </option>

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

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

        </div>
      </div>

      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">

        <table className="w-full min-w-[1000px] text-sm">

          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left font-semibold">
                Appointment ID
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Patient
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Doctor
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Time
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedAppointments.map(
              (appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium text-blue-600">
                    {appointment.appointmentId}
                  </td>

                  <td className="px-5 py-4">
                    {appointment.patientName}
                  </td>

                  <td className="px-5 py-4">
                    {appointment.doctorName}
                  </td>

                  <td className="px-5 py-4">
                    {appointment.date}
                  </td>

                  <td className="px-5 py-4">
                    {appointment.time}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={appointment.status}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/appointments/${appointment.id}`
                          )
                        }
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(
                            `/appointments/${appointment.id}/edit`
                          )
                        }
                        className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            appointment.id
                          )
                        }
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

      <div className="space-y-4 md:hidden">

        {paginatedAppointments.map(
          (appointment) => (
            <div
              key={appointment.id}
              className="rounded-xl bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    {appointment.appointmentId}
                  </p>

                  <h3 className="mt-1 font-semibold text-gray-800">
                    {appointment.patientName}
                  </h3>
                </div>

                <StatusBadge
                  status={appointment.status}
                />

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <p>
                  <span className="text-gray-500">
                    Doctor:{" "}
                  </span>
                  <span className="font-medium text-gray-800">
                    {appointment.doctorName}
                  </span>
                </p>

                <p>
                  <span className="text-gray-500">
                    Date:{" "}
                  </span>
                  {appointment.date}
                </p>

                <p>
                  <span className="text-gray-500">
                    Time:{" "}
                  </span>
                  {appointment.time}
                </p>

                <p>
                  <span className="text-gray-500">
                    Reason:{" "}
                  </span>
                  {appointment.reason}
                </p>

              </div>

              <div className="mt-4 flex gap-2 border-t pt-3">

                <button
                  onClick={() =>
                    navigate(
                      `/appointments/${appointment.id}`
                    )
                  }
                  className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/appointments/${appointment.id}/edit`
                    )
                  }
                  className="flex-1 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      appointment.id
                    )
                  }
                  className="rounded-lg bg-red-50 px-3 py-2 text-red-600"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          )
        )}

      </div>

      {paginatedAppointments.length === 0 && (
        <div className="rounded-xl bg-white py-10 text-center shadow-sm">
          <p className="text-gray-500">
            No appointments found.
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                (prev) => prev - 1
              )
            }
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-3 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

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
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default Appointments;