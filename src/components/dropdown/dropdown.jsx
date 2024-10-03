import React from "react";

export const Dropdown=({
  label,
  options,
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div>
      {label && <label className={`block`}>{label}</label>}
      <select value={value} onChange={onChange} className={className}>
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