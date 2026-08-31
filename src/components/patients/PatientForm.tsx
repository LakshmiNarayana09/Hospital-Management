import { useState } from "react";

import type { Patient } from "../../types/Patient";

export interface PatientFormData {
  patientId: string;
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other" | "";
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  department: string;
  registeredDate: string;
}

interface PatientFormProps {
  initialData?: Patient;

  onSubmit: (
    formData: PatientFormData
  ) => Promise<void>;

  submitText: string;

  onCancel?: () => void;
}

function PatientForm({
  initialData,
  onSubmit,
  submitText,
  onCancel,
}: PatientFormProps) {
  const [formData, setFormData] =
    useState<PatientFormData>({
      patientId: initialData?.patientId || "",
      name: initialData?.name || "",
      age: initialData?.age?.toString() || "",
      gender: initialData?.gender || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      address: initialData?.address || "",
      bloodGroup: initialData?.bloodGroup || "",
      emergencyContact:
        initialData?.emergencyContact || "",
      medicalHistory:
        initialData?.medicalHistory || "",
      department: initialData?.department || "",
      registeredDate:
        initialData?.registeredDate ||
        new Date().toISOString().split("T")[0],
    });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
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

    if (!formData.patientId.trim()) {
      newErrors.patientId =
        "Patient ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.age) {
      newErrors.age =
        "Age is required";
    } else if (
      Number(formData.age) <= 0 ||
      Number(formData.age) > 120
    ) {
      newErrors.age =
        "Enter a valid age";
    }

    if (!formData.gender) {
      newErrors.gender =
        "Gender is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone is required";
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

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup =
        "Blood group is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact =
        "Emergency contact is required";
    } else if (
      !/^[0-9]{10}$/.test(
        formData.emergencyContact
      )
    ) {
      newErrors.emergencyContact =
        "Emergency contact must contain 10 digits";
    }

    if (!formData.department) {
      newErrors.department =
        "Department is required";
    }

    if (!formData.registeredDate) {
      newErrors.registeredDate =
        "Registration date is required";
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

        {/* Patient ID */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Patient ID
          </label>

          <input
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            placeholder="P003"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.patientId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.patientId}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.age && (
            <p className="mt-1 text-sm text-red-500">
              {errors.age}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gender}
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
            placeholder="patient@example.com"
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
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          >
            <option value="">
              Select Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodGroup && (
            <p className="mt-1 text-sm text-red-500">
              {errors.bloodGroup}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Emergency Contact
          </label>

          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            placeholder="Emergency contact"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.emergencyContact && (
            <p className="mt-1 text-sm text-red-500">
              {errors.emergencyContact}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Patient address"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Medical History
          </label>

          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            rows={4}
            placeholder="Medical history"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />
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
            Registration Date
          </label>

          <input
            type="date"
            name="registeredDate"
            value={formData.registeredDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
          />

          {errors.registeredDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.registeredDate}
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

export default PatientForm;