import React, { useEffect, useState, useRef } from "react";
import OnlineFriends from "../components/OnlineFriends";
import Conversation from "../components/Conversation";
import Messages from "../components/Messages";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:7001");

const ChatPage = () => {
  const { userDetails } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currChat, setCurrChat] = useState([]);
  const [conversationId, setconversationId] = useState("");
  const [msgtosendtoSocket, setmsgtosendtoSocket] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [arrivalChat, setarrivalChat] = useState([]);
  const [newMsg, setnewMsg] = useState("");
  const scrollRef = useRef();

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

  const userId = localStorage.getItem("userId");

  const getMessages = async () => {
    try {
      if (conversationId) {
        const res = await axios.get(
          `http://localhost:8001/api/chat/conversation/${conversationId}`
        );
        const messagesArray = Object.keys(res.data).map((key) => res.data[key]);
        setMessages(messagesArray[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewMessages = async (e) => {
    try {
      if (conversationId === "") {
        alert("Select any user to send a message!");
        return;
      }
      const senderId = localStorage.getItem("userId");
      const newMessage = await axios.post(
        "http://localhost:8001/api/chat/sendChat",
        {
          conversationId,
          senderId,
          text: newMsg,
        }
      );
      setmsgtosendtoSocket(newMsg);
      setnewMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConvos();
  }, []); // Run once on component mount

  useEffect(() => {
    getMessages();
  }, [conversationId]); // Run when conversationId changes

  const handleMessages = (convo) => {
    setCurrChat(convo.members);
    setconversationId(convo._id);
  };
  const receiverId = currChat.filter((user) => user !== userId)[0];
  useEffect(() => {
    socket.emit("addUser", { userId });
    const msg = {
      userId,
      msgtosendtoSocket,
      receiverId,
    };
    socket.emit("send_message",msg);
    socket.on("receive_message",(data)=>{
      setarrivalChat(data);
    });
  }, [msgtosendtoSocket]);

  useEffect(()=>{
    console.log(currChat);
    console.log(arrivalChat);
    arrivalChat &&
      currChat?.includes(arrivalChat.userId) &&
      setMessages((prev) => [...prev, arrivalChat]);//userId here is actually sender's id
    console.log(messages);
  },[arrivalChat,currChat]);

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
        {messages.length !== 0 ? (
          messages.map((c) => {
            return (
              <>
                <div ref={scrollRef}>
                  <Messages
                    message={c}
                    own={localStorage.getItem("userId") === c?.senderId}
                  />
                </div>
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
            value={newMsg}
            onChange={(event) => setnewMsg(event.target.value)}
          />
          <button
            className="p-4 bg-blue-500 text-white rounded-lg font-semibold"
            onClick={handleNewMessages}
          >
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
