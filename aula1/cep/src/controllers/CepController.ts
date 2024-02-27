import { Request, Response } from "express";
import axios from "axios";

class CepController {
    async list(req: Request, res: Response) {
        const { cep } = req.body;
        try {
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await axios.get(url);
            const responseData = response.data;
            return res.json(responseData);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new CepController();
