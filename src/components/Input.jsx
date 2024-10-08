import React from "react";

export const Input = ({
  label,
  name = "",
  placeholder = "",
  type = "text",
  className,
  register,
  errors = {},
}) => {
  const validationAsterisk = <span className="text-error-err2">*</span>;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`mt-[20px] py-1 text-primary-pri3 font-label text-label-lg ${errors[name] ? 'text-error-err2' : ''}`}
      >
        {label} {validationAsterisk}
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`${className} ${errors[name] ? 'border-red-500' : ''} border-2 rounded p-2`}
        {...register(name, {
          required: `${label} es requerido`,
          maxLength: {
            value: 100,
            message: "El título no debe ser mayor a 100 caracteres",
          },
          minLength: {
            value: 2,
            message: "El título debe tener al menos 2 caracteres",
          },
        })}
      />
      {errors[name] && <span className="text-error-err2">{errors[name].message}</span>}
    </div>
  );
};
