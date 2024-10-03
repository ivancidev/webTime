import React, { useState } from "react";
import { Dropdown } from "./components/dropdown/dropdown";
import { Input } from "./components/Input";

export const Register = () => {
  // Estados separados para cada campo
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [idioma, setIdioma] = useState("");
  const [sinopsis, setSinopsis] = useState("");

  // Opciones para los Dropdown, cambiar según la bd
  const autores = ["Autor 1", "Autor 2", "Autor 3"];
  const categorias = ["Ficción", "No ficción", "Ciencia"];
  const idiomas = ["Español", "Inglés"];

  return (
    <form className="w-[795px] mx-auto">
      <h1 className="text-center text-[#0297FF] m-[20px]">Formulario de Registro de Libro</h1>
      <div className="flex justify-between">
        <Input
          label="Título" placeholder="Escribe aquí" value={titulo}
          onChange={(e) => setTitulo(e.target.value)} className="bg-transparent border-2 rounded border-{#F4EFF4} w-[340px] h-[50px]"
        />
        <Dropdown
          label="Autor" options={autores} value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Seleccionar autor"
        />
      </div>
      <div className="flex justify-between">
        <Dropdown
          label="Categoría" options={categorias} value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Seleccionar categoría"
        />
        <Dropdown
          label="Idioma" options={idiomas} value={idioma}
          onChange={(e) => setIdioma(e.target.value)} 
          placeholder="Seleccionar idioma"
        />
      </div>
      <div>
        <Input
          label="Sinopsis" placeholder="Escribe aquí" value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)} className="bg-transparent border-2 rounded border-{#F4EFF4} w-full h-[130px]"
        />
      </div>
    </form>
  );
};

