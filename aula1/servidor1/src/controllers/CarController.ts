import { Request, Response } from "express";

class CarController {
    vw(req: Request, res: Response) {
        res.send("Fusca");
    };

    fiat = (req: Request, res: Response) => res.send("147");
}

export default new CarController();