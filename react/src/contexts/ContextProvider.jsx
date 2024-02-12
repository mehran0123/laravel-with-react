import {createContext, useContext, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const StateContext = createContext({
  user: null,
  token: null,
  msg: null,
  setUser: () => {},
  setToken: () => {},
  setMsg: () => {}
});

export const ContextProvider = ({children}) => {

  const [user,setUser] = useState({});
  const [msg ,_setMsg] = useState('');
  const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));



  const setMsg = (message) => {
    _setMsg(message);
    setTimeout(() => {
      _setMsg('');
    },5000)
  }
  const setToken = (token) => {
    _setToken(token)
    if(token){
      localStorage.setItem('ACCESS_TOKEN',token);
    }else{
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      msg,
      setUser,
      setToken,
      setMsg
    }} >
      {children}
    </StateContext.Provider>
  )
}



export const useStateContext= () => useContext(StateContext);
