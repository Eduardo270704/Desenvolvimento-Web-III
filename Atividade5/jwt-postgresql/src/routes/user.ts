import { Router, Request, Response } from "express";
import { UserController } from "../controllers";
import { validateAccess, checkAdm } from "../middleware";

const routes = Router();

routes.get("/", validateAccess, checkAdm, UserController.list);
routes.post("/", UserController.create);
routes.delete("/", validateAccess, UserController.delete);
routes.put("/email", validateAccess, UserController.updateMail);
routes.put("/senha", validateAccess, UserController.updatePassword);
routes.put("/perfil", validateAccess, checkAdm, UserController.updateRole);
routes.post("/login", UserController.login);

routes.use((_: Request, res: Response) =>
  res.json({ error: "Operação desconhecida com o usuário" })
);

export default routes;
