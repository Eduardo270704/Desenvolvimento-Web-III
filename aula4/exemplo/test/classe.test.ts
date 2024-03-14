import somarArray from "../src/array";

jest.mock("../src/Operacao", () => {
  const mOperacao = {
    somar: jest.fn().mockImplementation((a, b) => a + b),
  };
  return jest.fn(() => mOperacao);
});

it("Somar array", () => {
  const r = somarArray([1, 2, 3, 4]);
  expect(r).toBe(10);
});
