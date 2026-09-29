import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr", () => {
  test("return a string emtpy when value is false", () => {
    // @ts-expect-error test function without params
    expect(sanitizeStr()).toBe("");
  });

  test("return a string emtpy when value is not a string", () => {
    // @ts-expect-error test function without wrong type
    expect(sanitizeStr(1)).toBe("");
  });

  test("return a string without blank spaces", () => {
    expect(sanitizeStr("    a    ")).toBe("a");
  });

  test("return a string normalization", () => {
    const origin = "e\u0301";
    const expected = "é";
    expect(expected).toBe(sanitizeStr(origin));
  });
});
