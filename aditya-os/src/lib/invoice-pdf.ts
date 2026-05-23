import type { Invoice } from "@/lib/types";
import { BRAND } from "@/lib/branding";
import { formatCurrency } from "@/lib/services/clients";

export async function downloadInvoicePdf(invoice: Invoice) {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(BRAND.appName, 14, 20);
  doc.setFontSize(10);
  doc.text(BRAND.foundedBy, 14, 28);
  doc.setFontSize(14);
  doc.text(`Invoice ${invoice.invoiceNumber}`, 14, 42);

  doc.setFontSize(10);
  doc.text(`Bill to: ${invoice.clientName}`, 14, 52);
  if (invoice.clientGstin) doc.text(`GSTIN: ${invoice.clientGstin}`, 14, 58);
  doc.text(`Issue: ${invoice.issueDate}  |  Due: ${invoice.dueDate}`, 14, 66);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 14, 72);

  autoTable(doc, {
    startY: 80,
    head: [["Description", "Qty", "Rate", "Amount"]],
    body: invoice.items.map((i) => [
      i.description,
      String(i.quantity),
      formatCurrency(i.rate),
      formatCurrency(i.amount),
    ]),
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
    ?.finalY ?? 120;
  doc.text(`Subtotal: ${formatCurrency(invoice.subtotal)}`, 140, finalY + 10);
  doc.text(`Tax (${invoice.taxRate}%): ${formatCurrency(invoice.taxAmount)}`, 140, finalY + 18);
  doc.setFontSize(12);
  doc.text(`Total: ${formatCurrency(invoice.total)}`, 140, finalY + 28);

  if (invoice.notes) {
    doc.setFontSize(9);
    doc.text(`Notes: ${invoice.notes}`, 14, finalY + 40);
  }

  doc.save(`${invoice.invoiceNumber}.pdf`);
}
