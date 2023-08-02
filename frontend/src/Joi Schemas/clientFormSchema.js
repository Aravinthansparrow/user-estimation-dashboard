// clientFormSchema.js
import Joi from 'joi';

const clientFormSchema = Joi.object({
  clientName: Joi.string().required().label('Client name'),
  clientAddress: Joi.string().required().label('Client Address'),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Disable Joi's TLD validation
    .required()
    .label('Email ID'),
});

export default clientFormSchema;
