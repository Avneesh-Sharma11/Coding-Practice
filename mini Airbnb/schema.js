const joi = require('joi');

module.exports.listingSchema = joi.object({
    list: joi.object({
        tital: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        img: joi.string().allow("", null),
    }).required(),
});