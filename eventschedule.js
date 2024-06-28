class EventSchedule {
  // Construct with event start time
  constructor(year, month, day, hour, minute)
  {
    var dateTime = luxon.DateTime;
    this.#currentTime = dateTime.local(year, month, day, hour, minute, { zone: this.#timeZone });
  }

  // Adds a set to the schedule
  addSet(twitchName, artistName, setLengthMinutes)
  {
    this.#data.push({
    "time": this.#currentTime.toLocal().toFormat(this.#timeStringFormat),
    "link": this.#baseUrl + twitchName,
    "artist": artistName});

    this.#currentTime = this.#currentTime.plus({ minutes: setLengthMinutes });
  }

  // Total number of sets in the schedule
  length()
  {
    return this.#data.length;
  }

  // Get the set located at the index
  at(index)
  {
    return this.#data[index];
  }

  #data = [];
  #timeZone = 'America/Toronto';
  #timeStringFormat = "yyyy-MM-dd hh:mm a";
  #baseUrl = "https://www.twitch.tv/";
  #currentTime;
}
