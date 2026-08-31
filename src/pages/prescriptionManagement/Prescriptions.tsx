
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import usePrescriptions from "../../hooks/usePrescriptions";
import usePatients from "../../hooks/usePatients";
import useDoctors from "../../hooks/useDoctors";

import PrescriptionTable from "../../components/prescriptions/PrescriptionTable";



function Prescriptions() {
  const navigate = useNavigate();

  const {
    prescriptions,
    loading: prescriptionLoading,
    error: prescriptionError,
    removePrescription,
  } = usePrescriptions();

  const {
    patients,
    loading: patientLoading,
  } = usePatients();

  const {
    doctors,
    loading: doctorLoading,
  } = useDoctors();

  const [search, setSearch] = useState("");

  const [patientFilter, setPatientFilter] =
    useState("");

  const [doctorFilter, setDoctorFilter] =
    useState("");

  const [sortBy, setSortBy] =
    useState<"newest" | "oldest">("newest");

  const [showFilters, setShowFilters] =
    useState(false);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const filteredPrescriptions =
    useMemo(() => {
      let result = [...prescriptions];

      if (search.trim()) {
        const searchValue =
          search.toLowerCase();

        result = result.filter(
          (prescription) => {
            const patient = patients.find(
              (patient) =>
                patient.id ===
                prescription.patientId
            );

            const doctor = doctors.find(
              (doctor) =>
                doctor.id ===
                prescription.doctorId
            );

            return (
              prescription.prescriptionId
                .toLowerCase()
                .includes(searchValue) ||
              patient?.name
                .toLowerCase()
                .includes(searchValue) ||
              doctor?.name
                .toLowerCase()
                .includes(searchValue) ||
              prescription.diagnosis
                .toLowerCase()
                .includes(searchValue)
            );
          }
        );
      }

      if (patientFilter) {
        result = result.filter(
          (prescription) =>
            prescription.patientId ===
            patientFilter
        );
      }

      if (doctorFilter) {
        result = result.filter(
          (prescription) =>
            prescription.doctorId ===
            doctorFilter
        );
      }

      result.sort((a, b) => {
        const dateA =
          new Date(a.date).getTime();

        const dateB =
          new Date(b.date).getTime();

        return sortBy === "newest"
          ? dateB - dateA
          : dateA - dateB;
      });

      return result;
    }, [
      prescriptions,
      patients,
      doctors,
      search,
      patientFilter,
      doctorFilter,
      sortBy,
    ]);

  const totalPages = Math.ceil(
    filteredPrescriptions.length /
      itemsPerPage
  );

  const paginatedPrescriptions =
    filteredPrescriptions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePatientFilter = (
    value: string
  ) => {
    setPatientFilter(value);
    setCurrentPage(1);
  };

  const handleDoctorFilter = (
    value: string
  ) => {
    setDoctorFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setPatientFilter("");
    setDoctorFilter("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this prescription?"
      );

    if (!confirmed) {
      return;
    }

    await removePrescription(id);
  };

  if (
    prescriptionLoading ||
    patientLoading ||
    doctorLoading
  ) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading prescriptions...
        </p>
      </div>
    );
  }

  if (prescriptionError) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {prescriptionError}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Prescriptions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage patient prescriptions
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/prescriptions/add")
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />

          Add Prescription
        </button>

      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              placeholder="Search prescription, patient, doctor..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />

          </div>

          <button
            onClick={() =>
              setShowFilters(
                !showFilters
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} />

            Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(
                e.target.value as
                  | "newest"
                  | "oldest"
              );
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>
          </select>

        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Patient
              </label>

              <select
                value={patientFilter}
                onChange={(e) =>
                  handlePatientFilter(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">
                  All Patients
                </option>

                {patients.map(
                  (patient) => (
                    <option
                      key={patient.id}
                      value={patient.id}
                    >
                      {patient.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Doctor
              </label>

              <select
                value={doctorFilter}
                onChange={(e) =>
                  handleDoctorFilter(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">
                  All Doctors
                </option>

                {doctors.map(
                  (doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.id}
                    >
                      {doctor.name}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>
        )}

        {(search ||
          patientFilter ||
          doctorFilter) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">

            <span className="text-sm text-gray-500">
              Active filters:
            </span>

            {search && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                Search: {search}

                <button
                  onClick={() =>
                    handleSearch("")
                  }
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {patientFilter && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
                Patient selected
              </span>
            )}

            {doctorFilter && (
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                Doctor selected
              </span>
            )}

            <button
              onClick={clearFilters}
              className="text-xs font-medium text-red-600 hover:underline"
            >
              Clear All
            </button>

          </div>
        )}

      </div>

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-800">
            {filteredPrescriptions.length}
          </span>{" "}
          prescriptions
        </p>

      </div>

      {filteredPrescriptions.length === 0 ? (
        <div className="rounded-xl bg-white py-12 text-center shadow-sm">

          <p className="text-gray-500">
            No prescriptions found.
          </p>

          <button
            onClick={clearFilters}
            className="mt-3 text-sm font-medium text-blue-600 hover:underline"
          >
            Clear filters
          </button>

        </div>
      ) : (
        <PrescriptionTable
          prescriptions={
            paginatedPrescriptions
          }
          patients={patients}
          doctors={doctors}
          onView={(prescription) =>
            navigate(
              `/prescriptions/${prescription.id}`
            )
          }
          onEdit={(prescription) =>
            navigate(
              `/prescriptions/${prescription.id}/edit`
            )
          }
          onDelete={handleDelete}
        />
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
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() =>
                setCurrentPage(page)
              }
              className={`rounded-lg px-3 py-2 text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                (prev) => prev + 1
              )
            }
            className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
}

export default Prescriptions;