/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import { uploadTrailer } from "../../api/movie";
import { useNotification } from "../../hooks";
import ProgressBar from "./ProgressBar";
import MovieForm from "./MovieForm";
import ActorForm from "./ActorForm";

export default function TrailerUploadModal() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [trailerInfo, setTrailerInfo] = useState({});

  const updateNotification = useNotification();

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("trailer", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const handleUploadTrailer = async (data) => {
    const { error, secure_url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );

    if (error) return updateNotification("error", error);
    updateNotification("success", "Trailer uploaded successfully");
    setVideoUploaded(true);
    setTrailerInfo({ secure_url, public_id });
  };

  // console.log(trailerInfo)

  const handleTypeError = (error) => {
    console.log(error);
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing...";
    }

    return `Upload Progress ${uploadProgress}%`;
  };

  const handleActorSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <input type="checkbox" id="Movie_model" className="modal-toggle" />
      <div className="modal" role="dialog" id="Movie_model">
        <div className="modal-box rounded-sm custom-scrollbar overflow-scroll overflow-x-hidden">
          <div method="dialog">
            <TrailerSelector
              visible={!videoSelected}
              onTypeError={handleTypeError}
              handleChange={handleChange}
            />
            <ProgressBar
              progress={uploadProgress}
              message={getUploadProgressValue()}
              visible={!videoUploaded && videoSelected}
            />
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="Movie_model">
          Close
        </label>
      </div>

      <input type="checkbox" id="Actor_model" className="modal-toggle" />
      <div className="modal" role="dialog" id="Movie_model">
        <div className="modal-box rounded-sm custom-scrollbar overflow-scroll overflow-x-hidden">
          <ActorForm onSubmit={handleActorSubmit} />
        </div>
        <label className="modal-backdrop" htmlFor="Actor_model">
          Close
        </label>
      </div>
    </>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <>
      {/* <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-40 h-40 border-dashed border rounded-full m-auto flex items-center justify-center cursor-pointer flex-col">
          <IoCloudUploadOutline size={44} />
          <p className="text-xs text-center">Drag and Drop Your File Here!</p>
        </div>
      </FileUploader> */}
      <MovieForm />
    </>
  );
};
