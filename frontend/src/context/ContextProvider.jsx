/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
