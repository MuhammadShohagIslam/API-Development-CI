import Joi from "joi";

const commentSchema = Joi.object({
    name: Joi.string().min(5).max(40).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    body: Joi.string().required(),
    post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Post Id Is Not Match")
        .required(),
});

const commentUpdateSchema = Joi.object({
    name: Joi.string().min(5).max(40),
    email: Joi.string().email({ minDomainSegments: 2 }),
    body: Joi.string(),
    post: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Post Id Is Not Match"),
});

export { commentSchema, commentUpdateSchema };
