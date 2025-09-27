import { DateTime } from "/lib/luxon.min.js"

class EventCountdown extends HTMLElement {
  #timeZone = "America/Toronto";
  #startTimeFormat = "yyyy-MM-dd hh:mm";

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['date', 'heading', 'end-heading', 'link'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name.replace(/-/g, '')] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('date')) {
      throw Error("date must be set");
    }

    if (!this.hasAttribute('heading')) {
      throw Error("heading must be set");
    }

    if (!this.hasAttribute('end-heading')) {
      throw Error("end-heading must be set");
    }

    if (!this.hasAttribute('link')) {
      throw Error("link must be set");
    }

    this.render();
  }

  disconnectedCallback() {
    this.stopTimer();
  }

  get styles() {
    return `
      <style>
          .event-countdown-counter {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: 0.5rem;
              justify-content: center;
              align-items: center;
              font-family: inherit;
          }

          .event-countdown-section {
              position: relative;
              border: 1px solid var(--grave_accent_color);
              border-radius: 5px;
              background-color: var(--grave_accent_color);
              color: var(--grave_bg_color);
              padding: 1rem;
              min-width: 50px;
              text-align: center;
              padding-bottom: 1.5rem;
              font-family: inherit;
          }

          .event-countdown-section .number {
              font-size: 2rem;
              font-weight: bold;
              font-family: inherit;
          }

          .event-countdown-section .unit {
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              bottom: 0.5rem;
              font-size: 0.8rem;
              text-align: center;
              font-weight: bold;
              font-family: inherit;
          }
      </style>
    `;
  }

  section(timeProp) {
    return `
      <div class="event-countdown-section ${timeProp}">
        <span class="number">${this[timeProp]}</span>
        <span class="unit">${this[timeProp] !== 1 ? timeProp : timeProp.replace(/s$/, '')}</span>
      </div>
    `;
  }

  generateContent(timerDone) {
    return `
      ${timerDone
        ? `
          <h2 class="event-countdown-end-heading text-center">${this.endheading}</h2>
          <h3 class="event-countdown-link text-center"><a href="${this.link}" target="_blank">${this.link}</a></h3>
        `
        : `
          <h2 class="event-countdown-heading text-center">${this.heading}</h2>
          <div class="event-countdown-counter">
              ${this.days > 0 ? this.section('days') : ''}
              ${this.days > 0 || this.hours > 0 ? this.section('hours') : ''}
              ${this.days > 0 || this.hours > 0 || this.minutes > 0 ? this.section('minutes') : ''}
              ${this.seconds > -1 ? this.section('seconds') : ''}
          </div>
        `
      }
    `;
  }

  updateTimer() {
    this.endTime = DateTime.fromFormat(this.date, this.#startTimeFormat, { zone: this.#timeZone });
    this.currentTime =  DateTime.now().setZone(this.#timeZone);
    this.timeRemaining =  this.endTime.diff(this.currentTime, ["days", "hours", "minutes", "seconds"]);
    this.days =  Math.floor(this.timeRemaining.days);
    this.hours = Math.floor(this.timeRemaining.hours);
    this.minutes = Math.floor(this.timeRemaining.minutes);
    this.seconds = Math.floor(this.timeRemaining.seconds);

    const timerDone = this.timeRemaining.toMillis() <= 0;

    if (timerDone) {
      this.stopTimer();
    }

    this.querySelector('.event-countdown').innerHTML = this.generateContent(timerDone);
  }

  startTimer() {
    this.timerInterval = setInterval(() => { this.updateTimer(); }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  render() {
    this.innerHTML = `
      ${this.styles}
      <div class="event-countdown">
      </div>
    `;

    this.updateTimer();
    this.startTimer();
  }
}

customElements.define('x-event-countdown', EventCountdown);
