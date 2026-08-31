export interface Doctor {
  id: string;
  doctorId: string;
  name: string;
  specialization: string;
  department: string;
  experience: number;
  phone: string;
  email: string;
  availability: "Available" | "Unavailable";
}