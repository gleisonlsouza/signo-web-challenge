const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "3d",
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    res
      .status(422)
      .json({ errors: ["O e-mail já está em uso em nosso sistema"] });
    return;
  }

  // If don't exists, generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name: name,
    email: email,
    password: passwordHash,
  });

  // If user was created successfully, return the token
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json({
    id: newUser.id,
    token: generateToken(newUser.id),
  });
};

// Function to login
const login = async (req, res) => {
  const { email, password } = req.body;

  // try found the user
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  // check if user exists
  if (!user) {
    res.status(404).json({ errors: ["O usuário não existe"] });
    return;
  }

  // check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  // Return user with token
  res.status(201).json({
    id: user.id,
    token: generateToken(user.id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Update an user
const updateUser = async (req, res) => {
  const { name, password, email } = req.body;

  const reqUser = req.user;

  const user = await User.findByPk(reqUser.id, {
    attributes: { exclude: ["password"] },
  });

  if (name) {
    user.name = name;
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (email) {
    user.email = email;
  }

  await user.save();

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getCurrentUser,
  updateUser,
};
