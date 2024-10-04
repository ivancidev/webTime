import React, { useState } from "react";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form"

export const Register = () => {
  // Estados separados para cada campo
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setlanguage] = useState("");
  const [synopsis, setsynopsis] = useState("");

  // Opciones para los Dropdown, cambiar según la bd
  const authors = ["Autor 1", "Autor 2", "Autor 3"];
  const categories = ["Ficción", "No ficción", "Ciencia"];
  const languages = ["Español", "Inglés"];

  //validacion de los campos
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit((data)=>{console.log(data)});

  return (
    <form onSubmit={onSubmit} 
    className="w-[795px] mx-auto">
      <h1 className="text-center text-[#0297FF] m-[20px]">Formulario de Registro de Libro</h1>
      <div className="flex justify-between">
        <Input
          label="Título" placeholder="Escribe aquí" value={title}
          onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-2 rounded border-{#F4EFF4} w-[340px] h-[50px]"
        />
        <Dropdown
          label="Autor" options={authors} value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seleccionar autor"
        />
      </div>
      <div className="flex justify-between">
        <Dropdown
          label="Categoría" options={categories} value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Seleccionar categoría"
        />
        <Dropdown
          label="Idioma" options={languages} value={language}
          onChange={(e) => setlanguage(e.target.value)} 
          placeholder="Seleccionar idioma"
        />
      </div>
      <div>
        <Input
          label="Sinopsis" placeholder="Escribe aquí" value={synopsis}
          onChange={(e) => setsynopsis(e.target.value)} className="bg-transparent border-2 rounded border-{#F4EFF4} w-full h-[130px]"
        />
      </div>
      //<button class = "submit">miau</button>
    </form>
  );
};

