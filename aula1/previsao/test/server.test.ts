import request from "supertest";
import app from "../src";

test("previsão/:cidade válido", async () => {
  const nome = "santa branca";
  const response = await request(app).get(`/previsao/${nome}`);

  expect(response.body.nome).toBe("Santa Branca");
});

test("previsão7/:cidade válido", async () => {
  const nome = "santa branca";
  const response = await request(app).get(`/previsao7/${nome}`);

  expect(response.body.nome).toBe("Santa Branca");
});

test("estendida/:cidade válido", async () => {
    const nome = "santa branca";
    const response = await request(app).get(`/estendida/${nome}`);
  
    expect(response.body.nome).toBe("Santa Branca");
  });