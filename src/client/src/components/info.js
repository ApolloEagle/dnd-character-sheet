import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_INFO = gql`
  query GetCharacterInfo {
    info {
      name
      race
      class
      background
      level
    }
  }
`;

const Info = () => {
  const { data, loading, error } = useQuery(GET_INFO);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="flex flex-col justify-center items-start bg-slate-800 w-full h-36 p-4">
      <div className="text-4xl text-gray-300">{data.info.name}</div>
      <div className="flex flex-row">
        <div className="text-sm text-gray-400">{data.info.race}</div>
        <div className="text-sm mx-1 text-gray-400">{data.info.class}</div>
        <div className="text-sm text-gray-400">{data.info.background}</div>
      </div>
      <div className="text-sm text-gray-300">Level {data.info.level}</div>
    </div>
  );
};

export { Info };
