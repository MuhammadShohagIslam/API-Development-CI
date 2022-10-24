import Joi from "joi";

const postSchema = Joi.object({
    title: Joi.string().min(15).max(200).required(),
    body: Joi.string().required(),
});

export default postSchema;
