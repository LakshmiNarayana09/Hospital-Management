import { useState } from "react";

import type { Doctor } from "../../types/Doctor";

export interface DoctorFormData {
  doctorId: string;
  name: string;
  specialization: string;
  department: string;
  experience: string;
  phone: string;
  email: string;
  availability: "Available" | "Unavailable" | "";
}

interface DoctorFormProps {
  initialData?: Doctor;

  onSubmit: (
    formData: DoctorFormData
  ) => Promise<void>;

  submitText: string;

  onCancel?: () => void;
}

function DoctorForm({
  initialData,
  onSubmit,
  submitText,
  onCancel,
}: DoctorFormProps) {
  const [formData, setFormData] =
    useState<DoctorFormData>({
      doctorId: initialData?.doctorId || "",
      name: initialData?.name || "",
      specialization:
        initialData?.specialization || "",
      department: initialData?.department || "",
      experience:
        initialData?.experience?.toString() || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      availability:
        initialData?.availability || "",
    });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.doctorId.trim()) {
      newErrors.doctorId =
        "Doctor ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name =
        "Doctor name is required";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization =
        "Specialization is required";
    }

    if (!formData.department) {
      newErrors.department =
        "Department is required";
    }

    if (!formData.experience) {
      newErrors.experience =
        "Experience is required";
    } else if (
      Number(formData.experience) < 0
    ) {
      newErrors.experience =
        "Experience cannot be negative";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Phone must contain 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.availability) {
      newErrors.availability =
        "Availability is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm font-medium">
            Doctor ID
          </label>

          <input
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            placeholder="D001"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.doctorId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.doctorId}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Doctor Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Doctor name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Specialization
          </label>

          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Cardiologist"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.specialization && (
            <p className="mt-1 text-sm text-red-500">
              {errors.specialization}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Department
            </option>

            <option value="Cardiology">
              Cardiology
            </option>

            <option value="Neurology">
              Neurology
            </option>

            <option value="Orthopedics">
              Orthopedics
            </option>

            <option value="Pediatrics">
              Pediatrics
            </option>

            <option value="General Medicine">
              General Medicine
            </option>
          </select>

          {errors.department && (
            <p className="mt-1 text-sm text-red-500">
              {errors.department}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Experience (Years)
          </label>

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="5"
            min="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 digit phone number"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Availability
          </label>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Availability
            </option>

            <option value="Available">
              Available
            </option>

            <option value="Unavailable">
              Unavailable
            </option>
          </select>

          {errors.availability && (
            <p className="mt-1 text-sm text-red-500">
              {errors.availability}
            </p>
          )}
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-3 border-t pt-5">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitText}
        </button>

      </div>
    </form>
  );
}

export default DoctorForm;