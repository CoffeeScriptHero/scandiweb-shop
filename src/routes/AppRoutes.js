import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "../pages/Category/Category";

export default class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route path="*" element={<Category />} />
      </Routes>
    );
  }
}
