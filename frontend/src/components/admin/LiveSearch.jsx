/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { forwardRef, useEffect, useRef, useState } from "react";

const LiveSearch = ({
  value = "",
  onChange = null,
  placeholder = "",
  profileData = [],
  selectedResultStyle,
  resultContainerStyle,
  renderItems = null,
  onSelect = null,
  name,
}) => {
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
    if (SelectedItem) {
      onSelect(SelectedItem);
      closeSearchDropdown();
    }
  };

  const handleKeyDown = (e) => {
    // console.log(key);
    const { key } = e;
    let nextCount;
    const keys = ["ArrowUp", "ArrowDown", "Enter"];
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
      <input
        type="text"
        name={name}
        placeholder={placeholder ? placeholder : null}
        className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
      />
      <SearchResultsDropdown
        focusedIndex={focusedIndex}
        visible={displaySearch}
        profileData={profileData}
        onSelect={handleSelection}
        renderItems={renderItems}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
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
  renderItems,
  resultContainerStyle,
  selectedResultStyle,
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
        const getSelectedClasses = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "bg-base-300 flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-base-300";
        };

        return (
          <ResultCard
            ref={index === focusedIndex ? searchResultContainer : null}
            key={index.toString()}
            item={profileData}
            renderItems={renderItems}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClasses() : ""
            }
            onClick={() => onSelect(profileData)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItems,
    onClick,
    resultContainerStyle,
    selectedResultStyle,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle) {
      return resultContainerStyle + " " + selectedResultStyle;
    }

    return (
      selectedResultStyle +
      "flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-base-300"
    );
  };

  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      <div className="flex items-center">{renderItems(item)}</div>
    </div>
  );
});
