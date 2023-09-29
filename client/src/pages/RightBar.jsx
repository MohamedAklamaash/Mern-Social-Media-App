import React from "react";
import GiftPic from "../assets/GiftPic.jpg";
import OnlineFriends from "../components/OnlineFriends";

const RightBar = () => {
  return (
    <div className="flex-[2.3] h-[100vmin] ">
      <main>
        <main className="flex items-center">
          <img src={GiftPic} alt="Gift Pic" className="w-24 h-24 " />
          <p>
            <span className="font-bold">Mohamed Ehsan </span> and{" "}
            <span className="font-bold">3 others </span> are celebrating their
            birthday today
          </p>
        </main>
        <main>
          <img
            src="https://images.unsplash.com/photo-1555817129-2fa6b81bd8e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Friend's Pic"
            className="h-[40vmin] w-[40vmin]"
          />
        </main>
        <main className="h-[60vmin] overflow-y-scroll scroll-mb-1">
          <p className="font-bold text-lg">Online Friends</p>
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
          <OnlineFriends />
        </main>
      </main>
    </div>
  );
};

export default RightBar;
