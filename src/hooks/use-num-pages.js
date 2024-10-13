import { useState, useEffect } from "react";
import { getPdfPages } from "../utils/pdf-utils";

export const useFetchNumPages = (book) => {
  const [numPages, setNumPages] = useState(0);
  const [loadingPdf, setLoadingPdf] = useState(true);

  useEffect(() => {
    const fetchNumPages = async () => {
      if (book && book.enlacePdf) {
        try {
          const pages = await getPdfPages(book.enlacePdf);
          setNumPages(pages);
        } catch (error) {
          console.error("Error al obtener el número de páginas:", error);
        } finally {
          setLoadingPdf(false);
        }
      } else {
        setLoadingPdf(false);
      }
    };

    fetchNumPages();
  }, [book]);

  return { numPages, loadingPdf };
};
