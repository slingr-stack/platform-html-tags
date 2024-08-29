import { html, LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../slingr-button/slingr-button";
import "../slingr-icon/slingr-icon";

@customElement("slingr-action")
export class SlingrIcon extends LitElement {
  static styles = css`
    a {
      cursor: pointer;
      color: var(--link-color, #00a3e0);
    }

    a:hover,
    a:focus {
      color: var(--link-hover-color, #006b93);
    }
  `;

  @property()
  label: string = "";

  @property()
  icon: string = "";

  @property()
  entity: string = "";

  @property()
  action: string = "";

  @property({
    attribute: "record-ids",
    type: Array,
    converter: (recordIds: string | null) => {
      let ids: Array<string> = [];
      if (typeof recordIds === "string") {
        ids = recordIds.split(",");
      }
      return ids;
    },
  })
  recordIds: Array<string> = [];

  @property({ attribute: "display-type" })
  displayType: "button" | "link" = "button";

  @property({ attribute: "button-style" })
  buttonStyle: string = "default";

  manageClick() {
    let myEvent = new CustomEvent("slingr-tag-action", {
      detail: {
        entity: this.entity,
        action: this.action,
        recordIds: this.recordIds,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  renderAsButton() {
    return html`
      <slingr-button
        @click=${this.manageClick}
        icon=${this.icon}
        label=${this.label}
        button-style=${this.buttonStyle}
      >
      </slingr-button>
    `;
  }

  renderAsLink() {
    return html`
      <a @click=${this.manageClick}>
        ${this.icon ? html`<slingr-icon name=${this.icon}></slingr-icon>` : ""}
        ${this.label || ""}
      </a>
    `;
  }

  showError() {
    return html`Action label must be provided`;
  }

  protected render() {
    return this.label
      ? this.displayType === "link"
        ? this.renderAsLink()
        : this.renderAsButton()
      : this.showError();
  }

  protected createRenderRoot() {
    return this;
  }
}
