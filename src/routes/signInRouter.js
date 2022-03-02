import { Router } from "express";
import { postSignIn } from "../controllers/signInController.js";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js";
import userSignInSchema from "../schemas/userSignInSchema.js";

const signInRouter = Router();

signInRouter.post("/signin", schemaValidateMiddleware(userSignInSchema), postSignIn);

export default signInRouter;