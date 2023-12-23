/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

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

    if (e.key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, i) => i !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[12px] leading-4">Tags</span>
        </label>
        <div className="flex flex-wrap items-center gap-1 input input-bordered outline-none rounded-sm px-2 pt-1 text-sm overflow-auto">
          {tags.reverse().map((t) => (
            <Tag key={t} tagName={t} onClickFunc={() => removeTag(t)} />
          ))}
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
      <p className="h-full leading-4">{tagName}</p>
      <CgClose className="cursor-pointer p-0" onClick={onClickFunc} size={14} />
    </span>
  );
};
