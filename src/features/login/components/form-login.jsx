import { Form } from "../components/form";

export const FormLogin = () => {
    return (
        <div>
            <Form 
                label1="Nombre de usuario o correo"
                label2="Contraseña"
                placeholder1="Ingrese su nombre de usuario o correo"
                placeholder2="Ingrese su contraseña"
                textButton="Iniciar Sesión"
                showButtonForgetPassword="true"
            />
        </div>
    );
};