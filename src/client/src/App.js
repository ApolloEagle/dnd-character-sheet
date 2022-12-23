import React from "react";
import "./input.css";
import { Info, AbilityScores } from "./components";

function App() {
  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen">
      <Info />
      <AbilityScores />
    </div>
  );
}

export default App;
