import React from "react";

export const InputText = ({
  label,
  name = "",
  placeholder = "",
  type = "text",
  className,
  register,
  errors = {},
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`mt-[20px] py-1 text-primary-pri3 font-label text-label-lg ${errors[name] ? 'text-error-err2' : ''}`}
      >
        {label} <span className="text-error-err2">*</span>
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        className={`${className} ${errors[name] ? 'border-red-500' : ''}`}
        {...register(name, {
          required: `${label} es requerido`,
          maxLength: {
            value: 255,
            message: "El título no debe ser mayor a 255 caracteres",
          },
          minLength: {
            value: 2,
            message: "El título debe tener al menos 2 caracteres",
          },
        })}
        onChange ={onChange}      />
      {errors[name] && <span className="text-error-err2">{errors[name].message}</span>}
    </div>
  );
};
