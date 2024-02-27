import { Router, Request, Response } from "express";
import cep from "./cep";

const routes = Router();

routes.use("/cep", cep)

routes.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;