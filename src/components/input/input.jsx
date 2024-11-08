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
  labelMarginTop = "20px",
  labelFontSize,
  errorFontSize,
  icon,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`py-1 text-primary-pri2 font-label text-label-lg ${
          errors[name] ? "text-error-err2" : ""
        }`}
        style={{ marginTop: labelMarginTop, fontSize: labelFontSize }}
      >
        {label} <span className="text-error-err2">*</span>
      </label>
      <div className="relative w-full">
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
          className={`${className} ${errors[name] ? "" : ""}`}
          {...(register ? register(name, validationRules) : {})}
        />
        {icon && (
          <div className="absolute right-4 top-6 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
      <div
        className={`${!errors[name] && name === "password" ? "h-0" : "h-3"}`}
      >
        {errors[name] && (
          <span className="text-error-err2" style={{ fontSize: errorFontSize }}>
            {errors[name].message}
          </span>
        )}
      </div>
    </div>
  );
};
