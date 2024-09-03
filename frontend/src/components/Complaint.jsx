import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";
import { AuthContext } from "../context/AuthContext";

const Alert = ({ variant, title, children }) => (
  <div
    className={`p-4 mb-4 rounded-md ${
      variant === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    <h3 className="text-sm font-medium mb-1">{title}</h3>
    <p className="text-sm">{children}</p>
  </div>
);

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState([]);
  const { authTokens, user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/complain-category/")
      .then((response) => setCategory(response.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/complain/",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          created_by: user.user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setError("");
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ title: "", category: "", description: "" }); // Reset the form
        }, 3000); // Hide success message after 3 seconds
      } else {
        setError(
          "There was an issue submitting your complaint. Please try again later."
        );
      }
    } catch (err) {
      setError(
        "There was an issue submitting your complaint. Please try again later."
      );
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 my-10 bg-white bg-opacity-95 rounded-lg shadow-xl backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Submit a Complaint
      </h2>
      {submitted ? (
        <Alert variant="success" title="Success">
          Your complaint has been submitted successfully. We'll get back to you
          soon.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a brief title for your complaint"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>

              {category.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Please provide details about your complaint"
            ></textarea>
          </div>
          {error && (
            <Alert variant="error" title="Error">
              {error}
            </Alert>
          )}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ComplaintForm;
