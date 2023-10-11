import React, { useEffect, useState,useRef } from "react";
import UserProfileCover from "../components/UserProfileCover";
import UserDetailsSection from "../components/UserDetailsSection";
import Feeds from "../components/Feeds";
import axios from "axios";
import { useParams } from "react-router-dom";
import Friends from "../components/Friends";
const ProfilePage = () => {
  const { userId } = useParams();
  const curr = useRef(1);

  const [userDetails, setuserDetails] = useState({});
  const [friendsId, setfriendsId] = useState([]);
  const fetchUserData = async () => {
    const {
      data: { other },
    } = await axios.get(
      `http://localhost:8001/api/users/getUserDetails/${userId}`
    );
    setuserDetails(other);
    if (other.followers.length !== 0) {
      other.followers.forEach((id) => {
        if (!friendsId.includes(id)) {
          friendsId.push(id);
        }
      });
    }
    if (other.followings.length !== 0) {
      other.followings.forEach((id) => {
        if (!friendsId.includes(id)) {
          friendsId.push(id);
        }
      });
    }
    console.log(friendsId);
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);
  return (
    <div className="">
      <UserProfileCover userDetails={userDetails} />
      {localStorage.getItem("userId") === userId ? <UserDetailsSection /> : ""}
      <h1 className="text-4xl font-medium p-4">User Friends:</h1>
      <br />
      <div className="grid grid-cols-6 p-4">
        {friendsId.length !== 0 &&
          friendsId.map((id) => {
            return (
              <div>
                {console.log(id)}
                <Friends id={id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProfilePage;
