import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./input.css";
import { Register, Login, Home, NotFound } from "./pages";

const UserContext = createContext(undefined);

function App() {
  const [login, setLoggedIn] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [, setRegister] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        login,
        setLoggedIn,
        setRegister,
        setAuthenticated,
      }}
    >
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
