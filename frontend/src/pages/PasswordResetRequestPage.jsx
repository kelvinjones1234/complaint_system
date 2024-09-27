import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubmitButton from "../components/SubmitButton";
import backgroundImage from "../assets/img/anti_corruption.jpeg";
import axios from "axios";

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();

    // Validate form data
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        // Assuming 'email' is captured from a form state
        const emailData = { email }; // Replace with the actual state variable for email

        // Make POST request to the API
        await axios.post(
          "http://127.0.0.1:8000/api/password-reset/",
          emailData
        );

        // Set success message
        setSuccessMessage(
          "If this email is registered, a password reset link will be sent."
        );
        setErrors({}); // Clear any previous errors
      } catch (error) {
        console.error("Password reset request failed:", error);

        // Set the error message if request fails
        setErrors({
          submit: "Password reset request failed. Please try again.",
        });
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    } else {
      // Set validation errors
      setErrors(newErrors);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-opacity-90"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <NavBar />
      <div className="flex-grow flex items-center justify-center my-[3rem]">
        <div className="max-w-md w-full p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl border border-gray-300 backdrop-blur-md mt-[5rem]">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Reset Password
          </h2>
          {successMessage && (
            <div className="bg-green-100 border text-sm border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <form onSubmit={handlePasswordResetRequest} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="flex items-center justify-between">
              <SubmitButton
                label="Send Reset Link"
                style="w-full"
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link
              to={"/login"}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordResetRequestPage;
