import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as validateTodoDerscriptionMod from "../schemas/make-validated-todo";
import { Todo } from "../schemas/todo.contract";
import * as makeNewTodoMod from "./make-new-todo";
import {
  InvalidTodo,
  makeValidatedTodo,
  ValidTodo,
} from "./make-validated-todo";

const makeMocks = (description = "abc") => {
  const errors = ["any", "error"];
  const todo: Todo = {
    id: "id",
    description,
    createdAt: "any-date",
  };
  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDerscriptionMod, "validateTodoDerscription")
    .mockReturnValue({ errors: [], success: true });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  return {
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
    errors,
  };
};
describe("makeValidatedTodo", () => {
  test("should call sanitize function with correct value", () => {
    const { description, sanitizeStrSpy } = makeMocks();

    makeValidatedTodo(description);

    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test("should call validateTodoDescription with sanitize return", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    const sanitizeStrRetun = "return";
    sanitizeStrSpy.mockReturnValue(sanitizeStrRetun);

    makeValidatedTodo(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrRetun,
    );
  });
  test("should call makeNewTodo if validate description return successfully", () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;
    console.log(result);
    expect(result.success).toBe(true);
    expect(result.data.id).toBe("id");
    expect(result.data.description).toBe("abc");
    expect(result.data.createdAt).toBe("any-date");
  });
  test("should return validateDescription.error if validation falied", () => {
    const { description, validateTodoDescriptionSpy, errors } = makeMocks();

    validateTodoDescriptionSpy.mockReturnValue({
      errors,
      success: false,
    });
    const result = makeValidatedTodo(description) as InvalidTodo;
    console.log(result);

    expect(result).toStrictEqual({ errors, success: false });
  });
});
