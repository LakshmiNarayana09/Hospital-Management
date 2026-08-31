export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  emergencyContact: string;
  medicalHistory: string;
  department: string;
  registeredDate: string;
}