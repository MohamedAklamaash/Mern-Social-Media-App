import React, { useState, useEffect } from "react";
import axios from "axios";
import { setUserData } from "../store/StoreSlices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const [password, setpassword] = useState("");
  const HandleLogin = async () => {
    try {
        const res = await axios.post("http://localhost:8001/api/users/loginUser",{
          email,
          password
        });
        const data = res.data;
        dispatch(setUserData(data.user));
        localStorage.setItem("userId",data.user._id);
        navigate("/")
    } catch (error) {
      
    }
  };

  useEffect(()=>{
    HandleLogin();
  },[])

  return (
    <div>
      <main className="flex">
        <div className="flex-[1] flex items-center justify-center h-[100vh] text-blue-600 font-semibold text-4xl font-sans">
          Social Media
        </div>
        <div className="flex-[1] flex items-center flex-col justify-center h-[100vh] font-sans">
          <form>
            <label>Enter Your Email:</label>
            <input
              type="email"
              placeholder="akla123@gmail.com"
              className="w-[80%] mb-4 rounded-full p-4"
              onChange={(event) => setemail(event.target.value)}
            />
            <label>Enter Your Password:</label>
            <input
              type="password"
              placeholder="pass"
              className="w-[80%] mb-4 rounded-full p-4"
              onChange={(event) => setpassword(event.target.value)}
            />
          </form>
          <button
            type="button"
            className="p-4 text-lg font-sans rounded-full"
            onClick={HandleLogin}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
