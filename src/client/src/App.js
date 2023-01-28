import React, { useState, createContext } from "react";
import "./input.css";
import { Signup, Signin } from "./components";

const UserContext = createContext(undefined);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(true);
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, setRegister }}>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
        {loggedIn ? (
          <button className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-56">
            Create Character
          </button>
        ) : register ? (
          <Signup />
        ) : (
          <Signin />
        )}
      </div>
    </UserContext.Provider>
  );
}

export { App, UserContext };
