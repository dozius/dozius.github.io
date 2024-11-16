// VOD section on an event page
class VODElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    let titleText = "YouTube video player";

    if (this.hasAttribute("title")) {
      titleText = this.getAttribute("title");
    }

    const container = document.createElement("div");
    container.setAttribute("style", "position: relative; padding-top: 56.25%;");

    const frame = document.createElement("iframe");
    frame.setAttribute("title", titleText);
    frame.setAttribute("width", "100%");
    frame.setAttribute("height", "100%");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("allowfullscreen", "");
    frame.setAttribute("sandbox", "allow-same-origin allow-scripts allow-popups allow-forms");
    frame.setAttribute("src", "https://makertube.net/videos/embed/" + this.getAttribute("id") + "?warningTitle=0&amp;p2p=0");
    frame.setAttribute("style", "position: absolute; inset: 0px;");
    container.appendChild(frame);

    shadow.appendChild(container)
  }
}

customElements.define("x-vod", VODElement);
