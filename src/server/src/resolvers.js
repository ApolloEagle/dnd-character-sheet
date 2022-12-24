const resolvers = {
  Query: {
    info: async (_, {}, { dataSources }) =>
      await dataSources.characterAPI.info(),
    abilityScores: async (_, {}, { dataSources }) =>
      await dataSources.characterAPI.abilityScores(),
  },
  Mutation: {
    createUser: (_, args, { dataSources }) =>
      dataSources.characterAPI.createUser(args),
  },
};

module.exports = { resolvers };
