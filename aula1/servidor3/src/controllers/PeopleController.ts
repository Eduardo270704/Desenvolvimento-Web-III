import { Request, Response } from "express"
import { People } from "../models";

class PeopleController {
    async list(_: Request, res: Response): Promise<Response> {
        try {
            const documents = await People.find().sort({ model: "asc" });
            return res.json(documents)
        }
        catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        try {
            const document = new People({ name });
            const r = await document.save()
            return res.json(r);
        }
        catch (error: any) {
            if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message });
            }
            return res.json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id, name } = req.body;
        try {
            const document = await People.findById(id);
            if (!document) {
                return res.json({ message: "Pessoa inexistente" });
            };
            document.name = name;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error && error.errors["name"]) {
                return res.json({ message: error.errors["name"].message })
            }
            return res.json({ message: error.message })
        }
    }

    async delete(req: Request, res: Response) {
        const { id: _id } = req.body;
        try {
            const object = await People.findByIdAndDelete(_id);
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

export default new PeopleController();