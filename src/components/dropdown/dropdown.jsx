import React from "react";
import { useForm } from "react-hook-form"

export const Dropdown=({
  label,
  options,
  value,
  onChange,
  placeholder = "",
}) => {
  //validacion de los campos
  const {register, handleSubmit, formState:{errors}} = useForm(); 

  return (
    <div className="flex flex-col text-[#F4EFF4]">
      {label && <label className="mt-[20px] py-1">{label}</label>}
      <select  
      value={value} 
      onChange={onChange} 
      className="w-[340px] h-[50px] bg-transparent border-2 rounded border-{#F4EFF4}"
      {... register(label)} required:true>

        <option value="">{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}