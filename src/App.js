import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import MainPage from "./Pages/MainPage";

import Profile from "./Pages/Profile";
import Question from "./Pages/Question";
import CreatePage from "./Pages/CreatePage";
import EditPage from "./Pages/EditPage";
import Login from "./Pages/Login";

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
          <Route path="/create/:date" element={<CreatePage />} />
          <Route path="/edit/:date" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
