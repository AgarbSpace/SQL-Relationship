import joi from "joi";

const userSignInSchema = joi.object({
    nome: joi.string().pattern(/^[a-záàâãéèêíïóôõöúçñ ,.'-]+$/i).required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    senhaConfirmada: joi.string().required()
});

export default userSignInSchema;