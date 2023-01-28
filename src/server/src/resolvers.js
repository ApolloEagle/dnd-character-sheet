const resolvers = {
  Mutation: {
    register: (_, args, { dataSources }) =>
      dataSources.characterAPI.register(args),
    login: (_, args, { dataSources }) => dataSources.characterAPI.login(args),
  },
};

module.exports = { resolvers };
