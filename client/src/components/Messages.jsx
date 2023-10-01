import React from "react";

const Messages = ({ own }) => {
  return (
    <div className={`mt-10 flex flex-col ${own ? "items-end" : "items-start"}`}>
      <main className="flex">
        <img
          src="https://avatars.githubusercontent.com/u/111295679?v=4"
          alt="Profile Pic"
          className="rounded-full mr-4 max-w-sm max-h-12"
        />
        <p
          className={` p-4 rounded-full max-w-sm text-white font-semibold ${
            own ? "self-end bg-gray-400" : "self-start bg-blue-500"
          }`}
        >
          This is test message
        </p>
      </main>
      <span>1 hr ago</span>
    </div>
  );
};

export default Messages;
