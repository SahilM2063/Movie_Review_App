/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const MovieForm = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Sign Up</h1>
      <form className="card-body p-0 flex gap-4 flex-row">
        <div className="w-[70%]">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Title</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
            <label className="label my-1">
              <p className="label-text-alt">
                Already have an account ?{" "}
                <Link
                  to={"/auth/sign-in"}
                  className="label-text-alt link link-hover"
                >
                  {" "}
                  Sign in
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs">
              Sign Up
            </button>
          </div>
        </div>
        <div className="section bg-slate-200 h-60 w-[30%]"></div>
      </form>
    </div>
  );
};

export default MovieForm;
