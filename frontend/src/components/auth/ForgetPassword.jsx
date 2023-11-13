/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200 rounded-md">
        <form className="card-body p-6">
          <h1 className="text-center text-xl font-semibold">
            Please enter your email
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
              required
            />
            <label className="label my-1">
              <Link
                to={"/auth/sign-in"}
                className="label-text-alt link link-hover"
              >
                Sign in
              </Link>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs">
              Send Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
