
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";

import usePatients from "../../hooks/usePatients";

import PatientTable from "../../components/patients/PatientTable";
import Pagination from "../../components/common/Pagination";

function Patients() {
  const navigate = useNavigate();

  const {
    patients,
    loading,
    error,
    removePatient,
  } = usePatients();

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;

  const filteredPatients = useMemo(() => {
    let result = [...patients];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter(
        (patient) =>
          patient.name
            .toLowerCase()
            .includes(searchValue) ||
          patient.patientId
            .toLowerCase()
            .includes(searchValue) ||
          patient.phone.includes(searchValue)
      );
    }

    if (gender) {
      result = result.filter(
        (patient) => patient.gender === gender
      );
    }

    if (bloodGroup) {
      result = result.filter(
        (patient) =>
          patient.bloodGroup === bloodGroup
      );
    }

    if (ageFilter === "under18") {
      result = result.filter(
        (patient) => patient.age < 18
      );
    }

    if (ageFilter === "18to40") {
      result = result.filter(
        (patient) =>
          patient.age >= 18 &&
          patient.age <= 40
      );
    }

    if (ageFilter === "41to60") {
      result = result.filter(
        (patient) =>
          patient.age >= 41 &&
          patient.age <= 60
      );
    }

    if (ageFilter === "above60") {
      result = result.filter(
        (patient) => patient.age > 60
      );
    }

    if (sortBy === "nameAsc") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "nameDesc") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    if (sortBy === "ageAsc") {
      result.sort((a, b) => a.age - b.age);
    }

    if (sortBy === "ageDesc") {
      result.sort((a, b) => b.age - a.age);
    }

    return result;
  }, [
    patients,
    search,
    gender,
    bloodGroup,
    ageFilter,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredPatients.length / patientsPerPage
  );

  const startIndex =
    (currentPage - 1) * patientsPerPage;

  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + patientsPerPage
  );

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!isConfirmed) return;

    try {
      await removePatient(id);
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };
  
  

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p>Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Patients
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage hospital patients
          </p>
        </div>

        <button
          onClick={() => navigate("/patients/add")}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterChange();
              }}
              placeholder="Search patient..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              handleFilterChange();
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={bloodGroup}
            onChange={(e) => {
              setBloodGroup(e.target.value);
              handleFilterChange();
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <select
            value={ageFilter}
            onChange={(e) => {
              setAgeFilter(e.target.value);
              handleFilterChange();
            }}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All Ages</option>
            <option value="under18">Under 18</option>
            <option value="18to40">18 - 40</option>
            <option value="41to60">41 - 60</option>
            <option value="above60">Above 60</option>
          </select>
        </div>

        <div className="mt-4 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">Sort By</option>
            <option value="nameAsc">
              Name: A - Z
            </option>
            <option value="nameDesc">
              Name: Z - A
            </option>
            <option value="ageAsc">
              Age: Low - High
            </option>
            <option value="ageDesc">
              Age: High - Low
            </option>
          </select>
        </div>
      </div>

      {paginatedPatients.length > 0 ? (
        <>
          <PatientTable
            patients={paginatedPatients}
            onView={(patient) =>
              navigate(`/patients/${patient.id}`)
            }
            onEdit={(patient) =>
              navigate(`/patients/${patient.id}/edit`)
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
            No patients found.
          </p>
        </div>
      )}

    </div>
  );
}

export default Patients;