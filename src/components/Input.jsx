import React from "react";

export const Input = ({
  label,
  name="",
  placeholder = "",
  type = "text",
  value = "",
  className,
  onChange,
  disabled = false,
  register,
  errors = {},
}) => {
  const valiationAsterisk = <span className="text-error-err2">*</span>;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mt-[20px] py-1 text-primary-pri3 font-label text-label-lg">
        {label} {valiationAsterisk}
      </label>
      <input
        id={name}
        name = {name}
        placeholder={placeholder}
        type={type}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
        {...register(name, {
          required: {
            value: true,
            message: `${label} es requerido`,
          },
          maxLength: {
            value: 20,
            message: "El nombre no debe ser mayor a 20 caracteres",
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres",
          },
        })}
      />
      {errors[name] && <span className="text-error-err2">{errors[name].message}</span>}
    </div>
  );
};