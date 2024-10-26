import Button from "../../../components/buttons/button";
import { InputText } from "../../../components/input/input";
import ImageUploader from "./image-uploader";

export const FormUser = () => {
  return (
    <div className="flex flex-col md:items-center">
      <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent m-[20px] font-display text-display-md">
        ¡Bienvenido a Webtime!
      </h1>
      <div className="flex flex-col items-center">
        <ImageUploader />
      </div>
      
      <div className="pb-6">
        <InputText
          name="name"
          label="Nombre completo"
          placeholder="Escribe aquí"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
        />
        <InputText
          name="nickname"
          label="Nombre de usuario"
          placeholder="Escribe aquí"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
        />
        <InputText
          name="name"
          label="Correo electrónico"
          placeholder="Escribe aquí"
          type="email"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
        />

        <InputText
          name="name"
          label="Contraseña"
          placeholder="Escribe aquí"
          type="password"
          className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
        />
      </div>
      <Button text="Registrarse" variant="combExp" />
    </div>
  );
};
