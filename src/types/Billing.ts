export interface Bill {

  id: string;
  billId: string;
  patientId: string;
  billDate: string;
  consultationCharges: number;
  medicineCharges: number;
  labCharges: number;
  otherCharges: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus:
    | "Paid"
    | "Pending"
    | "Partially Paid";
  description?: string;
}