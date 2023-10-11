import React, { useEffect, useState } from "react";
import UserProfileCover from "../components/UserProfileCover";
import UserDetailsSection from "../components/UserDetailsSection";
import Feeds from "../components/Feeds";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Friends from "../components/Friends";
const ProfilePage = () => {
  const { userId } = useParams();

  const [userDetails, setuserDetails] = useState({});
  const [friendsId, setfriendsId] = useState([]);
  const fetchUserData = async () => {
    const {
      data: { other },
    } = await axios.get(
      `http://localhost:8001/api/users/getUserDetails/${userId}`
    );
    setuserDetails(other);
    setfriendsId([...other.followers])
    console.log(friendsId);
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);
  return (
    <div>
      <UserProfileCover userDetails={userDetails} />
      {localStorage.getItem("userId") === userId ? <UserDetailsSection /> : ""}
      {/* {friendsId.length !==0 && friendsId.map((friendId)=>{
        return(
          <Friends id={friendId}/>
        )
      })} */}
    </div>
  );
};

export default ProfilePage;
