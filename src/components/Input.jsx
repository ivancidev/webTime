import React from 'react';

export const Input = ({label, placeholder, type="text", value="", className, onChange, disabled=false}) => {
  return (
    <div className="mb-2">
      <label className="m-2 text-gray-950 text-xl">{label}</label>
      <input
        placeholder={placeholder}
        type = {type}
        value = {value}
        className = {className}
        onChange = {onChange}
        disabled = {disabled}
      />
    </div>
  );
};
