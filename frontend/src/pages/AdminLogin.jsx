import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when login starts

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/admin/login`, formData);
      const { token } = response.data;

      // Save the token (if needed for authentication in future requests)
      localStorage.setItem("adminToken", token);

      // Redirect to the admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-8">
          Admin Login
        </h2>

        <div className="mb-6">
          <label className="block text-black font-medium mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full border-t-2 border-b-2 border-white w-6 h-6"></div>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
