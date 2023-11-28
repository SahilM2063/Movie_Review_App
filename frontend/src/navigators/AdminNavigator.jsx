/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard.jsx";
import Actors from "../components/admin/Actors.jsx";
import Movies from "../components/admin/Movies.jsx";
import NotFound from "../components/users/NotFound";

const AdminNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AdminNavigator;
