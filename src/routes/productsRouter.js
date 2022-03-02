import { Router } from "express";
import { deleteProduct, getProducts, postProduct, putProduct } from "../controllers/productsController.js";
import { schemaValidateMiddleware } from "../middlewares/schemaValidateMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateToken.js";
import productsSchema from "../schemas/productsSchema.js";

const productsRouter = Router();

productsRouter.use(validateTokenMiddleware);
productsRouter.get("/products", getProducts);
productsRouter.post("/products", schemaValidateMiddleware(productsSchema), postProduct);
productsRouter.put("/products/:id", schemaValidateMiddleware(productsSchema), putProduct)
productsRouter.delete("/products/:id", deleteProduct);

export default productsRouter;