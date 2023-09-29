import React from "react";

const SideBarUserDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-around mb-[15px] cursor-pointer">
        <img
          src="https://avatars.githubusercontent.com/u/111295679?v=4"
          width={40}
          className="rounded-full object-cover"
          height={40}
        />
        <span>Mohamed Aklamaash</span>
      </div>
    </div>
  );
};

export default SideBarUserDetails;
