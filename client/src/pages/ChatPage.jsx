import React, { useEffect, useState } from "react";
import OnlineFriends from "../components/OnlineFriends";
import Conversation from "../components/Conversation";
import Messages from "../components/Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currChat, setCurrChat] = useState(null);
  const [convoId, setConvoId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchConvos = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        `http://localhost:8001/api/chat/convo/${userId}`
      );
      if (typeof res.data === "object") {
        const conversationArray = Object.keys(res.data).map(
          (key) => res.data[key]
        );
        setConversations(conversationArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      if (convoId) {
        const res = await axios.get(
          `http://localhost:8001/api/chat/conversation/${convoId}`
        );
        const messagesArray = Object.keys(res.data).map((key) => res.data[key]);
        setMessages(messagesArray[0]);
        console.log(messagesArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConvos();
  }, []); // Run once on component mount

  useEffect(() => {
    getMessages();
  }, [convoId]); // Run when convoId changes

  const handleMessages = (convo) => {
    setCurrChat(true);
    setConvoId(convo._id);
  };
  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-[100vh] w-[100%] font-mono text-4xl">
        <h1>Login Or SignUp!</h1>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }
  return (
    <div className="h-[100vmin] flex">
      <div className="flex-[1] p-3">
        <input
          type="text"
          placeholder="Search For friends"
          className="border-b-2  border-black px-10 py-2  "
        />
        {conversations.map((convo) => {
          return (
            <div onClick={() => handleMessages(convo)}>
              <Conversation conversation={convo} />
            </div>
          );
        })}
      </div>
      <div className="flex-[2] p-3 items-end">
        {currChat && messages.length!==0 ? (
          messages.map((c) => {
            return (
              <>
                <Messages
                  message={c}
                  own={localStorage.getItem("userId") === c?.senderId}
                />
              </>
            );
          })
        ) : (
          <span>Open up a new Conversation</span>
        )}

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
