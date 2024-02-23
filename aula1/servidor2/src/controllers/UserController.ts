import { Request, Response } from "express"
import { User } from "../models";

class UserController {
    async list(_: Request, res: Response): Promise<Response> {
        try {
            const documents = await User.find().sort({ mail: "asc" });
            return res.json(documents)
        }
        catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { mail, password } = req.body;
        try {
            const document = new User({ mail, password });
            const r = await document.save()
            return res.json(r);
        }
        catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail já está em uso" });
            } else if (error && error.errors["mail"]) {
                return res.json({ message: error.errors["mail"].message });
            } else if (error && error.errors["password"]) {
                return res.json({ message: error.errors["password"].message });
            }
            return res.json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const { id, mail, password } = req.body;
        try {
            const document = await User.findById(id);
            if (!document) {
                return res.json({ message: "Usuário inexistente" });
            };
            document.mail = mail;
            document.password = password;
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error.code === 11000 || error.code === 11001) {
                return res.json({ message: "Este e-mail ja está em uso" });
            } else {
                if (error && error.errors["mail"]) {
                    return res.json({ message: error.errors["mail"].message })
                } else {
                    if (error && error.errors["password"]) {
                        return res.json({ message: error.errors["password"].message })
                    }
                    return res.json({ message: error.message })
                }
            }
        }
    }

    async delete(req: Request, res: Response) {
        const { id: _id } = req.body;
        try {
            const object = await User.findByIdAndDelete(_id);
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

export default new UserController();