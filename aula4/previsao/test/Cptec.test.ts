import Cptec from "../src/services/Cptec";
import api from "../src/services/api";

jest.mock("../src/services/api", () => {
  return {
    get: jest.fn().mockResolvedValue({ data: "response data" }),
  };
});

describe("Classe Cptec", () => {
  it("lista Cidades", async () => {
    const cidade = "santa branca";
    const cptec = new Cptec();
    await cptec.listaCidades(cidade);

    expect(api.get).toHaveBeenCalledWith(
      `/listaCidades?city=${cidade.toLocaleLowerCase()}`
    );
  });

  it("Previsão válida", async () => {
    const id = "4528";
    const cptec = new Cptec();
    await cptec.previsao(id);

    expect(api.get).toHaveBeenCalledWith(`/cidade/${id}/previsao.xml`);
  });
});
