import { Router, Request, Response } from "express";
import { SpentController } from "../controllers";

const routes = Router();

routes.get("/", SpentController.list);
routes.post("/", SpentController.create);
routes.put("/", SpentController.update);
routes.delete("/", SpentController.delete);

routes.use((_req: Request, res: Response) =>
  res.json({ error: "Operação desconhecida com a categoria" })
);

export default routes;
