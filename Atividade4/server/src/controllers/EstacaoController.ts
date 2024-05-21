import { Request, Response } from "express";
import { Estacao } from "../types";
import { EstacaoModel } from "../models";

class EstacaoController {
  // Insere um documento na coleção estacoes
  public async insert(estacao: Estacao): Promise<void> {
    try {
      const document = new EstacaoModel(estacao);
      await document.save();
    } catch (error: any) {
      console.log(estacao.estacao, error.message);
    }
  }

  public async lista(_req: Request, res: Response): Promise<void> {
    try {
      const estacoes = await EstacaoModel.find(
        {},
        { uf: 1, estacao: 1, latitude: 1, longitude: 1, _id: 0 }
      ).sort({ estacao: 1 });
      res.json(estacoes);
    } catch (error) {
      console.error("Erro ao buscar as estações:", error);
      res.status(500).json({ message: "Erro ao buscar as estações." });
    }
  }

  public async leiturasPorEstacao(_req: Request, res: Response): Promise<void> {
    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $project: {
            estacao: 1,
            quantidade: { $size: "$leituras" },
          },
        },
        {
          $sort: { estacao: 1 },
        },
      ]);
      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras por estação:", error);
      res
        .status(500)
        .json({ message: "Erro ao buscar as leituras por estação." });
    }
  }

  public async estatisticasTemperatura(
    req: Request,
    res: Response
  ): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao },
        },
        {
          $unwind: "$leituras",
        },
        {
          $group: {
            _id: "$estacao",
            media: { $avg: "$leituras.temperaturaAr" },
            minima: { $min: "$leituras.temperaturaAr" },
            maxima: { $max: "$leituras.temperaturaAr" },
          },
        },
        {
          $project: {
            _id: 0,
            estacao: "$_id",
            media: 1,
            minima: 1,
            maxima: 1,
          },
        },
      ]);
      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas de temperatura:", error);
      res
        .status(500)
        .json({ message: "Erro ao buscar as estatísticas de temperatura." });
    }
  }

  public async estatistica(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao },
        },
        {
          $unwind: "$leituras",
        },
        {
          $group: {
            _id: "$estacao",
            media: { $avg: `$leituras.${campo}` },
            minima: { $min: `$leituras.${campo}` },
            maxima: { $max: `$leituras.${campo}` },
            estacao: { $first: "$estacao" },
            parametro: { $addToSet: { $literal: campo } },
          },
        },
        {
          $project: {
            _id: 0,
            media: 1,
            minima: 1,
            maxima: 1,
            estacao: 1,
            parametro: { $arrayElemAt: ["$parametro", 0] },
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas:", error);
      res.status(500).json({ message: "Erro ao buscar as estatísticas." });
    }
  }

  public async leituras(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao },
        },
        {
          $unwind: "$leituras",
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio,
              $lte: dataFim,
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            leituras: {
              $push: {
                leitura: `$leituras.${campo}`,
                data: "$leituras.datahora",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            estacao: "$_id",
            leituras: 1,
          },
        },
      ]);
      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras:", error);
      res.status(500).json({ message: "Erro ao buscar as leituras." });
    }
  }

  public async estatisticaporestacao(
    req: Request,
    res: Response
  ): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const campo = req.params.campo;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao },
        },
        {
          $unwind: "$leituras",
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio,
              $lte: dataFim,
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            media: { $avg: `$leituras.${campo}` },
            minima: { $min: `$leituras.${campo}` },
            maxima: { $max: `$leituras.${campo}` },
          },
        },
        {
          $project: {
            _id: 0,
            media: 1,
            minima: 1,
            maxima: 1,
            estacao: "$_id",
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as estatísticas:", error);
      res.status(500).json({ message: "Erro ao buscar as estatísticas." });
    }
  }

  public async intervalo(req: Request, res: Response): Promise<void> {
    const nomeEstacao = req.params.nomeEstacao;
    const dataInicio = new Date(req.params.dataInicio);
    const dataFim = new Date(req.params.dataFim);

    try {
      const resultado = await EstacaoModel.aggregate([
        {
          $match: { estacao: nomeEstacao },
        },
        {
          $unwind: "$leituras",
        },
        {
          $match: {
            "leituras.datahora": {
              $gte: dataInicio,
              $lte: dataFim,
            },
          },
        },
        {
          $group: {
            _id: "$estacao",
            leituras: {
              $push: {
                leitura: "$leituras",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            estacao: "$_id",
            leituras: 1,
          },
        },
      ]);

      res.json(resultado);
    } catch (error) {
      console.error("Erro ao buscar as leituras:", error);
      res.status(500).json({ message: "Erro ao buscar as leituras." });
    }
  }
}

export default new EstacaoController();
