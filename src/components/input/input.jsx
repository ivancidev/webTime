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
  validationRules = {},
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`mt-[20px] py-1 text-primary-pri2 font-label text-label-lg ${
          errors[name] ? "text-error-err2" : ""
        }`}
      >
        {label} <span className="text-error-err2">*</span>
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        className={`${className} ${errors[name] ? "" : ""}`}
        {...(register ? register(name, validationRules) : {})}
        onChange={onChange}
      />
      {errors[name] && (
        <span className="text-error-err2">{errors[name].message}</span>
      )}
    </div>
  );
};
