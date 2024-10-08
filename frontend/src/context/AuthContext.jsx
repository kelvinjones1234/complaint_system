import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access)
      : null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
      }
    }, 17 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authTokens]);

  const loginUser = async (email, password) => {
    try {
      const response = await api.post(
        "token/",
        {
          email: email.toLowerCase(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));

        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/home-page");
      }
    } catch (error) {
      setUserError(error.response?.data?.detail || error.message);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const registerUser = async (formData) => {
    console.log("Form data to reg. in context", formData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
          email: formData.email,
          status: formData.status.toLowerCase(),
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          phone: formData.phone,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      if (error.response.data.email) {
        setUserError(error.response.data.email[0]);
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await api.post(
        "token/refresh/",
        { refresh: authTokens.refresh },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error(
        "Error refreshing token:",
        error.response ? error.response.data : error.message
      );
      logoutUser();
    }
  };

  const logoutUser = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/authentication/login");
  };

  const contextData = {
    loginUser,
    logoutUser,
    setUserError,
    registerUser,
    authTokens,
    user,
    userError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
