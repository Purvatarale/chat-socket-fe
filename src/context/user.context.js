import { createContext, useContext, useEffect, useState } from "react";
import request from "../utils/request";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [categories, setCategories] = useState(null);
  
  const fetchUser = async () => {
    try {
      const response = (await request.get(`/whoami`)).data;
      console.log(response)
      setUser({
        email: response.email,
        name: response.name,
      })
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await request.get("categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch chat categories:", error);
    }
  };

  useEffect(() => {
    fetchUser(); 
    fetchCategories();
  }, []); 

  useEffect(()=>{
    if(categories) setUser({...user, categories})
  }, [categories])

  return (
    <UserContext.Provider value={user}>
      { user ? children : <div className="w-full h-full flex justify-center items-center animate-pulse rounded-md bg-primary/10">Loading...</div> }
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);