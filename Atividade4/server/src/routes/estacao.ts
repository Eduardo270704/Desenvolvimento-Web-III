import { Router } from "express";
import { EstacaoController } from "../controllers";

const router = Router();

router.get("/lista", EstacaoController.lista);
router.get("/leiturasporestacao", EstacaoController.leiturasPorEstacao);
router.get(
  "/estatisticatemperatura/:nomeEstacao",
  EstacaoController.estatisticasTemperatura
);
router.get("/estatistica/:nomeEstacao/:campo", EstacaoController.estatistica);
router.get(
  "/leituras/:nomeEstacao/:campo/:dataInicio/:dataFim",
  EstacaoController.leituras
);
router.get(
  "/estatistica/:nomeEstacao/:campo/:dataInicio/:dataFim",
  EstacaoController.estatisticaporestacao
);
router.get(
  "/intervalo/:nomeEstacao/:campo/:dataInicio/:dataFim",
  EstacaoController.intervalo
);

export default router;
