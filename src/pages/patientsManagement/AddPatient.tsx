import { useNavigate } from "react-router-dom";

import PatientForm, {
  type PatientFormData,
} from "../../components/patients/PatientForm";

import { createPatient } from "../../apis/patientApi";

function AddPatient() {
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: PatientFormData
  ) => {
    await createPatient({
      patientId: formData.patientId,
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender as
        | "Male"
        | "Female"
        | "Other",
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      bloodGroup: formData.bloodGroup,
      emergencyContact:
        formData.emergencyContact,
      medicalHistory:
        formData.medicalHistory,
      department: formData.department,
      registeredDate:
        formData.registeredDate,
    });

    navigate("/patients");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Add Patient
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new patient to the hospital
        </p>
      </div>

      <PatientForm
        onSubmit={handleSubmit}
        submitText="Add Patient"
      />
    </div>
  );
}

export default AddPatient;