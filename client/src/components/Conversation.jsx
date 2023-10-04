import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation }) => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== userId);
    if (friendId) {
      axios
        .get(`http://localhost:8001/api/users/getUserDetails/${friendId}`)
        .then((res) => {
          setUser(res.data.other);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [conversation, userId]);

  if (user === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <main className="flex mr-3 mt-10">
        <img
          src={
            user.profilePicture === " "
              ? "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
              : user.profilePicture
          }
          alt="Profile Pic"
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <span>{user.userName}</span>
      </main>
    </div>
  );
};

export default Conversation;
