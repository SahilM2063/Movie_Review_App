/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (isVerifying) {
    return (
      <div className="fixed inset-0 flex flex-col gap-3 items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
        <h1 className="text-center text-xl">
          Please wait , we are verifying your request
        </h1>
        <div className="flex items-center justify-center">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-200 rounded-md">
        <form className="card-body p-6">
          <h1 className="text-center text-xl font-semibold">
            Reset your password
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">New password</span>
            </label>
            <input
              type="password"
              placeholder="new password"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Confirm password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
