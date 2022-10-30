import Joi from "joi";

const postSchema = Joi.object({
    title: Joi.string().min(10).max(200).required(),
    body: Joi.string().required(),
    user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("User Id Is Not Match")
        .required(),
});

const postUpdateSchema = Joi.object({
    title: Joi.string().min(10).max(200),
    body: Joi.string(),
});
export { postSchema, postUpdateSchema };
