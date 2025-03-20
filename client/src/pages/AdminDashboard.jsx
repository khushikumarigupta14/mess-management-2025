// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(usersResponse.data);

      const mealsResponse = await axios.get("/api/meals");
      setMeals(mealsResponse.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Meals</h2>
        <ul>
          {meals.map((meal) => (
            <li key={meal._id}>
              {meal.name} - ${meal.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
