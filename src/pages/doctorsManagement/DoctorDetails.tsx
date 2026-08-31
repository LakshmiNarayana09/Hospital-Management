import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  BriefcaseBusiness,
  Building2,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getDoctorById } from "../../apis/doctorApi";

import type { Doctor } from "../../types/Doctor";

function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] =
    useState<Doctor | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) {
        setError("Doctor ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getDoctorById(id);

        setDoctor(data);
      } catch (error) {
        console.error(error);
        setError("Doctor not found");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate("/doctors")}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </button>

        <div className="rounded-xl bg-red-50 p-5 text-red-600">
          {error || "Doctor not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">

      <button
        onClick={() => navigate("/doctors")}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        Back to Doctors
      </button>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={32} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                {doctor.name}
              </h1>

              <p className="mt-1 text-sm text-blue-600">
                {doctor.doctorId}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {doctor.specialization}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
              doctor.availability === "Available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {doctor.availability}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Doctor Information
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Stethoscope size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Specialization
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {doctor.specialization}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Building2 size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Department
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {doctor.department}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Experience
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {doctor.experience} years
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-green-50 p-2 text-green-600">
              <Phone size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {doctor.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-yellow-50 p-2 text-yellow-600">
              <Mail size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-gray-800">
                {doctor.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
              <UserRound size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Doctor ID
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {doctor.doctorId}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

        <button
          onClick={() =>
            navigate(`/doctors/${doctor.id}/edit`)
          }
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          Edit Doctor
        </button>

        <button
          onClick={() => navigate("/doctors")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default DoctorDetails;