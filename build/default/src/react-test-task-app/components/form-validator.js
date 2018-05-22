import { PolymerElement, html } from "../../../node_modules/@polymer/polymer/polymer-element.js";
import { dom } from "../../../node_modules/@polymer/polymer/lib/legacy/polymer.dom.js";
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

  connectedCallback() {
    this.form = dom(this).queryDistributedElements('form')[0];
    this.inputs = dom(this.form).queryDistributedElements('[name]');
    this.form.addEventListener('submit', event => {
      event.stopPropagation();
      event.preventDefault();

      if (this.validate()) {
        this.dispatchEvent(new CustomEvent('submit', {
          detail: this.serialize()
        }));
      }
    });
  }

  validate() {
    return this.inputs.reduce((res, _input) => {
      return !!_input.value ? res : !!_input.value;
    }, true);
  }

  serialize() {
    return this.inputs.reduce((res, {
      name,
      value
    }) => {
      res[name] = value;
      return res;
    }, {});
  }

}
customElements.define('form-validator', FormValidator);