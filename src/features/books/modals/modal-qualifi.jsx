import Button from "../../../components/buttons/button";
import { StarRow } from "../components/star-row";

export const ModalQualifi = ({onClose, status, onClick, stars,initialValue, mensajeConfirmacion }) => {
    const handleClickOutside = (e) => {
        
        if (e.target.id === "modal-overlay") {
          onClose();
        }
      };
    return (
        <div
            id = 'modal-overlay' 
            className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50"
            onClick={handleClickOutside} 
        >
            <div 
                className="p-6 bg-primary-pri3 drop-shadow-xl rounded-xl w-[300px]" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-3 space-y-1">
                    <StarRow value= {status} initialValue={initialValue}/>
                    <p className="font-body text-body-md text-neutral-neu1 p-2 text-center">
                        {mensajeConfirmacion ? 'Calificación actualizada' : 'Seleccione una calificación'  }
                    </p>
                </div>
                <div className="flex items-center justify-around space-x-4">
                    <Button
                        text={mensajeConfirmacion? "Cerrar": "Cancelar"}
                        variant="combCol2"
                        onClick={onClose}
                    />
                    
                    <Button
                        text="Confirmar"
                        variant={stars > 0 ? "combCol1" : "combDesactivate"}
                        onClick={onClick}
                        disabled={stars <= 0} // Botón desactivado si no hay estrellas seleccionadas
                    />
                </div>
            </div> 
        </div>  
    );
    
};
