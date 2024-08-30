import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("slingr-tooltip")
export class SlingrIcon extends LitElement {
  @property()
  message: string = "";

  @property({
    converter: (position: string | null) => {
      return ["top", "bottom", "left", "right"].includes(position || "") ? position : "bottom";
    },
  })
  position: string = "bottom";

  firstUpdated() {
    if(!(<any>window).$) return;
    (<any>window).$(this).tooltip({
      container: "body",
      title: this.message,
      placement: this.position,
    });
  }

  protected createRenderRoot() {
    return this;
  }
}
