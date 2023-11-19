/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const NotVerified = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  console.log(authInfo);

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };

  return (
    <div className="fixed inset-0 flex flex-col gap-3 items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      {!isVerified && isLoggedIn ? (
        <p className="text-center text-xl">
          Looks like your email is not verified ,{" "}
          <button
            onClick={navigateToVerification}
            className="btn px-3 min-h-8 h-9 rounded-sm text-xs"
          >
            Verify now
          </button>{" "}
        </p>
      ) : (
        "Home"
      )}
    </div>
  );
};

export default NotVerified;
