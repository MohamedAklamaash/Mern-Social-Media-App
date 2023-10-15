import React, { useState, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link, useNavigate } from "react-router-dom";
import dummyLogo from "../assets/dummyLogo.jpeg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const loadCounter = useRef(0);
  const { profileUrl } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [keyword, setkeyword] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/search?keyword=${keyword}`);
    setkeyword("");
  };
  return (
    <div>
      <header className="p-3 bg-blue-600 h-[7vmin] flex items-center justify-between text-white font-semibold max-md:hidden ">
        <div>
          <h1 className="text-xl cursor-pointer" onClick={() => navigate("/")}>
            Social-Media
          </h1>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for friends posts or video"
            className="rounded-full w-[450px] pl-3 pr-10 py-2 text-black"
            onChange={(ev) => {
              setkeyword(ev.target.value);
            }}
            value={keyword}
            onKeyDown={(event) => {
              const keycode = event.keyCode;
              if (keycode === 13) {
                handleClick();
              }
            }}
          />
          <SearchOutlinedIcon
            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-black cursor-pointer"
            onClick={handleClick}
          />
        </div>
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <h1>HomePage</h1>
          <h1>TimeLine</h1>
        </div>
        <div className="flex items-center md:gap-2 relative ">
          <Link to="/login">
            <PersonIcon className="cursor-pointer" />
          </Link>
          <span className="bg-red-600 rounded-full w-[1.4rem] h-[1.4rem] text-center  text-white absolute mb-6 ml-12">
            2
          </span>
          <Link to="/chat">
            <ChatIcon className="cursor-pointer" />
          </Link>
          <span className="bg-red-600 rounded-full w-[1.4rem] h-[1.4rem] text-center  text-white absolute mb-6 ml-12">
            2
          </span>
          <NotificationsActiveIcon className="cursor-pointer" />
          <span className="bg-red-600 rounded-full w-[1.4rem] h-[1.4rem] text-center  text-white absolute mb-6 ml-20">
            2
          </span>
        </div>
        <div>
          <img
            src="https://avatars.githubusercontent.com/u/111295679?v=4"
            alt="Profile Pic"
            onClick={() => navigate(`/profilePage/${userId}`)}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
