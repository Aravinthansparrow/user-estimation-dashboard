import Joi from 'joi';

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password should be alphanumeric, case-sensitive and at least 1 special character.',
    'string.empty': 'Password cannot be blank.',
    'any.required': 'Please provide a password.',
  });

export default passwordSchema;
