import React from 'react'
import RssFeedOutlined from '@mui/icons-material/RssFeedOutlined';
import Chat from '@mui/icons-material/Chat';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Groups2Icon from "@mui/icons-material/Groups2";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import SideBarUserDetails from '../components/SideBarUserDetails';
const SideBar = () => {
  return (
    <div className="flex-[2] overflow-y-auto ">
      <div className="p-[20px] text-lg ">
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <RssFeedOutlined />
            <span className="ml-5">Feed</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <Chat />
            <span className="ml-5">Chat</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <PlayCircleOutlineIcon />
            <span className="ml-5">Videos</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <Groups2Icon />
            <span className="ml-5">Groups</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <BookmarkIcon />
            <span className="ml-5">Bookmark</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <HelpOutlineIcon />
            <span className="ml-5">Questions</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <WorkOutlineOutlinedIcon />
            <span className="ml-5">Jobs</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <EventIcon />
            <span className="ml-5">Events</span>
          </li>
        </ul>
        <ul className="p-4 cursor-pointer">
          <li className="flex items-center justify-start ">
            <SchoolIcon />
            <span className="ml-5">Courses</span>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <button className="text-lg font-sans bg-gray-300 p-2 ">
          Show more
        </button>
        <hr className=" " />
      </div>
      <div className="mt-5">
        <SideBarUserDetails />
        <SideBarUserDetails />
        <SideBarUserDetails />
        <SideBarUserDetails />
        <SideBarUserDetails />
      </div>
    </div>
  );
}

export default SideBar