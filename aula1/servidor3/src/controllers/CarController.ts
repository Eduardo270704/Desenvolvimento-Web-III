import { Request, Response } from "express"
import { Car } from "../models";

class CarController {
    async list(_: Request, res: Response): Promise<Response> {
        try {
            const documents = await Car.find().sort({ model: "asc" });
            return res.json(documents)
        }
        catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { model } = req.body;
        try {
            const document = new Car({ model });
            const r = await document.save()
            return res.json(r);
        }
        catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este modelo já está registrado" });
            } else if (error && error.errors["model"]) {
                return res.json({ message: error.errors["model"].message });
            }
            return res.json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id, model } = req.body;
        try {
            const document = await Car.findById(id);
            if (!document) {
                return res.json({ message: "Modelo inexistente" });
            };
            document.model = model;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este modelo já está registrado" });
            } else if (error && error.errors["model"]) {
                return res.json({ message: error.errors["model"].message })
            }
            return res.json({ message: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        const { id: _id } = req.body;
        try {
            const object = await Car.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro inexistente" });
            };
        } catch (error: any) {
            return res.json({ message: error.message })
        };
    };
};

export default new CarController();