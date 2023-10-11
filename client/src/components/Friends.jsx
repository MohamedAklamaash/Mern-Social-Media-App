import React from 'react'

const Friends = ({details}) => {
  return (
    <div className="mb-4">
      <div className="relative flex items-center justify-start gap-3 ">
        <img
          src="https://avatars.githubusercontent.com/u/111295679?v=4"
          alt="Online Friend"
          className="w-16 rounded-full h-16 "
        />
        <span>Mohamed Aklamaash</span>
      </div>
    </div>
  );
}

export default Friends