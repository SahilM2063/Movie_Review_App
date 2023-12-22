/* eslint-disable no-unused-vars */
import React from "react";

const TagInput = () => {
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-[12px] leading-4">Title</span>
        </label>
        <div className="flex flex-wrap items-center gap-1 input input-bordered outline-none rounded-sm px-2 text-sm">
          <span>Tag one</span>
          <span>Tag one</span>
          <input
            type="text"
            name="title"
            placeholder="Movie title"
            className="input p-0 focus:outline-none flex-grow outline-none rounded-sm h-9 text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
