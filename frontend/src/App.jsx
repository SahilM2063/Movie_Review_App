/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/users/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import Home from "./components/users/Home";
import NotFound from "./components/users/NotFound";
import ResetPassword from "./components/auth/ResetPassword";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigators/AdminNavigator";

const App = () => {
  const { authInfo } = useAuth();
  // console.log(authInfo);
  const isAdmin = authInfo.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
