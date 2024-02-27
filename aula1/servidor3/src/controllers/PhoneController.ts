import { Request, Response } from "express"
import { Phone } from "../models";

class PhoneController {
    async list(_: Request, res: Response): Promise<Response> {
        try {
            const documents = await Phone.find();
            return res.json(documents)
        }
        catch (error: any) {
            return res.json({ message: error.message });
        }
    }


    public async create(req: Request, res: Response): Promise<Response> {
        const { people, number } = req.body;
        try {
            const document = new Phone({ people, number });
            const r = await document.save();
            return res.json(r);
        }
        catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este telefone já está em uso" });
            } else if (error && error.errors["people"]) {
                return res.json({ message: error.errors["people"].message });
            } else if (error && error.errors["number"]) {
                return res.json({ message: error.errors["number"].message });
            }
            return res.json({ message: error });
        }
    };

    async update(req: Request, res: Response) {
        const { id, people, number } = req.body;
        try {
            const document = await Phone.findById(id);
            if (!document) {
                return res.json({ message: "Número inexistente" });
            };
            document.people = people;
            document.number = number;
            const resp = await document.save();
            return res.json(resp);
        }
        catch (error: any) {
            if (error && error.errors["people"]) {
                return res.json({ message: error.errors["people"].message });
            }
            else {
                if (error && error.errors["number"]) {
                    return res.json({ message: error.errors["number"].message });
                }
            }
            return res.json({ message: error });
        }
    };

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id: _id } = req.body;
        try {
            const object = await Phone.findByIdAndDelete(_id);
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

export default new PhoneController();