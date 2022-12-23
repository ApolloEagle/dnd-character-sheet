const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    info: Info!
    abilityScores: AbilityScores
  }

  type Info {
    name: String!
    race: String!
    class: String!
    level: Int!
    background: String!
    speed: Int!
  }

  type AbilityScores {
    strength: Int!
    dexterity: Int!
    constitution: Int!
    intelligence: Int!
    wisdom: Int!
    charisma: Int!
  }
`;

module.exports = { typeDefs };
