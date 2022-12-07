import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
});

export default userSchema;
