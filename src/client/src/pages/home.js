import React, { useState } from "react";
import { Dropdown } from "../components";
import { RacesDocument } from "../graphql";

const Home = () => {
  const [create, setCreate] = useState(false);
  return create ? (
    <Dropdown graphql={RacesDocument} />
  ) : (
    <button
      className="text-lg font-semibold bg-sky-500 active:bg-sky-300 text-white rounded-lg p-2 w-56"
      onClick={() => {
        setCreate(true);
      }}
    >
      Create Character
    </button>
  );
};

export default Home;
