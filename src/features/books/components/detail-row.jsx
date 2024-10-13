export const DetailRow = ({ label, value }) => (
  <div className="text-neutral-neu2 flex space-x-2">
    <h3 className="font-label text-label-lg">{label}: </h3>
    <h2 className="font-body text-body-lg mt-[2px]">
      {value || "Cargando..."}
    </h2>
  </div>
);
