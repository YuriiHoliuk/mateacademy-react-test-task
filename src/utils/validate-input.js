import { CaseFormatter } from './case-formatter';

/**
* Validation helper
 *
 * Perform input validation and setup control errors with normalized input name
 *
 * @param {boolean} defaultValue (previous state(valid/invalid) to use inside ```reduce``` method)
 * @param {InputElement} input should have ```name``` and ```error``` properties and ```validate()``` method.
 * Can be custom element.
 *
 * @return {boolean} ```false``` if validation not passed, else ```defaultValue```
*
* */
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