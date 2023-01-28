const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    _dummy: String
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): Auth!
    login(email: String!, password: String!): Auth!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
  }

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = { typeDefs };
