import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import ProfilePage from "../pages/ProfilePage";
import {useNavigate} from "react-router-dom";
const Post = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [likes, setlikes] = useState(1);
  const [postedUserDetails, setpostedUserDetails] = useState([]);
  const [likedBy, setlikedBy] = useState([]);
  const [isLiked, setisLiked] = useState(false);
  const [posts, setposts] = useState([]);
  const getAllPosts = async () => {
    const { data } = await axios.get(
      `http://localhost:8001/api/posts/getAllPosts/${userId}`
    );
    setposts(data);

    const postedUserDetails = await Promise.all(
      data.map(async (d) => {
        const { data } = await axios.get(
          `http://localhost:8001/api/users/getUserDetails/${d.userId}`
        );
        return data.other;
      })
    );

    setpostedUserDetails(postedUserDetails);
    console.log(postedUserDetails);
  };

  const LikeHandler = async (postId) => {
    if (likes < 1) {
      return;
    }
    const { data } = await axios.put(
      `http://localhost:8001/api/posts/like/${postId}`,
      {
        userId,
      }
    );
    console.log(data);
    if (data.success) {
      isLiked ? setlikes(likes - 1) : setlikes(likes + 1);
      setisLiked(!isLiked);
      likedBy.push(data.userName);
    }
    if(!data.success)
    {
      likedBy.pop(0);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  if (posts.length === 0 || postedUserDetails?.length === 0) {
    return (
      <div className="h-screen text-4xl flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div className="mt-10 shadow-xl">
            <main className=" p-4 shadow-2xl rounded-md">
              <div className="flex items-center justify-between">
                <div onClick={()=>navigate(`/profilepage/${postedUserDetails[i]?._id}`)}>
                  <img
                    src={postedUserDetails[i]?.profilePicture}
                    alt="Profile Pic"
                    className="w-12 h-12  rounded-full"
                  />
                </div>
                <span className="text-lg text-bold font-semibold">
                  {postedUserDetails[i]?.userName || " "}
                </span>
                <span> 5 mins ago</span>
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
                  {likedBy.map((liked) => {
                    return <h3>{liked}</h3>;
                  })}
                </main>
                <CommentIcon />
                <span className="text-xl">....</span>
              </div>
            </main>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
