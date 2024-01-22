/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PosterSelector from "./PosterSelector";
import SelectField from "./SelectField";
import { useNotification } from "../../hooks";

const defaultActorInfo = {
  name: "",
  about: "",
  gender: "",
  avatar: null,
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validateActor = ({ name, avatar, gender, about }) => {
  if (!name.trim()) return { error: "Name is missing!" };
  if (!about.trim()) return { error: "About is missing!" };
  if (!gender.trim()) return { error: "Gender is missing!" };
  if (!avatar && !avatar?.type.startsWith("image"))
    return { error: "Image is not valid!" };

  return { error: null };
};

const ActorForm = ({ onSubmit }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const updateNotification = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);
    onSubmit(actorInfo);
  };

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "avatar") {
      const avatar = files[0];
      updateAvatarUI(avatar);
      return setActorInfo({ ...actorInfo, avatar });
    }

    setActorInfo({ ...actorInfo, [name]: value });
  };

  const updateAvatarUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatar(url);
  };

  const { name, about, gender } = actorInfo;
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
              name={"avatar"}
              onChange={handleChange}
              selectedPoster={selectedAvatar}
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
              value={name}
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
              value={about}
              onChange={handleChange}
              placeholder="About actor"
              rows={10}
              className="input input-bordered outline-none rounded-sm px-2 text-xs pt-2 resize-none h-24 custom-scrollbar"
            ></textarea>
          </div>
          <div className="flex justify-between items-end gap-4 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-[12px] leading-4">Gender</span>
              </label>
              <SelectField
                id={"gender"}
                name="gender"
                value={gender}
                onChange={handleChange}
                def={"Select gender"}
                options={genderOptions}
              />
            </div>
            <div className="form-control mt-4 w-full">
              <button
                className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActorForm;
