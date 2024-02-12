import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import MainPage from "./Pages/MainPage";
import Login from "./components/Login";
import Profile from "./Pages/Profile";
import Question from "./Pages/Question";
import CreatePage from "./Pages/CreatePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/question/:date" element={<Question />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
