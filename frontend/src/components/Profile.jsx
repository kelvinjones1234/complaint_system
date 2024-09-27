import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Calendar,
  Bell,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  CreditCard,
  Shield,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { user, authTokens } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/complain/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => setComplaints(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/feedbacks/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => setNotifications(response.data));
  }, []);

  return (
    <div className="min-h-screen bg-opacity-90 bg-gray-100 pt-[5rem]">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="my-8 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
                User Profile
              </h1>
              <div className="flex items-center gap-2 p-2 bg-white bg-opacity-20 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm font-semibold text-white">
                  Verified
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div className="mb-4 sm:mb-0 sm:mr-4">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-semibold overflow-hidden mx-auto sm:mx-0">
                  {`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 font-semibold">
                      {user.first_name.toUpperCase()}{" "}
                      {user.last_name.toUpperCase()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-gray-400" />
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      Member since
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user.date_joined).toLocaleDateString()}
                    </dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      Membership Status
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {user.status.toUpperCase()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-gray-500" />
                  Your Complaints
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {complaints.length} Total
                </span>
              </div>
              <div className="border-t border-gray-200 overflow-y-auto h-[300px]">
                <ul className="divide-y divide-gray-200">
                  {complaints.map((complaint) => (
                    <li key={complaint.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {complaint.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              complaint.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {complaint.description}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <p>
                            Filed on{" "}
                            <time dateTime={complaint.date_created}>
                              {new Date(
                                complaint.created_at
                              ).toLocaleDateString()}
                            </time>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-gray-500" />
                  Notifications
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {notifications.length} New
                </span>
              </div>
              <div className="border-t border-gray-200 overflow-y-auto h-[300px]">
                <ul className="divide-y divide-gray-200">
                  {notifications.map((item) => (
                    <li key={item.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        {item.status.toLowerCase() === "received" ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        ) : item.status.toLowerCase() === "in_review" ? (
                          <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                        )}
                        <p className="text-sm font-medium text-gray-900">
                          {`Your complaint: ${
                            item.complaint_text
                          } is being ${item.status.replace("_", " ")}.`}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>{item.message ? item.message : "No response"}</p>
                        <p className="flex items-center">
                          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          <time dateTime={item.created_at}>
                            {new Date(item.created_at).toLocaleString()}
                          </time>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
