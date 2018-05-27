import { FormControl } from './form-control';

export class RadioControl extends FormControl {
  constructor(inputEl, validators) {
    super(inputEl, validators);

    this.inputElements = [inputEl];
    this.errorElement = inputEl.parentElement.querySelector('.invalid-feedback');
  }

  get value() {
    const checked = this.inputElements.find(el => el.checked);

    if (!checked) return;

    return checked.value;
  }

  addControl(inputEl) {
    this.inputElements.push(inputEl);
    this.inputElement = inputEl;
    this.errorElement = inputEl.parentElement.querySelector('.invalid-feedback');
  }

  setErrors(errors) {
    super.setErrors(errors);

    if (!!errors) {
      this.inputElements.forEach(el => el.classList.add('is-invalid'));
      this.inputElements.forEach(el => el.classList.remove('is-valid'));
    } else {
      this.inputElements.forEach(el => el.classList.add('is-valid'));
      this.inputElements.forEach(el => el.classList.remove('is-invalid'));
    }
  }
}