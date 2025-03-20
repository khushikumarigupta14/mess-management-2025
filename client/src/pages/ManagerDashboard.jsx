// src/pages/ManagerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookingsResponse = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(bookingsResponse.data);

      const mealsResponse = await axios.get("/api/meals");
      setMeals(mealsResponse.data);
    };
    fetchData();
  }, []);

  const handleToggleAvailability = async (mealId, available) => {
    try {
      await axios.put(
        `/api/meals/${mealId}`,
        { available: !available },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMeals((prevMeals) =>
        prevMeals.map((meal) =>
          meal._id === mealId ? { ...meal, available: !available } : meal
        )
      );
    } catch (error) {
      console.error("Error updating meal availability:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Bookings</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Meal</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-2">{booking.userId.name}</td>
                <td className="p-2">{booking.mealId.name}</td>
                <td className="p-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Meals</h2>
        <ul>
          {meals.map((meal) => (
            <li
              key={meal._id}
              className="bg-white p-4 rounded-lg shadow-md mb-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{meal.name}</h3>
                  <p className="text-gray-600">{meal.description}</p>
                  <p className="text-gray-800 font-bold">${meal.price}</p>
                </div>
                <button
                  onClick={() =>
                    handleToggleAvailability(meal._id, meal.available)
                  }
                  className={`px-4 py-2 rounded ${
                    meal.available ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {meal.available ? "Available" : "Unavailable"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerDashboard;
