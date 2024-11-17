import { Form } from "../components/form";
import { useForm } from "react-hook-form";

export const FormLogin = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
            <img
                src="https://uygicxekmfgvxjhuqaor.supabase.co/storage/v1/object/public/imagenes/pexels-cottonbro-4064843.jpg"
                alt="fondo"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="relative w-[650px] h-[550px] flex flex-col justify-center items-center bg-primary-pri3 rounded-2xl shadow-2xl z-10 border border-gray-200">
                <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-display text-display-md">
                    ¡Bienvenido a Webtime!
                </h1>
                <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-sm mb-5">
                    Inicia sesión en tu cuenta
                </h1>
                <div className="w-fit">
                    <Form 
                        label1="Nombre de usuario o correo"
                        label2="Contraseña"
                        placeholder1="Ingrese su nombre de usuario o correo"
                        placeholder2="Ingrese su contraseña"
                        textButton="Iniciar Sesión"
                        showButtonForgetPassword="true"
                        validationRules1={{
                            required: "Este campo es obligatorio",
                          }}
                          validationRules2={{
                            required: "Este campo es obliigatorio",
                          }}
                          onSubmit={handleSubmit(onSubmit)} 
                          register={register} 
                          errors={errors} 
                    />
                    <label className="flex items-center space-x-2">
                        <span className="font-body text-body-sm text-neutral-neu0">
                            ¿Aún no tienes una cuenta?{" "}
                            <button
                            type="button"
                            className="font-body text-body-sm text-secondary-sec2 underline hover:text-secondary-sec1"
                            >
                            Regístrate aquí.
                            </button>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};