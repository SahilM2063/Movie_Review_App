/* eslint-disable no-unused-vars */
import React from "react";

const LiveSearch = () => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-[12px] leading-4">LiveSearch</span>
      </label>
      <input
        type="text"
        name="title"
        placeholder="Movie title"
        className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
      />
    </div>
  );
};

export default LiveSearch;
