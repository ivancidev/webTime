import React, { useState } from "react";
import { Input } from "../../../components/input/Input";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { useForm } from "react-hook-form";

export default function FormBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setlanguage] = useState("");
  const [synopsis, setsynopsis] = useState("");

  const authors = ["Autor 1", "Autor 2", "Autor 3"];
  const categories = ["Ficción", "No ficción", "Ciencia"];
  const languages = ["Español", "Inglés"];

  //validar datos
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[795px] mx-auto">
      <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
        Formulario de Registro de Libro
      </h1>
      <div className="flex justify-between">
        <Input
          name="title"
          label="Titulo"
          placeholder="Escribe aquí"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border-2 rounded border-{#F4EFF4} w-[340px] h-[50px] p-2 text-primary-pri3 font-body text-body-lg"
          register={register}
          errors={errors}
        />
        <Dropdown
          name="author"
          label="Autor"
          options={authors}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seleccionar autor"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-between">
        <Dropdown
          name="category"
          label="Categoría"
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Seleccionar categoría"
          register={register}
          errors={errors}
        />
        <Dropdown
          name="titulo"
          label="Idioma"
          options={languages}
          value={language}
          onChange={(e) => setlanguage(e.target.value)}
          placeholder="Seleccionar idioma"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mt-7">
        <label htmlFor="synopsis" className="py-1 text-primary-pri3 font-label text-label-lg">
          Sinopsis
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          onChange={(e) => setsynopsis(e.target.value)}
          className="w-[800px] h-[130px] bg-transparent border-2 rounded border-{#F4EFF4} p-2 text-primary-pri3 font-body text-body-lg mt-2"
          placeholder="Escribe aquí"
          {...register("synopsis", {
            required: {
              value: true,
              message: 'La sinopsis no puede estar vacia',
            },
            pattern: {
              value: /^[a-zA-Z0-9]*$/,
              message: "Solo se permiten caracteres alfanuméricos",
            },
            maxLength: {
              value: 255,
              message: 'No se permite más de 255 caracteres',
            },
            minLength: {
              value: 2,
              message: 'No se permite menos de 2 caracteres',
            },
          })}
        />
        {errors.synopsis && <span className="text-error-err2">{errors.synopsis.message}</span>}
      </div>
      <button type="submit" className="btn-submit text-white">miay</button>
    </form>
  );
}
