import { html, LitElement, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isValidId, objectToUrlParams } from "../../utils/globalUtils";

type TargetType = "self" | "new" | "modal";

@customElement("slingr-link")
export class SlingrIcon extends LitElement {
  static styles = css`
    a {
      text-decoration: none;
      cursor: pointer;
      color: var(--link-color, #00a3e0);
    }

    a:hover,
    a:focus {
      color: var(--link-hover-color, #006b93);
    }
  `;
  @property({ attribute: "view" })
  viewIdOrName: string = "";

  @property({
    attribute: "view-type",
    converter: (viewType: string | null) => {
      if (viewType === "create") return "ADD";
      if (viewType === "edit") return "EDIT";
      if (viewType === "readOnly") return "READ_ONLY";
      return null;
    },
  })
  viewType: "ADD" | "EDIT" | "READ_ONLY" | null = null;

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
  params: { [key in string]: string } = {};

  manageClick() {
    const myEvent = new CustomEvent("slingr-tag-navigate", {
      detail: {
        view: this.viewIdOrName,
        viewType: this.viewType,
        recordId: this.recordId,
        params: this.params,
        target: this.target,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
  }

  canBuildHref() {
    if (!isValidId(this.viewIdOrName) || this.target === "modal") return false;
    if (this.recordId && !this.viewType) return false;
    if (this.viewType && this.viewType !== "ADD" && !this.recordId)
      return false;
    return true;
  }

  getHref() {
    let href = "#views/" + this.viewIdOrName;
    if (this.viewType) {
      if (this.viewType === "ADD") {
        href += "/create?createViewId";
      }

      if (this.viewType === "EDIT") {
        href += "/edit/" + this.recordId;
      }

      if (this.viewType === "READ_ONLY") {
        href += "/readOnly/" + this.recordId;
      }
    } else if (this.params) {
      const encodedParams = objectToUrlParams(this.params);
      href += encodedParams ? "?" + encodedParams : "";
    }
    return href;
  }

  renderWithHref() {
    return html`
      <a
        href=${this.getHref()}
        target=${this.target === "new" ? "_blank" : nothing}
        rel=${this.target === "new" ? "noopener noreferrer" : nothing}
      >
        <slot></slot>
      </a>
    `;
  }

  renderWithoutHref() {
    return html`
      <a @click=${this.manageClick}>
        <slot></slot>
      </a>
    `;
  }

  protected render() {
    return this.canBuildHref()
      ? this.renderWithHref()
      : this.renderWithoutHref();
  }
}
