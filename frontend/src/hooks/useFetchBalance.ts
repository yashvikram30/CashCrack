import { useEffect, useState } from "react";
import { backend_url } from "../config";
import axios from "axios";


export function useFetchBalance(){
    // this will store the balance of the user
    const [balance,setBalance] = useState(0);
    
    // this function will be used to fetch the balance of the user and is refreshed everytime some kind of changes are made
    function refresh(){
        axios.get(`${backend_url}/api/v1/account/balance`,{
            headers:{
                "Authorization" : localStorage.getItem("token"),
            }
        }).then((response)=>{
            // backend endpoints actually returns {user:username, balance: balance}, there we need to call response.data.balance
            setBalance(response.data.balance); 

        }).catch((error)=>{
            console.log("Error occurred: ",error);
        })
    }

    // we use useEffect here because we are required to make changes whenever money is transfered to a user! 
    useEffect(() => {
      refresh(); 
    }, []); // empty dependency array shows that the refresh function is only called on initial render

    return {  balance, refresh };
    // the balance will return the balance in the initial render
    // we will call useEffect hook on refresh so that we can fetch balance whenever any money is sent
}