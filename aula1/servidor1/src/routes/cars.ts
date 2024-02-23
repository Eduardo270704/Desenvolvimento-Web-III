import { Router } from "express";
import controller from "../controllers/CarController";

const routes = Router()

routes.get("/vw", controller.vw);
routes.get("/fiat", controller.fiat);

export default routes;