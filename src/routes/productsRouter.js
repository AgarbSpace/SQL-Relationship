import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/products");
productsRouter.post("/products");

export default productsRouter;