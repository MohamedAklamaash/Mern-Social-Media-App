import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import ErrorHandlingPage from "./components/ErrorHandlingPage";
const App = () => {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signUp" />
          <Route element={<ErrorHandlingPage />} path="*" />
        </Routes>
        
      </Router>
    </div>
  );
};

export default App;
