import { NextFunction, Request, Response } from "express";
import PrevisaoController from "../src/controllers/PrevisaoController";

jest.mock("../src/services/Cptec", () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return {
        listaCidades: jest.fn().mockImplementation(() => {
          return "<note><cidade>teste</cidade><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
        }),
      };
    })
    .mockImplementationOnce(() => {
      return {
        listaCidades: jest.fn().mockImplementation(() => {
          return undefined;
        }),
      };
    })
    .mockImplementationOnce(() => {
      return {
        previsao: jest.fn().mockImplementation(() => {
          return "<note><cidade>teste</cidade><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
        }),
      };
    })
    .mockImplementationOnce(() => {
      return {
        previsao: jest.fn().mockImplementation(() => {
          return undefined;
        }),
      };
    });
});

describe("Testes previsao", () => {
  test("Lista Cidades válido", async () => {
    const req = { params: { cidade: "santa branca" } } as unknown as Request;
    const res = { locals: jest.fn() } as unknown as Response;
    const next = jest.fn();

    await PrevisaoController.listaCidades(req, res, next);
    expect(res.locals).not.toBeNull();
    expect(next).toHaveBeenCalled();
  });

  test("listaCidades invalido", async () => {
    const req = { params: { cidade: "santa branca" } } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn();

    await PrevisaoController.listaCidades(req, res, next);
    expect(res.json).toHaveBeenCalled();
  });

  test("previsao valido", async () => {
    const req = {} as unknown as Request;
    const res = {
      locals: { id: "4528" },
      json: jest.fn(),
    } as unknown as Response;

    await PrevisaoController.previsao(req, res);

    expect(res.json).not.toHaveBeenCalledWith({
      message: expect.any(TypeError),
    });
  });

  test("previsao invalida", async () => {
    const req = {} as unknown as Request;
    const res = {
      locals: { id: "4528" },
      json: jest.fn(),
    } as unknown as Response;

    await PrevisaoController.previsao(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: expect.any(TypeError) });
  });
});
