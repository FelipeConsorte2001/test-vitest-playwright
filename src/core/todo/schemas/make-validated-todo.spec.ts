import { validateTodoDerscription } from "./make-validated-todo";

describe("validateTodoDerscription", () => {
  test("should return successs when description have more than 4 caracters", () => {
    const description = "abc";
    const res = validateTodoDerscription(description);
    expect(res.errors).toStrictEqual([
      "Description should have more than 3 caracteres",
    ]);

    expect(res.success).toBe(false);
  });

  test("should return error when description have less than 3 caracters", () => {
    const description = "abcb";
    const res = validateTodoDerscription(description);
    expect(res.errors).toStrictEqual([]);

    expect(res.success).toBe(true);
  });
});
