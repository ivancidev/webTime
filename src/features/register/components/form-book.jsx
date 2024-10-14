import React, { useState } from "react";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/input/input";
import FooterButtons from "../components/footer-buttons";
import { useNavigate } from "react-router-dom";

export default function FormBook() {
  const { data: authors } = useFetch("autor");
  const { data: categories } = useFetch("categoria");
  const { data: languages } = useFetch("idioma");
  const [title, setTitle] = useState("");
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Añadir reset de react-hook-form
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      language: "",
      synopsis: "",
    },
  });

  const onSubmit = (data) => {
    navigation("/upload-files", { state: data });
  };

  // Función para reiniciar los campos del formulario
  const handleCancel = () => {
    reset(); // Restablecer los campos a los valores por defecto
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[795px] mx-auto w-full"
      >
        <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
          Formulario de Registro de Libro
        </h1>
        <div className="px-10 md:px-3 lg:px-0 flex flex-col md:flex-row justify-between">
          <InputText
            name="title"
            label="Titulo"
            placeholder="Escribe aquí"
            className="w-full bg-transparent border-2 rounded border-[#F4EFF4] md:w-[340px] h-[50px] p-2 text-primary-pri3 font-body text-body-lg"
            register={register}
            errors={errors}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Dropdown
            name="author"
            label="Autor"
            options={authors}
            placeholder="Seleccionar autor"
            register={register}
            errors={errors}
            displayKey="nombreAutor"
            valueKey="codAutor"
          />
        </div>
        <div className="px-10 md:px-3 lg:px-0 flex flex-col md:flex-row justify-between">
          <Dropdown
            name="category"
            label="Categoría"
            options={categories}
            placeholder="Seleccionar categoría"
            register={register}
            errors={errors}
            displayKey="nombreCategoria"
            valueKey="codCategoria"
          />
          <Dropdown
            name="language"
            label="Idioma"
            options={languages}
            placeholder="Seleccionar idioma"
            register={register}
            errors={errors}
            displayKey="idioma"
            valueKey="codIdioma"
          />
        </div>
        <div className="mt-7 px-10 md:px-3 lg:px-0">
          <label
            htmlFor="synopsis"
            className="py-1 text-primary-pri3 font-label text-label-lg"
          >
            Sinopsis <span className="text-error-err2">*</span>
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            className="w-full h-[130px] bg-transparent border-2 rounded border-[#F4EFF4] p-2 text-primary-pri3 font-body text-body-lg mt-2 resize-none"
            placeholder="Escribe aquí"
            {...register("synopsis", {
              required: "La sinopsis no puede estar vacía",
              pattern: {
                value: /^[a-zA-Z0-9 .,!?;:()]*$/s,
                message: "Solo se permiten caracteres alfanuméricos",
              },
              maxLength: {
                value: 1000,
                message: "No se permite más de 1000 caracteres",
              },
              minLength: {
                value: 2,
                message: "No se permite menos de 2 caracteres",
              },
            })}
          />
          {errors.synopsis && (
            <span className="text-error-err2">{errors.synopsis.message}</span>
          )}
        </div>
      </form>
      <FooterButtons handleSubmit={handleSubmit} onSubmit={onSubmit} onCancel={handleCancel} />
    </div>
  );
}
