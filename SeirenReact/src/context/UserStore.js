import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

const UserStore = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );
  const [isKikiMember, setIsKikiMember] = useState(
    localStorage.getItem("isKikiMember") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  useEffect(() => {
    localStorage.setItem("isKikiMember", isKikiMember);
  }, [isKikiMember]);

  return (
    <UserContext.Provider
      value={{ loginStatus, setLoginStatus, isKikiMember, setIsKikiMember }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
