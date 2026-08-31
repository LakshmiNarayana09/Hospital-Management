import type { Patient } from "../../types/Patient";

interface RecentPatientsProps {
  patients: Patient[];
}

function RecentPatients({
  patients,
}: RecentPatientsProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="font-semibold text-gray-800">
            Recent Patient Registrations
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Latest registered patients
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Patient ID
              </th>

              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Name
              </th>

              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Age
              </th>

              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Gender
              </th>

              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Blood Group
              </th>

              <th className="px-5 py-3 text-left font-semibold text-gray-600">
                Registered Date
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium text-blue-600">
                  {patient.patientId}
                </td>

                <td className="px-5 py-4 text-gray-800">
                  {patient.name}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.age}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.gender}
                </td>

                <td className="px-5 py-4 font-medium text-red-600">
                  {patient.bloodGroup}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {patient.registeredDate}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {patients.length === 0 && (
        <div className="p-8 text-center text-sm text-gray-500">
          No recent patients found.
        </div>
      )}
    </div>
  );
}

export default RecentPatients;