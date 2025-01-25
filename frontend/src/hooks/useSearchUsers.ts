import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { backend_url } from "../config";
import debounce from "lodash.debounce";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export function useSearchUser() {

  // users actually is an object which contains an array which contains arrays of our user information
  const [users, setUsers] = useState<{ user: User[] }>({ user: [] });
  const searchUserRef = useRef<HTMLInputElement>(null);

  const fetchUsers = async () => {
    const searchTerm = searchUserRef.current?.value || "";
    try {
      const response = await axios.get(`${backend_url}/api/v1/user/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          filter: searchTerm,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  useEffect(() => {
    const input = searchUserRef.current;
    if (input) {
      input.addEventListener("input", debouncedFetchUsers);
    }

    return () => {
      if (input) {
        input.removeEventListener("input", debouncedFetchUsers);
      }
    };
  }, [debouncedFetchUsers]);

  return { users, searchUserRef };
}
