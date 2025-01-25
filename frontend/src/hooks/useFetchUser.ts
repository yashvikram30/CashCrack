import axios from "axios";
import { backend_url } from "../config";
import { useState } from "react";

export function useFetchUser() {
  const [userFirstName, setUserFirstName] = useState("User");
  const [userLastName, setUserLastName] = useState("User");
  const [username, setUsername] = useState("User");

  axios.get(`${backend_url}/api/v1/user/details`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setUserFirstName(response.data.firstName);
      setUserLastName(response.data.lastName);
      setUsername(response.data.username);
    })
    .catch((error) => {
      console.log("Error occurred: ", error);
    });

    return {username,userFirstName,userLastName};
}
