import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Pencil,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getDepartmentById,
} from "../../apis/departmentApi";

import { getDoctors } from "../../apis/doctorApi";
import { getPatients } from "../../apis/patientApi";

import type { Department } from "../../types/Department";
import type { Doctor } from "../../types/Doctor";
import type { Patient } from "../../types/Patient";

function DepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] =
    useState<Department | null>(null);

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [patients, setPatients] =
    useState<Patient[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Department ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [
          departmentData,
          doctorData,
          patientData,
        ] = await Promise.all([
          getDepartmentById(id),
          getDoctors(),
          getPatients(),
        ]);

        setDepartment(departmentData);
        setDoctors(doctorData);
        setPatients(patientData);
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load department details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const departmentDoctors = useMemo(() => {
    if (!department) {
      return [];
    }

    return doctors.filter(
      (doctor) =>
        doctor.department ===
        department.name
    );
  }, [doctors, department]);

  const departmentPatients = useMemo(() => {
    if (!department) {
      return [];
    }

    return patients.filter(
      (patient) => {
        const patientWithDepartment =
          patient as Patient & {
            department?: string;
          };

        return (
          patientWithDepartment.department ===
          department.name
        );
      }
    );
  }, [patients, department]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading department...
        </p>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="space-y-4">

        <button
          onClick={() =>
            navigate("/departments")
          }
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Departments
        </button>

        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          {error || "Department not found"}
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <button
            onClick={() =>
              navigate("/departments")
            }
            className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Departments
          </button>

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
              <Building2 size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {department.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {department.departmentId}
              </p>
            </div>

          </div>
        </div>

        <button
          onClick={() =>
            navigate(
              `/departments/${department.id}/edit`
            )
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Pencil size={17} />
          Edit Department
        </button>

      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-lg font-semibold text-gray-800">
          Department Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <DetailItem
            label="Department ID"
            value={department.departmentId}
          />

          <DetailItem
            label="Department Name"
            value={department.name}
          />

        </div>

        <div className="mt-6">

          <p className="mb-2 text-sm font-medium text-gray-700">
            Description
          </p>

          <div className="rounded-lg bg-gray-50 p-4">

            <p className="text-sm leading-6 text-gray-600">
              {department.description}
            </p>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <Stethoscope size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Doctors
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-800">
                {departmentDoctors.length}
              </p>
            </div>

          </div>

        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Users size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Patients
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-800">
                {departmentPatients.length}
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="font-semibold text-gray-800">
            Doctors in this Department
          </h2>
        </div>

        {departmentDoctors.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No doctors assigned to this department.
          </div>
        ) : (
          <div className="divide-y">

            {departmentDoctors.map(
              (doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="font-medium text-gray-800">
                      {doctor.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    {doctor.experience} years
                    experience
                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      <div className="rounded-xl bg-white shadow-sm">

        <div className="border-b p-5">
          <h2 className="font-semibold text-gray-800">
            Patients in this Department
          </h2>
        </div>

        {departmentPatients.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No patients assigned to this department.
          </div>
        ) : (
          <div className="divide-y">

            {departmentPatients.map(
              (patient) => (
                <div
                  key={patient.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="font-medium text-gray-800">
                      {patient.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {patient.patientId}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    {patient.age} years •{" "}
                    {patient.gender}
                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default DepartmentDetails;