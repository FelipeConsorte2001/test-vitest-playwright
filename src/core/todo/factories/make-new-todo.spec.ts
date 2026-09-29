import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo", () => {
  test("should return a new todo valid", () => {
    const expectedTodo = {
      id: expect.any(String),
      description: "description",
      createdAt: expect.any(String),
    };

    const newTodo = makeNewTodo(expectedTodo.description);

    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
