import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getOldIconClass } from "./old-ui-icons";

@customElement("slingr-icon")
export class SlingrIcon extends LitElement {
  //BE CAREFUL THIS IS A COMPONENT THAT DOESNT HAVE SHADOW DOM
  @property({
    attribute: "name",
    converter: (name: string | null) => {
      return name ? getOldIconClass(name) : "";
    }
  })
  iconClass: string = "";

  @property({ attribute: "icon-style" })
  iconStyle: string = "default";

  getIconStyle() {
    const styleClasses: any = {
      default: "text-default",
      primary: "text-primary",
      secondary: "text-secondary",
      info: "text-info",
      success: "text-success",
      danger: "text-danger",
      warning: "text-warning",
    };
    return styleClasses[this.iconStyle] || styleClasses["default"];
  }

  getIconClasses() {
    return `${this.iconClass} ${this.getIconStyle()}`;
  }

  protected render() {
    return this.iconClass
      ? html`<i class=${this.getIconClasses()}></i>`
      : html`Icon name must be provided`;
  }

  protected createRenderRoot() {
    return this;
  }
}
