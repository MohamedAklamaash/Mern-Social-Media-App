import React,{useState} from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
const Post = () => {
  const [likes, setlikes] = useState(1);
  const [isLiked, setisLiked] = useState(false);
  const LikeHandler = ()=>{
    if(likes<1)
    {
      return;
    }
    isLiked?setlikes(likes-1):setlikes(likes+1);
    setisLiked(!isLiked);
  }
  return (
    <div>
      <div className="mt-10 shadow-xl">
        <main className=" p-4 shadow-2xl rounded-md">
          <div className="flex items-center justify-between">
            <img
              src="https://avatars.githubusercontent.com/u/111295679?v=4"
              alt="Profile Pic"
              className="w-12 h-12  rounded-full"
            />
            <span className="text-lg text-bold font-semibold">
              Mohamed Aklamaash
            </span>
            <span> 5 mins ago</span>
            <MoreVertIcon />
          </div>
          <div className="p-4"></div>
          <p className="text-lg">Hey ! It's my First Post</p>
          <div className=" flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/111295679?v=4"
              alt="Post"
              className="rounded-sm"
            />
          </div>
          <div className="flex">
            <main className="flex flex-[3] items-center justify-start gap-7 ">
              <button onClick={LikeHandler}>
                <ThumbUpAltOutlinedIcon className="text-white bg-blue-500 rounded-full" />
              </button>
              <button onClick={LikeHandler}>
                <FavoriteBorderOutlinedIcon className="text-white bg-red-600 rounded-full" />
              </button>
              {likes} people Liked It!
            </main>
            <CommentIcon />
            <span className="text-xl">....</span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Post