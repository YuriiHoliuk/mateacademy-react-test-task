import { CaseFormatter } from '../utils/case-formatter';

export class FormControl {
  constructor(inputEl, validators) {
    this.inputElement = inputEl;
    this.name = inputEl.name;
    this.errorElement = inputEl.parentElement.querySelector('.invalid-feedback');
    this.validators = validators;
    this.errors = null;
  }

  get value() {
    return this.inputElement.value;
  }

  validate() {
    if (!this.validators) {
      this.valid = true;
      this.errorElement.innerText = '';
      this.inputElement.classList.add('is-valid');
      return this.valid;
    }

    const errors = this.validators.reduce((errors, validatorFn) => {
      const error = validatorFn(this.value);

      if (errors && error) {
        return { ...errors, ...error };
      } else if (error) {
        return error;
      } else {
        return errors;
      }
    }, null);

    this.setErrors(errors);

    this.valid = !errors;

    return this.valid;
  }

  setErrors(errors) {
    this.errors = errors;

    if (!errors) {
      this.errorElement.innerText = '';
      this.inputElement.classList.add('is-valid');
      this.inputElement.classList.remove('is-invalid');
      return;
    }

    this.inputElement.classList.add('is-invalid');
    this.inputElement.classList.remove('is-valid');

    const normalizedName = CaseFormatter.camelToNormal(this.name);

    if (errors.required) {
      this.errorElement.innerText = `${normalizedName} is required`;
      return;
    }

    if (errors.disallowed) {
      this.errorElement.innerText = `${normalizedName} has disallowed symbols`;
      return;
    }

    if (errors.format) {
      this.errorElement.innerText = `${normalizedName} format is invalid`;
    }
  }
}