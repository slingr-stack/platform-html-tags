import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isValidStyle } from "../../utils/stylesUtils";
import "../slingr-icon/slingr-icon";

@customElement("slingr-button")
export class slingrButton extends LitElement {
  @property()
  label: string = "";

  @property()
  icon: string = "";

  @property()
  href: string = "";

  @property({
    attribute: "button-style",
    converter: (buttonStyle: string | null) => {
      return isValidStyle(buttonStyle) ? buttonStyle : "default";
    },
  })
  buttonStyle: string = "default";

  render() {
    return this.href
      ? html`
          <a class="btn btn-${this.buttonStyle}" href="${this.href}">
            <div class="btnContent">
              ${this.icon
                ? html`<slingr-icon name=${this.icon}></slingr-icon>`
                : ""}
              ${this.label || ""}
            </div>
          </a>
        `
      : html`
          <button
            class="slingr__button btn btn-${this
              .buttonStyle} waves-effect waves-button"
          >
            <div class="btnContent">
              ${this.icon
                ? html`<slingr-icon name=${this.icon}></slingr-icon>`
                : ""}
              ${this.label || ""}
            </div>
          </button>
        `;
  }

  protected createRenderRoot() {
    return this;
  }
}
