import { Router } from "express";
import controller from "../controllers/CategoryController";

const router = Router();

router.post("/", controller.create);

export default router;
