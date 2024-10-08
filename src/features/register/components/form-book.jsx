import React, { useState } from "react";
import { Input } from "../../../components/input/Input";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { useFetch } from "../../../hooks/useFetch";

export default function FormBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setlanguage] = useState("");
  const [synopsis, setsynopsis] = useState("");
  const { data: authorsData  } = useFetch("authors");
  const { data: categoriesData} = useFetch("categories");
  const { data: languagesData } = useFetch("languages");

  const categories = categoriesData.categorias || []; // Asegúrate de que exista
  const languages = languagesData.idiomas || []; // Ajusta según tu respuesta API
  const authors = authorsData.autores || []; // Ajusta según tu respuesta API

  console.log("Authors:", authors);
  console.log("Categories:", categories);
  console.log("Languages:", languages);

  return (
    <form className="w-full max-w-[795px] mx-auto px-10">
      <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
        Formulario de Registro de Libro
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between">
        <Input
          label="Titulo"
          placeholder="Escribe aquí"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border-2 rounded border-[#F4EFF4] w-[340px] h-[50px] p-2 text-primary-pri3 font-body text-body-lg mb-4 md:mb-0"
        />
        <Dropdown
          label="Autor"
          options={authors}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seleccionar autor"
          displayKey="autor"
          valueKey="codAutor"
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mt-4">
        <Dropdown
          label="Categoría"
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Seleccionar categoría"
          displayKey="nombreCategoria"
          valueKey="codCategoria"
        />
        <Dropdown
          label="Idioma"
          options={languages}
          value={language}
          onChange={(e) => setlanguage(e.target.value)}
          placeholder="Seleccionar idioma"
          displayKey="idioma"
          valueKey="codIdioma"
        />
      </div>
      <div className="mt-7">
        <label className="py-1 text-primary-pri3 font-label text-label-lg">
          Sinopsis
        </label>
        <textarea
          className="w-full md:w-[800px] h-[130px] bg-transparent border-2 rounded border-[#F4EFF4] p-2 text-primary-pri3 font-body text-body-lg mt-2"
          placeholder="Escribe aquí"
          value={synopsis}
          onChange={(e) => setsynopsis(e.target.value)}
        />
      </div>
    </form>
  );
}