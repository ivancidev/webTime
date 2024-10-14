import { PDFDocument } from "pdf-lib";

export const getPdfPages = async (pdfUrl) => {
  try {
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    return pdfDoc.getPageCount(); // Número de páginas del PDF
  } catch (error) {
    console.error("Error al cargar el PDF:", error);
    throw error;
  }
};
