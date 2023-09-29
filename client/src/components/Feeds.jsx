import React from "react";
import Post from "./Post";
import UserDetailsSection from "./UserDetailsSection";

const Feeds = () => {
  return (
    <main className="flex-[7] p-3 mt-4">
      <UserDetailsSection />
      <div className=" grid grid-cols-2 max-md:grid-cols-1">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
};

export default Feeds;
