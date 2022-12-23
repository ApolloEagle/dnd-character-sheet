import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import fetch from "node-fetch";

const baseURL = "https://www.dnd5eapi.co/api";

const GET_SPEED = gql`
  query GetSpeed {
    info {
      race
      speed
    }
  }
`;

const Speed = () => {
  const { data, loading, error } = useQuery(GET_SPEED);
  const [speed, setSpeed] = useState(0);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const fetchSpeed = async () => {
    const response = await fetch(
      `${baseURL}/races/${String(data.info.race).toLowerCase()}`
    );
    const { speed } = await response.json();
    setSpeed(speed);
  };

  if (data.info.speed === 0) {
    fetchSpeed();
  }

  return (
    <div className="flex flex-col items-center justify-start p-2 mx-4 text-xs h-24 w-24 border-2 border-black rounded-lg">
      <div className="text-xs mb-3">SPEED</div>
      <div className="text-xl text-center">{speed} ft.</div>
    </div>
  );
};

export default Speed;
