/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthProvider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
