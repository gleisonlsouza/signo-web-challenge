const { body } = require("express-validator");

// Validate the user create
const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Forneça um e-mail válido."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo seis caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória.")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais!");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Informe um e-mail válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

// Update validation
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Informe o seu nome")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter pelo menos 3 caracterers."),
    body("email")
      .optional()
      .isString()
      .withMessage("O e-mail é obrigatório")
      .isEmail()
      .withMessage("Forneça um e-mail válido."),
    body("password")
      .optional()
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo seis caracteres."),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
