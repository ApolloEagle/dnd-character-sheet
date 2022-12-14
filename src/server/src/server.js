const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { createStore } = require("./utils");
const { CharacterAPI } = require("./api");

const store = createStore();

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  dataSources: () => ({
    characterAPI: new CharacterAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
