import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isValidStyle } from "../../utils/stylesUtils";

@customElement("slingr-icon")
export class SlingrIcon extends LitElement {
  //BE CAREFUL THIS IS A COMPONENT THAT DOESNT HAVE SHADOW DOM
  @property({
    attribute: "name",
    converter: (name: string | null) => {
      return name ? `zmdi zmdi-${name.toLowerCase()}` : "";
    }
  })
  iconClass: string = "";

  @property({
    attribute: "icon-style",
    converter: (buttonStyle: string | null) => {
      return isValidStyle(buttonStyle) ? buttonStyle : "default";
    },
  })
  iconStyle: string = "default";

  protected render() {
    return this.iconClass
      ? html`<i class="${this.iconClass} text-${this.iconStyle}"></i>`
      : html`Icon name must be provided`;
  }

  protected createRenderRoot() {
    return this;
  }
}
