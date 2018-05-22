import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

function validateInput(defaultValue, input) {
  const errors = input.validate();

  if (!!errors) {

    if (errors.required) {
      input.error = `${input.name} is required`;
    } else if (errors) {
      input.error = `${input.name} format is invalid`;
    }

    return false;

  } else {
    input.error = null;

    return defaultValue;
  }
}

export class FormValidator extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          max-width: 640px;
          margin: 0 auto;
          padding-top: 40px;
        }
      </style>

      <slot name="form"></slot>
    `;
  }

  static get properties() {
    return {
      validateOnChange: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready();

    this.form = dom(this).queryDistributedElements('form')[0];
    this.inputs = dom(this.form).queryDistributedElements('[name]');

    this.form.addEventListener('submit', (event) => {
      event.stopPropagation();
      event.preventDefault();

      if (this.validate()) {
        this.dispatchEvent(new CustomEvent('submit', { detail: this.serialize() }));
      }
    });

    if (this.validateOnChange) {
      this.inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input.valid, input));
      });
    }
  }

  validate() {
    return this.inputs
      .filter(_input => !_input.disabled)
      .reduce(validateInput, true);
  }

  serialize() {
    return this.inputs.reduce((res, { name, value }) => {
      res[name] = value;
      return res;
    }, {});
  }
}

customElements.define('form-validator', FormValidator);