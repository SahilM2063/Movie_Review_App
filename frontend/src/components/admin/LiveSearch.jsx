/* eslint-disable no-unused-vars */
import React from "react";

const LiveSearch = () => {
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text text-[12px] leading-4">LiveSearch</span>
      </label>
      <input
        type="text"
        name="profiles"
        placeholder="Search profiles..."
        className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
      />
      <div className="w-full px-2 max-h-20 mt-1 bg-base-200 top-20 custom-scrollbar overflow-scroll rounded-sm overflow-x-hidden">
        <p>one</p>
        <p>two</p>
        <p>two</p>
        <p>two</p>
        <p>three</p>
      </div>
    </div>
  );
};

export default LiveSearch;
