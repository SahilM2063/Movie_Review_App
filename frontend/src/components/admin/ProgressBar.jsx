/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ProgressBar = ({ progress, visible }) => {
  if (!visible) return null;

  return (
    <div className="w-full flex flex-col gap-2 items-center mt-2">
      <progress
        className="progress w-full"
        value={progress}
        max="100"
      ></progress>
      <p>{`Upload Progress ${progress}%`}</p>
    </div>
  );
};

export default ProgressBar;
