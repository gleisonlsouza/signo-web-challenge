const Sequelize = require("sequelize");
const db = require("../config/db");
const User = require("./User");

const Polls = db.define("polls", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  startAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  finishAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

User.Polls = User.hasMany(Polls, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Polls.User = Polls.belongsTo(User);

Polls.sync();

module.exports = Polls;
