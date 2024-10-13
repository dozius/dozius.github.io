import { DateTime } from "/lib/luxon.min.js"

class EventSchedule extends HTMLElement {
  #timeZone = "America/Toronto";
  #startTimeFormat = "yyyy-MM-dd hh:mm";
  #timeStringFormat = "yyyy-MM-dd hh:mm a";
  #baseUrl = "https://www.twitch.tv/";

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    if (!this.hasAttribute('start-time')) {
      throw Error("start-time must be set");
    }

    const dateTime = DateTime;
    var currentTime = dateTime.fromFormat(this.getAttribute("start-time"), this.#startTimeFormat, { zone: this.#timeZone });

    const schedule = document.createElement("div");
    schedule.setAttribute("class", "event-schedule");

    for (const timeslot of this.querySelectorAll("x-event-time-slot")) {
      const link = document.createElement("a");
      link.setAttribute("class", "event-time-slot-box");
      link.setAttribute("target", "_blank");
      link.setAttribute("href", this.#baseUrl +  timeslot.getAttribute("twitch-name"));

      const link_time = document.createElement("div");
      link_time.setAttribute("class", "event-time-slot-time");
      link_time.innerHTML = currentTime.toLocal().toFormat(this.#timeStringFormat);
      currentTime = currentTime.plus({ minutes: timeslot.getAttribute("duration") });

      const link_artist = document.createElement("div");
      link_artist.setAttribute("class", "event-time-slot-artist");
      link_artist.innerHTML = timeslot.getAttribute("artist-name");

      const link_right = document.createElement("div");
      link_right.setAttribute("class", "event-time-slot-right");

      const i = document.createElement("i");
      i.setAttribute("class", "fas fa-arrow-up-right-from-square");
      link_right.appendChild(i);

      link.appendChild(link_time);
      link.appendChild(link_artist);
      link.appendChild(link_right);
      schedule.appendChild(link);

      timeslot.remove();
    }

    const style = document.createElement("style");
    style.textContent = `
      @import url("/fonts/fontawesome/css/fontawesome.min.css");
      @import url("/fonts/fontawesome/css/solid.min.css");

      .event-schedule{
        display: block;
        margin: auto;
        width: 100%;
      }

      .event-time-slot-box {
        display: flex;
        margin-bottom: -1px;
        padding: 1ch;
        border: solid var(--accent_color) 1px;
        color: var(--fg_color);
        font-size: 1rem;
        text-decoration: none;
        transition: all .25s cubic-bezier(.08,.59,.29,.99);
      }

      .event-time-slot-box:hover {
        background-color: var(--accent_color);
        color: var(--bg_color);
      }

      .event-time-slot-time {
        flex: 3;
        text-align: left;
        align-self: center;
        color: var(--accent_color);
      }

      .event-time-slot-box:hover .event-time-slot-time {
        color: var(--bg_color);
      }

      .event-time-slot-artist {
        flex:3;
        align-self: center;
        text-align: left;
      }

      .event-time-slot-right {
        flex: 1;
        align-self: center;
        text-align: right;
        color: var(--accent_color);
      }

      .event-time-slot-box:hover .event-time-slot-right {
        color: var(--bg_color);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(schedule);
  }
}

class EventTimeSlot extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.hasAttribute('twitch-name')) {
      throw Error("twitch-name must be set");
    }

    if (!this.hasAttribute("artist-name")) {
      throw Error("artist-name must be set");
    }

    if (!this.hasAttribute("duration")) {
      throw Error("duration must be set");
    }
  }
}

// export const registerEventScheduleComponent =  () => {
  customElements.define('x-event-schedule', EventSchedule);
  customElements.define('x-event-time-slot', EventTimeSlot);
// }
