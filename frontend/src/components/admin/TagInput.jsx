/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const TagInput = () => {
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[12px] leading-4">Title</span>
        </label>
        <div className="flex flex-wrap items-center gap-1 input input-bordered outline-none rounded-sm px-2 text-sm">
          <Tag tagName={"hello"} onClickFunc={onclick}/>
          <input
            type="text"
            name="tagField"
            placeholder="Tag 1, Tag 2"
            className="input p-0 px-1 focus:outline-none flex-grow outline-none rounded-sm h-9 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;

const Tag = ({ tagName, onClickFunc }) => {
  return (
    <span className="kbd gap-[2px] px-[6px] rounded-md">
      <p>{tagName}</p>
      <IoCloseOutline
        size={16}
        className="cursor-pointer"
        onClick={onClickFunc}
      />
    </span>
  );
};
