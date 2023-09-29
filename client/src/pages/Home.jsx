import React from 'react'
import SideBar from './SideBar';
import Feeds from '../components/Feeds';
import RightBar from './RightBar';
const Home = () => {
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