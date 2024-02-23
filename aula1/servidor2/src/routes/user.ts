import { Router } from "express";
import controller from "../controllers/UserController";

const routes = Router();

routes.get("/", controller.list);
routes.post("/", controller.create);
routes.put("/", controller.update);
routes.delete("/", controller.delete);

export default routes;