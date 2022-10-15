import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(10).max(40).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
});

export default userSchema;
