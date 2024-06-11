import { Router, Request, Response } from "express";
import { ProductController } from "../controllers";

const routes = Router();

routes.get("/", ProductController.list);
routes.post("/", ProductController.create);
routes.put("/", ProductController.update);
routes.delete("/", ProductController.delete);

routes.use((_req: Request, res: Response) =>
  res.json({ error: "Operação desconhecida com o produto" })
);

export default routes;
