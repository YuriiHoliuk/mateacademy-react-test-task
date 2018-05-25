import { PolymerElement, html } from '@polymer/polymer';

/**
 * Wrapper for ```<input type="radio">```
 *
 * Render passed label
 *
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
        <input id="input" on-change="onChange" disabled="[[disabled]]" value="[[value]]" type="radio">
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
      },
      disabled: Boolean
    };
  }

  /**
  * Redispatch change event
   *
   * Dispatched event contains current value in ```detail``` property
   *
  * @param {Event} event
  * */
  onChange(event) {
    event.stopPropagation();

    if (this.checked) {
      return;
    }

    this.checked = event.target.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }))
  }

  /**
  * Observer: Change ```<input>``` ```checked``` property
   *
  * TODO: remove this method and bind directly inside template
  * */
  _changeChecked(checked) {
    // TODO: binding do not work
    this.$.input.checked = checked;
  }
}

customElements.define(RadioButton.is, RadioButton);