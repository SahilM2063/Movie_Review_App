/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./components/users/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

const App = () => {
  return (
    <>
      <Navbar />
      <SignIn />
      <SignUp/>
    </>
  );
};

export default App;
