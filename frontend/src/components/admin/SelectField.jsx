/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const SelectField = ({ id, name, value, onChange, def }) => {
  return (
    <select
      className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option selected>{def}</option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </select>
  );
};

export default SelectField;
