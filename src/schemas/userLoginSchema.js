import joi from "joi";

const userLoginSchema = joi.object({
    nome: joi.string().required(),
    senha: joi.string().required()
});

export default userLoginSchema;