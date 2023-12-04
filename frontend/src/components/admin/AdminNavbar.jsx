/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logoLight from "../../assets/logoLight.svg";
import logoDark from "../../assets/logoDark.svg";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BiMoviePlay } from "react-icons/bi";
import { MdOutlineRecentActors } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks";

const AdminNavbar = ({ theme }) => {
  const [Logo, setLogo] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "mytheme1"
        ? logoLight
        : logoDark
      : true
  );

  useEffect(() => {
    setLogo(getLogoBasedOnTheme(theme));
  }, [theme]);

  const getLogoBasedOnTheme = (currentTheme) => {
    return currentTheme === "mytheme1" ? logoLight : logoDark;
  };

  const { handleLogout } = useAuth();

  return (
    <div className="drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <ul className="menu p-4 w-[13rem] min-h-full bg-base-200 text-base-content gap-4">
          <Link to={"/"} className="w-[30%]">
            <img
              src={Logo}
              alt="logo"
              className="max-w-[130px] cursor-pointer"
            />
            {/* <h1 className="text-3xl font-bold">CineViewPoint</h1> */}
          </Link>
          <Link to={"/"} className="mt-6 flex items-center gap-2 ml-2">
            <GoHome className="text-lg" />
            <span className="text-md">Home</span>
          </Link>
          <Link to={"/movies"} className="flex gap-2 items-center ml-2">
            <BiMoviePlay className="text-lg" />
            <span className="text-md">Movies</span>
          </Link>
          <Link to={"/actors"} className="flex gap-2 items-center ml-2">
            <MdOutlineRecentActors className="text-lg" />
            <span className="text-md">Actors</span>
          </Link>
          <div className="absolute bottom-2 flex flex-col gap-2">
            <span className="text-xl font-semibold">Admin</span>
            <button
              onClick={() => {
                if (window.confirm("Are you sure ?")) {
                  handleLogout();
                }
              }}
              className="btn px-3 min-h-8 h-9 rounded-sm self-start bg-base-300"
            >
              <FiLogOut />
              <span>Log out</span>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
