import { CaseFormatter } from "./case-formatter";

export function validateInput(defaultValue, input) {
  const errors = input.validate();

  if (!!errors) {
    const normalizedName = CaseFormatter.camelToNormal(input.name);

    if (errors.required) {
      input.error = `${normalizedName} is required`;
    } else if (errors.disallowed) {
      input.error = `${normalizedName} has disallowed symbols (${input.disallowed.join(', ')})`
    } else if (errors) {
      input.error = `${normalizedName} format is invalid`;
    }

    return false;

  } else {
    input.error = null;

    return defaultValue;
  }
}