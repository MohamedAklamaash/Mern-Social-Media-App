import React from 'react'

const SignupPage = () => {
  return (
    <div>
      {" "}
      <main className="flex">
        <div className="flex-[1] flex items-center justify-center h-[100vh] text-blue-600 font-semibold text-4xl font-sans">
          Social Media
        </div>
        <div className="flex-[1] flex items-center flex-col justify-center h-[100vh] font-sans">
          <form>
            <label>Enter Your Email:</label>
            <input
              type="email"
              placeholder="akla123@gmail.com"
              className="w-[80%] mb-4 rounded-full p-4"
            />
            <label>Enter Your Password:</label>
            <input
              type="password"
              placeholder="pass"
              className="w-[80%] mb-4 rounded-full p-4"
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignupPage