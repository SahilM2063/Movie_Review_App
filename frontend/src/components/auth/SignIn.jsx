/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";

const validateUserInfo = ({ email, password }) => {
  var isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email checking regex

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long" };

  return { ok: true };
};

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const updateNotification = useNotification();
  const { handleLogin, authInfo } = useAuth();
  console.log(authInfo);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("warning", error);
    handleLogin(userInfo.email, userInfo.password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-200 rounded-md">
        <form onSubmit={handleSubmit} className="card-body p-6">
          <h1 className="text-center text-xl font-semibold">Sign In</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={userInfo.email}
              onChange={handleChange}
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
              value={userInfo.password}
              onChange={handleChange}
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
            <label className="label flex-col items-start gap-2 my-1">
              <Link
                to={"/auth/forget-password"}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
              <p className="label-text-alt">
                Don&#39;t have an account ?{" "}
                <Link
                  to={"/auth/sign-up"}
                  className="label-text-alt link link-hover"
                >
                  {" "}
                  Sign up
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control">
            <button className="btn btn-primary px-3 min-h-8 h-9 rounded-sm text-xs">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
