import { Request, Response } from "express";
import axios from "axios";

class CepController {
    async list(req: Request, res: Response) {
        const { cep } = req.body;
        try {
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await axios.get(url);
            const responseData = response.data;
            const address = {
                cep: responseData.cep,
                logradouro: responseData.logradouro,
                bairro: responseData.bairro,
                localidade: responseData.localidade,
                uf: responseData.uf,
                ibge: responseData.ibge,
                gia: responseData.gia,
                ddd: responseData.ddd,
                siafi: responseData.siafi
            };
            return res.json(address);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new CepController();
