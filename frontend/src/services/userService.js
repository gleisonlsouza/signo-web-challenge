import { api, requestConfig } from "../utils/config";

// Get user details
const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(`${api}/users/profile`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/users/`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => ({
        errors: ["Houve um erro, por favor tente mais tarde."],
      }));

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  createUser,
};

export default userService;
