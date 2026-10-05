"use strict";

const EventEngine = {
  version: "1.0.0",

  events: [],

  addEvent(event = {}) {
    const item = {
      id:
        event.id ||
        Date.now(),

      name:
        event.name || "",

      country:
        event.country || "",

      currency:
        event.currency || "",

      importance:
        event.importance ||
        "medium",

      scheduledAt:
        event.scheduledAt ||
        Date.now(),

      forecast:
        event.forecast ?? null,

      previous:
        event.previous ?? null,

      actual:
        event.actual ?? null
    };

    this.events.push(item);

    return item;
  },

  upcoming(
    from = Date.now(),
    limit = 50
  ) {
    return this.events
      .filter(
        (event) =>
          event.scheduledAt >=
          from
      )
      .sort(
        (a, b) =>
          a.scheduledAt -
          b.scheduledAt
      )
      .slice(0, limit);
  },

  highImpact() {
    return this.events.filter(
      (event) =>
        event.importance ===
        "high"
    );
  },

  clear() {
    this.events = [];
  }
};

if (typeof window !== "undefined") {
  window.EventEngine =
    EventEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    EventEngine;
    }
