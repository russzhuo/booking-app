import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  //When navigating with React Router, the components will be remounted, causing the `useEffect` to be triggered every time a route change occurs.
  useEffect(() => {
    console.log('useEffect userContext')
    if (!user) {
      axios.get('/user/profile').then(({ data }) => {
        setUser(data);
        console.log('set ready true')
        // console.log(data)
        setReady(true);
      });
    }
  },[]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );

}