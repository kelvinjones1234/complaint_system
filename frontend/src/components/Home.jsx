import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-opacity-90 bg-gray-100 pt-[8rem]">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-lg shadow-xl backdrop-blur-sm p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Welcome to Anti Corruption and Transparency Unit (ACTU) Complaint
          Management System
        </h1>
        <h1 className="text-xl md:text-2xl font- text-gray-800 mb-6 text-center">
          The Federal Polytechnic Bida, P.M.B, 55, Niger State
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          We're here to listen and help resolve your concerns.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              How It Works
            </h2>
            <ol className="list-decimal space-y-2 text-gray-700">
              <li>Submit your complaint using our easy-to-use form</li>
              <li>Receive a confirmation email with your complaint number</li>
              <li>Our team reviews and processes your complaint</li>
              <li>We'll keep you updated on the progress</li>
              <li>Receive a resolution to your complaint</li>
            </ol>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              Mission
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <div>
                A corruption-free institution where accountability, integrity,
                transparency and equity hold sway
              </div>
              <h2 className="text-2xl font-semibold text-red-800 mb-4">
                Vision
              </h2>
              <div>
                To eradicate all forms of corrupt practices in the institution
                through massive enlightenment campaign and educative programmes
              </div>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            to={"/complaints"}
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Table a Complaint
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
