import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComplainPage from "./pages/ComplainPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";
import RegistePage from "./pages/RegistePage";
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import PasswordResetPage from "./pages/PasswordResetPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/register" element={<RegistePage />} />
            <Route
              path="/user/get-password-reset-link"
              element={<PasswordResetRequestPage />}
            />
            <Route
              path="/user/reset-password/:uidb64/:token"
              element={<PasswordResetPage />}
            />
            <Route path="/login" element={<LoginPage />} />

            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/complaints" element={<ComplainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
