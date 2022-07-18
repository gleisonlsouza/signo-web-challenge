const { body } = require("express-validator");

const checkStartDate = (date) => {
  const dateReq = new Date(date);
  const dateNow = new Date();
  if (dateReq < dateNow) {
    return false;
  }
  return true;
};

const checkFinishDate = (start, finish) => {
  const startDate = new Date(start);
  const finishDate = new Date(finish);
  if (finishDate <= startDate) {
    return false;
  }
  return true;
};

const pollsCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O título deve conter pelo menos 5 caracteres"),
    body("description")
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 20 })
      .withMessage("O texto deve conter pelo menos 20 caracteres"),
    body("questions")
      .isArray({ min: 3 })
      .withMessage("A enquete deve conter ao menos 3 respostas."),
    body("startAt").custom((date) => {
      if (!checkStartDate(date)) {
        throw new Error(
          "A data e hora inicial não pode ser menor do que a atual"
        );
      }
      return true;
    }),
    body("finishAt").custom((date, { req }) => {
      const { startAt, finishAt } = req.body;
      if (!date) {
        throw new Error("Forneça uma data e horário para o termino");
      }

      if (!checkFinishDate(startAt, finishAt)) {
        throw new Error(
          "A data e hora final não pode ser menor do que a data inicial"
        );
      }
      return true;
    }),
  ];
};

const pollUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 5 })
      .withMessage("O título deve conter pelo menos 5 caracteres"),
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 20 })
      .withMessage("O texto deve conter pelo menos 20 caracteres"),
    body("startAt")
      .optional()
      .custom((date) => {
        if (!checkStartDate(date)) {
          throw new Error(
            "A data e hora inicial não pode ser menor do que a atual"
          );
        }
        return true;
      }),
    body("finishAt")
      .optional()
      .custom((date, { req }) => {
        const { startAt, finishAt } = req.body;
        if (!date) {
          throw new Error("Forneça uma data e horário para o termino");
        }

        if (!checkFinishDate(startAt, finishAt)) {
          throw new Error(
            "A data e hora final não pode ser menor do que a data inicial"
          );
        }
        return true;
      }),
  ];
};

module.exports = {
  pollsCreateValidation,
  pollUpdateValidation,
};
