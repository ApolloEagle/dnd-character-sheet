import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ABILITY_SCORES = gql`
  query GetAbilityScores {
    abilityScores {
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
    }
  }
`;

const AbilityScores = () => {
  const { data, loading, error } = useQuery(GET_ABILITY_SCORES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const scores = Object.keys(data.abilityScores);

  return (
    <div className="flex flex-row p-4">
      {scores.map((ability, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-start p-2 mx-4 text-xs h-24 w-24 border-2 border-black rounded-lg"
          >
            <div className="text-xs mb-3">{ability.toLocaleUpperCase()}</div>
            <input
              className="w-8 h-6 text-xl text-center"
              value={data.abilityScores[ability]}
            />
          </div>
        );
      })}
    </div>
  );
};

export { AbilityScores };
