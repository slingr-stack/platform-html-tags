import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

type TargetType = "self" | "new" | "modal";

@customElement("slingr-link")
export class SlingrIcon extends LitElement {
  static styles = css`
    a {
      cursor: pointer;
      color: var(--link-color, #00A3E0);
    }

    a:hover,
    a:focus {
      color: var(--link-hover-color, #006b93);
    }
  `;
  @property()
  view: string = "";

  @property({ attribute: "record-id" })
  recordId: string = "";

  @property({
    attribute: "target",
    converter: (target: string | null) => {
      if (target !== "modal" && target !== "new" && target !== "self") {
        return "self";
      } else {
        return target;
      }
    },
  })
  target: TargetType = "self";

  @property({ type: Object })
  filters: { [key in string]: string } = {};

  @property({ type: Object })
  params: { [key in string]: string } = {};

  manageClick() {
    let myEvent = new CustomEvent("slingr-tag-navigate", {
      detail: {
        view: this.view,
        recordId: this.recordId,
        filters: this.filters,
        params: this.params,
        target: this.target,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  protected render() {
    return html`
      <a @click=${this.manageClick}>
        <slot></slot>
      </a>
    `;
  }
  
}
