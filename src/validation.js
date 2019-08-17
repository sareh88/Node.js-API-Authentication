const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schemaUserValidation = {
    userName: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(data, schemaUserValidation);
};

const loginValidation = data => {
  const schemaUserValidation = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(data, schemaUserValidation);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
