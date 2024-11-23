import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { StarRow } from "../components/star-row";
import CloseIcon from "../../../icons/close";

export const ModalQualifi = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
            <div className="p-6 bg-primary-pri3 drop-shadow-xl rounded-xl w-[300px]">
                <div className="p-3 space-y-1">
                    <StarRow/>
                    <p className="font-body text-body-md text-neutral-neu1 p-2 text-center">
                        Seleccione una calificación
                    </p>
                </div>
                <div className="flex items-center justify-around space-x-4">
                    <Button
                        text="Cancelar"
                        variant="combCol2"
                    />
                    
                    <Button
                        text="Confirmar"
                        variant="combCol1"
                    />
                </div>
            </div> 
        </div>
        
    );
};
