const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getRace(name: String!): Race!
  }

  type Race {
    name: String!
    speed: Int!
  }

`);

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

const getRace = (args) => {
  race = args.name;
  return races.filter((item) => {
    return item.name === race;
  })[0];
};

// The root provides a resolver function for each API endpoint
const root = {
  getRace: getRace,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
