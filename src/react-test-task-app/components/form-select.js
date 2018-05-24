import { PolymerElement, html } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat';

import { validateInput } from "../utils/validate-input";

export class FormSelect extends PolymerElement {
  static get is() {
    return 'form-select';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;
          --danger-color: #AB2430;
        }
        
        .wrapper {
          position: relative;
          padding-bottom: 26px;
        }
        
        .error {
          font-size: 12px;
          line-height: 16px;
          color: var(--danger-color);
          
          position: absolute;
          bottom: 0;
          left: 0;
          
          margin: 0;
          padding: 5px 10px 5px 0;
        }
        
        .label.invalid {
          color: var(--danger-color);
        }
      </style>

      <div class="wrapper">
        <p class$="[[labelClass(valid)]]">[[_label(label)]]</p>
        
        <select name="[[name]]" disabled="[[disabled]]" on-change="onChange">
          <option value="" selected disabled hidden>Choose [[label]]</option>
          
          <dom-repeat items="[[options]]">
            <template is="dom-repeat" items="[[options]]">
              <option selected="[[_selected(item.value)]]" value="[[item.value]]">[[item.label]]</option>
            </template>
          </dom-repeat>
        </select>
        
        <p class="error">[[error]]</p>
      </div>
    `;
  }

  static get properties() {
    return {
      name: String,
      required: Boolean,
      value: {
        type: String,
        value: ''
      },
      label: String,
      options: Array,
      error: String,
      valid: {
        type: Boolean,
        value: true,
        readOnly: true
      },
      disabled: Boolean,
      validateOnChange: Boolean
    }
  }

  validate() {
    if (this.required && !this.value) {
      this._setValid(false);
      return { required: true };
    }

    this._setValid(true);
    return null;
  }

  onChange(event) {
    event.stopPropagation();

    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));

    if (this.validateOnChange) {
      validateInput(this.valid, this);
    }
  }

  _label(label) {
    return `${label}${label && this.required ? '*' : ''}`;
  }

  _selected(value) {
    return value === this.value;
  }

  labelClass(valid) {
    return `label${!valid ? ' invalid' : ''}`;
  }
}

customElements.define(FormSelect.is, FormSelect);
