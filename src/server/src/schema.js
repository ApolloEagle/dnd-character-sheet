const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    readCharacter: Character!
  }

  type Character {
    name: String!
    race: String!
    class: String!
    level: Int!
    background: String!
    experience: Int!
  }
`;

module.exports = { typeDefs };
