import React from "react";
import Friends from "./Friends";
import dummyLogo from "../assets/dummyLogo.jpeg";
const UserProfileCover = ({userDetails}) => {
  return (
    <div className="relative shadow-2xl mb-6">
      <img
        src={
          userDetails?.profileCover ||
          "https://c4.wallpaperflare.com/wallpaper/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg"
        }
        alt="Profile Cover"
        className="w-[100%] h-[50vmin] absolute"
      />
      <div className="flex flex-col items-center justify-evenly ">
        <img
          src={userDetails.profilePicture===" "? dummyLogo:userDetails?.profilePicture}
          alt="Profile Pic"
          className="w-36 h-36 rounded-full z-10 mt-[300px] ring-2 text-white "
        />
        <h2 className="text-lg font-semibold">{userDetails?.userName}</h2>
        <p className="text-lg">{userDetails?.desc}</p>
      </div>
      <div className="p-4">
        <div className="flex p-4 items-center justify-center">
          <h1 className="font-bold">User Information</h1>,
          <h1>
            City:
            <span className="text-lg font-semibold">
              {userDetails?.city || " "}
            </span>
          </h1>
          ,
          <h1>
            From:
            <span className="text-lg font-semibold">
              {userDetails?.from || " "}
            </span>
          </h1>
          ,
          <h1>
            Relationship:
            <span className="text-lg font-semibold">
              {userDetails?.relationShip || " "}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCover;
