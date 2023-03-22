import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";
import { Register, Login, Home, NotFound } from "./pages";

const UserContext = createContext(undefined);

function App() {
  const [login, setLoggedIn] = useState(false);
  const [, setRegister] = useState(false);
  return (
    <UserContext.Provider value={{ login, setLoggedIn, setRegister }}>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gray-100 bg-[url('/src/assets/hero.jpg')] bg-cover">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
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
