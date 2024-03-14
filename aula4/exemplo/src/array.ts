import Operacao from "./Operacao";

export default function somarArray(vet: number[]) {
  const operacao = new Operacao();
  let r = 0;
  for (let i = 0; i < vet.length; i++) {
    r = operacao.somar(r, vet[i]);
  }
  return r;
}
