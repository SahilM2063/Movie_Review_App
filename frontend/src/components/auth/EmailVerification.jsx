/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const OTP_Length = 6;

const EmailVerification = () => {
  const [otp, setOTP] = useState(new Array(OTP_Length).fill(""));

  return (
    <div className="fixed inset-0 flex items-center justify-center -z-10 px-10 md:px-5 sm:px-2 xs:px-1">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200 rounded-md">
        <form className="card-body p-6">
          <h1 className="text-center text-xl font-semibold">
            Please enter OTP to verify account
          </h1>
          <p className="text-xs text-center opacity-75">
            OTP has been sent to your email
          </p>
          <div className="form-control flex flex-row justify-center items-center flex-wrap gap-2 my-2">
            {otp.map((_, index) => {
              return (
                <>
                  <input
                    key={index}
                    type="number"
                    className="input input-bordered spin-button-none w-12 text-center font-semibold xs:w-10 xs:h-10 xs:text-xs xs sm:w-10 sm:h-10 sm:text-xs"
                    max={1}
                    maxLength={1}
                  />
                </>
              );
            })}
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

export default EmailVerification;
