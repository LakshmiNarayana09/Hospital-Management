export type AppointmentStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "No-show";

export interface Appointment {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
}