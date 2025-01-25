import axios from "axios";
import { backend_url } from "../config";
import { useState } from "react";

export function useFetchUser() {
  const [userFirstName, setUserFirstName] = useState("User");

  axios.get(`${backend_url}/api/v1/user/details`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setUserFirstName(response.data.firstName);
    })
    .catch((error) => {
      console.log("Error occurred: ", error);
    });

    return {userFirstName};
}
