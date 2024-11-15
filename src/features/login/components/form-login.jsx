import { Form } from "../components/form";

export const FormLogin = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2">
            <div className="w-[650px] h-[550px] flex flex-col justify-center items-center bg-primary-pri3 rounded-2xl">
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
                    />
                    <label className="flex items-center space-x-2">
                        <span className="font-body text-body-sm text-neutral-neu0">
                            ¿Aún no tienes una cuenta?{" "}
                            <button
                            type="button"
                            className="font-body text-body-sm text-secondary-sec2 underline"
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