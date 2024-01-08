/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LiveSearch from "./LiveSearch";
import { LabelWithBadge, profileData, renderItems } from "./MovieForm";
import { useNotification } from "../../hooks";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = ({ onCastSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const updateNotification = useNotification();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const submitCast = () => {
    onCastSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo });
  };

  const { leadActor, profile, roleAs } = castInfo;
  return (
    <div className="form-control">
      <div className="flex justify-between items-center">
        <LabelWithBadge
          label={"LeadActor"}
          badge={0}
          viewBtn={false}
          labelClasses={"p-0 pl-1 "}
        />
        <input
          type="checkbox"
          value={leadActor}
          name="leadActor"
          checked={leadActor}
          onChange={handleOnChange}
          className="checkbox w-4 h-4 justify-start"
        />
      </div>
      <div className="flex mt-2 justify-between gap-2 items-center w-full">
        <LiveSearch
          placeholder="Search profile..."
          value={profile.name}
          profileData={profileData}
          onSelect={handleProfileSelect}
          renderItems={renderItems}
          onChange={handleOnChange}
        />
        <span className="text-sm">As</span>
        <input
          type="text"
          name="roleAs"
          placeholder="role as"
          value={roleAs}
          onChange={handleOnChange}
          className="input w-[48%] input-bordered outline-none rounded-sm px-2 h-9 text-xs"
        />
        <button
          onClick={submitCast}
          type="button"
          className="btn px-[6px] min-h-8 h-9 rounded-sm text-xs"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CastForm;
