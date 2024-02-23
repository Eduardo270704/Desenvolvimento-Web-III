import { Request, Response } from "express"
import { Spent } from "../models";

class SpentController {
    async list(req: Request, res: Response) {
        const { user } = req.body;
        try {
            const objects = await Spent.find({ user })
                .select("description value")
                .sort({ description: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    };

    public async create(req: Request, res: Response): Promise<Response> {
        const { user, description, value } = req.body;
        try {
            const document = new Spent({ user, description, value });
            const r = await document.save();
            return res.json(r);
        }
        catch (error: any) {
            if (error && error.errors["description"]) {
                return res.json({ message: error.errors["description"].message });
            } else {
                if (error && error.errors["value"]) {
                    return res.json({ message: error.errors["value"].message });
                } else {
                    if (error && error.errors["user"]) {
                        return res.json({ message: error.errors["user"].message });
                    }
                }
            }
            return res.json({ message: error });
        }
    };

    async update(req: Request, res: Response) {
        const { id, user, description, value } = req.body;
        try {
            const document = await Spent.findById(id);
            if (!document) {
                return res.json({ message: "Gasto inexistente" });
            };
            document.user = user;
            document.description = description;
            document.value = value;
            const resp = await document.save();
            return res.json(resp);
        }
        catch (error: any) {
            if (error && error.errors["description"]) {
                return res.json({ message: error.errors["description"].message });
            }
            else {
                if (error && error.errors["value"]) {
                    return res.json({ message: error.errors["value"].message });
                }
                else {
                    if (error && error.errors["user"]) {
                        return res.json({ message: error.errors["user"].message });
                    }
                }
            }
            return res.json({ message: error });
        }
    };

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Spent.findByIdAndDelete(_id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso" });
            } else {
                return res.json({ message: "Registro inexistente" });
            }
        }
        catch (error: any) {
            return res.json({ message: error.message });
        }
    };
};

export default new SpentController();