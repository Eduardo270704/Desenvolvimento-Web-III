import Cptec from "../src/services/Cptec";

test("Lista Cidades válido", async () => {
  const cidade = "santa branca";
  const cptec = new Cptec();
  const resp = await cptec.listaCidades(cidade);

  expect(resp).toMatch(/santa branca/i);
});

test("Previsão válida", async () => {
  const id = "4528";
  const cptec = new Cptec();
  const resp = await cptec.previsao(id);

  expect(resp).toMatch(/santa branca/i);
});

test("Previsão 7 Dias válida", async () => {
  const id = "4528";
  const cptec = new Cptec();
  const resp = await cptec.previsao7dias(id);

  expect(resp).toMatch(/santa branca/i);
});

test("Previsão Estendida válida", async () => {
  const id = "4528";
  const cptec = new Cptec();
  const resp = await cptec.previsaoEstendida(id);

  expect(resp).toMatch(/santa branca/i);
});
