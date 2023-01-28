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
        notEmpty: {
          msg: "Please enter your name.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Please enter a valid email.",
        },
        isUnique() {
          return User.findOne({ where: { email: this.email } }).then((user) => {
            if (user) {
              throw new Error("Email is already registered.");
            }
          });
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please enter your password.",
        },
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

  User.sync({ alter: true });
  db.sync({ alter: false });
  console.log("All models were synchronized successfully.");

  return { User };
};
