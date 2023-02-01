const { DataSource } = require("apollo-datasource");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class CharacterAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async register(args) {
    const user = await this.store.User.create({
      name: args.name,
      email: args.email,
      password: args.password,
    });

    const token = jwt.sign({ id: user.id, email: user.email }, "test", {
      expiresIn: "1y",
    });

    return { token, user };
  }

  async login(args) {
    const user = await this.store.User.findOne({
      where: {
        email: args.email,
      },
    });

    if (user) {
      const password_valid = await bcrypt.compare(args.password, user.password);
      if (password_valid) {
        const token = jwt.sign({ id: user.id, email: user.email }, "test", {
          expiresIn: "1d",
        });
        return { token, user };
      } else {
        throw new Error("Incorrect email and/or password.");
      }
    } else {
      if (!args.email) {
        throw new Error("Please enter a valid email.");
      } else {
        throw new Error("User is not registered.");
      }
    }
  }
}

module.exports = { CharacterAPI };
