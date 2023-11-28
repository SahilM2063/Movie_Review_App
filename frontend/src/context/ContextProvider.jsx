/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import NotificationProvider from "./NotificationProvider";
import AuthProvider from "./AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

const ContextProvider = ({ children }) => {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>{children}</AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
