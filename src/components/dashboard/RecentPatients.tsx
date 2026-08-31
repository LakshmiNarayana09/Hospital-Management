
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

      <div className="hidden overflow-x-auto md:block">
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

      <div className="space-y-4 p-4 md:hidden">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {patient.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {patient.name}
                  </h3>

                  <p className="text-xs text-blue-600">
                    {patient.patientId}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                {patient.bloodGroup}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <p className="text-xs text-gray-500">
                  Age
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.age}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Gender
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.gender}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-xs text-gray-500">
                  Registered Date
                </p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {patient.registeredDate}
                </p>
              </div>
            </div>
          </div>
        ))}
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

