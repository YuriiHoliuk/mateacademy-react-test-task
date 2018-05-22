import { html, PolymerElement } from "../../../node_modules/@polymer/polymer/polymer-element.js";
/**
 * @customElement
 * @polymer
 */

class AppHeader extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Arial, Verdana, sans-serif;
        }
        
        header {
          min-height: 60px;
          padding: 0 40px;
          
          background-color: lightskyblue;
          color: white;
          box-shadow: dimgray 0 2px 10px 0;
        }
        
        h1 {
          max-width: 960px;
          margin: 0 auto;
          line-height: 60px;
        }
      </style>
      
      <header>
        <h1>Form with validation</h1>
      </header>
    `;
  }

}

window.customElements.define('app-header', AppHeader);