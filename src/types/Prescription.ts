export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  prescriptionId: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  notes: string;
}