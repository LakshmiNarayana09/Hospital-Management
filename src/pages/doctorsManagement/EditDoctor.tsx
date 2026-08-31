import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DoctorForm from "../../components/doctors/DoctorForm";

import {
  getDoctorById,
  updateDoctor,
} from "../../apis/doctorApi";

import type { Doctor } from "../../types/Doctor";
import type { DoctorFormData } from "../../components/doctors/DoctorForm";

function EditDoctor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) {
        setError("Doctor ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getDoctorById(id);

        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleUpdate = async (
    formData: DoctorFormData
  ) => {
    if (!id) return;

    try {
      const updatedDoctor: Doctor = {
        id: doctor?.id || id,
        doctorId: formData.doctorId,
        name: formData.name,
        specialization: formData.specialization,
        department: formData.department,
        experience: Number(formData.experience),
        phone: formData.phone,
        email: formData.email,
        availability:
          formData.availability as
            | "Available"
            | "Unavailable",
      };

      await updateDoctor(id, updatedDoctor);

      navigate("/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
      setError("Failed to update doctor.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Doctor not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Doctor
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update doctor information
        </p>
      </div>

      <DoctorForm
        initialData={doctor}
        onSubmit={handleUpdate}
        submitText="Update Doctor"
        onCancel={() => navigate("/doctors")}
      />
    </div>
  );
}

export default EditDoctor;