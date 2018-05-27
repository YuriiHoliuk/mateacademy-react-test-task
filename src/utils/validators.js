import { EMAIL_REG_EX } from '../constants/regex';

window.emailRegEx = EMAIL_REG_EX;

export function requiredValidator(value) {
  if (!!value) {
    return null;
  }

  return { required: true };
}

export function disallowedSymbolsValidator(value) {
  if (!/'|"/.test(value)) {
    return null;
  }

  return { disallowed: true };
}

export function emailValidator(value) {
  if (EMAIL_REG_EX.test(value)) {
    return null;
  }

  return { format: true };
}

export function lessThanNowValidator(value) {
  const date = new Date(value).getTime();
  const today = new Date().getTime();

  if (date <= today) {
    return null;
  }

  return { format: true };
}