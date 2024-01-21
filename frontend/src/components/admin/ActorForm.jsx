/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PosterSelector from "./PosterSelector";

const ActorForm = () => {
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = () => {};

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "profilepic") {
      const profile = files[0];
      updateProfilePicUI(profile);
    }
  };

  const updateProfilePicUI = (file) => {
    const url = URL.createObjectURL(file);
    setProfilePic(url);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add Actor</h1>
      <form
        onSubmit={handleSubmit}
        className="card-body p-0 flex flex-col flex-row-reverse gap-4"
      >
        <div className="w-full">
          <div className="form-control max-w-[50%]">
            <PosterSelector
              label={"Actor Profile"}
              name={"profilepic"}
              onChange={handleChange}
              selectedPoster={profilePic}
              accept={"image/jpeg, image/jpg, image/png"}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">
                Actor name
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={""}
              onChange={handleChange}
              placeholder="Actor name"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[12px] leading-4">About</span>
            </label>
            <textarea
              name="about"
              value={""}
              onChange={handleChange}
              placeholder="About actor"
              rows={10}
              className="input input-bordered outline-none rounded-sm px-2 text-xs pt-2 resize-none h-24 custom-scrollbar"
            ></textarea>
          </div>
          <div className="form-control mt-4">
            <button
              className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActorForm;
