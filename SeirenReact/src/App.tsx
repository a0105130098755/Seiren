import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import OAuth2RedirectHandler from "./components/Login/OAuth2RedirectHandler";
import PasswordRecoveryEmailLookup from "./components/Recovery/PasswordRecoveryEmailLookup"; // 통합 컴포넌트 추가
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/oauth2/redirect"
              element={<OAuth2RedirectHandler />}
            />
            <Route path="/recovery" element={<PasswordRecoveryEmailLookup />} />{" "}
            {/* 통합 라우트 */}
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
