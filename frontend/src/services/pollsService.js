import { api, requestConfig } from "../utils/config";

const getAllPolls = async () => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/polls`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getProgressPolls = async () => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/polls/progress`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getFuturePolls = async () => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/polls/future`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getEndedPolls = async () => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/polls/finished`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const createPoll = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(`${api}/polls/create`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserPolls = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/polls/user`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deletePoll = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(`${api}/polls/${id}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPollById = async (id) => {
  const config = requestConfig("GET", null, null);

  try {
    const res = await fetch(`${api}/polls/${id}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateQuestion = async (pollId, questionId, data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/questions/${pollId}/${questionId}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteQuestion = async (pollId, questionId, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(`${api}/questions/${pollId}/${questionId}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const insertQuestion = async (pollId, data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(`${api}/questions/create/${pollId}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePoll = async (pollId, data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/polls/${pollId}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const votePoll = async (pollId, questionId) => {
  const config = requestConfig("POST", null, null);

  try {
    const res = await fetch(`${api}/polls/vote/${pollId}/${questionId}`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const pollsService = {
  getAllPolls,
  getProgressPolls,
  getFuturePolls,
  getEndedPolls,
  createPoll,
  getUserPolls,
  deletePoll,
  getPollById,
  updateQuestion,
  deleteQuestion,
  insertQuestion,
  updatePoll,
  votePoll,
};

export default pollsService;
