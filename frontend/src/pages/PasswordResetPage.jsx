import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubmitButton from "../components/SubmitButton";
import backgroundImage from "../assets/img/anti_corruption.jpeg";
import axios from "axios";

const PasswordResetPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { uidb64, token } = useParams();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Call the password reset API here
        // Make POST request to the API
        const response = await axios.post(
          `http://localhost:8000/api/reset-password/${uidb64}/${token}/`,
          {
            password: formData.password,
            password_confirm: formData.confirmPassword,
          }
        );
        setSuccessMessage("Password has been reset successfully.");
      } catch (error) {
        console.error("Password reset failed:", error);
        setErrors({ submit: "Password reset failed. Please try again." });
      } finally {
        setLoading(false);
      }
    } else {
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
            Reset Your Password
          </h2>
          {successMessage && (
            <div className="bg-green-100 border text-sm border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className="text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="flex items-center justify-between">
              <SubmitButton
                label="Reset Password"
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

export default PasswordResetPage;
