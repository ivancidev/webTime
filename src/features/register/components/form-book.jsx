import React, { useState } from "react";
import { InputText } from "../../../components/Input";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "react-hook-form";

export default function FormBook() {
  const { data: authorsData  } = useFetch("authors");
  const { data: categoriesData} = useFetch("categories");
  const { data: languagesData } = useFetch("languages");

  const categories = categoriesData.categorias || []; 
  const languages = languagesData.idiomas || []; 
  const authors = authorsData.autores || []; 
  
  const [title, setTitle] = useState("");


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      language: "",
      synopsis: ""
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[795px] mx-auto">
      <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
        Formulario de Registro de Libro
      </h1>
      <div className="flex justify-between">
        <InputText
          name="title"
          label="Titulo"
          placeholder="Escribe aquí"
          className="bg-transparent border-2 rounded border-[#F4EFF4] w-[340px] h-[50px] p-2 text-primary-pri3 font-body text-body-lg"
          register={register}
          errors={errors}
          value = {title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <Dropdown
          name="author"
          label="Autor"
          options={authors}
          placeholder="Seleccionar autor"
          register={register}
          errors={errors}
          displayKey="autor"
          valueKey="codAutor"
        />
      </div>
      <div className="flex justify-between">
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
      <div className="mt-7">
        <label htmlFor="synopsis" className="py-1 text-primary-pri3 font-label text-label-lg">
          Sinopsis
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          className="w-[800px] h-[130px] bg-transparent border-2 rounded border-[#F4EFF4] p-2 text-primary-pri3 font-body text-body-lg mt-2"
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
        {errors.synopsis && <span className="text-error-err2">{errors.synopsis.message}</span>}
      </div>
      <button type="submit" className="btn-submit text-white">Enviar</button>
    </form>
  );
}
