import React from "react";
import OnlineFriends from "../components/OnlineFriends";
import Conversation from "../components/Conversation";
import Messages from "../components/Messages";

const ChatPage = () => {
  return (
    <div className="h-[100vmin] flex">
      <div className="flex-[1] p-3">
        <input
          type="text"
          placeholder="Search For friends"
          className="border-b-2  border-black px-10 py-2  "
        />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <div className="flex-[2] p-3 items-end">
        <Messages own={true} />
        <Messages own={false} />
        <Messages own={true} />
        <Messages own={true} />
        <Messages own={true} />
        <Messages own={false} />

        <div className="flex items-center">
          <textarea
            placeholder="Write Something"
            className="p-4 h-[30vh] w-[70vh]"
          />
          <button className="p-4 bg-blue-500 text-white rounded-lg font-semibold">
            Send
          </button>
        </div>
      </div>
      <div className="flex-[1] p-3">
        <span className="text-black font-bold text-2xl ">Online Friends</span>
        <OnlineFriends />
        <OnlineFriends />
        <OnlineFriends />
        <OnlineFriends />
      </div>
    </div>
  );
};

export default ChatPage;
