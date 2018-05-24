import { PolymerElement, html } from '@polymer/polymer';

/**
 * @customElement
 * @polymer
 */
export class RadioButton extends PolymerElement {
  static get is() {
    return 'radio-button';
  }

  static get template() {
    return html`
      <label>
        <input id="input" on-change="onChange" value="[[value]]" type="radio">
        [[label]]
      </label>
    `;
  }

  static get properties() {
    return {
      value: String,
      label: String,
      checked: {
        type: Boolean,
        observer: '_changeChecked',
        reflectToAttribute: true
      }
    };
  }

  onChange(event) {
    event.stopPropagation();

    if (this.checked) {
      return;
    }

    this.checked = event.target.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
  }

  _changeChecked(checked) {
    // TODO: binding do not work
    this.$.input.checked = checked;
  }
}

customElements.define(RadioButton.is, RadioButton);