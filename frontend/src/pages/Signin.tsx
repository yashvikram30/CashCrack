import axios from 'axios';
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from '../config';

const url = backend_url;

const Signin = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signin() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // we obtain the user here
    const user = await axios.post(`${url}/api/v1/user/signin`, {

      username: email,
      password,
    });

    // we obtain the token from the user
    const token = user.data.token;

    // setting up the token in localstorage so that we can access it whenever required easily!
    localStorage.setItem("token",token);
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-screen open-sans-1234">
      <div className="bg-gray-400 min-w-screen min-h-screen -z-10"></div>
      <div className="flex flex-col justify-center items-center z-10 bg-slate-100 w-[300px] h-[400px] md:w-[600px] md:h-[700px] absolute px-4 py-1 md:px-7 md:py-2 rounded-xl">
        <h1 className="font-bold text-2xl mb-2 md:text-5xl md:mb-5">Sign In</h1>
        <p className="text-center text-sm md:text-xl">
          Enter your information to login to account
        </p>
        <div className="w-full px-5 flex flex-col justify-center mt-10 md:mt-15">
          <p className="text-sm md:text-lg mb-2">Email</p>
          <input size={40} placeholder="johndoe@example.com" ref={emailRef} className="p-2 md:p-3 text-sm md:text-md"/>
        </div>
        <div className="w-full px-5 flex flex-col justify-center mt-3 md:mt-10">
          <p className="text-md mb-2 text-sm md:text-lg">Password</p>
          <input size={40} ref={passwordRef} className="p-2 md:p-3 text-sm md:text-md"/>
        </div>

        <button
          className="text-center flex justify-center items-center bg-gray-800 text-white w-full rounded-md h-6 mt-7 md:h-12 py-4 md:mt-15 text-sm md:text-lg"
          onClick={signin}
        >
          Sign In
        </button>
        <p className="mt-2 md:mt-5 text-sm md:text-md text-center">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin
