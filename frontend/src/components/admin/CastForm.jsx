/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LiveSearch from "./LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastForm = () => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const { leadActor } = castInfo;

  return (
    <div className="form-control">
      <label className="label p-0 px-1 cursor-pointer">
        <span className="label-text leading-3 text-[10px]">LeadActor</span>
        <input
          type="checkbox"
          name="leadActor"
          checked={leadActor}
          className="checkbox w-4 h-4 justify-start"
        />
      </label>
      <div className="flex mt-2 justify-between gap-2 items-center w-full">
        <LiveSearch placeholder="Search profile..." />
        <span className="text-sm">As</span>
        <input
          type="text"
          name="roleAs"
          placeholder="role as"
          className="input w-[48%] input-bordered outline-none rounded-sm px-2 h-9 text-xs"
        />
        <button type="button" className="btn px-[6px] min-h-8 h-9 rounded-sm text-xs">
          Add
        </button>
      </div>
    </div>
  );
};

export default CastForm;
