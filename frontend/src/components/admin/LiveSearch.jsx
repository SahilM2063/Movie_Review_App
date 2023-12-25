/* eslint-disable no-unused-vars */
import React from "react";

export const profileData = [
  {
    id: 1,
    name: "Alice Smith",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Bob Johnson",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
  },
  {
    id: 4,
    name: "Diana Miller",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
];

const LiveSearch = () => {
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text text-[12px] leading-4">LiveSearch</span>
      </label>
      <input
        type="text"
        name="profiles"
        placeholder="Search profiles..."
        className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
      />
      <div className="w-full max-h-20 mt-1 bg-base-200 top-20 custom-scrollbar overflow-scroll rounded-sm overflow-x-hidden">
        {profileData.map(({ id, name, avatar }) => {
          return (
            <div
              key={id}
              className="flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-base-300"
            >
              <div className="flex items-center">
                <img
                  src={avatar}
                  alt={name}
                  className="rounded-full w-8 h-8 mr-3"
                />
                <span className="font-semibold">{name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveSearch;
