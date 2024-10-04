import React from "react";
import { useForm } from "react-hook-form"

export const Input = ({label, placeholder, type="text", value="", className, onChange, disabled=false}) => {
  
  //validacion de los campos
  const {register, handleSubmit, formState:{errors}} = useForm(); 

  return (
    <div className="flex flex-col text-[#F4EFF4]">
      <label className="mt-[20px] py-1">{label}</label>
      <input
        placeholder={placeholder}
        type = {type}
        value = {value}
        className = {className}
        onChange = {onChange}
        disabled = {disabled}
        {... register(label {required:true}) }
      />
      {
        errors && <span>{label} es necesario</span>
      }
    </div>
  );
};
