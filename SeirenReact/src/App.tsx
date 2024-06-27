import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import PasswordRecoveryEmailLookup from "./components/Recovery/PasswordRecoveryEmailLookup";
import BoardList from "./components/Board/BoardList";
import CreateBoard from "./components/Board/CreateBoard";
import EditBoard from "./components/Board/EditBoard";
import MainPage from "./components/Main/MainPage";
import NavBar from "./components/Navbar/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./components/context/AuthProvider";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
      <AuthProvider>
        <Router>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route
                path="/recovery"
                element={<PasswordRecoveryEmailLookup />}
              />
              <Route path="/board" element={<BoardList />} />
              <Route path="/board/create" element={<CreateBoard />} />
              <Route path="/board/edit/:id" element={<EditBoard />} />
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
