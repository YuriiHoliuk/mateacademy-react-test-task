import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

import './components/app-header.js';
import './components/form-wrapper.js';
import './components/form-field.js';
import {CaseFormatter} from "./utils/case-formatter";


/**
 * @customElement
 * @polymer
 */
class ReactTestTaskApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        
        form-field {
          padding-bottom: 10px;
        }
        
        .buttons {
          margin-top: 40px;
        }
      </style>
      
      <app-header></app-header>
      
      <form-wrapper validate-on-change on-submit="onSubmit">
        <form id="form" slot="form">
          <form-field required name="firstName" label="First name"></form-field>
          <form-field required name="lastName" label="Last name"></form-field>
          <form-field always-active-label required type="date" name="birthday" label="Birthday"></form-field>
          <form-field required name="email" type="text" pattern="[[emailRegEx]]" label="Email"></form-field>

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
  }

  onSubmit(event) {
    console.log(event);
  }

  handleInput(event) {
    console.log(event);
  }

  handleFormatTest(event) {
    this.formatted = CaseFormatter.camelToNormal(event.detail);
  }
}

window.customElements.define('react-test-task-app', ReactTestTaskApp);
