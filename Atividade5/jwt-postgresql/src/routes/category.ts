import { Router, Request, Response } from "express";
import { CategoryController } from "../controllers";

const routes = Router();

routes.get("/", CategoryController.list);
routes.post("/", CategoryController.create);
routes.put("/", CategoryController.update);
routes.delete("/", CategoryController.delete);

routes.use((_req: Request, res: Response) =>
  res.json({ error: "Operação desconhecida com a categoria" })
);

export default routes;
