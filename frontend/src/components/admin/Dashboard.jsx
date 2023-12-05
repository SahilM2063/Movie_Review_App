/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi2";
import { LuSunMedium } from "react-icons/lu";

const Dashboard = ({ ToggleTheme }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "mytheme1"
  );
  const [themeTgBtn, setThemeTgBtn] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "mytheme1"
        ? true
        : false
      : true
  );

  const toggleTheme = () => {
    setTheme(theme === "mytheme1" ? "lemonade" : "mytheme1");
    setThemeTgBtn(theme === "mytheme1" ? false : true);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div className="flex w-full p-2">
      <div className="topbar flex w-full justify-end gap-2 h-10">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered outline-none rounded-sm md:w-auto px-2 h-9 text-xs w-full"
          />
        </div>
        <div className="flex items-center gap-1 xs:gap-[0.10rem] sm:gap-[0.15rem]">
          <LuSunMedium className="cursor-pointer text-xl w-[16px]" />
          <input
            type="checkbox"
            className="toggle toggle-md xs:toggle-xs sm:toggle-sm "
            checked={themeTgBtn}
            onChange={toggleTheme}
            onClick={ToggleTheme}
          />
          <HiOutlineMoon className="cursor-pointer text-xl w-[16px]" />
        </div>
        <details className="dropdown">
          <summary className="btn px-3 min-h-8 h-9 rounded-sm">
            <span className="text-xs items-center flex gap-1">
              CREATE <span className="text-lg">+</span>
            </span>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] mt-2 gap-1 bg-base-100 rounded-sm w-36">
            <li>
              <button>Add movie</button>
            </li>
            <li>
              <button>Add actor</button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Dashboard;
