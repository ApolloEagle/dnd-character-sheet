const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getRace(name: String!): Race!
    getRaces: [Race!]
  }

  type Race {
    name: String!
    speed: Int!
  }
`;

const races = [
  {
    name: "Dragonborn",
    speed: 30,
  },
  {
    name: "Dwarf",
    speed: 25,
  },
  {
    name: "Elf",
    speed: 30,
  },
  {
    name: "Gnome",
    speed: 25,
  },
  {
    name: "Half Elf",
    speed: 30,
  },
  {
    name: "Halfling",
    speed: 25,
  },
  {
    name: "Dragonborn",
    speed: 30,
  },
  {
    name: "Half-Orc",
    speed: 30,
  },
  {
    name: "Human",
    speed: 30,
  },
  {
    name: "Tiefling",
    speed: 30,
  },
];

const resolvers = {
  Query: {
    getRace: (parent, args, contextValue, info) => {
      return races.find(
        (race) =>
          race.name.toLocaleLowerCase() === args.name.toLocaleLowerCase()
      );
    },
    getRaces: (parent, args, contextValue, info) => {
      return races;
    },
  },
};

const server = new ApolloServer({ cors: true, typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
