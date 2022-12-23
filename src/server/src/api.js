const { DataSource } = require("apollo-datasource");

class CharacterAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async info() {
    const response = await this.store.Info.findAll();
    return response[0];
  }

  async abilityScores() {
    const response = await this.store.AbilityScores.findAll();
    return response[0];
  }
}

module.exports = { CharacterAPI };
