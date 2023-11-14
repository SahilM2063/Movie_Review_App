/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { HiOutlineMoon } from "react-icons/hi2";
import { LuSunMedium } from "react-icons/lu";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    <div className="navbar bg-base-100 px-10 md:px-4 sm:px-2 xs:px-0 justify-between drop-shadow-md">
      <Link to={"/"} className="w-[30%]">
        <img src={logo} alt="logo" className="max-w-[170px] cursor-pointer" />
        {/* <h1 className="text-3xl font-bold">CineViewPoint</h1> */}
      </Link>

      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn btn-ghost px-2 min-h-8 h-9 lg:hidden xl:hidden 2xl:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-40 right-0 rounded-sm gap-2"
        >
          <div className="w-full flex items-center">
            <LuSunMedium className="cursor-pointer text-xl w-full" />
            <input
              type="checkbox"
              className="toggle toggle-md"
              checked={themeTgBtn}
              onChange={toggleTheme}
            />
            <HiOutlineMoon className="cursor-pointer text-xl w-full" />
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered outline-none rounded-sm w-24 md:w-auto px-2 h-9 text-xs w-full"
            />
          </div>
          <button className="btn px-3 min-h-8 h-9 rounded-sm text-xs">
            Login
          </button>
        </ul>
      </div>

      <div className="flex-1 gap-3 xs:hidden sm:hidden md:hidden justify-end">
        <div className="flex gap-1 items-center">
          <LuSunMedium className="cursor-pointer text-xl" />
          <input
            type="checkbox"
            className="toggle toggle-md"
            checked={themeTgBtn}
            onChange={toggleTheme}
          />
          <HiOutlineMoon className="cursor-pointer text-xl" />
        </div>
        <div className="form-control w-[20%]">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered outline-none rounded-sm w-24 md:w-auto px-2 h-9 text-xs w-full"
          />
        </div>
        <Link
          to={"/auth/sign-in"}
          className="btn px-3 min-h-8 h-9 rounded-sm text-xs"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
