import React, { useState } from "react";
import { Input } from "../../../components/input/input";
import { Dropdown } from "../../../components/dropdown/dropdown";

export default function FormBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setlanguage] = useState("");
  const [synopsis, setsynopsis] = useState("");

  const authors = ["Autor 1", "Autor 2", "Autor 3"];
  const categories = ["Ficción", "No ficción", "Ciencia"];
  const languages = ["Español", "Inglés"];
  return (
    <form className="w-[795px] mx-auto">
      <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
        Formulario de Registro de Libro
      </h1>
      <div className="flex justify-between">
        <Input
          label="Titulo"
          placeholder="Escribe aquí"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent border-2 rounded border-{#F4EFF4} w-[340px] h-[50px] p-2 text-primary-pri3 font-body text-body-lg"
        />
        <Dropdown
          label="Autor"
          options={authors}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seleccionar autor"
        />
      </div>
      <div className="flex justify-between">
        <Dropdown
          label="Categoría"
          options={categories}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Seleccionar categoría"
        />
        <Dropdown
          label="Idioma"
          options={languages}
          value={language}
          onChange={(e) => setlanguage(e.target.value)}
          placeholder="Seleccionar idioma"
        />
      </div>
      <div className="mt-7">
        <label className="py-1 text-primary-pri3 font-label text-label-lg">
          Sinopsis
        </label>
        <textarea
          className="w-[800px] h-[130px] bg-transparent border-2 rounded border-{#F4EFF4} p-2 text-primary-pri3 font-body text-body-lg mt-2"
          placeholder="Escribe aquí"
          value={synopsis}
          onChange={(e) => setsynopsis(e.target.value)}
        />
      </div>
    </form>
  );
}


