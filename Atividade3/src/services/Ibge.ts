import { MesoProps, RegiaoProps, UfProps } from "../types";
import api from "./api";

class Ibge {
  async getRegioes(): Promise<RegiaoProps[]> {
    await sleep(1000);
    const { data } = await api.get("/regioes?orderBy=nome");
    return data;
  }

  async getUfPorRegiao(idRegiao: number): Promise<UfProps[]> {
    await sleep(1000);
    const { data } = await api.get(`/regioes/${idRegiao}/estados?orderBy=nome`);
    return data;
  }

  async getMesoPorUf(sigla: string): Promise<MesoProps[]> {
    await sleep(1000);
    const { data } = await api.get(
      `/estados/${sigla}/mesorregioes?orderBy=nome`
    );
    return data;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ibge = new Ibge();
export default ibge;
