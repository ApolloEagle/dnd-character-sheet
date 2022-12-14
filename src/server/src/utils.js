const { Sequelize, DataTypes } = require("sequelize");

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "../dnd.db",
  });

  const Character = db.define("character", {
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
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  db.sync({ alter: true });
  console.log("All models were synchronized successfully.");

  return { Character };
};
