import { Download } from "lucide-react";
import jsPDF from "jspdf";

import type { Bill } from "../../types/Billing";
import type { Patient } from "../../types/Patient";

interface DownloadBillProps {
  bill: Bill;
  patient?: Patient;
}

function DownloadBill({
  bill,
  patient,
}: DownloadBillProps) {
  const handleDownload = () => {
    const pdf = new jsPDF();

    const balanceAmount =
      bill.totalAmount - bill.paidAmount;

    pdf.setFontSize(22);
    pdf.text("Hospital Bill", 20, 20);

    pdf.setFontSize(12);

    pdf.text(
      `Bill ID: ${bill.billId}`,
      20,
      40
    );

    pdf.text(
      `Patient Name: ${
        patient?.name || "Unknown Patient"
      }`,
      20,
      50
    );

    pdf.text(
      `Bill Date: ${new Date(
        bill.billDate
      ).toLocaleDateString()}`,
      20,
      60
    );

    pdf.text(
      `Payment Status: ${bill.paymentStatus}`,
      20,
      70
    );

    pdf.line(20, 80, 190, 80);

    pdf.setFontSize(14);
    pdf.text("Payment Details", 20, 95);

    pdf.setFontSize(12);

    pdf.text(
      `Total Amount: Rs. ${bill.totalAmount.toLocaleString(
        "en-IN"
      )}`,
      20,
      110
    );

    pdf.text(
      `Paid Amount: Rs. ${bill.paidAmount.toLocaleString(
        "en-IN"
      )}`,
      20,
      120
    );

    pdf.text(
      `Balance Amount: Rs. ${balanceAmount.toLocaleString(
        "en-IN"
      )}`,
      20,
      130
    );

    pdf.setFontSize(10);

    pdf.text(
      "Thank you for choosing our hospital.",
      20,
      160
    );

    pdf.save(
      `Bill-${bill.billId}.pdf`
    );
  };

  return (
    <button
      onClick={handleDownload}
      className="rounded-lg p-2 text-purple-600 hover:bg-purple-50"
      title="Download Bill"
    >
      <Download size={18} />
    </button>
  );
}

export default DownloadBill;