const joi = require("joi");

const postSchema = joi.object({
    post: joi.object({
        
        date: joi.date().required(),
        content: joi.string().required(),
        likes: joi.number().required().min(0),
        author: joi.string().required()
    }).required(),
});

module.exports.postSchema = postSchema;