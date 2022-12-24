const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    info: Info!
    abilityScores: AbilityScores
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
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
