const { DataSource } = require("apollo-datasource");

class CharacterAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async readCharacter() {
    const response = await this.store.Character.findAll();
    return response[0];
  }
}

module.exports = { CharacterAPI };
