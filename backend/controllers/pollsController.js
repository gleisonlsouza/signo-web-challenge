const { Op, where } = require("sequelize");
const Polls = require("../models/Polls");
const Questions = require("../models/Questions");

// Create new Poll
const createPoll = async (req, res) => {
  const { title, description, startAt, finishAt, questions } = req.body;
  const user = req.user;

  let errors = [];
  if (questions) {
    questions.map((question, index) => {
      if (question.length < 1) {
        errors.push(`A questão ${index + 1} está vazia`);
      }
    });
  }

  if (errors.length > 0) {
    res.status(422).json({ errors: errors });
    return;
  }

  const newPoll = await Polls.create({
    title: title,
    description: description,
    startAt: startAt,
    finishAt: finishAt,
    userId: user.id,
  });

  if (!newPoll) {
    res
      .status(422)
      .json({ errors: "Houve um erro por favor tente mais tarde" });
  }

  try {
    questions.map(async (question) => {
      await Questions.create({
        textQuestion: question,
        pollId: newPoll.id,
      });
    });
  } catch (error) {
    res
      .status(422)
      .json({ errors: "Houve um erro por favor tente mais tarde" });
  }

  const listQuestions = await Questions.findAll({
    where: {
      pollId: newPoll.id,
    },
  });

  res.status(201).json({
    polls: newPoll,
    questions: questions,
    message: "Enquete criada com sucesso!",
  });
};

// Delete a poll
const deletePoll = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const poll = await Polls.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!poll) {
      res.status(404).json({ errors: ["Enquete não encontrada"] });
      return;
    }

    await poll.destroy();

    res.status(200).json({ poll, message: ["Enquete excluída com sucesso!"] });
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }
};

// Get All Polls
const getAllPolls = async (req, res) => {
  const polls = await Polls.findAll();

  if (!polls) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }

  res.status(200).json(polls);
};

// Get poll by id

const getPollByID = async (req, res) => {
  const { id } = req.params;

  const poll = await Polls.findByPk(id);

  if (!poll) {
    res.status(422).json({ errors: ["Enquete não encontrada"] });
    return;
  }

  const questions = await Questions.findAll({
    where: {
      pollId: id,
    },
  });

  res.status(200).json({ poll, questions });
};

const getUserPolls = async (req, res) => {
  const user = req.user;

  const polls = await Polls.findAll({
    where: {
      userId: user.id,
    },
  });

  if (polls.length < 1) {
    res.status(422).json({ errors: ["Enquetes não encontradas"] });
    return;
  }

  res.status(200).json(polls);
};

// Get all polls in progress

const getPollsInProgress = async (req, res) => {
  const polls = await Polls.findAll({
    where: {
      [Op.and]: [
        {
          startAt: {
            [Op.lte]: new Date(),
          },
        },
        {
          finishAt: {
            [Op.gte]: new Date(),
          },
        },
      ],
    },
  });

  if (!polls) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }

  res.status(200).json(polls);
};

// Get all polls finished
const getPollsFinished = async (req, res) => {
  const polls = await Polls.findAll({
    where: {
      finishAt: {
        [Op.lt]: new Date(),
      },
    },
  });

  if (!polls) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }

  res.status(200).json(polls);
};

// Get all future polls
const getFuturePolls = async (req, res) => {
  const polls = await Polls.findAll({
    where: {
      startAt: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!polls) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }

  res.status(200).json(polls);
};

// update a poll
const updatePoll = async (req, res) => {
  const { id } = req.params;
  const { title, description, startAt, finishAt } = req.body;
  const user = req.user;
  const poll = await Polls.findOne({
    where: {
      id: id,
      userId: user.id,
    },
  });

  let errors = [];

  if (!poll) {
    res.status(422).json({ errors: ["Enquete não encontrada"] });
    return;
  }

  if (title) {
    poll.title = title;
  }

  if (description) {
    poll.description = description;
  }

  if (startAt) {
    poll.startAt = startAt;
  }

  if (finishAt) {
    poll.startAt = startAt;
  }

  await poll.save();

  if (errors.length > 0) {
    res.status(422).json({ errors: errors });
    return;
  }

  const questions = await Questions.findAll({
    where: {
      pollId: id,
    },
  });

  res.status(201).json({
    poll,
    questions,
    message: "Enquete atualizada com sucesso!",
  });
};

// vote
const votePoll = async (req, res) => {
  const { pollId, questionId } = req.params;

  const poll = await Polls.findByPk(pollId);

  if (!poll) {
    res.status(422).json({ errors: ["Enquete não encontrada"] });
    return;
  }

  if (new Date(poll.startAt) > new Date()) {
    res.status(422).json({ errors: ["A enquete ainda não está em andamento"] });
    return;
  }

  if (new Date(poll.finishAt) < new Date()) {
    res.status(422).json({ errors: ["A enquete está encerrada"] });
    return;
  }

  const question = await Questions.findOne({
    where: {
      pollId: pollId,
      id: questionId,
    },
  });

  if (!question) {
    res.status(422).json({ errors: ["Opção não encontrada"] });
    return;
  }

  await Questions.increment({ votes: 1 }, { where: { id: questionId } });

  const questions = await Questions.findAll({
    where: {
      pollId: pollId,
    },
  });

  res
    .status(200)
    .json({ poll, questions, message: "Voto compputado com sucesso!" });
};

module.exports = {
  createPoll,
  deletePoll,
  getAllPolls,
  getPollByID,
  getPollsInProgress,
  getPollsFinished,
  getFuturePolls,
  updatePoll,
  getUserPolls,
  votePoll,
};
