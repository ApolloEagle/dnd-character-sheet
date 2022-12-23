import React from "react";
import "./input.css";
import { Info, AbilityScores, Speed } from "./components";

function App() {
  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen">
      <Info />
      <div className="flex flex-row justify-around items-center w-full">
        <AbilityScores />
        <Speed />
      </div>
    </div>
  );
}

export default App;
