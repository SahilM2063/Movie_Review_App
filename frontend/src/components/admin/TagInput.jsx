/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";

const TagInput = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const tagInput = useRef();

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

  useEffect(() => {
    tagInput.current.scrollIntoView();
  }, [tag]);

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[12px] leading-4">Tags</span>
        </label>
        <div className="flex flex-wrap items-center gap-1 input input-bordered outline-none rounded-sm p-2 text-sm overflow-scroll overflow-x-hidden custom-scrollbar">
          {tags.reverse().map((t) => (
            <Tag key={t} tagName={t} onClickFunc={() => removeTag(t)} />
          ))}
          <input
            type="text"
            name="tagField"
            placeholder="Tag 1, Tag 2"
            className="input px-1 focus:outline-none flex-grow outline-none rounded-sm h-9 text-xs"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={tagInput}
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;

const Tag = ({ tagName, onClickFunc }) => {
  return (
    <span className="kbd gap-[2px] px-[6px] rounded-md max-w-[60%] justify-start">
      <p className="h-full flex-1 overflow-hidden">{tagName}</p>
      <CgClose
        className="cursor-pointer min-w-[10%]"
        onClick={onClickFunc}
        size={14}
      />
    </span>
  );
};
