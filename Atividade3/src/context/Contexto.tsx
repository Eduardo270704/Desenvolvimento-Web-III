import { createContext, useEffect, useState } from "react";
import { ContextProps, MesoProps, RegiaoProps, UfProps } from "../types";
import ibge from "../services/Ibge";

export const ContextIBGE = createContext({} as ContextProps);

export function Provedor({ children }: any) {
  const [regioes, setRegioes] = useState([] as RegiaoProps[]);
  const [ufs, setUfs] = useState([] as UfProps[]);
  const [mesorregioes, setMesorregioes] = useState([] as MesoProps[]);
  const [loadingUfs, setLoadingUfs] = useState(false);
  const [loadingMesos, setLoadingMesos] = useState(false);

  useEffect(() => {
    ibge.getRegioes().then((data) => setRegioes(data));
  },[]);
  

  const getUfs = async (id: number) => {
    setLoadingUfs(true);
    const data = await ibge.getUfPorRegiao(id);
    setUfs(data);
    setLoadingUfs(false);
  }
  const getMesos = async (sigla: string) => {
    setLoadingMesos(true);
    const data = await ibge.getMesoPorUf(sigla);
    setMesorregioes(data);
    setLoadingMesos(false);
  }

  return <ContextIBGE.Provider value={{ regioes, ufs, getUfs, mesorregioes ,getMesos, loadingUfs, loadingMesos  }}>{children}</ContextIBGE.Provider>;
}