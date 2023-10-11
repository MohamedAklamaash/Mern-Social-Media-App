import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import ErrorHandlingPage from "./components/ErrorHandlingPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { Provider } from "react-redux";
import store from "./store/store";
const App = () => {
  
  return (
    <div className="">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signUp" />
            <Route element={<ErrorHandlingPage />} path="*" />
            <Route element={<ChatPage/>} path="/chat"/>
            <Route element={<ProfilePage />} path="/profilepage/:userId" />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
