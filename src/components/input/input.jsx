import React from "react";

export const Input = ({
  label,
  placeholder,
  type = "text",
  value = "",
  className,
  onChange,
  disabled = false,
}) => {
  const valiationAsterisk = <span className="text-error-err2">*</span>;
  return (
    <div className="flex flex-col">
      <label className="mt-[20px] py-1 text-primary-pri3 font-label text-label-lg">
        {label} {valiationAsterisk}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        className={className}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
