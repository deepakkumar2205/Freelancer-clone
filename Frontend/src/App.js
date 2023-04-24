import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AllProjects from "./Components/AllProjects/AllProjects";
import Applied from "./Components/Applied/Applied";
import Emailverify from "./Components/Emailverify/Emailverify";
import Login from "./Components/Login/Login";
import Myprojects from "./Components/Myprojects/Myprojects";
import NavComp from "./Components/Navbar/Navbar";
import PasswordRes from "./Components/Password-Reset/PasswordRes";
import Post from "./Components/Post/Post";
import ResetPassComp from "./Components/ResetPassComp/ResetPassComp";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("x-Auth-token")) {
      navigate("/home")
    }
  }, []);

  return (
    <div className="App">
      <NavComp  />
      <Routes>
        <Route path="/login"          element={<Login />} />
        <Route path="/password-reset" element={<PasswordRes />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/post"           element={<ProtectedRoute><Post /></ProtectedRoute>}  />
        <Route path="/projects"       element={<ProtectedRoute><AllProjects /></ProtectedRoute>} />
        <Route path="/myprojects"     element={<ProtectedRoute><Myprojects /></ProtectedRoute>} />
        <Route path="/applied"        element={<ProtectedRoute><Applied /></ProtectedRoute>} />
        <Route path="/"               element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route
          path="/pas-reset-completion/:string"
          element={<ResetPassComp />}
        />
        <Route path="/emailverify/:string" element={<Emailverify />} />
      </Routes>
    </div>
  );
}

export default App;
