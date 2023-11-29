/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logoLight from "../../assets/logoLight.svg";
import logoDark from "../../assets/logoDark.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "mytheme1"
  );

  const [Logo, setLogo] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "mytheme1"
        ? logoLight
        : logoDark
      : true
  );

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center"></div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-[13rem] min-h-full bg-base-200 text-base-content gap-4">
          <Link to={"/"} className="w-[30%]">
            <img
              src={Logo}
              alt="logo"
              className="max-w-[130px] cursor-pointer"
            />
            {/* <h1 className="text-3xl font-bold">CineViewPoint</h1> */}
          </Link>
          <Link to={"/"} className="self-center text-md mt-6">
            Home
          </Link>
          <Link to={"/movies"} className="self-center text-md">
            Movies
          </Link>
          <Link to={"/actors"} className="self-center text-md">
            Actors
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
