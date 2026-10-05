"use strict";

const AlertEngine = {
  alerts: [],

  create(data = {}) {
    const alert = {
      id:
        data.id ||
        `${Date.now()}-${Math.random()}`,

      type:
        data.type || "market",

      symbol:
        data.symbol || null,

      message:
        data.message || "",

      severity:
        data.severity || "normal",

      timestamp:
        Date.now(),

      acknowledged: false
    };

    this.alerts.unshift(alert);

    return alert;
  },

  acknowledge(id) {
    const alert =
      this.alerts.find(
        (item) => item.id === id
      );

    if (!alert) {
      return false;
    }

    alert.acknowledged = true;

    return true;
  },

  getActive() {
    return this.alerts.filter(
      (alert) =>
        !alert.acknowledged
    );
  },

  clear() {
    this.alerts = [];
  }
};

if (typeof window !== "undefined") {
  window.AlertEngine = AlertEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = AlertEngine;
  }
