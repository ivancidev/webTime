import React from "react";

export const Dropdown=({
  label,
  options,
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col text-[#F4EFF4]">
      {label && <label className="mt-[20px] py-1">{label}</label>}
      <select value={value} onChange={onChange} className="w-[340px] h-[50px] bg-transparent border-2 rounded border-{#F4EFF4}">
        <option value="">{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}