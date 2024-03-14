import { NextFunction, Request, Response } from "express";
import PrevisaoController from "../src/controllers/PrevisaoController";

test("Lista Cidades válido", async () => {
  const req = { params: { cidade: "santa branca" } } as unknown as Request;
  const res = { locals: jest.fn() } as unknown as Response;
  const next = jest.fn();

  await PrevisaoController.listaCidades(req, res, next);
  expect(res.locals).toEqual({
    id: "4528",
    nome: "Santa Branca",
    uf: "SP",
  });
});

test("Previsão 7 Dias válida", async () => {
  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    locals: { id: "4528" },
  } as unknown as Response;

  await PrevisaoController.previsao7dias(req, res);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      nome: "Santa Branca",
    })
  );
});

test("Previsão Válida", async () => {
  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    locals: { id: "4528" },
  } as unknown as Response;

  await PrevisaoController.previsao(req, res);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      nome: "Santa Branca",
    })
  );
});

test("Previsão Estendida válida", async () => {
  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    locals: { id: "4528" },
  } as unknown as Response;

  await PrevisaoController.previsaoEstendida(req, res);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      nome: "Santa Branca",
    })
  );
});
