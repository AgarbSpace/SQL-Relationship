import joi from "joi";

const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
});

export default userSignInSchema;