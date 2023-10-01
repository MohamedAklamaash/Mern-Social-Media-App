import React from 'react'

const OnlineFriends = () => {
  return (
    <div className='flex-[1] mb-4'>
      {" "}
      <div className="relative flex items-center justify-evenly ">
        <img
          src="https://avatars.githubusercontent.com/u/111295679?v=4"
          alt="Online Friend"
          className="w-16 rounded-full h-16 "
        />
        <button className="bg-green-500 w-6 h-6 rounded-full ml-[-133px] mt-[-30px] ring-2 ring-white absolute"></button>
        <span>Mohamed Aklamaash</span>
      </div>
    </div>
  );
}

export default OnlineFriends