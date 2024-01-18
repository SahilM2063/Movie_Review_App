/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const SelectField = ({ id, name, value, onChange, def, options }) => {
  return (
    <select
      className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      <options selected>{def}</options>
      {options.map(({ title, value }, i) => {
        return (
          <option key={i} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

export default SelectField;
