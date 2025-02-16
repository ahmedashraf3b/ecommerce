import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [email, setemail] = useState()
  const [UserLogin, setUserLogin] = useState(
    localStorage.getItem("UserToken") ? localStorage.getItem("UserToken") : null
  );

  
  return (
    <UserContext.Provider value={{ UserLogin, setUserLogin,setemail,email }}>
      {props.children}
    </UserContext.Provider>
  );
}
