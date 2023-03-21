import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";
import { Register, Login, Home } from "./pages";

const UserContext = createContext(undefined);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, setRegister }}>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100">
        {/* Replace with react route
        {loggedIn ? (
          <button className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-56">
            Create Character
          </button>
        ) : register ? (
          <Register />
        ) : (
          <Login />
        )} */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export { App, UserContext };
