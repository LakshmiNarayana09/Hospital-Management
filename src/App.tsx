import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";

import Patients from "./pages/patientsManagement/Patients";
import AddPatient from "./pages/patientsManagement/AddPatient";
import PatientDetails from "./pages/patientsManagement/PatientDetails";
import EditPatient from "./pages/patientsManagement/EditPatient";


import Doctors from "./pages/doctorsManagement/Doctors";
import AddDoctor from "./pages/doctorsManagement/AddDoctor";
import DoctorDetails from "./pages/doctorsManagement/DoctorDetails";
import EditDoctor from "./pages/doctorsManagement/EditDoctor";




import Appointments from "./pages/appointmentManagement/Appointments";
import AddAppointment from "./pages/appointmentManagement/AddAppointment";
import AppointmentDetails from "./pages/appointmentManagement/AppointmentDetails";
import EditAppointment from "./pages/appointmentManagement/EditAppointment";


import Departments from "./pages/departmentManagement/Departments";
import AddDepartment from "./pages/departmentManagement/AddDepartment";
import DepartmentDetails from "./pages/departmentManagement/DepartmentDetails";
import EditDepartment from "./pages/departmentManagement/EditDepartment";


import Prescriptions from "./pages/prescriptionManagement/Prescriptions";
import AddPrescription from "./pages/prescriptionManagement/AddPrescription";
import PrescriptionDetails from "./pages/prescriptionManagement/PrescriptionDetails";
import EditPrescription from "./pages/prescriptionManagement/EditPrescription";


import Bills from "./pages/billManagement/Bills";
import AddBill from "./pages/billManagement/AddBill";
import BillDetails from "./pages/billManagement/BillDetails";
import EditBill from "./pages/billManagement/EditBill";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/patients/:id/edit" element={<EditPatient />} />




        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<AddDoctor />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/doctors/:id/edit" element={<EditDoctor />} />



        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AddAppointment />} />
        <Route path="/appointments/:id" element={<AppointmentDetails />} />
        <Route path="/appointments/:id/edit" element={<EditAppointment />} />



        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/departments/:id/edit" element={<EditDepartment />} />


        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/prescriptions/add" element={<AddPrescription />} />
        <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
        <Route path="/prescriptions/:id/edit" element={<EditPrescription />} />

        <Route path="/bills" element={<Bills />} />
        <Route path="/bills/add" element={<AddBill />} />
        <Route path="/bills/:id" element={<BillDetails />} />
        <Route path="/bills/:id/edit" element={<EditBill />} />
      </Route>
    </Routes>
  );
}

export default App;