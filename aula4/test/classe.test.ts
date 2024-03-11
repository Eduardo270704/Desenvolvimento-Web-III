import somarArray from "../src/array";

it("somar array", () => {
  const r = somarArray([1, 2, 3, 4]);
  expect(r).toBe(10);
});
