import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bnrRouter from "./bnr";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bnrRouter);

export default router;
