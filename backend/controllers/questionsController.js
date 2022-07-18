const Questions = require("../models/Questions");
const Polls = require("../models/Polls");

const updateQuestion = async (req, res) => {
  const { pollID, questionID } = req.params;
  const { textQuestion } = req.body;
  const user = req.user;

  const poll = await Polls.findOne({
    where: {
      id: pollID,
      userId: user.id,
    },
  });

  if (!poll) {
    res.status(422).json({ errors: ["Enquete não encontrada"] });
    return;
  }

  const question = await Questions.findAll({
    where: {
      pollID: pollID,
      id: questionID,
    },
    limit: 1,
  });

  if (question.length < 1) {
    res.status(404).json({ errors: ["Opção não localizada"] });
    return;
  }

  if (textQuestion) {
    question[0].textQuestion = textQuestion;
  }

  await question[0].save();

  res.status(201).json({ question, message: "Opção atualizada com sucesso!" });
};

const createQuestion = async (req, res) => {
  const { pollID } = req.params;
  const { textQuestion } = req.body;
  const user = req.user;

  const poll = await Polls.findOne({
    where: {
      id: pollID,
      userId: user.id,
    },
  });

  if (!poll) {
    res.status(404).json({ errors: ["Enquete não localizada"] });
    return;
  }

  const newQuestion = await Questions.create({
    pollId: pollID,
    textQuestion: textQuestion,
  });

  res.status(201).json({ newQuestion, message: "Opção criada com sucesso!" });
};

const deleteQuestion = async (req, res) => {
  const { pollID, questionID } = req.params;
  const { textQuestion } = req.body;
  const user = req.user;

  const poll = await Polls.findOne({
    where: {
      id: pollID,
      userId: user.id,
    },
  });

  if (!poll) {
    res.status(422).json({ errors: ["Enquete não encontrada"] });
    return;
  }

  const listQuestion = await Questions.findAll({
    where: {
      pollID: pollID,
    },
  });

  if (listQuestion.length < 1) {
    res.status(404).json({ errors: "Enquete não localizada" });
    return;
  }

  if (listQuestion.length <= 3) {
    res.status(422).json({
      errors: ["A enquete precisa ter no mínimo 3 opções de resposta"],
    });
    return;
  }

  const question = await Questions.findAll({
    where: {
      pollId: pollID,
      id: questionID,
    },
  });

  if (question.length < 1) {
    res.status(404).json({ errors: ["Opção não localizada"] });
    return;
  }

  await question[0].destroy();

  res.status(201).json({ question, message: "Opção excluída com sucesso!" });
};

module.exports = {
  updateQuestion,
  createQuestion,
  deleteQuestion,
};
