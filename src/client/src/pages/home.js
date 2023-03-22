import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "../components";
import { RacesDocument } from "../graphql";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { login } = useContext(UserContext);
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

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
