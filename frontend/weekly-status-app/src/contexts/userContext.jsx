import { createContext, useContext, useEffect, useState } from "react";
import { getLocalstorage, setLocalStorage } from "../helpers";

const userContext = createContext();

setLocalStorage("user", { empId: 2});

const UserContextProvoder = ({ children }) => {
  const [user, setUser] = useState({ empId: null });

  useEffect(() => {
    setUser(getLocalstorage("user"));
  }, []);

  console.log(user);
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw Error("userUser must be in userContextProvider");
  }
  return context;
};

export { UserContextProvoder, useUser };
