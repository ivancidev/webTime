import React from "react";

export const Dropdown = ({
  name = "",
  label,
  options = [],
  value,
  onChange,
  placeholder = "",
  displayKey = "",
  valueKey = "",
  register,
  errors = {},
}) => {
  const validationAsterisk = <span className="text-error-err2">*</span>;

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mt-[20px] py-1 text-primary-pri2 font-label text-label-lg"
        >
          {label} {validationAsterisk}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="w-full md:w-[340px] h-[50px] bg-transparent border-[1px] rounded border-neutral-neu0 font-body text-neutral-neu0 text-body-md p-2"
        {...register(name, {
          required: `${label} es requerido`,
        })}
        value={value} // Asegúrate de que el value esté vinculado correctamente
        onChange={onChange} // Agregamos la función onChange
      >
        <option value="" disabled className="bg-neutral-neu1 text-primary-pri3">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option[valueKey]}
            className="bg-neutral-neu2 text-primary-pri2 text-body-md"
          >
            {option[displayKey]}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-error-err2">{errors[name].message}</span>
      )}
    </div>
  );
};
