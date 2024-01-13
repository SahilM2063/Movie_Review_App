/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const PosterSelector = ({ name, selectedPoster, onChange, accept }) => {
  return (
    <div className="form">
      <label className="label">
        <span className="label-text text-[12px] leading-4">Movie poster</span>
      </label>
      <div>
        {selectedPoster && (
          <img className="rounded-sm" src={selectedPoster} alt="" />
        )}
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={onChange}
          className="border-base-100 rounded-sm file-input-xs w-full max-w-xs text-xs"
        />
      </div>
    </div>
  );
};

export default PosterSelector;
