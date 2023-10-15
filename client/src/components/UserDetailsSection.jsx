import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import LabelIcon from "@mui/icons-material/Label";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import dummyLogo from "../assets/dummyLogo.jpeg";
import axios from "axios";
import { format } from "timeago.js";
const UserDetailsSection = () => {
  const [userDetails, setuserDetails] = useState({});
  const userId = localStorage.getItem("userId");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [date, setdate] = useState("");
  const [image, setimage] = useState("");
  const [desc, setdesc] = useState("");
  const [loading, setloading] = useState(false);
  const [imgUrl, setimgUrl] = useState("");
  const handleUploadImage = async () => {
    if (image === "") {
      return;
    }
    try {
      setloading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "eenfugkp");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duhkiwuqq/image/upload",
        data
      );
      const imageUrl = response?.data?.secure_url;
      setimgUrl(imageUrl);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const reqLocation = async () => {
    const loc = navigator.geolocation.getCurrentPosition((pos) => {
      setlatitude(pos.coords.latitude);
      setlongitude(pos.coords.longitude);
      setdate(format(pos.timestamp));
    });
    console.log(latitude,longitude);
  };
  const uploadPost = async () => {
    const { data } = await axios.post(
      `http://localhost:8001/api/posts/createPost`,
      {
        img: imgUrl,
        userId,
        desc,
        // latitude,
        // longitude,
        // createdAt:date
      }
    );
    console.log(data);
  };
  useEffect(() => {
    reqLocation();
  }, []);
  return (
    <div>
      <section className="shadow-xl p-3">
        <div className=" flex items-center">
          <img
            src={dummyLogo || userDetails?.profilePicture}
            alt="Profile Pic"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input
            type="text"
            className="text-md font-thin p-3 w-[100%] "
            placeholder="What's in your mind?"
            onChange={(event) => setdesc(event.target.value)}
          />
        </div>
        <hr className="my-4 border-t border-gray-400" />
        <div className=" ">
          <ul className="flex items-center justify-around h-[10vmin]">
            <li className="">
              <PhotoLibraryIcon className="text-orange-600  " />
              <span className="relative">Photo or Video</span>
              <div className="absoulte  z-10 ">
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg,.mkv,.svg"
                  className=" mr-2 "
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setimage(file);
                    } else {
                      alert("Error in uploading the image");
                    }
                  }}
                  onClick={handleUploadImage}
                />
              </div>
            </li>
            <li>
              <LabelIcon className="text-blue-500 " />
              <span>Label</span>
            </li>
            <li className="flex flex-col">
              <main>
                <AddLocationAltOutlinedIcon className="text-green-500" />
                <span>Location</span>
              </main>
              <button onClick={reqLocation} className="border border-b-2 ">
                Tap to Add Your Location to the Post
              </button>
            </li>
            <li>
              <SentimentSatisfiedAltIcon className="text-yellow-700" />
              <span>Feelings</span>
            </li>
            <button
              className="bg-green-500 rounded-md px-2 py-2"
              onClick={uploadPost}
            >
              Share
            </button>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UserDetailsSection;
