import { Form } from "../components/form";

export const FormResetPassword = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
        <img
            src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/pexels-cottonbro-4064843.jpg"
            alt="fondo"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative w-[600px] h-[400px] flex flex-col justify-center items-center bg-primary-pri3 rounded-2xl shadow-2xl z-10 border border-gray-200">
            <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-display text-display-sm">
                Elige una nueva contraseña
            </h1>
            <div className="w-fit">
                <Form 
                    label1="Nueva contraseña"
                    label2="Confirmar contraseña"
                    placeholder1="Ingrese su contraseña"
                    placeholder2="Ingrese su contraseña"
                    textButton="Cambiar contraseña"
                    showEyeIconFirstInput="true"
                />
            </div>
        </div>
    </div>
    );
};