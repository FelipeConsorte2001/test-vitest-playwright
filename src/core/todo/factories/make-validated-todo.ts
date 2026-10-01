import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDerscription } from "../schemas/make-validated-todo";
import { Todo } from "../schemas/todo.contract";
import { makeNewTodo } from "./make-new-todo";

export type InvalidTodo = {
  success: false;
  errors: string[];
};

export type ValidTodo = {
  success: true;
  data: Todo;
};

type MakeValidatedTodo = ValidTodo | InvalidTodo;

export function makeValidatedTodo(description: string): MakeValidatedTodo {
  const cleanDescription = sanitizeStr(description);
  const validateDescription = validateTodoDerscription(cleanDescription);

  if (validateDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    errors: validateDescription.errors,
    success: false,
  };
}
