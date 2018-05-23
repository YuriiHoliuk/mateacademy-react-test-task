import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

import { validateInput } from "../utils/validate-input";

/**
 * @customElement
 * @polymer
 */
export class FormWrapper extends PolymerElement {
  static get is() {
    return 'form-wrapper';
  }

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

customElements.define(FormWrapper.is, FormWrapper);