import React, { useState } from "react";
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
import BoardDetail from "./components/Board/BoardDetail";
import "./App.css";

function App() {
  const [board, setBoard] = useState([]);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/recovery" element={<PasswordRecoveryEmailLookup />} />
          <Route
            path="/board"
            element={<BoardList board={board} setBoard={setBoard} />}
          />
          <Route path="/board/create" element={<CreateBoard />} />
          <Route path="/board/edit/:id" element={<EditBoard />} />
          <Route
            path="/board/details"
            element={<BoardDetail boardContent={board} />}
          />
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
