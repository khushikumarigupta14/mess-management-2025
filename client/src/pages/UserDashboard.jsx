// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [meals, setMeals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const mealsResponse = await axios.get("/api/meals");
      setMeals(mealsResponse.data);

      const bookingsResponse = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(bookingsResponse.data);
    };
    fetchData();
  }, []);

  const handleBookMeal = async (mealId) => {
    try {
      await axios.post(
        "/api/bookings",
        { mealId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Meal booked successfully!");
      // Refresh bookings
      const bookingsResponse = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(bookingsResponse.data);
    } catch (error) {
      toast.error("Failed to book meal.", error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Booking canceled successfully!");
      // Refresh bookings
      const bookingsResponse = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBookings(bookingsResponse.data);
    } catch (error) {
      toast.error("Failed to cancel booking.", error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post(
        "/api/feedback",
        { feedback },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Feedback submitted successfully!");
      setFeedback("");
    } catch (error) {
      toast.error("Failed to submit feedback.", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div>
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
                  onClick={() => handleBookMeal(meal._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Booking History</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-2">Meal</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="p-2">{booking.mealId.name}</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2">
                  {booking.status === "booked" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Submit Feedback</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your feedback..."
        />
        <button
          onClick={handleSubmitFeedback}
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
