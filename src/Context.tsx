import { createContext, useState } from "react";

interface userData {
  username: string;
  profile_pic?: string;
}

export const Ctx = createContext<null | {
  userData?: userData;
  getUserData: () => void;
  setUserData: (userData: userData) => void;
}>(null);

const Context: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<undefined | userData>();

  const getUserData = () => {
    const storageUserData = localStorage.getItem("user");
    if (storageUserData) {
      const userData = JSON.parse(storageUserData);
      setUserData(userData);
    }
  };

  return (
    <Ctx.Provider value={{ getUserData, userData: userData, setUserData }}>
      {children}
    </Ctx.Provider>
  );
};

export default Context;
