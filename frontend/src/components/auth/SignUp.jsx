/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import { useNotification } from "../../hooks";

const validateUserInfo = ({ name, email, password }) => {
  var isValidName = /^[a-z A-Z]+$/; // name checking regex
  var isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // email checking regex

  if (!name.trim()) return { ok: false, error: "Name is missing" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name" };

  if (!email.trim()) return { ok: false, error: "Email is missing" };
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid email" };

  if (!password.trim()) return { ok: false, error: "Password is missing" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long" };

  return { ok: true };
};

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const updateNotification = useNotification();
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("warning", error);

    const res = await createUser(userInfo);
    if (res.error) return console.log(res.error);

    navigate("/auth/verification", {
      state: { user: res.user },
      replace: true,
    });
    console.log(res.user);
  };

  const { name, email, password } = userInfo;

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-200 rounded-md">
        <form className="card-body p-6" onSubmit={handleSubmit}>
          <h1 className="text-center text-xl font-semibold">Sign Up</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="name"
              onChange={handleChange}
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
              value={email}
              placeholder="email"
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
              value={password}
              placeholder="password"
              onChange={handleChange}
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
