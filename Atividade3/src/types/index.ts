export interface RegiaoProps {
  id: number;
  sigla: string;
  nome: string;
}

export interface UfProps {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoProps;
}

export interface MesoProps {
  id: number;
  nome: string;
  uf: UfProps;
}

export interface ContextProps {
  regioes: RegiaoProps[];
  ufs: UfProps[];
  mesorregioes: MesoProps[];
  getUfs: (id: number) => void;
  getMesos: (sigla: string) => void;
  loadingUfs: boolean;
  loadingMesos: boolean;
}