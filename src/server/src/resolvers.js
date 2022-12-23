const resolvers = {
  Query: {
    info: async (_, {}, { dataSources }) =>
      await dataSources.characterAPI.info(),
    abilityScores: async (_, {}, { dataSources }) =>
      await dataSources.characterAPI.abilityScores(),
  },
};

module.exports = { resolvers };
