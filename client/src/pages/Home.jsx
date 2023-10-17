import React,{useEffect} from 'react'
import SideBar from './SideBar';
import Feeds from '../components/Feeds';
import RightBar from './RightBar';
import {userData} from "../store/StoreSlices/userSlice";
import { useDispatch,useSelector } from 'react-redux';
import { statuses } from '../store/constants/statuses';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails , status } = useSelector((state) => state.user);
  useEffect(()=>{
    dispatch(userData());
  },[dispatch]);
  if(status === statuses.loading)
  {
    return (
      <div className="flex items-center justify-center h-[100vmin]">
        <h1 className="text-4xl text-black">Loading....</h1>
      </div>
    );
  }
  if(!localStorage.getItem("userId")){
    navigate("/login");
  }
  return (
    <div className=''>      
      <div className='flex h-[100vmin]'>
        <SideBar/>
        <Feeds/>
        <RightBar/>
      </div>
    </div>
  )
}

export default Home;