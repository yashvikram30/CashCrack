import axios from "axios";
import userSVG from "../icons/user.svg";
import { backend_url } from "../config";
import { useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const SendMoney = () => {

  // useLocation hook enables us to obtain the details of the user we require to send the information to
  const location = useLocation();
  const { user } = location.state;

  const username = user.username;
  const userFirstName = user.firstName;
  const userLastName = user.lastName;
  console.log(user);

  const amountRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function transferMoney() {
    // this should be inside the function so that amountRef is not accessed even before the value is updated
    const amount:number = parseInt(amountRef.current?.value || '0');
    
    await axios.post(`${backend_url}/api/v1/account/transfer`, {
      to: username,
      amount : amount
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    console.log(username);
  console.log(amount);
    navigate("/dashboard");
}

  return (
    <div className="flex flex-col justify-center items-center min-w-screen open-sans-1234">
      <div className="bg-gray-400 min-w-screen min-h-screen -z-10"></div>
      <div className="flex flex-col justify-center items-center z-10 bg-slate-100 w-[300px] h-[400px] md:w-[600px] md:h-[500px] absolute px-4 py-1 md:px-7 md:py-2 rounded-xl">
        <h1 className="font-bold text-2xl mb-2 md:text-3xl md:mb-5">Transfer Amount</h1>
        <div className="text-center text-sm md:text-xl flex justify-center items-center gap-2 mt-5">
        <img
            src={userSVG}
            alt="User Icon"
            className="w-10 h-10 ml-1 text-white"
          />
          {userFirstName} {userLastName}
        </div>

        <p className="w-full p-1 text-lg mt-4">Amount (in $):</p>
        <input type="text" placeholder="Enter amount" className="p-3 w-full " ref={amountRef}/>

        <button className="text-center flex justify-center items-center bg-green-600 text-white w-full rounded-md h-6 mt-7 md:h-12 py-4 md:mt-5 text-sm md:text-lg" onClick={transferMoney} >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
