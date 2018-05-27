import { FormControl } from './form-control';
import { RadioControl } from './radio-control';

export class FormGroup {
  constructor(formEl, validators) {
    this.formElement = formEl;
    this.validators = validators;

    this.setControls();
  }

  setControls() {
    const elements = [];

    for (const element of this.formElement.elements) {
      elements.push(element);
    }

    const controlsMap = elements
      .filter(el => !!el.name)
      .reduce((controls, inputEl) => {
        const name = inputEl.name;
        const type = inputEl.type;

        if (type !== 'radio') {
          controls[name] = new FormControl(inputEl, this.validators[name]);
        } else {
          if (controls[name]) {
            controls[name].addControl(inputEl);
          } else {
            controls[name] = new RadioControl(inputEl, this.validators[name]);
          }
        }

        return controls;
      }, {});

    this.controls = Object.values(controlsMap);
  }

  validate() {
    this.controls.forEach(control => control.validate());

    this.valid = !this.controls
      .map(control => control.valid)
      .filter((valid) => valid === false)
      .length;

    return this.valid;
  }
}