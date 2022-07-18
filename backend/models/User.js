const Sequelize = require("sequelize");
const db = require("./../config/db");

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.sync();

module.exports = User;
