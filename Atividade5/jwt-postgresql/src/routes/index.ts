import { Router } from "express";
import category from "./category";
import user from "./user";
import product from "./product";
import spent from "./spent";

const router = Router();

router.use("/categoria", category);
router.use("/produto", product);
router.use("/gasto", spent);
router.use("/usuario", user);

export default router;
