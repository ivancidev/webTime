import React from "react";

export const Dropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder = "",
}) => {
  const validationAsterisk = <span className="text-error-err2">*</span>;
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mt-[20px] py-1 text-primary-pri3 font-label text-label-lg">
          {label} {validationAsterisk}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-[340px] h-[50px] bg-transparent border-2 rounded border-{#F4EFF4} font-body text-neutral-neu1 text-body-lg p-2"
      >
        <option className="text-primary-pri1">{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option
              className="bg-primary-pri2 text-secondary-sec2 text-body-lg"
              key={index}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
