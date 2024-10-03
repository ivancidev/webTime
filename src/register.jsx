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
    <form>
      <h1 className="form-title text-center">Formulario de Registro de Libro</h1>
      <div className="flex justify-between">
        <Input
          label="Título"
          placeholder="Escribe aquí"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className=""
        />
        <Dropdown
          label="Autor"
          options={autores}
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Seleccionar autor"
          className=""
        />
      </div>
      <div className="flex justify-between">
        <Dropdown
          label="Categoría"
          options={categorias}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Seleccionar categoría"
          className=""
        />
        <Dropdown
          label="Idioma"
          options={idiomas}
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          placeholder="Seleccionar idioma"
          className=""
        />
      </div>
      <div>
        <Input
          label="Sinopsis"
          placeholder="Escribe aquí"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          className=""
        />
      </div>
    </form>
  );
};

