const { Sequelize, DataTypes, where } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "../dnd.db",
  });

  const User = db.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        is: /\S+@\S+\.\S+/,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.beforeCreate((user) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  // const Info = db.define("info", {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   race: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   class: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   level: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   background: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   speed: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  // });

  // const AbilityScores = db.define("ability_score", {
  //   strength: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   dexterity: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   constitution: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   intelligence: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   wisdom: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  //   charisma: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //   },
  // });

  User.sync({ alter: true });
  db.sync({ alter: false });
  console.log("All models were synchronized successfully.");

  return { User };
};
