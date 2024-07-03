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
import BackButton from "./components/BackButton";
import HiringList from "./components/Job/HiringList";
import CreateHiring from "./components/Job/CreateHiring";
import JobDelete from "./components/Job/JobDelete";
import HiringDetail from "./components/Job/HiringDetail.";

interface HiringDTO {
  id: number;
  title: string;
  nickname: string;
  content: string;
  current: number;
  max: number;
  location: string | null;
  profile: string;
}

function App() {
  const [board, setBoard] = useState([]);
  const [hiring, setHiring] = useState<HiringDTO | null>(null);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <BackButton />
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
          <Route path="/job/create" element={<CreateHiring />} /> {/* 변경됨 */}
          <Route
            path="/job/details"
            element={<HiringDetail hiringContent={hiring} />}
          />
          <Route path="/job/delete/:jobId" element={<JobDelete />} />
          <Route path="/charge" element={<Charge />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
