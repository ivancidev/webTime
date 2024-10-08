import React from "react";

export const Dropdown = ({
  name = "",
  label,
  options=[],
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
        <label htmlFor={name} className="mt-[20px] py-1 text-primary-pri3 font-label text-label-lg">
          {label} {validationAsterisk}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="w-[340px] h-[50px] bg-transparent border-2 rounded border-{#F4EFF4} font-body text-neutral-neu1 text-body-lg p-2"

        {...register(name, {
          required: `${label} es requerido`,
      >
        <option className="text-primary-pri1">{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option
              className="bg-primary-pri2 text-secondary-sec2 text-body-lg"
              key={index}
              value={option[valueKey]}
            >
              {option[displayKey]}
            </option>
          );
        })}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className="bg-primary-pri2 text-secondary-sec2 text-body-lg"
          >
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <span className="text-error-err2">{errors[name].message}</span>}
    </div>
  );
};

