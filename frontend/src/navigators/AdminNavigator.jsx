/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard.jsx";
import Actors from "../components/admin/Actors.jsx";
import Movies from "../components/admin/Movies.jsx";
import NotFound from "../components/users/NotFound";

const AdminNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/actors" element={<Actors />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminNavigator;