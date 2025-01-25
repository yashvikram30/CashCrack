import userSVG from "../icons/user.svg";
import { useFetchBalance } from "../hooks/useFetchBalance";
import { useFetchUser } from "../hooks/useFetchUser";
//import { useRef } from 'react';
import { useSearchUser } from "../hooks/useSearchUsers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

const Dashboard = () => {
  // using custom hooks to perform their designated tasks
  const { balance, refresh } = useFetchBalance();
  const { userFirstName } = useFetchUser();
  const { users, searchUserRef } = useSearchUser();
  const navigate = useNavigate();

  console.log(users);

  // add a useEffect here which will refresh everytime we call make a transaction
  useEffect(() => {
    refresh();
  }, [])
  

  const sendMoney = (user: User) => {
    navigate('/send', { state: { user } });
  };

  return (
    <div className="open-sans-1234">
      <nav className="bg-gray-800 px-5 md:px-20 py-3 text-slate-100 open-sans-1234 flex justify-between items-center">
        <p className="font-extrabold text-2xl md:text-4xl">CashCrack</p>
        <div className="flex justify-between items-center gap-3  text-sm md:text-xl">
          Hello, {userFirstName}
          <img
            src={userSVG}
            alt="User Icon"
            className="w-10 h-10 ml-1 text-white bg-white rounded-4xl"
          />
        </div>
      </nav>
      <main>
        <div className="flex flex-col px-20 my-20">
          <p className="font-extrabold text-gray-800 text-xl">
            Your Balance: $ {balance}
          </p>

          <div className="flex flex-col mt-20">
            <p className="font-extrabold text-gray-800 text-2xl">Users</p>
            <div>
              <input
                type="text"
                className="px-5 py-3 w-full mt-5 text-md mb-5"
                placeholder="Search Users..."
                ref={searchUserRef}
              />
            </div>
            <div>
              {users ? (
                users.user.map((user, index) => (
                  <div
                    key={index}
                    className="border-b py-2 flex items-center justify-between mb-5 text-sm md:text-lg"
                  >
                    <div>
                      <p className="font-bold">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <button className="p-2 md:p-3 bg-gray-800 text-white rounded-md hover:bg-gray-950 text-sm md:text-lg" onClick={() => sendMoney(user)}>Send Money</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
