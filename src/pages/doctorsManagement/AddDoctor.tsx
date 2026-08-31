
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DoctorForm, {
  type DoctorFormData,
} from "../../components/doctors/DoctorForm";

import { createDoctor } from "../../apis/doctorApi";

function AddDoctor() {
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: DoctorFormData
  ) => {
    await createDoctor({
      doctorId: formData.doctorId,
      name: formData.name,
      specialization: formData.specialization,
      department: formData.department,
      experience: Number(formData.experience),
      phone: formData.phone,
      email: formData.email,
      availability: formData.availability as
        | "Available"
        | "Unavailable",
    });

    navigate("/doctors");
  };

  return (
    <div className="max-w-4xl">

      <div className="mb-6">
        <button
          onClick={() => navigate("/doctors")}
          className="mb-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Add Doctor
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new doctor to the hospital
        </p>
      </div>

      <DoctorForm
        onSubmit={handleSubmit}
        submitText="Add Doctor"
        onCancel={() => navigate("/doctors")}
      />

    </div>
  );
}

export default AddDoctor;

