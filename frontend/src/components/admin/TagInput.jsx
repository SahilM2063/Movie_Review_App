/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const TagInput = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Prevent the default behavior (form submission)
      e.preventDefault();
    }

    if (e.key === "," || e.key === "Enter") {
      if (!tag) return;

      if (tags.includes(tag)) setTag("");

      setTags([...tags, tag]);
      setTag("");
    }
  };

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[12px] leading-4">Title</span>
        </label>
        <div className="flex flex-wrap items-center gap-1 input input-bordered outline-none rounded-sm p-2 text-sm overflow-auto">
          {tags.map((t) => (
            <Tag key={t} tagName={t}/>
          ))}
          <Tag tagName={"hello"} onClickFunc={onclick} />
          <input
            type="text"
            name="tagField"
            placeholder="Tag 1, Tag 2"
            className="input p-0 px-1 focus:outline-none flex-grow outline-none rounded-sm h-9 text-xs"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
