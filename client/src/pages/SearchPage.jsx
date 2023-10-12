import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import dummyLogo from "../assets/dummyLogo.jpeg";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchDetails, setsearchDetails] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  console.log("Keyword:", keyword);
  const handleSearch = async () => {
    const {
      data: { details },
    } = await axios.get(
      `http://localhost:8001/api/users/search?keyword=${keyword}`
    );
    console.log(details);
    setsearchDetails(details);
  };
  useEffect(() => {
    handleSearch();
  }, [keyword]);
  return (
    <div className="p-4 ">
      <div className="grid grid-cols-3">
        {searchDetails.map((detail) => {
          return (
            <main className="mb-4 flex flex-col items-center justify-around">
              <div className="flex items-center justify-around">
                <p className="text-lg font-sans">{detail?.userName}</p>
                <img
                  src={
                    detail?.profilePicture === " "
                      ? dummyLogo
                      : detail?.profilePicture
                  }
                  onClick={()=>navigate(`/profilepage/${detail?._id}`)}
                  className="rounded-full w-12 h-12 cursor-pointer"
                />
                <button className="p-2 ">Follow </button>
              </div>
              <div>
                <p className="text-lg font-sans">{detail?.desc || " "}</p>
              </div>
            </main>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
