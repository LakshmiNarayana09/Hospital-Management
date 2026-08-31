import { useState } from "react";

import type { Department } from "../../types/Department";

export interface DepartmentFormData {
  departmentId: string;
  name: string;
  description: string;
}

interface DepartmentFormProps {
  initialData?: Department;

  onSubmit: (
    formData: DepartmentFormData
  ) => Promise<void>;

  submitText: string;

  onCancel?: () => void;
}

function DepartmentForm({
  initialData,
  onSubmit,
  submitText,
  onCancel,
}: DepartmentFormProps) {
  const [formData, setFormData] =
    useState<DepartmentFormData>({
      departmentId:
        initialData?.departmentId || "",

      name: initialData?.name || "",

      description:
        initialData?.description || "",
    });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> =
      {};


    if (!formData.departmentId.trim()) {
      newErrors.departmentId =
        "Department ID is required";
    }

    if (!formData.name.trim()) {
      newErrors.name =
        "Department name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);

      await onSubmit({
        departmentId:
          formData.departmentId.trim(),

        name: formData.name.trim(),

        description:
          formData.description.trim(),
      });
    } catch (error) {
      console.error(error);

      setErrors({
        submit:
          "Failed to save department. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm"
    >

      {errors.submit && (
        <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errors.submit}
        </div>
      )}

      <div className="space-y-5">

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Department ID
          </label>

          <input
            type="text"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            placeholder="DEP001"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          {errors.departmentId && (
            <p className="mt-1 text-xs text-red-500">
              {errors.departmentId}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Department Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Cardiology"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter department description..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description}
            </p>
          )}
        </div>

      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : submitText}
        </button>

      </div>
    </form>
  );
}

export default DepartmentForm;