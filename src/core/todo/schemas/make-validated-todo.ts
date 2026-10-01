export type ValidateTodoDedcription = {
  success: boolean;
  errors: string[];
};

export function validateTodoDerscription(
  description: string,
): ValidateTodoDedcription {
  const errors = [];
  if (description.length <= 3) {
    errors.push("Description should have more than 3 caracteres");
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
