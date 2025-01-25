import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";


const url = backend_url;

const Signup = () => {

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function signup() {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const user = await axios.post(`${url}/api/v1/user/signup`, {
      firstName,
      lastName,
      username: email,
      password,
    });
    console.log(user);
    navigate("/signin");
    alert("You have signed up!");
  }

  return (
    <div className="flex flex-col justify-center items-center min-w-screen open-sans-1234">
      <div className="bg-gray-400 min-w-screen min-h-screen -z-10"></div>
      <div className="flex flex-col justify-center items-center z-10 bg-slate-100 w-[300px] h-[500px] md:w-[600px] md:h-[700px] absolute px-4 py-1 md:px-7 md:py-2 rounded-xl">
        <h1 className="font-bold text-2xl md:text-5xl mb-2 md:mb-5">Sign Up</h1>
        <p className="text-center text-sm md:text-xl">
          Enter your information to create an account
        </p>
        <div className="w-full px-5 flex flex-col justify-center mt-4 md:mt-11">
          <p className="text-sm md:text-md md:mb-2">First Name</p>
          <input size={40} placeholder="John" ref={firstNameRef} className="p-2 md:p-3 text-sm md:text-md" />
        </div>
        <div className="w-full px-5 flex flex-col justify-center mt-3 md:mt-5">
          <p className="text-sm md:text-md mb-2">Last Name</p>
          <input size={40} placeholder="Doe" ref={lastNameRef} className="p-2 md:p-3 text-sm md:text-md" />
        </div>
        <div className="w-full px-5 flex flex-col justify-center mt-3 md:mt-5">
          <p className="text-sm md:text-md mb-2">Email</p>
          <input size={40} placeholder="johndoe@example.com" ref={emailRef} className="p-2 md:p-3 text-sm md:text-md"/>
        </div>
        <div className="w-full px-5 flex flex-col justify-center mt-3 md:mt-5">
          <p className="text-sm md:text-md mb-2">Password</p>
          <input size={40} ref={passwordRef} className="p-2 md:p-3 text-sm md:text-md"/>
        </div>

        <button
          className="flex justify-center items-center bg-gray-800 text-white w-full rounded-md h-5 mt-5 md:h-12 py-4 md:mt-7 text-sm md:text-md"
          onClick={signup}
        >
          Sign Up
        </button>
        <p className="mt-2 text-sm md:text-md">
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
