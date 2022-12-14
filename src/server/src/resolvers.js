const resolvers = {
  Query: {
    readCharacter: async (_, {}, { dataSources }) =>
      await dataSources.characterAPI.readCharacter(),
  },
};

module.exports = { resolvers };
