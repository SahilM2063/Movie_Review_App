/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";

const ResetPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const updateNotification = useNotification();
  const navigate = useNavigate();

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long!");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match");

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/sign-in", { replace: true });
  };

  useEffect(() => {
    isValidToken();
  }, []);

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

  if (!isValid) {
    return (
      <div className="fixed inset-0 flex flex-col gap-3 items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
        <h1 className="text-center text-xl">Sorry, Your token is invalid</h1>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-200 rounded-md">
        <form onSubmit={handleSubmit} className="card-body p-6">
          <h1 className="text-center text-xl font-semibold">
            Reset your password
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">New password</span>
            </label>
            <input
              type="password"
              name="one"
              value={password.one}
              onChange={handleChange}
              placeholder="new password"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm">Confirm password</span>
            </label>
            <input
              type="password"
              name="two"
              value={password.two}
              onChange={handleChange}
              placeholder="confirm password"
              className="input input-bordered outline-none rounded-sm px-2 h-9 text-xs"
            />
          </div>
          <div className="form-control mt-4">
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
