import { Router } from 'express';
import productsRouter from './productsRouter.js';
import signInRouter from './signInRouter.js';
import signUpRouter from './signUpRouter.js';

const router = Router();

router.use(signUpRouter);
router.use(signInRouter);
router.use(productsRouter);

export default router;