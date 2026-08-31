
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useDoctors from "../../hooks/useDoctors";

import DoctorTable from "../../components/doctors/DoctorTable";
import Pagination from "../../components/common/Pagination";

function Doctors() {
  const navigate = useNavigate();

  const {
    doctors,
    loading,
    error,
    removeDoctor,
  } = useDoctors();

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [department, setDepartment] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const searchMatch =
        doctor.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doctor.doctorId
          .toLowerCase()
          .includes(search.toLowerCase());

      const specializationMatch =
        specialization === "" ||
        doctor.specialization === specialization;

      const departmentMatch =
        department === "" ||
        doctor.department === department;

      return (
        searchMatch &&
        specializationMatch &&
        departmentMatch
      );
    });
  }, [
    doctors,
    search,
    specialization,
    department,
  ]);

  const totalPages = Math.ceil(
    filteredDoctors.length / itemsPerPage
  );

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const specializations = [
    ...new Set(
      doctors.map(
        (doctor) => doctor.specialization
      )
    ),
  ];

  const departments = [
    ...new Set(
      doctors.map(
        (doctor) => doctor.department
      )
    ),
  ];

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!isConfirmed) return;

    try {
      await removeDoctor(id);
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading doctors...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Doctors
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage hospital doctors
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/doctors/add")
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Doctor
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
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={specialization}
            onChange={(e) => {
              setSpecialization(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              All Specializations
            </option>

            {specializations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              All Departments
            </option>

            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>
      </div>

      {paginatedDoctors.length > 0 ? (
        <>
          <DoctorTable
            doctors={paginatedDoctors}
            onView={(doctor) =>
              navigate(`/doctors/${doctor.id}`)
            }
            onEdit={(doctor) =>
              navigate(
                `/doctors/${doctor.id}/edit`
              )
            }
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="rounded-xl bg-white py-12 text-center shadow-sm">
          <p className="text-gray-500">
            No doctors found.
          </p>
        </div>
      )}

    </div>
  );
}

export default Doctors;