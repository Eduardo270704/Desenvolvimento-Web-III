import somarArray from "../src/array";

const mOperacao = {
  somar: jest.fn().mockImplementation((a, b) => a + b),
};

jest.mock("../src/Operacao", () => ({
  __esModule: true,
  default: jest.fn(() => mOperacao),
}));

it("Somar array", () => {
  const r = somarArray([1, 2, 3, 4]);
  expect(mOperacao.somar).toHaveBeenCalledTimes(4);
  expect(mOperacao.somar).toHaveBeenCalledWith(
    expect.any(Number),
    expect.any(Number)
  );
  expect(r).toBe(10);
});
