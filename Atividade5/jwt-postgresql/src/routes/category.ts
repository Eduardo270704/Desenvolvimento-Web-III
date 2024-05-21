import { Router } from "express";
import controller from "../controllers/CategoryController";

const router = Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/", controller.delete);

export default router;
