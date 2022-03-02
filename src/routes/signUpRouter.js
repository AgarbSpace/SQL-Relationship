import { Router } from "express";
import { postSignUp } from "../controllers/signUpController.js";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js";
import userSignUpSchema from "../schemas/userSignUpSchema.js";

const signUpRouter = Router();

signUpRouter.post("/signup", schemaValidateMiddleware(userSignUpSchema) ,postSignUp);

export default signUpRouter;