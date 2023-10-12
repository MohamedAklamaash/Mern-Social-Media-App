import React,{useState,useEffect} from 'react'
import axios from "axios";
import dummyLogo from "../assets/dummyLogo.jpeg";
import { useNavigate } from 'react-router-dom';
const Friends = ({id}) => {
  const [userDetail, setuserDetail] = useState({});
  const navigate = useNavigate();
  const userDetails = async()=>{
    const {
      data: { other },
    } = await axios.get(
      `http://localhost:8001/api/users/getUserDetails/${id}`
    );
    setuserDetail(other);
  }
  useEffect(()=>{
    userDetails();
  },[id]);
  return (
    <div className="mb-4 ">
      <div className="relative flex items-center justify-start gap-3 ">
        <div
          onClick={() =>
            navigate(
              `/profilepage/${id}`
            )
          }
        >
          <img
            src={dummyLogo || userDetail?.profileCover}
            alt="Online Friend"
            className="w-16 rounded-full h-16 cursor-pointer"
          />
        </div>
        <span>{userDetail?.userName || " "}</span>
      </div>
    </div>
  );
}

export default Friends