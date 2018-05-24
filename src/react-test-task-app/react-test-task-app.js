import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import './components/app-header.js';
import './components/form-wrapper.js';
import './components/form-field.js';
import './components/radio-button.js';
import './components/radio-group.js';

/**
 * @customElement
 * @polymer
 */
class ReactTestTaskApp extends PolymerElement {
  static get is() {
    return 'react-test-task-app';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
        form-field,
        radio-group {
          padding-bottom: 10px;
        }
        
        .buttons {
          margin-top: 40px;
        }
      </style>
      
      <app-header></app-header>
      
      <form-wrapper validate-on-change on-submit="onSubmit">
        <form id="form" slot="form">
          <form-field name="firstName"required disallowed="[[disallowed]]" label="First name"></form-field>
          <form-field name="lastName" required disallowed="[[disallowed]]" label="Last name"></form-field>
          <form-field name="birthday" type="date" required max="[[today]]" label="Birthday" always-active-label></form-field>
          
          <radio-group name="sex" required label="Sex">
            <radio-button value="male" label="Male"></radio-button>
            <radio-button value="female" label="Female"></radio-button>
          </radio-group>
          
          <form-field name="email" type="email" required disallowed="[[disallowed]]" pattern="[[emailRegEx]]" label="Email"></form-field>
          <form-field name="password" type="password" required disallowed="[[disallowed]]" label="Password"></form-field>
          <form-field name="address" required disallowed="[[disallowed]]" label="Address"></form-field>

          <div class="buttons">
            <button>Submit</button>
          </div>
        </form>
      </form-wrapper>
    `;
  }

  constructor() {
    super();

    this.emailRegEx = '([a-z0-9][-a-z0-9_\\+\\.]*[a-z0-9])@([a-z0-9][-a-z0-9\\.]*[a-z0-9]\\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\\.{3}[0-9]{1,3}))';
    this.disallowed = ['\'', '\"'];
    this.today = new Date().toISOString().split('T')[0]; // TODO: make it better
  }

  onSubmit(event) {
    console.log(event.detail);
  }
}

window.customElements.define(ReactTestTaskApp.is, ReactTestTaskApp);
