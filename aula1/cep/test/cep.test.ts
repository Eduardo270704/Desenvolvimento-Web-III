import { CepController } from "../src/controllers";
import { Request, Response } from "express";

test("Cep válido", async () => {
    const req = { body: { cep: "12312400" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await CepController.list(req, res);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "cep": "12312-400"
        })
    );
});

test("Cep inválido", async () => {
    const req = { body: { cep: "12300000" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await CepController.list(req, res);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "erro": "true"
        })
    );
});

test("Cep inválido", async () => {
    const req = { body: { cep: "" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await CepController.list(req, res);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
            "message": "Request failed with status code 400"
        })
    );
});