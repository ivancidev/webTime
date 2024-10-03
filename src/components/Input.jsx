import React from "react";

export const Input = ({label, placeholder, type="text", value="", className, onChange, disabled=false}) => {
  return (
    <div className="flex flex-col text-[#F4EFF4]">
      <label className="mt-[20px] py-1">{label}</label>
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
