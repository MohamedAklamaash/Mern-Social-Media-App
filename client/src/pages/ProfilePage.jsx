import React, { useEffect, useState, useRef } from "react";
import UserProfileCover from "../components/UserProfileCover";
import UserDetailsSection from "../components/UserDetailsSection";
import Feeds from "../components/Feeds";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useParams } from "react-router-dom";
import Friends from "../components/Friends";
import { format } from "timeago.js";
import Post from "../components/Post";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const curr = useRef(1);
  const [userPosts, setuserPosts] = useState([]);
  const [userDetails, setuserDetails] = useState({});
  const [friendsId, setfriendsId] = useState([]);
  const [isLiked, setisLiked] = useState(false);

  const LikeHandler = async (postId) => {
    // if (likes < 1) {
    //   return;
    // }
    // const { data } = await axios.put(
    //   `http://localhost:8001/api/posts/like/${postId}`,
    //   {
    //     userId,
    //   }
    // );
    // console.log(data);
    // if (data.success) {
    //   isLiked ? setlikes(likes - 1) : setlikes(likes + 1);
    //   setisLiked(!isLiked);
    //   likedBy.push(data.userName);
    // }
    // if (!data.success) {
    //   likedBy.pop(0);
    // }
  };

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
  const fetchUserPosts = async () => {
    const {
      data: { posts },
    } = await axios.get(
      `http://localhost:8001/api/posts/getuserPosts/${userId}`
    );
    console.log(posts);
    setuserPosts(posts);
  };
  useEffect(() => {
    LikeHandler();
    fetchUserPosts();
    fetchUserData();
  }, [userId]);

  return (
    <div className="">
      <UserProfileCover userDetails={userDetails} />
      {localStorage.getItem("userId") === userId ? <UserDetailsSection /> : ""}
      <h1 className="text-4xl font-medium p-4">User Friends:</h1>
      <br />
      <div className="grid md:grid-cols-6 grid-cols-2 p-4">
        {friendsId.length !== 0 &&
          friendsId.map((id) => {
            return (
              <div>
                <Friends id={id} />
              </div>
            );
          })}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        {userPosts.length !== 0 ? (
          userPosts.map((post) => {
            return (
              <div className="mt-10 shadow-xl">
                <main className=" p-4 shadow-2xl rounded-md">
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => navigate(`/profilepage/${post?.userId}`)}
                    >
                      <img
                        src={post?.profilePicture}
                        alt="Profile Pic"
                        className="w-12 h-12  rounded-full cursor-pointer"
                      />
                    </div>
                    <span className="text-lg text-bold font-semibold">
                      {post?.userName || " "}
                    </span>
                    <span>{format(post?.createdAt) || " "}</span>
                    <MoreVertIcon />
                  </div>
                  <div className="p-4"></div>
                  <p className="text-lg">{post.desc}</p>
                  <div className=" flex items-center justify-center">
                    <img src={post.img} alt="Post" className="rounded-sm" />
                  </div>
                  <div className="flex">
                    <main className="flex flex-[3] items-center justify-start gap-7 ">
                      <button onClick={() => LikeHandler(post._id)}>
                        <ThumbUpAltOutlinedIcon className="text-white bg-blue-500 rounded-full" />
                      </button>
                      <button onClick={() => LikeHandler(post._id)}>
                        <FavoriteBorderOutlinedIcon className="text-white bg-red-600 rounded-full" />
                      </button>
                      {/* {likedBy.map((liked) => {
                          return <h3>{liked}</h3>;
                        })} */}
                    </main>
                    <CommentIcon />
                    <span className="text-xl">....</span>
                  </div>
                </main>
              </div>
            );
          })
        ) : (
          <div className="flex-[2] text-4xl flex items-center justify-center h-screen">
            <h1>No post Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
