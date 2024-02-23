import { Router, Request, Response } from "express";
import cars from "./cars";

const routes = Router();

routes.get("/", function (req: Request, res: Response) {
    res.json({ r: 5 });
});

routes.use("/carro", cars);

export default routes;