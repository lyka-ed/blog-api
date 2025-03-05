import Joi from "joi";

const UserValidationSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least 8 characters, including an uppercase, a lowercase, a number, and a special character.",
    }),
  authMethod: Joi.string().valid("local", "google").required(),,
});

export default UserValidationSchema;
