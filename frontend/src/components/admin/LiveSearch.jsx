/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

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
  const [displaySearch, SetDisplaySearch] = useState(false);
  const [focusedIndex, SetFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (profileData.length > 0) SetDisplaySearch(true);
  };

  const closeSearchDropdown = () => {
    SetDisplaySearch(false);
    SetFocusedIndex(-1);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearchDropdown();
    }, 300);
  };

  const handleSelection = (SelectedItem) => {
    console.log(SelectedItem);
  };

  const handleKeyDown = (e) => {
    // console.log(key);
    const { key } = e;
    let nextCount;
    const keys = ["ArrowUp", "ArrowDown", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    // move selection up or down
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % profileData.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + profileData.length - 1) % profileData.length;
    }

    if (key === "Enter") {
      e.preventDefault();
      handleSelection(profileData[focusedIndex]);
    }

    SetFocusedIndex(nextCount);
  };

  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text text-[12px] leading-4">Live Search</span>
      </label>
      <input
        type="text"
        name="profiles"
        placeholder="Search profiles..."
        className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
      />
      <SearchResultsDropdown
        focusedIndex={focusedIndex}
        visible={displaySearch}
        profileData={profileData}
        onSelect={handleSelection}
      />
    </div>
  );
};

export default LiveSearch;

const SearchResultsDropdown = ({
  visible,
  profileData = [],
  focusedIndex,
  onSelect,
}) => {
  const searchResultContainer = useRef();

  useEffect(() => {
    searchResultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [focusedIndex]);

  if (!visible) return null;

  return (
    <div className="w-full max-h-20 mt-1 bg-base-200 top-20 custom-scrollbar overflow-scroll rounded-sm overflow-x-hidden">
      {profileData.map((profileData, index) => {
        const { id, name, avatar } = profileData;
        return (
          <div
            onClick={() => onSelect(profileData)}
            ref={index === focusedIndex ? searchResultContainer : null}
            key={id}
            className={
              index === focusedIndex
                ? "bg-base-300 flex items-center justify-between px-2 py-1 cursor-pointer"
                : "flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-base-300"
            }
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
  );
};
