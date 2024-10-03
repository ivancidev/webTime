import React, { useState } from "react";
import { Dropdown } from "./components/dropdown/dropdown"; // Asegúrate que el archivo y nombre son correctos
import { Input } from "./components/Input"; // El Input ya está importado, no necesitas redefinirlo

import "./App.css"; // Tus estilos

export const Register = () => {
  // Estados separados para cada campo
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [idioma, setIdioma] = useState("");
  const [sinopsis, setSinopsis] = useState("");

  // Opciones para los Dropdown
  const autores = ["Autor 1", "Autor 2", "Autor 3"];
  const categorias = ["Ficción", "No ficción", "Ciencia"];
  const idiomas = ["Español", "Inglés", "Francés"];

  return (
    <div>
      <h1 className="form-title">Formulario de Registro de Libro</h1>
      <div>
        <Input
          label="Título"
          placeholder="Escribe aquí"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="border p-2 w-full"
        />
        <Dropdown
          label="Autor"
          options={autores}
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Seleccionar autor"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <Dropdown
          label="Categoría"
          options={categorias}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Seleccionar categoría"
          className="border p-2 w-full"
        />
        <Dropdown
          label="Idioma"
          options={idiomas}
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
          placeholder="Seleccionar idioma"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <Input
          label="Sinopsis"
          placeholder="Escribe aquí"
          value={sinopsis}
          onChange={(e) => setSinopsis(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
};

