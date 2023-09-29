import React from 'react'
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import LabelIcon from "@mui/icons-material/Label";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
const UserDetailsSection = () => {
  return (
    <div>
      <section className="shadow-xl">
        <div className=" flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/111295679?v=4"
            alt="Profile Pic"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input
            type="text"
            className="text-md font-thin p-3 w-[100%] "
            placeholder="What's in your mind Aklamaash?"
          />
        </div>
        <hr className="my-4 border-t border-gray-400" />
        <div className="">
          <ul className="flex items-center justify-around h-[10vmin]">
            <li>
              <PhotoLibraryIcon className="text-orange-600  " />
              <span>Photo or Video</span>
            </li>
            <li>
              <LabelIcon className="text-blue-500 " />
              <span>Label</span>
            </li>
            <li>
              <AddLocationAltOutlinedIcon className="text-green-500" />
              <span>Location</span>
            </li>
            <li>
              <SentimentSatisfiedAltIcon className="text-yellow-700" />
              <span>Feelings</span>
            </li>
            <button className="bg-green-500 rounded-md px-2 py-2">Share</button>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default UserDetailsSection