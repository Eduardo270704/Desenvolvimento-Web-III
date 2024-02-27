import { Router } from "express";
import { CepController } from "../controllers";

const routes = Router();

routes.get("/", CepController.list);

export default routes;