const Sequelize = require("sequelize");
const db = require("../config/db");
const Polls = require("./Polls");

const Questions = db.define("questions", {
  textQuestion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  pollId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Polls.Questions = Polls.hasMany(Questions, {
  foreignKey: "pollId",
  onDelete: "CASCADE",
});

Questions.Polls = Questions.belongsTo(Polls);

Questions.sync();

module.exports = Questions;
