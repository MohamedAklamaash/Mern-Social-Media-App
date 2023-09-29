import React from "react";
import Post from "./Post";
import UserDetailsSection from "./UserDetailsSection";
import UserProfileCover from "./UserProfileCover";

const Feeds = () => {
  return (
    <main className="flex-[7] p-3 mt-4">
      <UserProfileCover />
      <UserDetailsSection />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </main>
  );
};

export default Feeds;
