/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ProgressBar = ({ progress, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="w-full flex flex-col gap-2 items-center mt-6">
      <progress
        className="progress w-full"
        // value={progress}
        // max="100"
      ></progress>
      <p>{message}</p>
    </div>
  );
};

export default ProgressBar;
