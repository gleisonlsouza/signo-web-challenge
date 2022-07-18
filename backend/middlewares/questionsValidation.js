const { body } = require("express-validator");

const questionUpdateValidation = () => {
  return [
    body("textQuestion")
      .isString()
      .withMessage("O texto é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O texto deve conter pelo menos 1 caractere"),
  ];
};

const questionCreateValidation = () => {
  return [
    body("textQuestion")
      .isString()
      .withMessage("O texto é obrigatório")
      .isLength({ min: 1 })
      .withMessage("O texto deve conter pelo menos 1 caractere"),
  ];
};

module.exports = {
  questionUpdateValidation,
  questionCreateValidation,
};
