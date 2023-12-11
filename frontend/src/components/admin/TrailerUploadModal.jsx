/* eslint-disable no-unused-vars */
import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { uploadTrailer } from "../../api/movie";
import { useNotification } from "../../hooks";
import ProgressBar from "./ProgressBar";

const progress = 23;

const TrailerUploadModal = () => {
  const updateNotification = useNotification();

  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("trailer", file);
    const res = await uploadTrailer(formData);
    console.log(res);
  };

  const handleTypeError = (error) => {
    console.log(error);
    updateNotification("error", error);
  };
  return (
    <>
      <dialog id="Movie_model" className="modal">
        <div className="modal-box rounded-sm">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <FileUploader
              handleChange={handleChange}
              onTypeError={handleTypeError}
              types={["mp4", "avi"]}
            >
              <div className="w-40 h-40 border-dashed border rounded-full m-auto flex items-center justify-center cursor-pointer flex-col">
                <IoCloudUploadOutline size={44} />
                <p className="text-xs text-center">
                  Drag and Drop Your File Here!
                </p>
              </div>
            </FileUploader>
            <ProgressBar progress={progress} visible />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TrailerUploadModal;
