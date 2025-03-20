import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";

// Protected Route Component
const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem("role");

  // If the user is not logged in, redirect to login
  if (!userRole) {
    return <Navigate to="/" />;
  }

  // If the user's role is not allowed, redirect to the appropriate dashboard
  if (!allowedRoles.includes(userRole)) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/admin" />;
      case "manager":
        return <Navigate to="/manager" />;
      case "user":
        return <Navigate to="/user" />;
      default:
        return <Navigate to="/" />;
    }
  }

  // If the user's role is allowed, render the children
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to={`/${localStorage.getItem("role")}`} />
            ) : (
              <Login />
            )
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            localStorage.getItem("token") ? (
              <Navigate to={`/${localStorage.getItem("role")}`} />
            ) : (
              <Register />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manager Dashboard */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect to Login if no matching route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
