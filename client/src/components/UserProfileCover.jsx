import React from "react";
import Friends from "./Friends";

const UserProfileCover = () => {
  return (
    <div className="relative shadow-2xl mb-6">
      <img
        src="https://c4.wallpaperflare.com/wallpaper/384/818/513/himalayas-mountains-landscape-nature-wallpaper-preview.jpg"
        alt="Profile Cover"
        className="w-[100%] h-[50vmin] absolute"
      />
      <div className="flex flex-col items-center justify-evenly ">
        <img
          src="https://avatars.githubusercontent.com/u/111295679?v=4"
          alt="Profile Pic"
          className="w-36 h-36 rounded-full z-10 mt-[300px] ring-2 text-white "
        />
        <h2 className="text-lg font-semibold">Mohamed Aklamaash</h2>
        <p className="text-lg">Hello My Friends</p>
      </div>
      <div className="p-4">
        <div className="flex p-4 items-center justify-center">
          <h1 className="font-bold">User Information</h1>,
          <h1>
            City:<span className="text-lg font-semibold">Coimbatore</span>
          </h1>
          ,
          <h1>
            From:<span className="text-lg font-semibold">Mettupalayam</span>
          </h1>
          ,
          <h1>
            Relationship:
            <span className="text-lg font-semibold">Single</span>
          </h1>
        </div>
        <h1 className="text-4xl font-medium">User Friends</h1>
        <div className="grid md:grid-cols-3 grid-cols-2 ">
          <Friends />
          <Friends />
          <Friends />
          <Friends />
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCover;
