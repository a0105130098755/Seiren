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
import MainPage from "./components/Main/MainPage";
import NavBar from "./components/Navbar/NavBar";
import BoardDetail from "./components/Board/BoardDetail";
import "./App.css";
import Charge from "./components/Charge/Charge";
import Mypage from "./components/MyPage/MyPage";
import HiringList from "./components/Job/HiringList";
import CreateHiring from "./components/Job/CreateHiring";
import HiringDetail from "./components/Job/HiringDetail";
import ChatMain from "./components/Chat/ChatMain";
import Chatting from "./components/Chat/Chatting";

function App() {
  const [board, setBoard] = useState([]);
  const [hiring, setHiring] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userBoards, setUserBoards] = useState([]);
  const [userHirings, setUserHirings] = useState([]);
  const [userApplications, setUserApplications] = useState([]);

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/recovery" element={<PasswordRecoveryEmailLookup />} />
          <Route
            path="/board"
            element={<BoardList board={board} setBoard={setBoard} />}
          />
          <Route path="/board/create" element={<CreateBoard />} />
          <Route
            path="/board/details"
            element={<BoardDetail boardContent={board} />}
          />
          <Route path="/job" element={<HiringList setHiring={setHiring} />} />
          <Route path="/job/create" element={<CreateHiring />} />
          <Route
            path="/job/details"
            element={<HiringDetail hiring={hiring} setHiring={setHiring} />}
          />
          <Route path="/charge" element={<Charge />} />
          <Route
            path="/mypage"
            element={
              <Mypage
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                boards={userBoards}
                hirings={userHirings}
                applications={userApplications}
              />
            }
          />
          <Route path="/chat" element={<ChatMain />} />
          <Route path="/chatting/:roomId" element={<Chatting />} />
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
