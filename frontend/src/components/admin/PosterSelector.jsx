/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const PosterSelector = ({ name, selectedPoster=true  }) => {
  return (
    <div className="form">
      <label className="label">
        <span className="label-text text-[12px] leading-4">Movie Poster</span>
      </label>
      <div>
        {selectedPoster && (
          <img
          className="border rounded-sm"
            src="https://img.freepik.com/free-photo/year-2024-collage-design_23-2151132448.jpg?size=626&ext=jpg"
            alt=""
          />
        )}
        <input
          type="file"
          name={name}
          
          className="file-input-bordered rounded-sm file-input-xs w-full max-w-xs text-xs"
        />
      </div>
    </div>
  );
};

export default PosterSelector;
