const { Sequelize, DataTypes } = require("sequelize");

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "../dnd.db",
  });

  const Info = db.define("info", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    background: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  const AbilityScores = db.define("ability_score", {
    strength: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dexterity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    constitution: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    intelligence: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wisdom: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    charisma: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  db.sync({ alter: true });
  console.log("All models were synchronized successfully.");

  return { Info, AbilityScores };
};
