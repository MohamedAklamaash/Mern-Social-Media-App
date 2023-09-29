import React,{useState} from 'react'
import HandleProfileUpload from './HandleProfileUpload';

const LoginPage = () => {
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div>
      <main className="md:flex">
        <div className="flex-[1] flex items-center justify-center h-[100vh] text-blue-600 font-semibold text-4xl font-sans">
          Social Media
        </div>
        <div className="flex-[1] md:flex items-center flex-col justify-center h-[100vh] font-sans">
          <form>
            <HandleProfileUpload />
            <label>Enter Your Name:</label>
            <input
              onChange={(event) => setuserName(event.target.value)}
              type="text"
              placeholder="Aklamaash"
              className="w-[80%] mb-4 rounded-full p-4"
            />
            <label>Enter Your Email:</label>
            <input
              type="email"
              onChange={(event) => setemail(event.target.value)}
              placeholder="akla123@gmail.com"
              className="w-[80%] mb-4 rounded-full p-4"
            />
            <label>Enter Your Password:</label>
            <input
              onChange={(event) => setpassword(event.target.value)}
              type="password"
              placeholder="pass"
              className="w-[80%] mb-4 rounded-full p-4"
            />
            <button type="submit" className="p-4 text-lg font-sans rounded-full ml-[350px]">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage