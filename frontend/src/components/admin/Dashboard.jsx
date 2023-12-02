/* eslint-disable no-unused-vars */
import React from "react";
import { FiPlus } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="flex w-full p-2">
      <div className="topbar flex w-full justify-start gap-2 h-10">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered outline-none rounded-sm w-24 md:w-auto px-2 h-9 text-xs w-full"
          />
        </div>
        <details className="dropdown">
          <summary className="btn px-3 min-h-8 h-9 rounded-sm">
            <span className="text-xs">create</span>
            <FiPlus />
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] mt-2 gap-1 bg-base-100 rounded-sm w-36">
            <li>
              <button>Add Movie</button>
            </li>
            <li>
              <button>Add Actor</button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Dashboard;
